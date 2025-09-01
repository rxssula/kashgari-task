import "maplibre-gl/dist/maplibre-gl.css";
import { Map } from "react-map-gl/maplibre";
import AddExpenseForm from "./components/add-expense-form";
import { useExpenses } from "./hooks/useExpenses";
import ExpenseMarkers from "./components/expense-markers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import ListExpenses from "./components/list-expenses";
import { useState } from "react";
import { Button } from "./components/ui/button";

function App() {
  const { expenses, addExpense } = useExpenses();
  const [showMap, setShowMap] = useState(false);

  return (
    <div className="h-screen flex flex-col md:flex-row">
      <div
        className={`flex flex-col w-full md:max-w-[400px] md:min-w-[300px] h-full ${showMap ? "hidden md:flex" : "flex"}`}
      >
        <Tabs defaultValue="add" className="flex flex-col h-full">
          <div className="flex-shrink-0 p-4 pb-0">
            <div className="flex justify-between items-center">
              <Button
                onClick={() => setShowMap(!showMap)}
                className="md:hidden"
                size="sm"
              >
                {showMap ? "Show Menu" : "Show Map"}
              </Button>
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
              <AddExpenseForm
                addExpense={addExpense}
                onExpenseAdded={() => setShowMap(true)}
              />
            </TabsContent>
            <TabsContent
              className="flex flex-col gap-4 mt-0 h-full"
              value="list"
            >
              <ListExpenses
                expenses={expenses}
                onExpenseClicked={() => setShowMap(true)}
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>
      <div
        className={`flex-1 relative ${showMap ? "block" : "hidden md:block"}`}
      >
        {showMap && (
          <div className="absolute top-4 left-4 z-10 md:hidden">
            <Button onClick={() => setShowMap(false)} size="sm">
              Show Menu
            </Button>
          </div>
        )}
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
