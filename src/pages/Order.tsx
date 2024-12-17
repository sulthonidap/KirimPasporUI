import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState, useEffect } from "react";
import {
  Button,
  Step,
  StepLabel,
  Stepper,
  TextField,
} from "@mui/material";
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
} from "react-leaflet";

const MapCenterHandler = ({ position }: { position: [number, number] }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(position);
  }, [map, position]);

  return null;
};

const Order = () => {
  const navigate = useNavigate();

  const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedOffice, setSelectedOffice] = useState("");
  const [address, setAddress] = useState<string>("");
  const [provinces, setProvinces] = useState([
    { value: "", label: <em>None</em> },
    { value: 10, label: "DK Jakarta" },
    { value: 20, label: "Jawa Barat" },
  ]);

  const offices = {
    10: [
      {
        value: "-6.288689,106.830302",
        label: "Kantor Imigrasi Kelas I Khusus Non TPI Jakarta Selatan",
      },
      {
        value: "2",
        label: "Kantor Imigrasi Kelas I Khusus Non TPI Jakarta Barat",
      },
      {
        value: "3",
        label: "Kantor Imigrasi Kelas I Khusus Non TPI Jakarta Pusat",
      },
      { value: "4", label: "Kantor Imigrasi Kelas I TPI Jakarta Timur" },
      { value: "5", label: "Kantor Imigrasi Kelas I TPI Jakarta Utara" },
    ],
    20: [
      { value: "6", label: "Kantor Imigrasi Kelas I TPI Bandung" },
      { value: "7", label: "Kantor Imigrasi Kelas I Non TPI Bogor" },
      { value: "8", label: "Kantor Imigrasi Kelas I TPI Cirebon" },
      { value: "9", label: "Kantor Imigrasi Kelas I Non TPI Depok" },
    ],
  };

  const [isLoading, setIsLoading] = useState(false);
  const [inputLocation, setInputLocation] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const getAddressFromCoordinates = async (lat: number, lng: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      if (data && data.display_name) {
        setAddress(data.display_name);
      } else {
        setAddress("Alamat tidak ditemukan");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddress("Gagal mengambil alamat");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragEnd = async (e: any) => {
    const { lat, lng } = e.target.getLatLng();
    setMarkerPosition([lat, lng]);
    setAddress("Loading..."); // Reset alamat saat drag dimulai
    await getAddressFromCoordinates(lat, lng); // Ambil alamat terbaru
  };

  const [markerPosition, setMarkerPosition] = useState<[number, number]>(null);

  const handleInputChange = (event: React.SyntheticEvent, value: string) => {
    setInputLocation(value);

    if (value) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const fetchSuggestions = async (value: string) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${value}`
      );
      const data = await response.json();
      const newSuggestions = data.map((item: any) => item.display_name);
      setSuggestions(newSuggestions);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const searchLocation = async () => {
    if (!inputLocation) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${inputLocation}&countrycodes=ID&limit=1`
      );
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const newPosition = [parseFloat(lat), parseFloat(lon)];
        setMarkerPosition(newPosition);
        setAddress(display_name);
        setShowPopup(true);
      } else {
        alert("Lokasi tidak ditemukan!");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      alert("Gagal mencari lokasi!");
    }
  };

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMarkerPosition([lat, lng]);
        setShowPopup(true);

        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        )
          .then((res) => res.json())
          .then((data) =>
            setAddress(data.display_name || "Alamat tidak ditemukan")
          )
          .catch(() => setAddress("Gagal mengambil alamat"));

        setTimeout(() => setShowPopup(false), 3000);
      },
    });
    return null;
  };

  const handleChangeProvince = (event: SelectChangeEvent) => {
    setSelectedProvince(event.target.value as string);
    setSelectedOffice("");
    setFormData(prev => ({ ...prev, province: event.target.value }));
  };

  const handleChangeOffice = (event: SelectChangeEvent) => {
    setSelectedOffice(event.target.value as string);
    setFormData(prev => ({ ...prev, office: event.target.value }));
  };

  const steps = [
    {
      label: "Data Pemesanan",
      description: "Pilih lokasi kantor imigrasi dan tanggal pengambilan paspor"
    },
    {
      label: "Data Pribadi",
      description: "Lengkapi data diri dan alamat pengiriman"
    }
  ];

  const [activeStep, setActiveStep] = useState(0);

  

  const [formData, setFormData] = useState({
    province: "",
    office: "",
    passportNumber: "",
    date: "",
    name: "",
    whatsapp: "",
    address: ""
  });

  const isFirstFormComplete = () => {
    return formData.province && formData.office && formData.passportNumber && formData.date;
  };

  const isSecondFormComplete = () => {
    return formData.name && formData.whatsapp && address;
  };

  useEffect(() => {
    if (activeStep === 0 && isFirstFormComplete()) {
      setActiveStep(1);
    } else if (activeStep === 1 && isSecondFormComplete()) {
      console.log("Form completed!", formData);
    }
  }, [formData, address]);

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
        <div className="flex bg-[url('/Luwuk_Banggai.webp')]  bg-center">
          <div className=" bg-black bg-opacity-50 w-full h-full">
            <div className="bg-white p-4 m-10 rounded-lg">
              <h1 className="text-2xl font-bold mb-14">Formulir Pemesanan</h1>
              
              {/* Container untuk Stepper dan Form */}
              <div className="flex gap-8">
                {/* Stepper di sebelah kiri */}
                <div className="w-1/4">
                  <Stepper 
                    activeStep={activeStep} 
                    orientation="vertical"
                    sx={{
                      '& .MuiStepLabel-root': {
                        padding: '12px 0',
                      },
                      '& .MuiStepContent-root': {
                        borderLeft: '1px solid #bdbdbd',
                        marginLeft: '12px',
                      },
                      '& .MuiStepConnector-line': {
                        minHeight: '200px',
                      },
                      '& .MuiStepConnector-root': {
                        marginLeft: '12px',
                      }
                    }}
                  >
                    {steps.map((step) => (
                      <Step key={step.label}>
                        <StepLabel>
                          <span className="text-base font-medium">{step.label}</span>
                          <p className="text-sm text-gray-500 m-1">{step.description}</p>
                        </StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </div>

                {/* Form Content di sebelah kanan */}
                <div className="flex-1 space-y-8 pr-4 ">
                  {/* Form Pertama - Data Pemesanan */}
                  <div className={`transition-opacity duration-300 ${activeStep >= 0 ? 'opacity-100' : 'opacity-50'}`}>
                    <h2 className="text-xl font-semibold mb-4">Data Pemesanan</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <FormControl variant="standard" sx={{ m: 1, minWidth: 120, width: "100%" }}>
                        <InputLabel>Pilih Provinsi</InputLabel>
                        <Select
                          value={selectedProvince}
                          onChange={handleChangeProvince}
                        >
                          {provinces.map((province) => (
                            <MenuItem key={province.value} value={province.value}>
                              {province.label}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>Pilih Provinsi</FormHelperText>
                      </FormControl>

                      <FormControl variant="standard" sx={{ m: 1, minWidth: 120, width: "100%" }}>
                        <InputLabel>Pilih Kantor Imigrasi</InputLabel>
                        <Select
                          value={selectedOffice}
                          onChange={handleChangeOffice}
                        >
                          <MenuItem value=""><em>None</em></MenuItem>
                          {offices[selectedProvince]?.map((office) => (
                            <MenuItem key={office.value} value={office.value}>
                              {office.label}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>Pilih Kantor Imigrasi</FormHelperText>
                      </FormControl>

                      <FormControl variant="standard" sx={{ m: 1, minWidth: 120, width: "100%" }}>
                        <TextField 
                          label="Nomor Pemohon Paspor" 
                          variant="outlined" 
                          type="number"
                          value={formData.passportNumber}
                          onChange={(e) => setFormData(prev => ({ ...prev, passportNumber: e.target.value }))}
                        />
                        <FormHelperText>Nomor yang ada diblanko anda</FormHelperText>
                      </FormControl>

                      <FormControl variant="standard" sx={{ m: 1, minWidth: 120, width: "100%" }}>
                        <TextField
                          id="date"
                          label="Pilih Tanggal"
                          type="date"
                          defaultValue={new Date().toISOString().split("T")[0]}
                          InputLabelProps={{ shrink: true }}
                          value={formData.date}
                          onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                        />
                        <FormHelperText>Pilih Tanggal Pengambilan Paspor Anda</FormHelperText>
                      </FormControl>
                    </div>
                  </div>

                  {/* Form Kedua - Data Pribadi */}
                  <div className={`transition-opacity duration-300 ${activeStep >= 1 ? 'opacity-100' : 'opacity-50'}`}>
                    <h2 className="text-xl font-semibold mb-4">Data Pribadi</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <FormControl variant="standard" sx={{ minWidth: 120, width: "100%" }}>
                        <TextField label="Nama Lengkap" variant="outlined" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} />
                      </FormControl>
                      
                      <FormControl variant="standard" sx={{  minWidth: 120, width: "100%" }}>
                        <TextField label="Nomor Whatsapp" variant="outlined" type="number" value={formData.whatsapp} onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))} />
                      </FormControl>
                    </div>
                    <br />

                    {/* Map Component - Full Width */}
                    <div className="mt-4">
                      <div style={{ marginBottom: "10px", display: "flex", alignItems: "flex-start", gap: 2 }}>
                        <div>
                          <TextField
                            label="Cari Alamat "
                            variant="outlined"
                            value={inputLocation}
                            onChange={(event) => {
                              setInputLocation(event.target.value);
                            }}
                            onKeyDown={(event) => {
                              if (event.key === "Enter") {
                                searchLocation();
                              }
                            }}
                            sx={{ width: '300px' }}
                          />
                          <FormHelperText>- Cari Alamat, dengan mencari Kabupaten dulu</FormHelperText>
                          <FormHelperText>- Geser Penanda,Zoom atau klik mapnya untuk presisi</FormHelperText>
                        </div>
                        <Button
                          variant="contained"
                          onClick={searchLocation}
                          sx={{ 
                            height: '56px',  // Sesuaikan dengan tinggi TextField
                            marginLeft: '10px',
                            marginTop: '0px' // Hapus margin top agar sejajar
                          }}
                        >
                          Cari
                        </Button>
                      </div>
                      <div>
                      {address && (
                          <div className="mt-2 p-3 bg-gray-100 rounded-md">
                            <p className="font-semibold">Alamat yang dipilih:</p>
                            <p className="text-gray-700">{address}</p>
                          </div>
                        )}
                      </div>

                      <div>
                        {markerPosition ? (
                          <MapContainer
                            center={markerPosition}
                            zoom={13}
                            style={{ height: "400px", width: "100%" }}
                          >
                            <TileLayer
                              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <MapCenterHandler position={markerPosition} />
                            <MapClickHandler />
                            <Marker
                              position={markerPosition}
                              icon={DefaultIcon}
                              draggable={true}
                              eventHandlers={{
                                dragend: handleDragEnd,
                              }}
                            >
                              <Tooltip permanent={true} direction="top" offset={[0, -20]}>
                                <div className="font-semibold">
                                  {isLoading ? (
                                    <span className="animate-pulse">Loading...</span>
                                  ) : (
                                    address || "Pilih lokasi"
                                  )}
                                </div>
                              </Tooltip>
                            </Marker>
                          </MapContainer>
                        ) : (
                          <div className="h-[400px] flex items-center justify-center bg-gray-100 rounded-md">
                            <p className="text-gray-500">Silakan cari Kabupaten terlebih dahulu</p>
                          </div>
                        )}

                        
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                  <Button
                      variant="contained"
                      onClick={() => navigate("/confirmation", { state: { formData } })}
                      className=""
                    >
                      Lanjut
                    </Button>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
