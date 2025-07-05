import { AxiosInstance, AxiosResponse } from 'axios';

export interface CreateInvoiceNumberRequest {
  enabled: boolean;
  next_number: number;
  sequence_length: number;
  prefix: string;
}

export type UpdateInvoiceNumberRequest = Partial<CreateInvoiceNumberRequest>;

export interface InvoiceNumber {
  _id: string;
  company: string;
  enabled: boolean;
  next_number: number;
  sequence_length: number;
  prefix: string;
  created_at: string;
  updated_at: string;
}

export interface InvoiceNumberQueryParams {
  search?: string;
}

export type NextNumberResponse = {
  enabled: boolean;
  next_invoice_number: number;
};

/**
 * Service for Invoice Number
 *
 * @example
 * ```ts
 * const { createClient } = require('timber-sdk-dev');
 *     const client = createClient('your-api-key');
 *     const invoiceNumber = await client.invoiceNumber.get();
 *     console.log(invoiceNumber.data);
 */

export class InvoiceNumberService {
  private http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  /**
   * Fetch a single invoice number.
   *
   * @returns Invoice number object
   *
   * @example
   * ```ts
   * const invoiceNumber = await client.invoiceNumber.get();
   * console.log(invoiceNumber.data);
   * ```
   */
  async get(): Promise<AxiosResponse<InvoiceNumber>> {
    return await this.http.get<InvoiceNumber>(`/customer/invoice-number`);
  }

  /**
   * Fetch next invoice number.
   *
   * @returns Invoice number object
   *
   * @example
   * ```ts
   * const invoiceNumber = await client.invoiceNumber.next();
   * console.log(invoiceNumber.data);
   * ```
   */
  async next(): Promise<AxiosResponse<NextNumberResponse>> {
    return await this.http.get<NextNumberResponse>(`/customer/invoice-number/next`);
  }

  /**
   * Update an existing invoice number.
   *
   * @param id
   * @param data
   * @returns
   *
   * @example
   * ```ts
   * const updates = { enabled: true };
   * const updated = await client.InvoiceNumber.update(updates);
   * console.log(updated.data);
   * ```
   */

  async update(data: CreateInvoiceNumberRequest): Promise<AxiosResponse<InvoiceNumber>> {
    return await this.http.patch<InvoiceNumber>(`/customer/invoice-number`, data);
  }
}
