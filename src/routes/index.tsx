import { createFileRoute } from "@tanstack/react-router";

import { SeaBackground } from "@/components/sea/SeaBackground";
import { Seaweed } from "@/components/sea/Seaweed";
import { Coral } from "@/components/sea/Coral";
import { Turtle } from "@/components/sea/Turtle";
import { ShellMark } from "@/components/sea/ShellMark";
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
    <main className="invitation min-h-screen overflow-hidden">
      <section className="hero-sea relative isolate overflow-hidden px-5 pb-24 pt-10 text-center sm:pb-28 sm:pt-14">
        <SeaBackground />
        <div className="relative z-10 mx-auto max-w-3xl">
          <p className="hero-eyebrow text-white/90">Um convite para mergulhar</p>
          <h1 className="hero-name mt-3 text-white">Thales Henrique</h1>
          <p className="hero-age mt-1 text-sand">1 aninho</p>
          <p className="mx-auto mt-2 max-w-md font-display text-xl font-bold text-white sm:text-2xl">
            O fundo do mar está em festa!
          </p>

          <div className="hero-photo mx-auto mt-7 max-w-[min(86vw,25rem)] sm:mt-8">
            <ThalesPhoto />
          </div>

          <a
            href="#convite"
            className="dive-cue mt-7 inline-flex flex-col items-center text-white/90"
          >
            <span>mergulhe</span>
            <span aria-hidden="true" className="dive-arrow">
              ↓
            </span>
          </a>
        </div>
        <div aria-hidden="true" className="hero-wave absolute inset-x-0 bottom-0">
          <svg viewBox="0 0 1200 72" preserveAspectRatio="none" focusable="false">
            <path d="M0 31 C170 7 320 59 496 34 S830 9 1200 41 V72 H0Z" />
          </svg>
        </div>
      </section>

      <div className="sea-journey relative isolate">
        <span aria-hidden="true" className="journey-bubble journey-bubble-one" />
        <span aria-hidden="true" className="journey-bubble journey-bubble-two" />

        <section
          id="convite"
          className="relative mx-auto max-w-2xl px-7 pb-14 pt-12 text-center sm:pb-20 sm:pt-20"
        >
          <ShellMark className="invitation-shell mx-auto h-7 w-7" />
          <h2 className="mt-2 font-display text-3xl font-extrabold text-deep sm:text-4xl">
            Uma aventura para celebrar
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-foreground sm:text-xl">
            Venha mergulhar com a gente nessa aventura e comemorar o primeiro aninho do nosso
            pequeno Thales.
          </p>
        </section>

        <section
          className="party-section relative mx-auto max-w-3xl px-5 pb-18 sm:px-8"
          aria-labelledby="party-title"
        >
          <div className="party-plaque relative px-7 py-8 text-center sm:px-12 sm:py-14">
            <span aria-hidden="true" className="party-star party-star-left">
              ✦
            </span>
            <span aria-hidden="true" className="party-star party-star-right">
              ✦
            </span>
            <p className="section-kicker">Prepare o coração</p>
            <h2
              id="party-title"
              className="mt-2 font-display text-3xl font-extrabold text-deep sm:text-4xl"
            >
              Nosso encontro no fundo do mar
            </h2>
            <dl className="party-details mx-auto mt-6 max-w-xl sm:mt-9">
              <div>
                <dt>Quando</dt>
                <dd>05 de dezembro de 2026</dd>
              </div>
              <div>
                <dt>Às</dt>
                <dd>16h</dd>
              </div>
              <div>
                <dt>Onde</dt>
                <dd>LL Espaço de Festa</dd>
              </div>
            </dl>
            <p className="mt-5 text-sm font-bold uppercase tracking-[0.16em] text-deep/65 sm:mt-7">
              Endereço
            </p>
            <p className="mx-auto mt-2 max-w-sm text-base font-semibold leading-relaxed text-deep sm:text-lg">
              Rua 23, São João del Rei — Cuiabá/MT
            </p>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="map-link mt-5 inline-flex min-h-12 items-center justify-center px-9 font-display text-lg font-bold text-white sm:mt-7"
            >
              Como chegar{" "}
              <span aria-hidden="true" className="ml-2">
                ↗
              </span>
            </a>
          </div>
        </section>

        <section className="countdown-section relative mx-auto max-w-3xl px-5 pb-16 pt-3 sm:px-8 sm:pb-24">
          <Countdown />
        </section>

        <div aria-hidden="true" className="journey-wave relative h-20 sm:h-28">
          <svg
            className="journey-wave-top"
            viewBox="0 0 1200 72"
            preserveAspectRatio="none"
            focusable="false"
          >
            <path d="M0 0 H1200 V34 C984 64 839 9 617 39 S201 57 0 24Z" />
          </svg>
          <Seaweed className="anim-sway absolute bottom-0 left-[4%] h-20 w-7 opacity-60 sm:h-28 sm:w-10" />
          <Coral className="absolute bottom-0 right-[5%] h-12 w-16 opacity-70 sm:h-18 sm:w-22" />
        </div>
      </div>

      <section id="confirmar" className="rsvp-sea relative px-5 pb-16 pt-10 sm:pb-24 sm:pt-16">
        <span aria-hidden="true" className="journey-bubble rsvp-bubble-one" />
        <span aria-hidden="true" className="journey-bubble rsvp-bubble-two" />
        <div className="relative mx-auto max-w-2xl">
          <div className="mx-auto mb-7 max-w-xl text-center sm:mb-9">
            <h2 className="font-display text-3xl font-extrabold leading-tight text-deep sm:text-4xl">
              Sua confirmação é muito importante
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-foreground sm:text-lg">
              Confirme apenas se realmente pretende participar. Assim conseguimos organizar tudo com
              carinho e preparar a festa na medida certa para receber vocês.
            </p>
          </div>
          <RsvpForm />
        </div>
      </section>

      <footer className="sea-ending relative isolate overflow-hidden px-6 pb-14 pt-16 text-center sm:pb-20 sm:pt-24">
        <div aria-hidden="true" className="ending-wave absolute inset-x-0 top-0" />
        <Turtle className="anim-bob mx-auto h-14 w-20 opacity-85" />
        <p className="relative mx-auto mt-4 max-w-lg font-display text-2xl font-bold leading-snug text-white sm:text-3xl">
          Esperamos você para viver essa aventura no fundo do mar
        </p>
      </footer>
    </main>
  );
}
