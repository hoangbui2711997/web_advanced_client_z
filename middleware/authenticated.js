export default function ({ store, redirect }) {
  // If the user is authenticated redirect to home page

  if (!store.state.auth.token) {
    redirect('/auth/login');
  }
}