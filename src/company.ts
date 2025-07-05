import { AxiosInstance, AxiosResponse } from 'axios';
import FormData from 'form-data';

export interface CompanyData {
  name: string;
  currency: string;
  language: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  email: string;
  country_code: string;
  mobile: string;
  tax_number: string;
  financial_start_date: string;
  license_expiry: string;
  license_issue_date: string;
  sector: string[];
  user_role: string;
  business_years: string;
  size: string;
  current_method: string;
  purpose: string;
  license: File[];
  license_number: string;
  license_authority: string;
  trn: string;
}

export interface Company extends CompanyData {
  _id: string;
  created_at?: string;
  updated_at?: string;
}

export interface CompanyQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}

/**
 * Service for Company
 *
 * @example
 * ```ts
 * const { createClient } = require('timber-sdk-dev');
 * const client = createClient('your-api-key');
 * const company = await client.company.list({ page: 1, limit: 10 });
 * console.log(company.data);
 * ```
 */
export class CompanyService {
  private http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  /**
   * Fetch a paginated list of companies.
   *
   * @param params - Query options like page, limit, filters, sort.
   * @returns List of companies matching the query.
   *
   * @example
   * ```ts
   * const companies = await client.company.list({ page: 1, limit: 5 });
   * console.log(companies.data);
   * ```
   */

  // async list(params: CompanyQueryParams = {}): Promise<AxiosResponse<Company[]>> {
  //   return await this.http.get<Company[]>('/customer/company', { params });
  // }

  /**
   * Fetch an company by ID.
   *
   * @param id - The ID of the company to fetch.
   * @returns The company matching the ID.
   *
   * @example
   * ```ts
   * const company = await client.company.get('company_id_here');
   * console.log(company.data);
   * ```
   */

  async get(): Promise<AxiosResponse<Company>> {
    return await this.http.get<Company>(`/customer/company`);
  }

  /**
   * Create a new company.
   *
   * @param data - Company creation payload
   * @returns The created company
   *
   * @example
   * ```ts
   * const newCompany = {
   *   name: "company_name",
   *   currency: "USD",
   *   language: "en",
   *   address: "123 Main St",
   *   city: "New York",
   *   state: "NY",
   *   zip_code: "10001",
   *   country: "USA",
   *   tax_number: "123456789",
   *   financial_start_date: "2023-01-01",
   *   business_years: "1-2",
   *   license_expiry: "2023-01-01",
   *   license_issue_date: "2023-01-01",
   *   user_role: "CEO",
   *   size: "small",
   *   current_method: "accountant",
   *   purpose: "testing",
   *   email: "test@test.com",
   *   country_code: "US",
   *   mobile: "1234567890",
   *   license: [File],
   *   license_number: "123456789",
   *   license_authority: "NY",
   *   trn: "123456789",
   *   sector: ["product", "service"], // Optional
   * };
   * const response = await client.company.create(newCompany);
   * console.log(response.data);
   * ```
   */

  async create(data: CompanyData): Promise<AxiosResponse<Company>> {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('currency', data.currency);
    formData.append('language', data.language);
    formData.append('address', data.address);
    formData.append('city', data.city);
    formData.append('state', data.state);
    formData.append('zip_code', data.zip_code);
    formData.append('country', data.country);
    formData.append('tax_number', data.tax_number);
    formData.append('financial_start_date', data.financial_start_date);
    formData.append('business_years', data.business_years);
    formData.append('license_expiry', data.license_expiry);
    formData.append('license_issue_date', data.license_issue_date);
    formData.append('user_role', data.user_role);
    formData.append('size', data.size);
    formData.append('current_method', data.current_method);
    formData.append('purpose', data.purpose);
    formData.append('email', data.email);
    formData.append('country_code', data.country_code);
    formData.append('mobile', data.mobile);
    formData.append('license', data.license[0]);
    formData.append('license_number', data.license_number);
    formData.append('license_authority', data.license_authority);
    formData.append('trn', data.trn);
    data.sector.forEach((item, index) => {
      formData.append(`sector[${index}]`, item);
    });
    return await this.http.post<Company>('/customer/company', formData, {
      headers: formData.getHeaders(),
    });
  }

  /**
   * Update an existing company.
   *
   * @param id - Company ID
   * @param data - Partial update data
   * @returns Updated company
   *
   * @example
   * ```ts
   * const updates = { name: "new_company_name" };
   * const updated = await client.company.update('company_id_here', updates);
   * console.log(updated.data);
   * ```
   */

  async update(id: string, data: Partial<CompanyData>): Promise<AxiosResponse<Company>> {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('currency', data.currency);
    formData.append('language', data.language);
    formData.append('address', data.address);
    formData.append('city', data.city);
    formData.append('state', data.state);
    formData.append('zip_code', data.zip_code);
    formData.append('country', data.country);
    formData.append('tax_number', data.tax_number);
    formData.append('financial_start_date', data.financial_start_date);
    formData.append('business_years', data.business_years);
    formData.append('license_expiry', data.license_expiry);
    formData.append('license_issue_date', data.license_issue_date);
    formData.append('user_role', data.user_role);
    formData.append('size', data.size);
    formData.append('current_method', data.current_method);
    formData.append('purpose', data.purpose);
    formData.append('email', data.email);
    formData.append('country_code', data.country_code);
    formData.append('mobile', data.mobile);
    if (data?.license) {
      formData.append('license', data.license[0]);
    }
    formData.append('license_number', data.license_number);
    formData.append('license_authority', data.license_authority);
    formData.append('trn', data.trn);
    if (data?.sector) {
      data.sector.forEach((item, index) => {
        formData.append(`sector[${index}]`, item);
      });
    }
    return await this.http.put<Company>(`/customer/company/${id}`, data, {
      headers: formData.getHeaders(),
    });
  }

  /**Default company
   *
   * @param id - Company ID
   * @returns default company
   *
   * @example
   * ```ts
   * const defaultCompany = await client.company.default('company_id_here');
   * console.log(defaultCompany.data);
   * ```
   *   */

  async default(id: string): Promise<AxiosResponse<Company>> {
    return await this.http.patch<Company>(`/customer/company/${id}/default`);
  }
}
