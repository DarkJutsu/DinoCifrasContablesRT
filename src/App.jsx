import "./App.css";
import { Route, Routes } from "react-router-dom";
import { SideBar } from "./pages/menu/SideBar";
import { NotFoundPage } from "./pages/404/NotFoundPage";
import { HomePage } from "./pages/HomePage";
import { CuentasPage } from "./pages/CuentasPage";
import { AjustesPage } from "./pages/AjustesPage";
import { genCuentas } from "./utils/genCuentas.function";
import { LibroDiarioPage } from "./pages/LibroDiarioPage";
import { LibroDiarioDetailPage } from "./pages/LibroDiarioDetailPage";
import { AsientoFormModal } from "./components/form/AsientoFormModal";
import { genCuentasEmpty } from "./utils/genCuentasEmpty.function";
import { BalanceComproPage } from "./pages/BalanceComproPage";
import { KardexPage } from "./pages/KardexPage";

function App() {

  if(!localStorage.getItem("cuentasObject")) genCuentas()
  if(!localStorage.getItem("cuentasObjectEmpty")) genCuentasEmpty()

  return (
    <>
      <div className="flex">
        <SideBar />
        <div className="container mx-auto mt-12">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/DinoCifrasContablesRT/" element={<HomePage />} />
            <Route path="/DinoCifrasContablesRT/libroDiario" element={<LibroDiarioPage />} />
            <Route path="/DinoCifrasContablesRT/libroDiarioDetail" element={<LibroDiarioDetailPage />} />
            <Route path="/DinoCifrasContablesRT/asientosForm" element={<AsientoFormModal />} />
            <Route path="/DinoCifrasContablesRT/cuentas" element={<CuentasPage />} />
            <Route path="/DinoCifrasContablesRT/balanceCompro" element={<BalanceComproPage />} />
            <Route path="/DinoCifrasContablesRT/kardex" element={<KardexPage />} />
            <Route path="/DinoCifrasContablesRT/ajustes" element={<AjustesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
