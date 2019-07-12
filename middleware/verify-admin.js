export default function ({ store, redirect }) {
  const user = store.getters.user
  if (!user || user.role !== 'admin') {
    return redirect('/')
  }
}
