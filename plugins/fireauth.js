export default (context) => {
  const { store } = context
  return store.dispatch('user/fetch')
}
