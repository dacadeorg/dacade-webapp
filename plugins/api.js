import firebase from '@/plugins/firebase'

export default ({ app, store }, inject) => {
  inject('apiClient', async (functionName, data = {}) => {
    const token = await store.dispatch('user/getToken')
    const cloudFunction = firebase.functions().httpsCallable(functionName)
    const payload = {
      ...data,
    }
    if (token) {
      payload.user_token = token
    }
    return cloudFunction(payload)
  })
}
