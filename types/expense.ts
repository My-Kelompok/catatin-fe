export interface Expense {
  id: string;
  title: string;
  amount: string;
  expense_date: string;
}

export interface ExpenseRequest {
  title: string;
  amount: string;
  expense_date: string;
}
