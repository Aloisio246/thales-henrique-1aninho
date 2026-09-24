import thalesPhoto from "@/assets/thales.png.asset.json";

export function ThalesPhoto() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="rounded-[2.5rem] bg-white/85 p-3 shadow-float backdrop-blur-sm">
        <div className="aspect-[4/5] overflow-hidden rounded-[2rem] border-4 border-aqua/60 bg-aqua-soft">
          <img
            src={thalesPhoto.url}
            alt="Thales Henrique sentado em um balanço decorado com conchas à beira-mar"
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
}
