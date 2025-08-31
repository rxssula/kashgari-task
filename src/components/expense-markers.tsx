import type { Expense } from "@/types/zod/add-expense-form-schema";
import { useState } from "react";
import { Marker, Popup } from "react-map-gl/maplibre";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
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
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">${popupInfo.amount}</CardTitle>
                <Badge variant="secondary" className="ml-2">
                  {popupInfo.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              {popupInfo.description && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Description
                  </p>
                  <p className="text-sm">{popupInfo.description}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-muted-foreground mb-1">Location</p>
                <p className="text-sm">{popupInfo.location}</p>
              </div>
            </CardContent>
          </Card>
        </Popup>
      )}
    </>
  );
}
