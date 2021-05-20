import firebase from '@/plugins/firebase'

export default ({ app, store }, inject) => {
  inject('apiClient', async (functionName, data = {}) => {
    const token = await store.dispatch('user/getToken')
    const cloudFunction = firebase.functions().httpsCallable(functionName)
    return cloudFunction({
      ...data,
      user_token: token,
    })
  })
}
