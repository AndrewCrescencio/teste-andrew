import { settings } from '@/settings'

class Api {
  private baseUrl: string
  private headers: HeadersInit

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl
    this.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${apiKey}`,
    }
  }

  async request(endpoint: string, method: string, body?: any): Promise<Response> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method,
        headers: this.headers,
        body: body ? JSON.stringify(body) : undefined,
      })

      if (!response.ok) {
        let errorMessage = `Failed to ${method} data: ${response.statusText}`
        try {
          const errorResponse = await response.json()
          if (errorResponse.message) {
            errorMessage = errorResponse.message
          }
        }
        catch (parseError) {
          console.error('Error parsing error response:', parseError)
        }
        throw new Error(errorMessage)
      }
      if (response.status === 204) {
        return response
      }
      return await response.json()
    }
    catch (error) {
      console.error(`Error during ${method} request:`, error)
      throw error
    }
  }

  async get(endpoint: string): Promise<any> {
    return this.request(endpoint, 'GET')
  }

  async post(endpoint: string, body: any): Promise<any> {
    return this.request(endpoint, 'POST', body)
  }

  async patch(endpoint: string, body: any): Promise<any> {
    return this.request(endpoint, 'PATCH', body)
  }

  async put(endpoint: string, body: any): Promise<any> {
    return this.request(endpoint, 'PUT', body)
  }

  async delete(endpoint: string) {
    return this.request(endpoint, 'DELETE')
  }
}

const apiInstance = new Api(settings.apiBaseUrl, settings.apiToken)
export default apiInstance
