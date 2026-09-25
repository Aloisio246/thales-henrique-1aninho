import { createFileRoute } from "@tanstack/react-router";

import { SeaBackground } from "@/components/sea/SeaBackground";
import { ThalesPhoto } from "@/components/ThalesPhoto";
import { Countdown } from "@/components/Countdown";
import { RsvpForm } from "@/components/RsvpForm";

const ENDERECO = "LL Espaço de Festa, Rua 23, São João del Rei, Cuiabá - MT";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ENDERECO)}`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Thales no Fundo do Mar — 1 aninho do Thales Henrique" },
      {
        name: "description",
        content:
          "Convite do 1º aniversário do Thales Henrique: 05 de dezembro de 2026, às 16h, no LL Espaço de Festa, em Cuiabá. Confirme sua presença!",
      },
      { property: "og:title", content: "Thales no Fundo do Mar — 1 aninho do Thales Henrique" },
      {
        property: "og:description",
        content:
          "Venha comemorar com a gente esse dia tão especial! 05/12/2026, 16h, LL Espaço de Festa — Cuiabá/MT.",
      },
    ],
  }),
  component: Convite,
});

function Convite() {
  return (
    <main className="min-h-screen bg-background">
      {/* HERO */}
      <section className="sea-gradient relative overflow-hidden px-4 pb-20 pt-12 sm:pb-28 sm:pt-16">
        <SeaBackground />

        <div className="relative mx-auto max-w-3xl text-center">
          <p className="font-display text-base font-bold uppercase tracking-[0.25em] text-white/90">
            Thales no fundo do mar
          </p>
          <h1 className="mt-2 font-display text-4xl font-extrabold text-white drop-shadow-[0_3px_10px_rgba(12,40,70,0.45)] sm:text-6xl">
            Thales Henrique
          </h1>
          <p className="mt-2 inline-block rounded-full bg-white/90 px-6 py-1 font-display text-2xl font-extrabold text-accent sm:text-3xl">
            1 aninho
          </p>
          <p className="mx-auto mt-4 max-w-xl font-display text-xl font-bold text-white sm:text-2xl">
            O fundo do mar está em festa!
          </p>

          <div className="mt-8">
            <ThalesPhoto />
          </div>
          <a
            href="#convite"
            className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-white/95 underline-offset-4 hover:underline"
          >
            Mergulhe no convite <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      <section id="convite" className="mx-auto max-w-2xl px-6 py-14 text-center sm:py-20">
        <span aria-hidden="true" className="text-3xl">
          🐚
        </span>
        <h2 className="mt-3 font-display text-2xl font-extrabold text-deep sm:text-3xl">
          Uma aventura para celebrar
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-foreground">
          Venha mergulhar com a gente nessa aventura e comemorar o primeiro aninho do nosso pequeno
          Thales.
        </p>
      </section>

      {/* FESTA */}
      <section className="mx-auto max-w-3xl px-4">
        <div className="rounded-[2.5rem] bg-aqua-soft/70 p-5 shadow-float sm:p-8">
          <p className="text-center text-sm font-bold uppercase tracking-[0.2em] text-deep/75">
            O nosso encontro
          </p>

          <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { termo: "Data", valor: "05 de dezembro de 2026", icone: "🗓️" },
              { termo: "Horário", valor: "16h", icone: "⏰" },
              { termo: "Local", valor: "LL Espaço de Festa", icone: "🐚" },
            ].map((item) => (
              <div key={item.termo} className="rounded-[1.75rem] bg-white/65 p-4 text-center">
                <span aria-hidden="true" className="text-2xl">
                  {item.icone}
                </span>
                <dt className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                  {item.termo}
                </dt>
                <dd className="font-display text-lg font-bold text-deep">{item.valor}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 rounded-[1.75rem] bg-white/65 p-4 text-center">
            <p className="text-sm text-muted-foreground">Endereço</p>
            <p className="font-display text-lg font-bold text-deep">
              Rua 23, São João del Rei — Cuiabá/MT
            </p>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-4 inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 font-display text-base font-bold text-primary-foreground shadow-soft transition-transform active:scale-[0.98]"
            >
              Como chegar
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-3xl px-4">
        <div className="rounded-[2.5rem] bg-sand/75 px-4 py-7 sm:px-8">
          <Countdown />
        </div>
      </section>

      {/* RSVP */}
      <section id="confirmar" className="mx-auto mt-12 max-w-2xl px-4 pb-4">
        <div className="mb-7 px-2 text-center">
          <h2 className="font-display text-2xl font-extrabold text-deep">
            Sua confirmação é muito importante 💙
          </h2>
          <p className="mx-auto mt-3 max-w-xl leading-relaxed text-foreground">
            Confirme apenas se realmente pretende participar. Assim conseguimos organizar tudo com
            carinho e preparar a festa na medida certa para receber vocês.
          </p>
        </div>
        <RsvpForm />
      </section>

      <footer className="mt-12 sea-gradient relative overflow-hidden px-4 py-12 text-center">
        <p className="relative font-display text-xl font-bold text-white drop-shadow-[0_2px_8px_rgba(12,40,70,0.4)] sm:text-2xl">
          Esperamos você para viver essa aventura no fundo do mar!
        </p>
      </footer>
    </main>
  );
}
