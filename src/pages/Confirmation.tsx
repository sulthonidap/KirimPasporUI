import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const Confirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData } = location.state || {};
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    if (target.scrollTop > 0) {
      setIsScrolled(true);
    }
  };

  return (
    <>
      <div className="min-h-screen ">
        <nav className="flex justify-between h-16 bg-[#2B3A51]">
          <div className="flex items-center space-x-4 px-16">
            <img
              src="./public/logo.png"
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
        <div className="flex bg-[url('/Luwuk_Banggai.webp')] h-[630px] bg-cover bg-no-repeat bg-center">
          <div className=" bg-black bg-opacity-50 w-full h-full">
            <div className="bg-white p-4 m-10 rounded-lg">
              <h1 className="text-2xl font-bold">Konfirmasi Pesanan</h1>
              <div className="overflow-y-auto max-h-[calc(100vh-16rem)] border mt-2 rounded-lg p-20 pt-10 " id='surat' onScroll={handleScroll}>
                <h1 className="text-lg font-bold underline text-center mb-4 ">
                  {" "}
                  Surat Kuasa Pengambilan Paspor
                </h1>
                <br />
                <div>
                  <p className="ml-4 mb-4">
                    Yang bertanda tangan dibawah ini, menerangkan bahwa:
                  </p>
                  <ol className="list-decimal font-bold ml-12">
                    <li>(Pemohon Paspor R.I)</li>
                  </ol>
                  <ul className="ml-12 mb-6">
                    <li className="flex">
                      <span className="w-48">Nama</span>
                      <span>: {formData.name}</span>
                    </li>
                    <li className="flex">
                      <span className="w-48">Nomor Telephone</span>
                      <span>: {formData.whatsapp}  </span>
                    </li>
                    <li className="flex">
                      <span className="w-48">Nomor Pemohon Paspor</span>
                      <span>: {formData.passportNumber} </span>
                    </li>
                    <li className="mt-2">
                      Selanjutnya disebut sebagai{" "}
                      <span className="font-bold">PIHAK PERTAMA</span>
                    </li>
                  </ul>

                  <ol start={2} className="list-decimal font-bold ml-12">
                    <li>PT. Terus Melayani Bangsa</li>
                  </ol>
                  <ul className="ml-12 mb-6">
                    <li className="flex">
                      <span className="w-48">Nama</span>
                      <span>: PT. Terus Melayani Bangsa </span>
                    </li>
                    <li className="flex">
                      <span className="w-48">Nomor Telephone</span>
                      <span>: 0812-3456-7890 </span>
                    </li>

                    <li className="mt-2">
                      Selanjutnya disebut sebagai{" "}
                      <span className="font-bold">PIHAK KEDUA</span>
                    </li>
                  </ul>

                  <p className="ml-4 mb-4">Dengan ini menyatakan bahwa :</p>
                  <ol className="list-decimal ml-14 mb-6 space-y-2">
                    <li>
                      Menyetujui dan menguasakan pengambilan paspor R.I atas
                      nama PIHAK PERTAMA oleh PIHAK KEDUA menggunakan aplikasi
                      KirimPasporID.
                    </li>
                    <li>
                      Imigrasi tidak bertanggung jawab bila terjadi kerusakan
                      atau kehilangan pada saat proses pengantaran paspor.
                    </li>
                    <li>
                      Segala akibat dan hal-hal yang di akibatkan oleh
                      pelimpahan wewenang ini menjadi tanggung jawab saya
                      sepenuhnya sebagai pemberi kuasa.
                    </li>
                    <li>
                      Demikian surat kuasa ini saya perbuat dengan
                      sebenar-benarnya, dalam keadaan sehat jasmani dan rohani,
                      serta tanpa adanya unsur paksa dari siapapun, untuk bisa
                      dipergunakan sebagaimana mestinya.
                    </li>
                    <li>
                      Segala bentuk kerusakan maupun kehilangan pada paspor R.I
                      PIHAK PERTAMA dalam proses pengantaran, merupakan tanggung
                      jawab dari PIHAK KEDUA sepenuhnya.
                    </li>
                  </ol>
                  <p className="ml-4 mb-8">
                    Demikian Surat Pernyataan ini saya buat tanpa paksaan maupun
                    tekanan dari pihak manapun.
                  </p>

                  <div className="flex justify-between mx-16">
                    <div>
                      <p className="">PT Terus Melayani Bangsa</p>
                      <img src="./public/ttd.png" alt="" className="w-32"/>
                      <p>Saiful Bacthtiar</p>
                      <p>Direktur</p>
                    </div>
                    <div>
                      <p className="">Jakarta,
                      {new Date().toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}</p>
                      <img src="./public/emat.jpeg" alt="" className="w-32" />
                      <p>{formData.name}</p>
                      <p>Pemohon</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button
                  variant="contained"
                  onClick={() => navigate("/payment")}
                  disabled={!isScrolled}
                  className="item-right"
                >
                  Setuju
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Confirmation;
