import "maplibre-gl/dist/maplibre-gl.css";
import { Map } from "react-map-gl/maplibre";
import AddExpenseForm from "./components/add-expense-form";
import { useExpenses } from "./hooks/useExpenses";
import ExpenseMarkers from "./components/expense-markers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import ListExpenses from "./components/list-expenses";

function App() {
  const { expenses, addExpense } = useExpenses();

  return (
    <div className="h-screen flex">
      <div className="flex flex-col max-w-[400px] min-w-[300px] h-full">
        <Tabs defaultValue="add" className="flex flex-col h-full">
          <div className="flex-shrink-0 p-4 pb-0">
            <div className="flex justify-end">
              <TabsList>
                <TabsTrigger value="add">Add Expense</TabsTrigger>
                <TabsTrigger value="list">List Expenses</TabsTrigger>
              </TabsList>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <TabsContent
              className="flex flex-col gap-4 mt-0 h-full"
              value="add"
            >
              <AddExpenseForm addExpense={addExpense} />
            </TabsContent>
            <TabsContent
              className="flex flex-col gap-4 mt-0 h-full"
              value="list"
            >
              <ListExpenses expenses={expenses} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
      <div className="flex-1 relative">
        <Map
          id="myMap"
          initialViewState={{
            longitude: -122.4,
            latitude: 37.8,
            zoom: 14,
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle={`https://basemaps.cartocdn.com/gl/positron-gl-style/style.json`}
        >
          <ExpenseMarkers expenses={expenses} />
        </Map>
      </div>
    </div>
  );
}

export default App;
