import Map from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

function App() {
  return (
    <div className="h-screen">
      <Map
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14,
        }}
        style={{ height: "100%" }}
        mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${import.meta.env.VITE_MAPTILER_API_KEY}`}
      />
    </div>
  );
}

export default App;
