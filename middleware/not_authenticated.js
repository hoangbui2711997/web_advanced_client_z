export default function ({ store, redirect }) {
  // If the user is not authenticated
  // console.log(!!store.state.auth.auth, 'not_authenticated');
  if (!!store.state.auth.token) {
    console.log('not_authenticated middleware');
    redirect('/');
  }
}
