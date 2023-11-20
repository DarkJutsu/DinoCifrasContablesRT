import logo from "../../assets/img/logo.png";

export function NotFoundPage() {
  return (
    <>
      <div className="flex justify-center items-center h-full font-comfortaa">
        <div className="backdrop-blur-md bg-white/30 text-slate-900">
          <img src={logo} alt="Logo-404" className="w-64 " />
          <span className="absolute top-16 text-7xl font-bold text-slate-900">404</span>
          <span className="flex justify-center text-4xl">UUUUUUPS!</span>
          <span className="flex justify-center text-2xl">Página No Encontrada</span>
        </div>
      </div>
    </>
  );
}
