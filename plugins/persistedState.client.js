import createPersistedState from 'vuex-persistedstate'
import Package from '../package.json'

export default ({ store }) => {
  createPersistedState({
    key: `${Package.name}-data`,
    paths: ['user', 'bounties', 'banners'],
  })(store)
}
