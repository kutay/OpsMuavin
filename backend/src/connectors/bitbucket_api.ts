import { encodeBase64 } from 'https://deno.land/std@0.208.0/encoding/base64.ts'

import * as config from '../config.ts'

const username = config.get('BITBUCKET_USERNAME')
const app_password = config.get('BITBUCKET_APP_PASSWORD')

const b64_authorization_header = encodeBase64(`${username}:${app_password}`)

async function makeRequest (url: string, method?: string, data?: object) {
  const base_url = 'https://api.bitbucket.org/2.0/'
  const result = await fetch(`${base_url}${url}`, {
    headers: {
      Accept: 'application/json',
      Authorization: 'Basic ' + b64_authorization_header
    }
  })

  if (result.status == 401) {
    console.log(app_password)
    throw new Error(`${result.status} - ${result.statusText}`)
  }

  return await result.json()
}

export async function listRepositories (workspace: string) {
  const result = await makeRequest(`repositories/${workspace}/?pagelen=100`)

  const json = await result.json()
  return json.values.map(repo => {
    return {
      name: repo.name,
      slug: repo.slug,
      created_on: repo.created_on
    }
  })
}

export async function listRepositoryEnvironments (
  workspace: string,
  repoSlug: string
) {
  return await makeRequest(
    `repositories/${workspace}/${repoSlug}/environments/`
  )
}
export async function listRepositoryEnvironmentVariables (
  workspace: string,
  repoSlug: string,
  environmentUuid: string
) {
  const result = await makeRequest(
    `repositories/${workspace}/${repoSlug}/deployments_config/environments/${environmentUuid}/variables`
  )
  return result.values
}
export async function listRepositoryVariables (
  workspace: string,
  repoSlug: string
) {
  const result = await makeRequest(
    `repositories/${workspace}/${repoSlug}/pipelines_config/variables/`
  )
  return result.values
}
