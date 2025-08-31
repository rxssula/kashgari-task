import type { Expense } from "@/types/zod/add-expense-form-schema";
import { useState } from "react";
import { Marker, Popup } from "react-map-gl/maplibre";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { colorsBasedOnCategory } from "@/constants";

interface IExpenseMarkersWithPopupInfoProps {
  expenses: Expense[];
}

export default function ExpenseMarkersWithPopupInfo({
  expenses,
}: IExpenseMarkersWithPopupInfoProps) {
  const [popupInfo, setPopupInfo] = useState<Expense | null>(null);
  return (
    <>
      {expenses.map((expense) => (
        <Marker
          color={colorsBasedOnCategory[expense.category]}
          key={`marker-${expense.id}`}
          longitude={expense.coordinates![0]}
          latitude={expense.coordinates![1]}
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setPopupInfo(expense);
          }}
        />
      ))}

      {popupInfo && (
        <Popup
          anchor="top"
          longitude={popupInfo.coordinates![0]}
          latitude={popupInfo.coordinates![1]}
          onClose={() => setPopupInfo(null)}
          maxWidth="320px"
          closeButton={false}
        >
          <Card className="w-full min-w-sm">
            <CardHeader>
              <CardTitle className={`text-xl`}>${popupInfo.amount}</CardTitle>
              {popupInfo.description && (
                <CardDescription>{popupInfo.description}</CardDescription>
              )}
            </CardHeader>
            <CardContent>${popupInfo.amount}</CardContent>
          </Card>
        </Popup>
      )}
    </>
  );
}
