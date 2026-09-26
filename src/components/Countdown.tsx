import { useEffect, useState } from "react";

/** Festa: 05/12/2026 às 16h no horário de Cuiabá (UTC-4). */
export const DATA_FESTA = new Date("2026-12-05T16:00:00-04:00");

function diferenca(alvo: Date) {
  const total = Math.max(0, alvo.getTime() - Date.now());
  return {
    total,
    dias: Math.floor(total / 86_400_000),
    horas: Math.floor((total / 3_600_000) % 24),
    minutos: Math.floor((total / 60_000) % 60),
    segundos: Math.floor((total / 1000) % 60),
  };
}

export function Countdown() {
  const [tempo, setTempo] = useState<ReturnType<typeof diferenca> | null>(null);

  useEffect(() => {
    setTempo(diferenca(DATA_FESTA));
    const id = setInterval(() => setTempo(diferenca(DATA_FESTA)), 1000);
    return () => clearInterval(id);
  }, []);

  const itens = [
    { valor: tempo?.dias, rotulo: "dias" },
    { valor: tempo?.horas, rotulo: "horas" },
    { valor: tempo?.minutos, rotulo: "minutos" },
    { valor: tempo?.segundos, rotulo: "segundos" },
  ];

  if (tempo?.total === 0) {
    return (
      <p className="text-center font-display text-xl font-bold text-deep">
        É hoje! A aventura no fundo do mar começou 💙
      </p>
    );
  }

  return (
    <div>
      <h2 className="text-center font-display font-bold text-deep">
        Falta pouquinho para a festa!
      </h2>
      <ul
        className="countdown-bubbles mx-auto mt-7 max-w-xl"
        aria-label="Contagem regressiva para a festa"
      >
        {itens.map((item) => (
          <li key={item.rotulo} className="text-center">
            <span className="block font-display text-2xl font-extrabold leading-none text-deep sm:text-4xl">
              {item.valor === undefined ? "--" : String(item.valor).padStart(2, "0")}
            </span>
            <span className="mt-1 text-[0.65rem] font-bold uppercase tracking-wide text-deep/75 sm:text-xs">
              {item.rotulo}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
