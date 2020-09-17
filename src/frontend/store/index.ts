import { Store } from 'redux'
import createStore, { ReduxState } from './store'
import { initializeResources } from './actions/initialize-resources'
import { initializeBranding } from './actions/initialize-branding'
import { initializeDashboard } from './actions/initialize-dashboard'
import { initializeAssets } from './actions/initialize-assets'
import { initializePaths } from './actions/initialize-paths'
import { initializePages } from './actions/initialize-pages'
import { setCurrentAdmin } from './actions/set-current-admin'
import { initializeVersions } from './actions/initialize-versions'
import { initializeLocale } from './actions/initialize-locale'
import AdminBro from '../../admin-bro'
import { CurrentAdmin } from '../../current-admin.interface'
import pagesToStore from './pages-to-store'
import { getBranding, getAssets } from '../../backend/utils/options-parser'

const initializeStore = async (
  admin: AdminBro,
  currentAdmin?: CurrentAdmin,
): Promise<Store<ReduxState>> => {
  const store: Store<ReduxState> = createStore()
  const AdminClass: typeof AdminBro = admin.constructor as typeof AdminBro
  const adminVersion = AdminClass.VERSION

  store.dispatch(initializeLocale(admin.locale))

  store.dispatch(initializeResources(
    admin.resources.map((resource) => {
      try {
        return resource.decorate().toJSON(currentAdmin)
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('error', resource._decorated)
        throw e
      }
    }),
  ))

  const branding = await getBranding(admin, currentAdmin)
  const assets = await getAssets(admin, currentAdmin)

  store.dispatch(initializeBranding(branding || {}))
  store.dispatch(initializeAssets(assets || {}))

  const {
    loginPath, logoutPath, rootPath, dashboard, pages, assetsCDN,
  } = admin.options

  const pagesArray = pagesToStore(pages)

  store.dispatch(initializePages(pagesArray))
  store.dispatch(initializePaths({ loginPath, logoutPath, rootPath, assetsCDN }))
  store.dispatch(setCurrentAdmin(currentAdmin))
  store.dispatch(initializeDashboard(dashboard))
  store.dispatch(initializeVersions({
    app: admin.options.version && admin.options.version.app,
    admin: admin.options.version && admin.options.version.admin ? adminVersion : undefined,
  }))
  return store
}


export default initializeStore
