export class RundeckClient {
  private url: string
  private apiVersion: string
  private token: string

  constructor (url: string, apiVersion: string, token: string) {
    this.url = url
    this.apiVersion = apiVersion
    this.token = token
  }

  async makeRequest (path: string) {
    return await fetch(`${this.url}/api/${this.apiVersion}${path}`, {
      method: 'GET',
      headers: {
        'X-Rundeck-Auth-Token': this.token,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
  }

  async getProjects (): Promise<any> {
    const response = await this.makeRequest('/projects')

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  }
  async getJobs (project: string): Promise<any> {
    const response = await this.makeRequest(`/project/${project}/jobs`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  }
  async getProjectConfiguration (project: string): Promise<any> {
    const response = await this.makeRequest(`/projects/${project}/config`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  }
  async getJobForecast (jobId: string): Promise<any> {
    const response = await this.makeRequest(`/job/${jobId}/forecast`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  }

  // Add more methods as needed
}

