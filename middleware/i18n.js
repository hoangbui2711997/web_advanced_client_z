export default function ({ isHMR, app, store, route, params, error, redirect }) {
  const defaultLocale =  'vi'; //app.i18n.fallbackLocale;
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) { return }
  // Get locale from params
  const locale = params.lang || defaultLocale;
  if (!store.state.locales.includes(locale)) {
    return error({ message: 'This page could not be found.', statusCode: 404 })
  }
  // Set locale
  store.commit('setLang', locale);
  app.i18n.locale = store.state.locale;
  // If route is /<defaultLocale>/... -> redirect to /...
  if (locale === defaultLocale && route.fullPath.indexOf('/' + defaultLocale) === 0) {
    const toReplace = '^/' + defaultLocale + (route.fullPath.indexOf('/' + defaultLocale + '/') === 0 ? '/' : '');
    const re = new RegExp(toReplace);
    console.log(`redirect`);
    return redirect(
      route.fullPath.replace(re, '/')
    )
  }
}
