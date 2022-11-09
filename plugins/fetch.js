import Package from '../package.json'

export default function ({ $axios, store, app }, inject) {
  const getHeaders = async (config) => {
    // Adding firebase token
    const token = await store.dispatch('user/getToken')
    const headers = {
      'app-name': Package.name,
      'app-domain': window.location.hostname,
      'Accept-Language': app.i18n.locale,
      Authorization: token,
      ...(config?.headers || {}),
    }
    return new Headers(headers)
  }

  //

  const request = async (url, config = {}) => {
    const headers = await getHeaders(config)
    return fetch(`${process.env.NUXT_ENV_API_BASE_URL}/${url}`, {
      ...(config || {}),
      headers,
    })
  }

  // Inject to context as $api
  inject('fetch', request)
}
