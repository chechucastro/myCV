import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

interface LinkedInProfile {
  id: string
  localizedFirstName: string
  localizedLastName: string
  [key: string]: any
}

interface LinkedInEmail {
  elements: Array<{
    'handle~': {
      emailAddress: string
    }
  }>
}

export function useLinkedIn() {
  const profile = ref<LinkedInProfile | null>(null)
  const email = ref<string | null>(null)
  const error = ref<string | null>(null)

  const clientId = import.meta.env.VITE_LINKEDIN_CLIENT_ID || ''
  const clientSecret = import.meta.env.VITE_LINKEDIN_CLIENT_SECRET || ''
  const redirectUri = import.meta.env.VITE_LINKEDIN_REDIRECT_URI || 'http://localhost:5173/'

  const route = useRoute()
  // const router = useRouter()

  /** Exchange code for access token */
  const getAccessToken = async (authCode: string): Promise<string | null> => {
    const params = new URLSearchParams()
    params.append('grant_type', 'authorization_code')
    params.append('code', authCode)
    params.append('redirect_uri', redirectUri)
    params.append('client_id', clientId)
    params.append('client_secret', clientSecret)

    try {
      const response = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      return response.data.access_token
    } catch (err: any) {
      error.value = err?.response?.data?.error_description || 'Failed to get access token'
      return null
    }
  }

  /** Fetch LinkedIn profile and email */
  const fetchProfile = async (accessToken: string) => {
    try {
      const profileRes = await axios.get<LinkedInProfile>('https://api.linkedin.com/v2/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      profile.value = profileRes.data

      const emailRes = await axios.get<LinkedInEmail>(
        'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))',
        { headers: { Authorization: `Bearer ${accessToken}` } },
      )
      email.value = emailRes.data.elements[0]['handle~'].emailAddress
    } catch (err: any) {
      error.value = err?.response?.data?.message || 'Failed to fetch LinkedIn profile'
    }
  }

  /** Auto-run on mounted */
  onMounted(async () => {
    const code = route.query.code as string
    if (!code) {
      error.value = 'No authorization code in URL'
      return
    }

    const token = await getAccessToken(code)
    if (token) await fetchProfile(token)

    // Remove code from URL
    // router.replace({ query: {} })
  })

  return {
    profile,
    email,
    error,
  }
}
