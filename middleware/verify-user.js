export default function ({ store, redirect }) {
  const user = store.getters.user
  if (!user) {
    return redirect('/login')
  }
}
