import { BarChart2, TrendingUp, PieChart } from "lucide-react";
import { useLocation } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMapEvents,
  useMap,
  Tooltip,
  Popup,
} from "react-leaflet";
import { Step, StepLabel, Stepper } from "@mui/material";

export default function DetailTransaction() {
  const location = useLocation();
  const { user } = location.state || {};

  const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mt-4">
        <button
          className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out"
          onClick={() => window.history.back()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h1 className="text-2xl font-semibold">Detail</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Data Order </h2>
            <BarChart2 className="h-5 w-5 text-gray-600" />
          </div>
          <div className="h-64 flex  bg-gray-50 rounded-lg">
            <ul className="space-y-3 p-6">
              <li className="flex">
                <span className="w-48">Nomor Paspor</span>
                <span>: {user.NoSurat} </span>
              </li>
              <li className="flex">
                <span className="w-48">Nama</span>
                <span>: {user.name}</span>
              </li>
              <li className="flex">
                <span className="w-48">Nomor Telephone</span>
                <span>: {user.NoWa} </span>
              </li>
              <li className="flex">
                <span className="w-48">Tanggal Pengambilan </span>
                <span>: Senin, 25 Desember 2025</span>
              </li>
              <li className="flex">
                <span className="w-48">Lokasi Pengajuan  </span>
                <span>: Kantor Imigrasi Kelas I Jakarta Selatan</span>
              </li>
              <li className="flex">
                <span className="w-48">Alamat Penerima</span>
                <span>
                  : Jalan Mas Ganden, RW 13, Cilandak Barat, Jakarta Selatan
                  12430
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Riwayat Pengiriman</h2>
            <TrendingUp className="h-5 w-5 text-gray-600" />
          </div>
          <div className="h-64 bg-gray-50 rounded-lg">
            <Stepper orientation="vertical" sx={{ width: "100%", }} className="p-4">
              <Step>
                <StepLabel>Menunggu Pembayaran</StepLabel>
              </Step>
              <Step>
                <StepLabel>Pembayaran Berhasil</StepLabel>
              </Step>
              <Step>
                <StepLabel>Pengiriman Berhasil</StepLabel>
              </Step>
            </Stepper>
            
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Lokasi Pengiriman</h2>
            <PieChart className="h-5 w-5 text-gray-600" />
          </div>
          <div className="h-64 overflow-hidden bg-gray-50 rounded-lg">
            <MapContainer
              center={[-6.175392, 106.827153]}
              zoom={15}
              style={{ height: "400px", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[-6.175392, 106.827153]} icon={DefaultIcon}>
                <Popup>
                Jalan Mas Ganden, RW 13, Cilandak Barat, Jakarta Selatan 12430
                </Popup>
                </Marker>
            </MapContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">Data Kurir</h2>
          <div className="space-y-4">
            {[
              { label: "Nama ", value: "Sonhaji Agus Miftah" },
              { label: "Nomer Hp", value: "089555664444" },
              { label: "Tanggal Bergabung", value: "22 Januari 2023" },
              { label: "Rating Kurir", value: <span className="text-yellow-500">★★★★☆</span> },
            ].map((metric) => (
              <div
                key={metric.label}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span className="text-sm text-gray-600">{metric.label}</span>
                <span className="font-semibold">{metric.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
