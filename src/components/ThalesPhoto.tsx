export function ThalesPhoto() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="rounded-[47%_47%_43%_43%/7%_7%_5%_5%] border-[5px] border-white/90 bg-white/85 p-1.5">
        <div className="aspect-[4/5] overflow-hidden rounded-[47%_47%_43%_43%/6%_6%_4%_4%] bg-aqua-soft">
          <picture>
            <source
              type="image/webp"
              srcSet="/thales-640.webp 640w, /thales-960.webp 960w"
              sizes="(min-width: 640px) 384px, calc(100vw - 56px)"
            />
            <img
              src="/thales-original.png"
              width={1122}
              height={1402}
              loading="eager"
              fetchPriority="high"
              alt="Thales Henrique sentado em um balanço decorado com conchas à beira-mar"
              className="h-full w-full object-cover object-center"
            />
          </picture>
        </div>
      </div>
    </div>
  );
}
