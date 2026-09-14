/**
 * Moldura da foto do Thales.
 *
 * Para colocar a foto real: salve o arquivo em `src/assets/thales.jpg`,
 * descomente as duas linhas abaixo e passe `src={thalesFoto}` neste componente.
 *
 * import thalesFoto from "@/assets/thales.jpg";
 * <ThalesPhoto src={thalesFoto} />
 *
 * A foto e os textos são estáticos: nenhuma animação é aplicada aqui.
 */
export function ThalesPhoto({ src, alt = "Foto do Thales Henrique" }: { src?: string; alt?: string }) {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="rounded-[2.5rem] bg-white/85 p-3 shadow-float backdrop-blur-sm">
        <div className="aspect-square overflow-hidden rounded-[2rem] border-4 border-aqua/60 bg-aqua-soft">
          {src ? (
            <img src={src} alt={alt} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-6 text-center">
              <span aria-hidden="true" className="text-4xl">
                📷
              </span>
              <p className="font-display text-lg font-bold text-deep">Foto do Thales</p>
              <p className="text-sm text-muted-foreground">
                Espaço reservado para a foto oficial do aniversariante.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
