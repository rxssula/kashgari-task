import { useExpenses } from "@/hooks/useExpenses";
import { Marker } from "react-map-gl/maplibre";

export default function ExpenseMarkers() {
  const { expenses } = useExpenses();

  return (
    <>
      {expenses.map((expense) => (
        <Marker
          key={`marker-${expense.location}`}
          longitude={expense.coordinates![0]}
          latitude={expense.coordinates![1]}
        />
      ))}
    </>
  );
}
