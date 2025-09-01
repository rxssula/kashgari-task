import type { Expense } from "@/types/zod/add-expense-form-schema";
import { Calendar } from "./ui/calendar";
import { useState, useMemo } from "react";
import type { DateRange } from "react-day-picker";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { useMap } from "react-map-gl/maplibre";
import { categoryColorMap } from "@/constants";

interface IListExpensesProps {
  expenses: Expense[];
}

export default function ListExpenses({ expenses }: IListExpensesProps) {
  const { myMap } = useMap();

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });

  const filteredExpenses = useMemo(() => {
    if (!date?.from || !date?.to) return expenses;

    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      const fromDate = new Date(date.from!.setHours(0, 0, 0, 0));
      const toDate = new Date(date.to!.setHours(23, 59, 59, 999));

      return expenseDate >= fromDate && expenseDate <= toDate;
    });
  }, [expenses, date]);

  return (
    <div className="flex flex-col">
      <Calendar
        className="self-center"
        mode="range"
        selected={date}
        onSelect={setDate}
        numberOfMonths={1}
        disabled={{ after: new Date() }}
      />
      <div className="mt-6 space-y-4 mb-4">
        {filteredExpenses.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                No expenses found for the selected date range
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredExpenses.map((expense) => (
            <Card
              key={expense.id || `${expense.date}-${expense.amount}`}
              className="w-full cursor-pointer"
              onClick={() => myMap?.flyTo({ center: expense.coordinates })}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">
                    ${expense.amount.toFixed(2)}
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className={categoryColorMap[expense.category]}
                  >
                    {expense.category}
                  </Badge>
                </div>
                <CardDescription className="text-sm text-muted-foreground">
                  {new Date(expense.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <span className="font-medium">Location:</span>
                    <span className="ml-2 text-muted-foreground truncate">
                      {expense.location}
                    </span>
                  </div>
                  {expense.description && (
                    <div className="flex items-start text-sm">
                      <span className="font-medium">Description:</span>
                      <span className="ml-2 text-muted-foreground">
                        {expense.description}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
