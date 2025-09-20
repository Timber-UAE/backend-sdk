# Timber SDK

Official Node.js SDK for integrating with the Timber accounting backend API.

Easily interact with Timber's core features like managing expenses, invoices, vendors, customers, payroll, and more using a unified SDK.

## Installation

```bash
npm install timber-node
```

## Getting Started

```typescript
import { createClient } from 'timber-node';

const client = createClient('your-api-key', {
  baseURL: 'https://api.timber.me', // optional
});

// Example: List expenses
const expenses = await client.expense.list({ page: 1, limit: 10 });
console.log(expenses.data);
```

## Authentication

Timber uses API Key-based authentication. Generate this API key from your Timber profile developer settings.

```typescript
const client = createClient('your-api-key');
```

You can also load your API key from environment variables using `dotenv`.

## SDK Structure

The SDK client exposes the following services:

```typescript
client.expense;
client.expenseCategory;
client.rawExpense;
client.invoice;
client.invoicePayment;
client.vendorPayment;
client.billPayment;
client.customer;
client.taxRate;
client.salary;
client.employee;
client.bankStatement;
client.cheque;
```

Each service provides common operations like `create`, `get`, `list`, `update`, and `delete` where applicable.

## Usage Examples

### Create an Expense

```typescript
const response = await client.expense.create({
  type: 'Travel',
  merchant: 'Uber',
  category: 'Transportation',
  date: '2025-06-23',
  payment_method: 'cash',
  amount: 45.75,
});
console.log(response.data);
```

### List Expenses

```typescript
const response = await client.expense.list({ page: 1, limit: 5 });
console.log(response.data);
```

### Update an Expense

```typescript
const updates = { amount: 50.0 };
const response = await client.expense.update('expense_id_here', updates);
console.log(response.data);
```

### Delete an Expense

```typescript
const response = await client.expense.delete('expense_id_here');
console.log(response.data.message);
```

## TypeScript Support

The SDK includes full TypeScript support:

```typescript
import type { Expense, CreateExpenseRequest } from 'timber-node';
```

## Error Handling

Errors are returned as Axios errors:

```typescript
import axios from 'axios';

try {
  await client.expense.get('invalid-id');
} catch (err) {
  if (axios.isAxiosError(err)) {
    console.error(err.response?.status, err.response?.data);
  }
}
```

## Related Links

- [Timber Website](https://timber.me)
