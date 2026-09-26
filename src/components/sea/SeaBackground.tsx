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
      <div className="hero-light" />

      <Bubbles />

      <div className="hero-fish hero-fish-left absolute top-[57%] left-[2%]">
        <Fish className="h-8 w-12 sm:h-11 sm:w-16" />
      </div>
      <div className="hero-fish hero-fish-right absolute top-[64%] right-[2%]">
        <Fish className="h-7 w-10 scale-x-[-1] sm:h-9 sm:w-14" />
      </div>

      <div className="hero-turtle absolute bottom-[11%] right-[2%]">
        <Turtle className="h-12 w-16 sm:h-19 sm:w-24" />
      </div>

      <div className="absolute bottom-0 left-0 flex items-end gap-2 sm:gap-4">
        <Seaweed className="h-24 w-8 anim-sway seaweed-near sm:h-36 sm:w-12" />
        <Seaweed className="h-16 w-6 anim-sway seaweed-far sm:h-24 sm:w-8" />
        <Coral className="h-14 w-16 sm:h-20 sm:w-24" />
      </div>

      <div className="absolute bottom-0 right-0 flex items-end gap-2 sm:gap-4">
        <Coral className="h-12 w-14 sm:h-16 sm:w-20" />
        <Seaweed className="h-20 w-7 anim-sway seaweed-right sm:h-32 sm:w-10" />
      </div>

      {/* areia */}
      <div className="absolute inset-x-0 bottom-0 h-10 bg-sand/70 blur-[2px] sm:h-14" />
    </div>
  );
}
