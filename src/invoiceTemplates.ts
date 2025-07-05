import { AxiosInstance, AxiosResponse } from 'axios';

export interface CreateInvoiceTemplateRequest {
  terms: [
    {
      name: string;
      content: string;
    },
  ];
  notes: [
    {
      name: string;
      content: string;
    },
  ];
  type?: 'terms' | 'notes';
}

export type UpdateInvoiceTemplateRequest = Partial<CreateInvoiceTemplateRequest>;

export interface InvoiceTemplate {
  _id: string;
  company: string;
  terms: [
    {
      name: string;
      content: string;
    },
  ];
  notes: [
    {
      name: string;
      content: string;
    },
  ];
  created_at: string;
  updated_at: string;
}

export interface InvoiceTemplateQueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  search?: string;
  filters?: string;
}

/**
 * Service for Invoice Template
 *
 * @example
 * ```ts
 * const { createClient } = require('timber-sdk-dev');
 * const client = createClient('your-api-key');
 * const InvoiceTemplate = await client.InvoiceTemplate.list({ page: 1, limit: 10 });
 * console.log(InvoiceTemplate.data);
 * ```
 */

export class InvoiceTemplateService {
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
   * const invoiceTemplates = await client.InvoiceTemplate.list();
   * console.log(invoiceTemplates.data);
   * ```
   */

  async list(params: InvoiceTemplateQueryParams): Promise<AxiosResponse<InvoiceTemplate>> {
    return await this.http.get<InvoiceTemplate>('/customer/invoice-template', {
      params,
    });
  }

  /**
   * Fetch a single invoice template by ID.
   *
   * @param id
   * @returns
   *
   * @example
   * ```ts
   * const invoiceTemplate = await client.InvoiceTemplate.get('invoice_template_id_here');
   * console.log(invoiceTemplate.data);
   * ```  */

  async get(id: string): Promise<AxiosResponse<InvoiceTemplate>> {
    return await this.http.get<InvoiceTemplate>(`/customer/invoice-template/${id}`);
  }

  /**
   * Create a new invoice template.
   *
   * @param data
   * @returns
   *
   * @example
   * ```ts
   * const newInvoiceTemplate = {
   * terms: [
   *   {
   *     name: "Terms",
   *     content: "Terms content"
   *   }
   * ],
   * notes: [
   *   {
   *     name: "Notes",
   *     content: "Notes content"
   *   }
   * ]
   * };
   * const response = await client.InvoiceTemplate.create(newInvoiceTemplate);
   * console.log(response.data);
   * ```
   */

  async create(data: CreateInvoiceTemplateRequest): Promise<AxiosResponse<InvoiceTemplate>> {
    return await this.http.post<InvoiceTemplate>('/customer/invoice-template', data);
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
   * const updates = { type: "notes", notes: [
   *   {
   *     name: "Notes",
   *     content: "Notes content"
   *   }
   * ]};
   * const updated = await client.InvoiceTemplate.update('invoice_template_id_here', updates);
   * console.log(updated.data);
   * ```
   */
  async update(
    id: string,
    data: CreateInvoiceTemplateRequest
  ): Promise<AxiosResponse<InvoiceTemplate>> {
    return await this.http.put<InvoiceTemplate>(`/customer/invoice-template/${id}`, data);
  }

  /**
   * Delete an invoice template by ID.
   *
   * @param id
   * @returns
   *
   * @example
   * ```ts
   * const response = await client.InvoiceTemplate.delete('expense_category_id_here');
   * console.log(response.data.message);
   * ```
   */

  async delete(id: string): Promise<AxiosResponse<{ message: string }>> {
    return await this.http.delete<{ message: string }>(`/customer/invoice-template/${id}`);
  }
}
