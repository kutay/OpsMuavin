const BASE_URL = 'https://artifacthub.io/api/v1/'

async function makeRequest (path: string) {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  })
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return await response.json()
}

export async function getRepositories (
  organization: string,
  repository: string
) {
  const url = `repositories/search?offset=0&limit=20&kind=0&org=${organization}&name=${repository}`
  return await makeRequest(url)
}

export async function searchPackages (query: string) {
  const url = `packages/search?kind=0&ts_query_web=${query}&facets=false&sort=relevance&limit=10&offset=0`
  return await makeRequest(url)
}

export async function getPackages (kind: string, repository: string, packageName: string) {
  const url = `packages/${kind}/${repository}/${packageName}`;
  return await makeRequest(url)
}
