import "maplibre-gl/dist/maplibre-gl.css";
import { Map } from "react-map-gl/maplibre";
import AddExpenseForm from "./components/add-expense-form";

function App() {
  return (
    <div className="h-screen flex">
      <div className="flex flex-col gap-4 max-w-[700px] min-w-[350px] p-4">
        <div className="text-2xl text-center">Add Expense</div>
        <AddExpenseForm />
      </div>
      <Map
        id="myMap"
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14,
        }}
        style={{ height: "100%" }}
        mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${import.meta.env.VITE_MAPTILER_API_KEY}`}
      ></Map>
    </div>
  );
}

export default App;
