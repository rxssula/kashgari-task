import { EXPENSE_LIST_KEY } from "@/constants";
import type { Expense } from "@/types/zod/add-expense-form-schema";
import { useCallback, useEffect, useState } from "react";

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const loadExpenses = useCallback(() => {
    const storedExpenses = localStorage.getItem(EXPENSE_LIST_KEY);
    if (storedExpenses) {
      const parsedExpenses = JSON.parse(storedExpenses) as Expense[];
      setExpenses(parsedExpenses);
    } else {
      setExpenses([]);
    }
  }, []);

  const addExpense = useCallback((expense: Expense) => {
    setExpenses((prevExpenses) => {
      const updatedExpenses = [...prevExpenses, expense];
      localStorage.setItem(EXPENSE_LIST_KEY, JSON.stringify(updatedExpenses));
      return updatedExpenses;
    });
  }, []);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === EXPENSE_LIST_KEY) {
        loadExpenses();
      }
    };

    loadExpenses();
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [loadExpenses]);

  return {
    expenses,
    addExpense,
  };
};
