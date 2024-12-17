import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Settings, Package } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const navigation = [
  { name: 'Dashboard', icon: Home, path: '/' },
  { 
    name: 'Order', 
    icon: Package, 
    subItems: [
      { name: 'Antrian Order', path: '/antrianorder' },
      { name: 'Kirim Order', path: '/kirimorder' },
      { name: 'Ambil Order', path: '/ambilorder' },
      { name: 'Serah Terima Order', path: '/serahterimaorder' },
      { name: 'Pengiriman Order', path: '/pengirimanorder' },
      { name: 'Order Diterima', path: '/orderditerima' },
      { name: 'Order Dikembalikan', path: '/orderdikembalikan' }
    ]
  },
  // { name: 'Analytics', icon: BarChart2, path: '/analytics' },
  { 
    name: 'Users', 
    icon: Users, 
    path: '/users',
  },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

export default function Sidebar() {
  const location = useLocation();
  const [openSubItems, setOpenSubItems] = useState<Record<string, boolean>>({});
  const { user } = useAuth();

  return (
    <div className="h-screen w-64 bg-[#2B3A51] text-white fixed left-0 top-0">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-8">KirimPassport</h1>
        <nav className="space-y-2">
          {navigation.map((item) => {
            if (item.name === 'Users' && user?.role !== 'admin') {
              return null;
            }
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            const isOpen = openSubItems[item.name];

            return (
              <div key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#E5CC41] text-white'
                      : 'text-white hover:bg-gray-800'
                  }`}
                  onClick={() => {
                    if (item.subItems) {
                      setOpenSubItems((prev) => ({
                        ...prev,
                        [item.name]: !prev[item.name],
                      }));
                    }
                  }}
                >
                  <Icon className="h-5 w-5" />
                  <div className="flex-1 flex items-center justify-between">
                    <span>{item.name}</span>
                    {item.subItems && (
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className={`transform transition-transform ${isOpen ? 'rotate-90' : ''}`}
                      >
                        <path d="m9 18 6-6-6-6"/>
                      </svg>
                    )}
                  </div>
                </Link>
                {isOpen && item.subItems && (
                  <div className="ml-4 relative">
                    <div className="absolute left-2.5 top-0 h-full w-px bg-gray-700" />
                    {item.subItems.map((subItem) => {
                      const isSubActive = location.pathname === subItem.path;
                      return (
                        <Link
                          key={subItem.name}
                          to={subItem.path}
                          className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                            isSubActive
                              ? 'bg-[#E5CC41] text-white'
                              : 'text-gray-300 hover:bg-gray-800'
                          }`}
                        >
                          <div className="w-5 h-px bg-gray-700 ml-0.5" />
                          <span>{subItem.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}