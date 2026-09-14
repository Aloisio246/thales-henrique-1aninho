import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import { entrarAdmin, listarConfirmacoes, sairAdmin } from "@/lib/rsvp.functions";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Confirmações — Thales no Fundo do Mar" },
      {
        name: "description",
        content: "Área dos responsáveis para acompanhar as confirmações de presença da festa.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Confirmações — Thales no Fundo do Mar" },
      {
        property: "og:description",
        content: "Painel privado com as confirmações de presença do aniversário do Thales.",
      },
    ],
  }),
  component: Admin,
});

const formatador = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: "America/Cuiaba",
});

function Admin() {
  const listar = useServerFn(listarConfirmacoes);
  const entrar = useServerFn(entrarAdmin);
  const sair = useServerFn(sairAdmin);
  const queryClient = useQueryClient();

  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [entrando, setEntrando] = useState(false);
  const [busca, setBusca] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["confirmacoes"],
    queryFn: () => listar(),
  });

  const confirmacoes = data?.confirmacoes ?? [];

  const totais = useMemo(() => {
    const adultos = confirmacoes.reduce((soma, item) => soma + item.adultos, 0);
    const criancas = confirmacoes.reduce((soma, item) => soma + item.criancas, 0);
    return { respostas: confirmacoes.length, adultos, criancas, geral: adultos + criancas };
  }, [confirmacoes]);

  const filtradas = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return confirmacoes;
    return confirmacoes.filter((item) => item.nome.toLowerCase().includes(termo));
  }, [confirmacoes, busca]);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (entrando) return;
    setEntrando(true);
    setErro("");
    try {
      const resultado = await entrar({ data: { senha } });
      if (resultado.ok) {
        setSenha("");
        await queryClient.invalidateQueries({ queryKey: ["confirmacoes"] });
      } else {
        setErro("Senha incorreta.");
      }
    } catch {
      setErro("Não foi possível entrar agora. Tente novamente.");
    } finally {
      setEntrando(false);
    }
  }

  if (isLoading) {
    return (
      <main className="sea-gradient flex min-h-screen items-center justify-center px-4">
        <p className="font-display text-lg font-bold text-white">Carregando...</p>
      </main>
    );
  }

  if (!data?.autorizado) {
    return (
      <main className="sea-gradient flex min-h-screen items-center justify-center px-4 py-12">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-3xl bg-white/95 p-6 shadow-float"
        >
          <h1 className="font-display text-2xl font-extrabold text-deep">Área dos responsáveis</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Digite a senha para ver as confirmações de presença.
          </p>
          <label htmlFor="senha" className="mt-5 mb-1 block text-sm font-semibold text-deep">
            Senha
          </label>
          <input
            id="senha"
            type="password"
            autoComplete="current-password"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            className="h-12 w-full rounded-xl border border-input bg-white px-4 text-base text-deep"
          />
          {erro && (
            <p role="alert" className="mt-2 text-sm font-medium text-destructive">
              {erro}
            </p>
          )}
          <button
            type="submit"
            disabled={entrando}
            aria-busy={entrando}
            className="coral-gradient mt-5 h-12 w-full rounded-full font-display text-base font-extrabold text-accent-foreground disabled:opacity-70"
          >
            {entrando ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="sea-gradient grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-6 sm:flex sm:justify-between sm:px-8">
        <div className="min-w-0">
          <h1 className="truncate font-display text-2xl font-extrabold text-white sm:text-3xl">
            Confirmações de presença
          </h1>
          <p className="text-sm text-white/90">Thales no Fundo do Mar — 05/12/2026</p>
        </div>
        <button
          type="button"
          onClick={async () => {
            await sair();
            await queryClient.invalidateQueries({ queryKey: ["confirmacoes"] });
          }}
          className="shrink-0 rounded-full bg-white/90 px-5 py-2 font-display text-sm font-bold text-deep"
        >
          Sair
        </button>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-8">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { rotulo: "Respostas", valor: totais.respostas },
            { rotulo: "Adultos", valor: totais.adultos },
            { rotulo: "Crianças", valor: totais.criancas },
            { rotulo: "Total de convidados", valor: totais.geral },
          ].map((card) => (
            <li key={card.rotulo} className="rounded-2xl bg-card p-4 text-center shadow-soft">
              <span className="block font-display text-3xl font-extrabold text-primary">
                {card.valor}
              </span>
              <span className="text-xs uppercase tracking-wide text-muted-foreground">
                {card.rotulo}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <label htmlFor="busca" className="mb-1 block text-sm font-semibold text-deep">
            Buscar por nome
          </label>
          <input
            id="busca"
            type="search"
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
            placeholder="Digite um nome"
            className="h-12 w-full rounded-xl border border-input bg-card px-4 text-base"
          />
        </div>

        <div className="mt-6 overflow-x-auto rounded-2xl bg-card shadow-soft">
          <table className="w-full min-w-[640px] text-left text-sm">
            <caption className="sr-only">Lista de confirmações de presença</caption>
            <thead className="bg-secondary text-secondary-foreground">
              <tr>
                <th scope="col" className="px-4 py-3 font-display">
                  Nome
                </th>
                <th scope="col" className="px-4 py-3 font-display">
                  Adultos
                </th>
                <th scope="col" className="px-4 py-3 font-display">
                  Crianças
                </th>
                <th scope="col" className="px-4 py-3 font-display">
                  Observação
                </th>
                <th scope="col" className="px-4 py-3 font-display">
                  Data/hora
                </th>
              </tr>
            </thead>
            <tbody>
              {filtradas.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                    Nenhuma confirmação encontrada.
                  </td>
                </tr>
              ) : (
                filtradas.map((item) => (
                  <tr key={item.id} className="border-t border-border">
                    <td className="px-4 py-3 font-semibold text-deep">{item.nome}</td>
                    <td className="px-4 py-3">{item.adultos}</td>
                    <td className="px-4 py-3">{item.criancas}</td>
                    <td className="px-4 py-3 text-muted-foreground">{item.observacao ?? "—"}</td>
                    <td className="px-4 py-3">{formatador.format(new Date(item.created_at))}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
