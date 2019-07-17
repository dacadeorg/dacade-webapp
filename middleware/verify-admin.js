/* eslint-disable no-console */
export default function ({ store, redirect }) {
  const user = store.getters.user
  console.log(user)
  if (!user || user.role !== 'admin') {
    // return redirect('/')
  }
}
