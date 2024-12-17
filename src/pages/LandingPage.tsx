import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen">
        <nav className="flex justify-between h-16 bg-[#2B3A51]">
          <div className="flex items-center space-x-4 px-16">
            <img src="./public/logo.png" alt="" className="h-10 w-10 cursor-pointer" onClick={() => navigate("/auth/login")} />
            <div className="text-white">
              <p className="text-sm">Kementerian Imigrasi dan Pemasyarakatan</p>
              <p className="text-xl font-bold">Direktorat Jenderal Imigrasi</p>
            </div>
          </div>
        </nav>
        <div>
          <div className=" h-[630px] bg-[url('/Luwuk_Banggai.webp')] bg-cover bg-center bg-no-repeat">
          <div className=" bg-black bg-opacity-50 w-full h-full flex flex-col items-center justify-center">
            <h1 className="text-6xl font-bold text-white">Selamat Datang</h1>
            <h1 className="text-6xl font-bold text-white">
              di Anjungan Pengiriman Paspor
            </h1>
            <button
              className="border-2 text-white font-bold px-4 py-2 rounded-lg mt-8 hover:bg-white hover:text-[#2B3A51] animate-bounce"
              onClick={() => navigate("/order")}
            >
              Buat Pesanan Sekarang 
              <span className="ml-2">&#8594;</span>
            </button>
          
          <div className="absolute bottom-0 right-0 m-4 animate-pulse">
            <Button variant="contained" onClick={() => navigate("/login")}>
              Help
            </Button>
          </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
