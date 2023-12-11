export class DefectDojoClient {
  private url: string
  private apiKey: string

  constructor (url: string, apiKey: string) {
    this.url = url
    this.apiKey = apiKey
  }

  async makeRequest (path: string) {
    return await fetch(`${this.url}/api/v2/${path}`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${this.apiKey}`,
        Accept: 'application/json'
      }
    })
  }

  async getUsers (): Promise<any> {
    const response = await this.makeRequest('/users/')

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  }
  async getRoles (): Promise<any> {
    const response = await this.makeRequest('/roles/')

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  }
}

