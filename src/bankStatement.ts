import { AxiosInstance, AxiosResponse } from 'axios';
import FormData from 'form-data';

export interface BankStatementData {
  file: File | string;
}

export interface BankStatement extends BankStatementData {
  _id: string;
  created_at?: string;
  updated_at?: string;
}

export interface BankStatementQueryParams {
  page?: number;
  limit?: number;
}

/**
 * Service for BankStatement
 *
 * @example
 * ```ts
 * const { createClient } = require('timber-sdk-dev');
 * const client = createClient('your-api-key');
 * const bankStatement = await client.bankStatement.list({ page: 1, limit: 10 });
 * console.log(bankStatement.data);
 * ```
 */

export class BankStatementService {
  private http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  /**
   * Fetch a paginated list of bank statements.
   *
   * @param params - Query options like page, limit, filters, sort.
   * @returns List of bank statements matching the query.
   *
   * @example
   * ```ts
   * const bankStatements = await client.bankStatement.list({ page: 1, limit: 5 });
   * console.log(bankStatements.data);
   * ```
   */

  async list(params: BankStatementQueryParams = {}): Promise<AxiosResponse<BankStatement[]>> {
    return await this.http.get<BankStatement[]>('/customer/reconcile/bank-statement', { params });
  }

  /**
   * Create a new bank statement.
   *
   * @param data - Bank statement creation payload
   * @returns The created bank statement
   *
   * @example
   * ```ts
   * const newBankStatement = {
   *   file: File,
   * };
   * const response = await client.bankStatement.create(newBankStatement);
   * console.log(response.data);
   * ```
   */
  async create(data: BankStatementData): Promise<AxiosResponse<BankStatement>> {
    const formData = new FormData();
    if (data?.file) {
      formData.append('file', data.file);
      formData.append('company', '6777a90c5cd5d327209fa239');
    } else {
      throw new Error('File is required');
    }
    return await this.http.post<BankStatement>('/customer/reconcile/bank-statement', formData, {
      headers: formData.getHeaders(),
    });
  }
}
