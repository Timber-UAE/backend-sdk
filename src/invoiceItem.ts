import { AxiosInstance, AxiosResponse } from 'axios';

export interface CreateInvoiceItemRequest {
  title: string;
  rate: number;
  discount: number;
  vat: number;
}

export type UpdateInvoiceItemRequest = Partial<CreateInvoiceItemRequest>;

export interface InvoiceItem {
  _id: string;
  company: string;
  title: string;
  rate: number;
  discount: number;
  vat: number;
  created_at: string;
  updated_at: string;
}

export interface InvoiceItemQueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  search?: string;
  filters?: string;
}

interface SuggestionParams {
  search: string;
}

/**
 * Service for Invoice Item
 *
 * @example
 * ```ts
 * const { createClient } = require('timber-sdk-dev');
 * const client = createClient('your-api-key');
 * const InvoiceItem = await client.InvoiceItem.list({});
 * console.log(InvoiceItem.data);
 * ```
 */

export class InvoiceItemService {
  private http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  /**
   * Fetch a paginated list of invoice templates.
   * @param params
   * @returns
   *
   * @example
   * ```ts
   * const invoiceItems = await client.InvoiceItem.list({page: 1, limit: 10});
   * console.log(invoiceItems.data);
   * ```
   */

  async list(params: InvoiceItemQueryParams): Promise<AxiosResponse<InvoiceItem>> {
    return await this.http.get<InvoiceItem>('/customer/invoice-item', { params });
  }

  /**
   * Invoice Item suggestions.
   *
   * @param params
   * @returns
   *
   * @example
   * ```ts
   * const invoiceItems = await client.InvoiceItem.suggestions({search: ''});
   * console.log(invoiceItems.data);
   * ```
   */

  async suggestions({ search }: SuggestionParams): Promise<AxiosResponse<InvoiceItem>> {
    return await this.http.get<InvoiceItem>('/customer/invoice-item/suggestions', {
      params: { search },
    });
  }

  /**
   * Create a new invoice template.
   *
   * @param data
   * @returns
   *
   * @example
   * ```ts
   * const newInvoiceItem = {
   * title: "Invoice Item",
   * rate: 100,
   * discount: 0,
   * vat: 0,
   * };
   * const response = await client.InvoiceItem.create(newInvoiceItem);
   * console.log(response.data);
   * ```
   */

  async create(data: CreateInvoiceItemRequest): Promise<AxiosResponse<InvoiceItem>> {
    return await this.http.post<InvoiceItem>('/customer/invoice-item', data);
  }

  /**
   * Update an existing invoice template.
   *
   * @param id
   * @param data
   * @returns
   *
   * @example
   * ```ts
   * const updates = { title: "Invoice Item" };
   * const updated = await client.InvoiceItem.update('invoice_template_id_here', updates);
   * console.log(updated.data);
   * ```
   */
  async update(id: string, data: CreateInvoiceItemRequest): Promise<AxiosResponse<InvoiceItem>> {
    return await this.http.patch<InvoiceItem>(`/customer/invoice-item/${id}`, data);
  }
}
