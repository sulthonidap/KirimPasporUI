import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Payment = () => {
  const navigate = useNavigate();
  const [isCooldown, setIsCooldown] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    let timer;
    if (isCooldown) {
      setRemainingTime(15);
      timer = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsCooldown(false);
            navigate("/home");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isCooldown, navigate]);

  const handlePayment = () => {
    if (!isCooldown) {
      setIsCooldown(true);
      setShowImage(true);
    } else {
      alert("Please wait for the cooldown period to end.");
    }
  };

  return (
    <>
      <div className="min-h-screen ">
        <nav className="flex justify-between h-16 bg-[#2B3A51]">
          <div className="flex items-center space-x-4 px-16">
            <img
              src="/logo.png"
              alt=""
              className="h-10 w-10 cursor-pointer"
              onClick={() => navigate("/auth/login")}
            />
            <div className="text-white">
              <p className="text-sm">Kementerian Imigrasi dan Pemasyarakatan</p>
              <p className="text-xl font-bold">Direktorat Jenderal Imigrasi</p>
            </div>
          </div>
        </nav>
        <div className="flex bg-[url('/Luwuk_Banggai.webp')] bg-cover bg-no-repeat bg-center">
          <div className=" bg-black bg-opacity-50 w-full min-h-screen">
            <div className="bg-white p-4 m-10 rounded-lg">
              <h1 className="text-2xl font-bold mb-4">Pembayaran</h1>
              <div className="flex flex-col items-center">    
                <p>Lakukan pembayaran melalui QRIS</p>
                <br />
                <Button onClick={handlePayment} disabled={isCooldown} variant="contained">
                  {isCooldown ? "Cooldown..." : "Bayar"}
                </Button>
                {isCooldown && (
                  <p className="mt-4 text-red-500">
                    Remaining Time: {Math.floor(remainingTime / 60)}:{(remainingTime % 60).toString().padStart(2, '0')}
                  </p>
                )}
                
                {showImage && (
                  <img src="/qris.jpg" alt="" className="w-96" />
                )}
                
              </div>
              <div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
