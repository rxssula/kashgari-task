import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Textarea } from "./ui/textarea";
import { GeocoderInput } from "./geocoder-input";
import { formSchema, type Expense } from "@/types/zod/add-expense-form-schema";
import { EXPENSE_LIST_KEY } from "@/constants";

export default function AddExpenseForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      category: "Other",
      amount: 0.0,
      date: new Date(),
      location: "",
      coordinates: undefined,
      description: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const prevExpensesItem = localStorage.getItem(EXPENSE_LIST_KEY);
    if (!prevExpensesItem) {
      const newExpense = JSON.stringify([values]);
      localStorage.setItem(EXPENSE_LIST_KEY, newExpense);
      form.reset();
      return;
    }

    const newExpenses = JSON.parse(prevExpensesItem) as Expense[];
    newExpenses.push(values);
    localStorage.setItem(EXPENSE_LIST_KEY, JSON.stringify(newExpenses));
    form.reset();
  };

  const handleLocationChange = (
    location: string,
    coordinates?: [number, number],
  ) => {
    form.setValue("location", location);
    if (coordinates) {
      form.setValue("coordinates", coordinates);
    }
  };

  const handleCoordinatesChange = (coordinates: [number, number] | null) => {
    if (coordinates) {
      form.setValue("coordinates", coordinates);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="Food" {...field} />
              </FormControl>
              <FormDescription>
                This is the category of the expense.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is the amount of the expense.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of an Expense</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date: Date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <GeocoderInput
                  value={field.value}
                  onChange={handleLocationChange}
                  onCoordinatesChange={handleCoordinatesChange}
                  placeholder="Search for a location or use current location"
                  className="w-full"
                />
              </FormControl>
              <FormDescription>
                Search for the location where the expense occurred. You can also
                use your current location.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Description of an expense"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
