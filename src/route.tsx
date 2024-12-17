import { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import { Routes, Route, useLocation} from 'react-router-dom';
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import Order from "./pages/Order";
import Confirmation from "./pages/Confirmation";
import Payment from "./pages/Payment";
import AntrianOrder from "./pages/Transaction/AntrianOrder";
import KirimOrder from "./pages/Transaction/KirimOrder";
import AmbilOrder from "./pages/Transaction/AmbilOrder";
import DetailTransaction from "./pages/Transaction/DetailTransaction";
import PengirimanOrder from "./pages/Transaction/PengirimanOrder";
import SerahTerimaOrder from "./pages/Transaction/SerahTerima";
import Diterima from "./pages/Transaction/DiterimaOrder";
import Dikembalikan from "./pages/Transaction/DikembalikanOrder";



const Routess = () => {
    const [progress, setProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    // Mulai progress dari 20%
    setProgress(10);

    // Simulasi selesai (100%) setelah waktu singkat
    const timer = setTimeout(() => setProgress(100), 50);

    // Reset progress ke 0 setelah selesai
    const resetTimer = setTimeout(() => setProgress(0), 800);

    return () => {
      clearTimeout(timer);
      clearTimeout(resetTimer);
    };
  }, [location]);
  return (
    <>
    <LoadingBar color='#2563EB'  progress={progress} onLoaderFinished={() => setProgress(0)} />
      <Routes>
        <Route index path="home" element={<LandingPage />} />
        <Route path="order" element={<Order />} />
        <Route path="confirmation" element={<Confirmation />} />
        <Route path="payment" element={<Payment />}></Route>
        <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="AntrianOrder" element={<AntrianOrder />} />  
            <Route path="kirimorder" element={<KirimOrder />} />  
            <Route path="ambilorder" element={<AmbilOrder />} />
            <Route path="detail/:id" element={<DetailTransaction />} /> 
            <Route path="serahterimaorder" element={<SerahTerimaOrder />} />
            <Route path="pengirimanorder" element={<PengirimanOrder />} />
            <Route path="orderditerima" element={<Diterima />} />
            <Route path="orderdikembalikan" element={<Dikembalikan />} />



          </Route>
      </Routes>
    </>
  )
}

export default Routess;