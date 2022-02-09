import Package from '../package.json'

export default function ({ $axios, store }, inject) {
  // Create a custom axios instance
  const api = $axios.create({
    headers: {
      common: {
        Accept: 'application/json',
      },
    },
  })

  api.onRequest(async (config) => {
    // Adding firebase token
    const token = await store.dispatch('user/getToken')
    await api.setToken(token)
    config.headers['app-name'] = Package.name
    config.headers['app-domain'] = window.location.hostname
    return config
  })

  api.onError((error) => {
    const { data } = error.response
    const output = {
      ...data,
      statusCode: error.response.status,
    }
    return Promise.reject(output)
  })

  //

  // Set baseURL to something different
  api.setBaseURL(process.env.NUXT_ENV_API_BASE_URL)

  // Inject to context as $api
  inject('api', api)
}
