export default function ({ store, redirect }) {
  // If the user is not authenticated or not an admin
  if (!store.state.user.data || !store.state.admin.data) {
    return redirect('/login')
  }
}
