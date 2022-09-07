export default function ({ store, redirect }) {
  const authUser = store?.getters['auth/data']
  // If the user is not logged in, redirect to the login page
  if (!authUser) {
    return redirect('/login')
  }

  // If the user is verified, redirect to the home page
  if (authUser?.emailVerified) {
    return redirect('/')
  }
}
