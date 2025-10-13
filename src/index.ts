import axios from 'axios';
import { AuthService } from './auth';
import { ExpenseService } from './expense';
import { RawExpenseService } from './rawExpense';
import { VendorPaymentService } from './vendorPayment';
import { ExpenseCategoryService } from './expenseCategory';
import { BillPaymentService } from './billPayment';
import { InvoiceService } from './invoice';
import { InvoicePaymentService } from './invoicePayment';
import { CustomerService } from './customer';
import { TaxRateService } from './taxRate';
import { SalaryService } from './salary';
import { EmployeeService } from './employee';
import { ChequeService } from './cheque';
import { BankStatementService } from './bankStatement';
import { CompanyService } from './company';
import { InvoiceNumberService } from './invoiceNumber';
import { InvoiceTemplateService } from './invoiceTemplates';
import { InvoiceItemService } from './invoiceItem';

class TimberClient {
  auth: AuthService;
  expense: ExpenseService;
  expenseCategory: ExpenseCategoryService;
  rawExpense: RawExpenseService;
  invoice: InvoiceService;
  invoicePayment: InvoicePaymentService;
  vendorPayment: VendorPaymentService;
  billPayment: BillPaymentService;
  customer: CustomerService;
  taxRate: TaxRateService;
  salary: SalaryService;
  employee: EmployeeService;
  cheque: ChequeService;
  bankStatement: BankStatementService;
  company: CompanyService;
  invoiceNumber: InvoiceNumberService;
  invoiceTemplate: InvoiceTemplateService;
  invoiceItem: InvoiceItemService;

  constructor(apiKey: string, options: { baseURL?: string; partnerAPIKey?: string } = {}) {
    const baseURL = `${options.baseURL || 'https://api.timber.me'}/api/v1/user/sdk`;

    // Create HTTP client for regular services (non-auth)
    const http = axios.create({
      baseURL: baseURL,
      headers: {
        Authorization: `ApiKey ${apiKey}`,
      },
    });
    delete http.defaults.headers.post['Content-Type'];

    // Create HTTP client for auth service only (with partner API key if provided)
    const authHttp = axios.create({
      baseURL: baseURL,
      headers: {
        Authorization: options?.partnerAPIKey
          ? `Bearer ${options.partnerAPIKey}`
          : `ApiKey ${apiKey}`,
      },
    });
    delete authHttp.defaults.headers.post['Content-Type'];

    this.auth = new AuthService(authHttp);
    this.expense = new ExpenseService(http);
    this.expenseCategory = new ExpenseCategoryService(http);
    this.rawExpense = new RawExpenseService(http);
    this.vendorPayment = new VendorPaymentService(http);
    this.billPayment = new BillPaymentService(http);
    this.invoice = new InvoiceService(http);
    this.invoicePayment = new InvoicePaymentService(http);
    this.customer = new CustomerService(http);
    this.taxRate = new TaxRateService(http);
    this.salary = new SalaryService(http);
    this.employee = new EmployeeService(http);
    this.cheque = new ChequeService(http);
    this.bankStatement = new BankStatementService(http);
    this.company = new CompanyService(http);
    this.invoiceNumber = new InvoiceNumberService(http);
    this.invoiceTemplate = new InvoiceTemplateService(http);
    this.invoiceItem = new InvoiceItemService(http);
  }
}

export const createClient = (apiKey: string, options = { partnerAPIKey: '', baseURL: '' }) => {
  if (!apiKey && !options.partnerAPIKey) {
    throw new Error('API key is required');
  }
  return new TimberClient(apiKey, options);
};

export type TimberClientType = InstanceType<typeof TimberClient>;
