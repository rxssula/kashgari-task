import type { Expense } from "@/types/zod/add-expense-form-schema";
import { Marker } from "react-map-gl/maplibre";

interface IExpenseMarkersProps {
  expenses: Expense[];
}

export default function ExpenseMarkers({ expenses }: IExpenseMarkersProps) {
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
