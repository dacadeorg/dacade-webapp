import firebase from '@/plugins/firebase'

export default ({ app, store }, inject) => {
  inject('apiClient', (functionName, data = {}) => {
    const token = store.getters['user/token']
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
