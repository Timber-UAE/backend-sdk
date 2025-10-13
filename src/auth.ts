import { AxiosInstance, AxiosResponse } from 'axios';

export interface RegisterUserRequest {
  name: string;
  email: string;
  partner: string;
  plan: string;
  domains: string[];
  company: {
    name: string;
    email: string;
    language: 'English' | 'Arabic';
    currency: string;
    tax_number: string;
    address: string;
    city: string;
    state: string;
    zip_code?: string;
    country: string;
    financial_start_date: string;
    license_expiry: string;
    license_issue_date: string;
    sector: string[];
    user_role: string;
    business_years: string;
    size: string;
    current_method: string;
    purpose: string;
    country_code: string;
    mobile: string;
    logo?: string;
    license: string;
    license_number: string;
    license_authority: string;
    trn: string;
  };
}

/** Service for registering users
 *
 * @example
 * ```ts
 * const { createClient } = require('timber-sdk-dev');
 * const client = createClient('your-api-key');
 * const response = await client.auth.create()
 * console.log(response.data);
 */

export class AuthService {
  private http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  /**
   * Register a new user.
   *
   * @param data - User registration payload
   * @returns The created user and api_key for sdk
   *
   * @example
   * ```ts
   * const registerUserRequest: RegisterUserRequest = {
   *   name: "John Doe",
   *   email: "john@example.com",
   *   partner: "partner-id",
   *   plan: "plan-id",
   *   domains: ["https://example.com" ,"https://example.com"],
   *   company: {
   *     name: "John Enterprises",
   *     email: "john@example.com",
   *     language: "English",
   *     currency: "AED",
   *     tax_number: "123456789",
   *     address: "123 Main St",
   *     city: "Dubai",
   *     state: "Dubai",
   *     country: "USA",
   *     financial_start_date: "2025-04-01T00:00:00.000+00:00",
   *     license_expiry: "2025-04-01T00:00:00.000+00:00",
   *     license_issue_date: "2025-04-13T00:00:00.000+00:00",
   *     sector: ["product", "service"],
   *     user_role: "CEO",
   *     business_years: "1-2",
   *     size: "1-10",
   *     current_method: "Accountant",
   *     purpose: "Financial Services",
   *     country_code: "+971",
   *     mobile: "5522334455",
   *     logo: "https://example.com/logo.png",
   *     license: "https://example.com/license.png",
   *     license_number: "123456789",
   *     license_authority: "IFZA (Dubai)",
   *     trn: "222333222332323",
   *   },
   * };
   * const { createClient } = require('timber-sdk-dev');
   * const client = createClient('your-api-key');
   * const response = await client.auth.create(registerUserRequest)
   * console.log(response.data);
   * ```
   */

  async create(data: RegisterUserRequest): Promise<AxiosResponse<any>> {
    return await this.http.post<any>('/auth/register', data);
  }
}
