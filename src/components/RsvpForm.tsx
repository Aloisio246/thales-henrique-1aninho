import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { criarConfirmacao, rsvpSchema } from "@/lib/rsvp.functions";

type Erros = Partial<Record<"nome" | "adultos" | "criancas" | "observacao" | "geral", string>>;

function Contador({
  id,
  rotulo,
  valor,
  onChange,
}: {
  id: string;
  rotulo: string;
  valor: number;
  onChange: (valor: number) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-semibold text-deep">
        {rotulo}
      </label>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label={`Diminuir ${rotulo}`}
          onClick={() => onChange(Math.max(0, valor - 1))}
          className="h-11 w-11 shrink-0 rounded-full bg-secondary font-display text-xl font-bold text-secondary-foreground transition-transform active:scale-95"
        >
          −
        </button>
        <input
          id={id}
          name={id}
          type="number"
          inputMode="numeric"
          min={0}
          max={20}
          step={1}
          value={valor}
          onChange={(event) => {
            const numero = Number.parseInt(event.target.value, 10);
            onChange(Number.isNaN(numero) ? 0 : Math.min(20, Math.max(0, numero)));
          }}
          className="h-11 w-full min-w-0 rounded-xl border border-input bg-white text-center font-display text-lg font-bold text-deep"
        />
        <button
          type="button"
          aria-label={`Aumentar ${rotulo}`}
          onClick={() => onChange(Math.min(20, valor + 1))}
          className="h-11 w-11 shrink-0 rounded-full bg-secondary font-display text-xl font-bold text-secondary-foreground transition-transform active:scale-95"
        >
          +
        </button>
      </div>
    </div>
  );
}

export function RsvpForm() {
  const enviar = useServerFn(criarConfirmacao);
  const [nome, setNome] = useState("");
  const [adultos, setAdultos] = useState(1);
  const [criancas, setCriancas] = useState(0);
  const [observacao, setObservacao] = useState("");
  const [erros, setErros] = useState<Erros>({});
  const [enviando, setEnviando] = useState(false);
  const [confirmado, setConfirmado] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (enviando || confirmado) return;

    const resultado = rsvpSchema.safeParse({ nome, adultos, criancas, observacao });
    if (!resultado.success) {
      const novos: Erros = {};
      for (const issue of resultado.error.issues) {
        const campo = issue.path[0] as keyof Erros;
        if (campo) novos[campo] = issue.message;
      }
      setErros(novos);
      return;
    }
    if (adultos + criancas < 1) {
      setErros({ adultos: "Informe pelo menos uma pessoa" });
      return;
    }

    setErros({});
    setEnviando(true);
    try {
      await enviar({ data: resultado.data });
      setConfirmado(true);
    } catch {
      setErros({ geral: "Não conseguimos salvar sua confirmação. Tente novamente em instantes." });
    } finally {
      setEnviando(false);
    }
  }

  if (confirmado) {
    return (
      <div
        role="status"
        className="rounded-3xl bg-white/95 p-6 text-center shadow-float sm:p-8"
      >
        <span aria-hidden="true" className="text-4xl">
          🐠
        </span>
        <p className="mt-3 font-display text-xl font-bold text-deep sm:text-2xl">
          Presença confirmada! Esperamos vocês para viver essa aventura no fundo do mar 💙
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl bg-white/95 p-5 shadow-float sm:p-8"
    >
      <h2 className="font-display text-2xl font-extrabold text-deep sm:text-3xl">
        Confirmar presença
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Preencha os dados abaixo para avisar que vocês vêm.
      </p>

      <div className="mt-5 space-y-4">
        <div>
          <label htmlFor="nome" className="mb-1 block text-sm font-semibold text-deep">
            Nome do convidado
          </label>
          <input
            id="nome"
            name="nome"
            type="text"
            autoComplete="name"
            maxLength={80}
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            aria-invalid={Boolean(erros.nome)}
            aria-describedby={erros.nome ? "erro-nome" : undefined}
            className="h-12 w-full rounded-xl border border-input bg-white px-4 text-base text-deep"
            placeholder="Ex.: Família Silva"
          />
          {erros.nome && (
            <p id="erro-nome" className="mt-1 text-sm font-medium text-destructive">
              {erros.nome}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Contador id="adultos" rotulo="Adultos" valor={adultos} onChange={setAdultos} />
            {erros.adultos && (
              <p className="mt-1 text-sm font-medium text-destructive">{erros.adultos}</p>
            )}
          </div>
          <div>
            <Contador id="criancas" rotulo="Crianças" valor={criancas} onChange={setCriancas} />
            {erros.criancas && (
              <p className="mt-1 text-sm font-medium text-destructive">{erros.criancas}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="observacao" className="mb-1 block text-sm font-semibold text-deep">
            Observação (opcional)
          </label>
          <textarea
            id="observacao"
            name="observacao"
            rows={3}
            maxLength={500}
            value={observacao}
            onChange={(event) => setObservacao(event.target.value)}
            className="w-full rounded-xl border border-input bg-white p-3 text-base text-deep"
            placeholder="Alguma restrição alimentar, recado ou dúvida?"
          />
        </div>

        {erros.geral && (
          <p role="alert" className="text-sm font-medium text-destructive">
            {erros.geral}
          </p>
        )}

        <button
          type="submit"
          disabled={enviando}
          aria-busy={enviando}
          className="coral-gradient h-14 w-full rounded-full font-display text-lg font-extrabold text-accent-foreground shadow-soft transition-transform active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {enviando ? "Enviando..." : "Confirmar presença"}
        </button>
      </div>
    </form>
  );
}
