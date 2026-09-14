import { Fish } from "./Fish";
import { Turtle } from "./Turtle";
import { Seaweed } from "./Seaweed";
import { Coral } from "./Coral";
import { Bubbles } from "./Bubbles";

/**
 * Cenário animado do fundo do mar. Puramente decorativo:
 * fica atrás do conteúdo e é ignorado por leitores de tela.
 */
export function SeaBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* reflexos de água muito discretos */}
      <div className="absolute inset-x-0 top-0 h-1/2 anim-caustics bg-[repeating-linear-gradient(105deg,rgba(255,255,255,0.5)_0px,rgba(255,255,255,0)_26px,rgba(255,255,255,0.4)_52px)] opacity-20" />

      <Bubbles />

      <div className="absolute inset-x-0 top-[22%] anim-swim">
        <Fish className="h-10 w-14 sm:h-14 sm:w-20" />
      </div>
      <div
        className="absolute inset-x-0 top-[58%] anim-swim opacity-80"
        style={{ animationDuration: "38s", animationDelay: "-12s" }}
      >
        <Fish className="h-7 w-10 scale-x-[-1] sm:h-9 sm:w-14" />
      </div>

      <div className="absolute bottom-[14%] right-[6%] anim-bob">
        <Turtle className="h-16 w-20 sm:h-24 sm:w-32" />
      </div>

      <div className="absolute bottom-0 left-0 flex items-end gap-2 sm:gap-4">
        <Seaweed className="h-24 w-8 anim-sway sm:h-36 sm:w-12" />
        <Seaweed
          className="h-16 w-6 anim-sway sm:h-24 sm:w-8"
          style={{ animationDuration: "7.5s", animationDelay: "-2s" }}
        />
        <Coral className="h-14 w-16 anim-sway sm:h-20 sm:w-24" />
      </div>

      <div className="absolute bottom-0 right-0 flex items-end gap-2 sm:gap-4">
        <Coral
          className="h-12 w-14 anim-sway sm:h-16 sm:w-20"
          style={{ animationDuration: "8s", animationDelay: "-3s" }}
        />
        <Seaweed
          className="h-20 w-7 anim-sway sm:h-32 sm:w-10"
          style={{ animationDuration: "6.8s", animationDelay: "-1.4s" }}
        />
      </div>

      {/* areia */}
      <div className="absolute inset-x-0 bottom-0 h-10 bg-sand/70 blur-[2px] sm:h-14" />
    </div>
  );
}
