import { AxiosInstance, AxiosResponse } from 'axios';
import { getFormData } from './utils/getFormData';

export type NewInvoiceItem = {
  id: string;
  title: string;
  quantity: number;
  rate: number;
  vat: number;
  discount: number;
  total: number;
};

export interface InvoiceData {
  mode: 'create' | 'edit';
  payment_method: string;
  title: string;
  company: string;
  isTitleChanged: boolean;
  customer: {
    customer_id?: string;
    name: string;
    email: string;
    trn?: string;
    country_code: string;
    mobile: string;
    address: string;
  };
  biller: {
    biller_id?: string;
    name: string;
    email: string;
    country_code: string;
    mobile: string;
    address: string;
    trn?: string;
  };
  invoice_number: string;
  invoice_date: any;
  due_date: any | null;
  currency: string;
  items: NewInvoiceItem[];
  terms: any;
  notes: any;
  sub_total: number;
  vat_total: number;
  discount_total: number;
  shipping: number;
  total: number;
  amount_paid: number;
  amount_due: number;
  logo: any | null | File;
  place_of_supply?: string;
  wafeq: boolean;
  zoho: boolean;
}

export interface Invoice extends InvoiceData {
  _id: string;
  invoice?: string;
  created_at?: string;
  updated_at?: string;
}

export interface InvoiceQueryParams {
  page?: number;
  limit?: number;
}

/**
 * Service for Invoice
 *
 * @example
 * ```ts
 * const { createClient } = require('timber-sdk-dev');
 * const client = createClient('your-api-key');
 * const invoice = await client.invoice.list({ page: 1, limit: 10 });
 * console.log(invoice.data);
 * ```
 */
export class InvoiceService {
  private http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  /**
   * Fetch a paginated list of invoices.
   *
   * @param params - Query options like page, limit, filters, sort.
   * @returns List of invoices matching the query.
   *
   * @example
   * ```ts
   * const invoices = await client.invoice.list({ page: 1, limit: 5 });
   * console.log(invoices.data);
   * ```
   */

  async list(params: InvoiceQueryParams = {}): Promise<AxiosResponse<Invoice[]>> {
    return await this.http.get<Invoice[]>('/customer/invoice', { params });
  }

  /**
   * Fetch an invoice by ID.
   *
   * @param id - The ID of the invoice to fetch.
   * @returns The invoice matching the ID.
   *
   * @example
   * ```ts
   * const invoice = await client.invoice.get('invoice_id_here');
   * console.log(invoice.data);
   * ```
   */

  async get(id: string): Promise<AxiosResponse<Invoice>> {
    return await this.http.get<Invoice>(`/customer/invoice/${id}`);
  }

  async create(data: InvoiceData): Promise<AxiosResponse<Invoice>> {
    const { formData, headers } = await getFormData();

    for (const key in data) {
      const value = (data as any)[key];

      if (key === 'items' || key === 'customer' || key === 'biller') {
        formData.append(key, JSON.stringify(value));
      } else if (key === 'logo' && value && typeof value.pipe === 'function') {
        // This is a ReadStream
        formData.append('logo', value);
      } else if (value instanceof Date) {
        formData.append(key, value.toISOString());
      } else if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    }

    return await this.http.post<Invoice>('/customer/invoice', formData, {
      headers,
    });
  }
  async update(id: string, data: Partial<InvoiceData>): Promise<AxiosResponse<Invoice>> {
    const { formData, headers } = await getFormData();

    for (const key in data) {
      const value = (data as any)[key];

      if (key === 'items' || key === 'customer' || key === 'biller') {
        formData.append(key, JSON.stringify(value));
      } else if (key === 'logo' && value && typeof value.pipe === 'function') {
        // This is a ReadStream
        formData.append('logo', value);
      } else if (value instanceof Date) {
        formData.append(key, value.toISOString());
      } else if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    }
    return await this.http.put<Invoice>(`/customer/invoice/${id}`, data, {
      headers,
    });
  }

  /**
   * Delete an invoice by ID.
   *
   * @param id - Invoice ID
   * @returns Confirmation message
   *
   * @example
   * ```ts
   * const response = await client.invoice.delete('invoice_id_here');
   * console.log(response.data.message);
   * ```
   */

  async delete(id: string, data: { remarks: string }): Promise<AxiosResponse<{ message: string }>> {
    return await this.http.delete<{ message: string }>(`/customer/invoice/${id}`, {
      data,
    });
  }

  /**
   * Download an invoice PDF by ID.
   *
   * @param id - The ID of the invoice to download.
   * @returns A Buffer (Node.js) or Blob (browser) containing the PDF.
   *
   * @example
   * ```ts
   * const pdfBuffer = await client.invoice.download('invoice_id');
   * fs.writeFileSync('invoice.pdf', pdfBuffer); // In Node.js
   * ```
   */
  async download(id: string): Promise<AxiosResponse<ArrayBuffer>> {
    return await this.http.get(`/customer/invoice/download/${id}`, {
      responseType: 'arraybuffer', // Important: tells Axios to treat the response as binary
    });
  }
}
