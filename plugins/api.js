export default function ({ $axios, store }, inject) {
  // Create a custom axios instance
  const api = $axios.create({
    headers: {
      common: {
        Accept: 'application/json',
      },
    },
  })

  api.onRequest((config) => {
    // Adding firebase token
    const token = store.getters['user/token']
    config.headers = { Authorization: token }
  })

  api.onError((error) => {
    const { data } = error.response
    return Promise.reject(data)
  })

  //

  // Set baseURL to something different
  api.setBaseURL(process.env.NUXT_ENV_API_BASE_URL)

  // Inject to context as $api
  inject('api', api)
}
