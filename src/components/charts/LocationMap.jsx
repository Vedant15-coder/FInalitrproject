import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useTheme } from '../../contexts/ThemeContext';
import L from 'leaflet';

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LocationMap = () => {
  const { isDark } = useTheme();

  const darkstores = [
    {
      id: 1,
      name: 'Virar Central',
      position: [19.4559, 72.7933],
      capacity: '85%',
      staff: 12,
      performance: 94,
      status: 'active'
    },
    {
      id: 2,
      name: 'Andheri East',
      position: [19.1136, 72.8697],
      capacity: '72%',
      staff: 15,
      performance: 89,
      status: 'active'
    },
    {
      id: 3,
      name: 'Bandra West',
      position: [19.0596, 72.8295],
      capacity: '91%',
      staff: 18,
      performance: 96,
      status: 'active'
    },
    {
      id: 4,
      name: 'Thane',
      position: [19.2183, 72.9781],
      capacity: '67%',
      staff: 14,
      performance: 87,
      status: 'active'
    },
    {
      id: 5,
      name: 'Navi Mumbai',
      position: [19.0330, 73.0297],
      capacity: '78%',
      staff: 16,
      performance: 91,
      status: 'active'
    },
    {
      id: 6,
      name: 'Powai',
      position: [19.1176, 72.9060],
      capacity: '83%',
      staff: 13,
      performance: 93,
      status: 'active'
    },
    {
      id: 7,
      name: 'Malad',
      position: [19.1864, 72.8493],
      capacity: '76%',
      staff: 11,
      performance: 88,
      status: 'active'
    },
    {
      id: 8,
      name: 'Goregaon',
      position: [19.1663, 72.8526],
      capacity: '89%',
      staff: 17,
      performance: 95,
      status: 'active'
    }
  ];

  const getMarkerColor = (performance) => {
    if (performance >= 90) return '#22c55e'; // Green
    if (performance >= 80) return '#f59e0b'; // Yellow
    return '#ef4444'; // Red
  };

  const createCustomIcon = (performance) => {
    const color = getMarkerColor(performance);
    return L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          background-color: ${color};
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: bold;
          color: white;
        ">
          ${Math.round(performance)}
        </div>
      `,
      iconSize: [26, 26],
      iconAnchor: [13, 13],
    });
  };

  return (
    <div className="h-80 rounded-lg overflow-hidden">
      <MapContainer
        center={[19.1136, 72.8697]}
        zoom={11}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
      >
        <TileLayer
          url={isDark 
            ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          }
          attribution={isDark
            ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }
        />
        
        {darkstores.map((store) => (
          <Marker
            key={store.id}
            position={store.position}
            icon={createCustomIcon(store.performance)}
          >
            <Popup className="custom-popup">
              <div className="p-2 min-w-[200px]">
                <h3 className="font-semibold text-gray-900 mb-2">{store.name}</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Capacity:</span>
                    <span className="font-medium">{store.capacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Staff:</span>
                    <span className="font-medium">{store.staff}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Performance:</span>
                    <span className={`font-medium ${
                      store.performance >= 90 ? 'text-green-600' :
                      store.performance >= 80 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {store.performance}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium text-green-600 capitalize">{store.status}</span>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default LocationMap;