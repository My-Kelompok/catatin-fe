export interface Transaction {
  id: string;
  title: string;
  amount: string;
  transaction_date: string;
}

export interface TransactionRequest {
  title: string;
  amount: string;
  transaction_date: string;
}
