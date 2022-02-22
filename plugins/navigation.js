import CommunityNavigation from '~/utilities/CommunityNavigation'

export default function ({ route, app, t }, inject) {
  const navigation = {
    community: new CommunityNavigation(app.router),
  }

  // Inject to context as $navigation
  inject('navigation', navigation)
}
