import axios, { AxiosInstance, AxiosResponse } from 'axios';

export class Hunterio {
  private readonly apiKey: string;
  private readonly apiBase: string;
  private axios: AxiosInstance;
  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('API key is required');
    }
    this.apiBase = 'https://api.hunter.io/v2';
    this.apiKey = apiKey;
    this.axios = axios;
  }
  private async makeRequest(url: string, body: any = { params: {} }): Promise<AxiosResponse> {
    try {
      body.params.api_key = this.apiKey;
      return await this.axios.get(url, body);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async searchDomain(domainRequest: DomainSearchRequest | string): Promise<DomainSearchResponse> {
    if (!domainRequest) {
      throw new Error("Missing required parameter, domain");
    }
    if (typeof domainRequest === 'string') {
      domainRequest = {
        domain: domainRequest
      }
    }
    if (!domainRequest.domain && !domainRequest.company) {
      throw new Error('Missing required parameter, domain or company');
    }
    const results:AxiosResponse = await this.makeRequest(`${this.apiBase}/domain-search`, {
      params: domainRequest,
    });
    return results.data;
  }
  async findEmail(emailRequest: FindEmailRequest): Promise<FindEmailResponse> {
    const results:AxiosResponse = await this.makeRequest(`${this.apiBase}/email-finder`, {
      params: emailRequest,
    });
    return results.data;
  }
  async verifyEmail(emailRequest: VerifyEmailRequest): Promise<VerifyEmailResponse> {
    const results:AxiosResponse = await this.makeRequest(`${this.apiBase}/email-verifier`, {
      params: emailRequest,
    });
    return results.data;
  }
  async getEmailCount(emailCountRequest: EmailCountRequest): Promise<EmailCountResponse> {
    const results:AxiosResponse = await this.makeRequest(`${this.apiBase}/email-count`, {
      params: emailCountRequest,
    });
    return results.data;
  }
  async getAccountInformation(): Promise<AccountInformationResponse> {
    const results:AxiosResponse = await this.makeRequest(`${this.apiBase}/account`);
    return results.data;
  }
  async listLeadsLists(): Promise<ListLeadsListsResponse> {
    const results:AxiosResponse = await this.makeRequest(`${this.apiBase}/leads_lists`);
    return results.data;
  }
  async listLeads(): Promise<ListLeadResponse> {
    const results:AxiosResponse = await this.makeRequest(`${this.apiBase}/leads`);
    return results.data;
  }
}

export interface AccountInformationResponse {
  data: {
    first_name: string;
    last_name: string;
    email: string;
    plan_name: string;
    plan_level: number;
    reset_date: string;
    team_id: string;
    calls: {
      used: number;
      available: number;
    }
  };
}

export interface DomainSearchRequest {
  domain?: string;
  company?: string;
  limit?: number;
  offset?: number;
  type?: "personal" | "generic";
  seniority?: string; // junior, senior or executive
  department?: string; // executive, it, finance, management, sales, legal, support, hr, marketing or communication
}

export interface DomainSearchResponse {
  data: {
    domain: string;
    disposable: boolean;
    webmail: boolean;
    pattern: string;
    organization: string;
    emails: EmailResult[];
  };
  meta: {
    results: number;
    limit: number;
    offset: number;
    params: {
      domain: string;
      company: string;
      offset: number;
      seniority: string;
      department: string;
    }
  };
}

export interface EmailResult {
  value: string;
  type: string;
  confidence: number;
  sources: EmailResultSource[];
  first_name: string;
  last_name: string;
  position: string;
  seniority: string;
  department: string;
  linkedin: string;
  twitter: string;
  phone_number: string;
}

export interface EmailResultSource {
  domain: string;
  uri: string;
  extracted_on: string;
  last_seen_on: string;
  still_on_page: boolean;
}

export interface FindEmailRequest {
  domain: string;
  company: string;
  first_name: string;
  last_name: string;
  full_name: string;
}

export interface FindEmailResponse {
  data: EmailResult;
  meta: {
    params: {
      first_name: string;
      last_name: string;
      full_name: string;
      domain: string;
      company: string;
    };
  };
}

export interface VerifyEmailRequest {
  email: string;
}

export interface VerifyEmailResponse {
  data: {
    result: string;
    score: number;
    email: string;
    regexp: boolean;
    gibberish: boolean;
    disposable: boolean;
    webmail: boolean;
    mx_records: boolean;
    smtp_server: boolean;
    smtp_check: boolean;
    accept_all: boolean;
    block: boolean;
    sources: EmailResultSource[];
  };
  meta: {
    params: {
      email: string;
    };
  };
}

export interface EmailCountDomainRequest {
  domain: string;
  type?: 'personal' | 'generic';
}

export interface EmailCountCompanyRequest {
  company: string;
  type?: 'personal' | 'generic';
}

export type EmailCountRequest = EmailCountDomainRequest | EmailCountCompanyRequest;

export interface EmailCountResponse {
  data: {
    total: number;
    personal_emails: number;
    generic_emails: number;
    department: {
      executive: number;
      it: number;
      finance: number;
      management: number;
      sales: number;
      legal: number;
      support: number;
      hr: number;
      marketing: number;
      communication: number;
    }
    seniority: {
      junior: number;
      senior: number;
      executive: number;
    }
  };
  meta: {
    params: {
      domain: string;
      type: string;
    },
  };
}

export interface ListLeadsListsResponse {
  data: {
    leads_lists: LeadsList[],
  };
  meta: {
    total: number;
  };
}

export interface LeadsList {
  id: number;
  name: string;
  leads_count: number;
  team_id: number;
}

export interface ListLeadResponse {
  data: {
    leads: Lead[];
  };
  meta: {
    count: number;
    total: number;
    params: {
      limit: number;
      offset: number;
    }
  };
}

export interface Lead {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  position: string;
  company: string;
  company_industry: string;
  company_size: number;
  confidence_score: string;
  website: string;
  country_code: string;
  source: string;
  linkedin_url: string;
  phone_number: string;
  twitter: string;
  sync_status: string;
  notes: string;
  sending_status: string;
  last_activity_at: string;
  leads_list: LeadsList;
}
