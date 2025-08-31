import "maplibre-gl/dist/maplibre-gl.css";
import { Map } from "react-map-gl/maplibre";
import AddExpenseForm from "./components/add-expense-form";
import { useExpenses } from "./hooks/useExpenses";
import ExpenseMarkers from "./components/expense-markers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";

function App() {
  const { expenses, addExpense } = useExpenses();

  return (
    <div className="h-screen flex">
      <div className="flex flex-col gap-4 max-w-[700px] min-w-[350px] p-4">
        <Tabs defaultValue="add">
          <div className="flex justify-end">
            <TabsList>
              <TabsTrigger value="add">Add Expense</TabsTrigger>
              <TabsTrigger value="list">List Expenses</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent className="flex flex-col gap-4" value="add">
            <AddExpenseForm addExpense={addExpense} />
          </TabsContent>
        </Tabs>
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
      >
        <ExpenseMarkers expenses={expenses} />
      </Map>
    </div>
  );
}

export default App;
