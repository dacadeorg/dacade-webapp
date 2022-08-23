import Slugger from 'github-slugger'

export default class CommunityNavigation {
  constructor(router) {
    this.$router = router
  }

  _params() {
    return this.$router.history.current.params
  }

  _cleanupUrl(url) {
    return url.replace(/\/$/, '')
  }

  coursePath(
    link = '',
    courseSlug = this._params().course_slug,
    communitySlug = this._params().slug
  ) {
    return this._cleanupUrl(
      `/communities/${communitySlug}/courses/${courseSlug}/${link}`
    )
  }

  learningModulePath(
    path,
    courseSlug = this._params().course_slug,
    communitySlug = this._params().slug
  ) {
    return this._cleanupUrl(
      this.coursePath(`learning-modules/${path}`, courseSlug, communitySlug)
    )
  }

  challengePath(
    path,
    courseSlug = this._params().course_slug,
    communitySlug = this._params().slug
  ) {
    return this._cleanupUrl(
      this.coursePath(`challenges/${path}`, courseSlug, communitySlug)
    )
  }

  submissionPath(
    path,
    challengeId = this._params().challenge_id,
    courseSlug = this._params().course_slug,
    communitySlug = this._params().slug
  ) {
    return this._cleanupUrl(
      this.challengePath(
        `${challengeId}/submissions/${path}`,
        courseSlug,
        communitySlug
      )
    )
  }

  submissionsPath(
    challengeId = this._params().challenge_id,
    courseSlug = this._params().course_slug,
    communitySlug = this._params().slug
  ) {
    return this._cleanupUrl(
      this.challengePath(
        `${challengeId}/submissions`,
        courseSlug,
        communitySlug
      )
    )
  }

  learningModuleLinks(course, communitySlug = this._params().slug) {
    if (!course?.learningModules) return []

    const slugger = new Slugger()
    return course.learningModules?.map((learningModule, i) => ({
      id: learningModule.id,
      label: learningModule.title,
      link: this.learningModulePath(
        learningModule.id,
        course.slug,
        communitySlug
      ),
      exact: false,
      subitems: learningModule.materials
        ? learningModule.materials.map((material) => {
            slugger.reset()
            return {
              label: material.title,
              link: slugger.slug(material.title),
              exact: false,
            }
          })
        : [],
    }))
  }

  bountyLinks(course, communitySlug = this._params().slug) {
    if (!course?.challenge) return []

    return [
      {
        id: 'challenge',
        label: 'communities.navigation.challenge.overview',
        link: this.challengePath(
          course.challenge.id,
          course.slug,
          communitySlug
        ),
        exact: true,
      },
      {
        id: 'submissions',
        label: 'communities.navigation.submissions',
        link: this.submissionPath(
          '',
          course.challenge.id,
          course.slug,
          communitySlug
        ),
        exact: false,
      },
    ]
  }

  init({ course, community }) {
    const challenges = this.bountyLinks(course, community?.slug)
    const learningModules = this.learningModuleLinks(course, community?.slug)
    const list = [
      {
        id: 'introduction',
        title: 'Introduction',
        hideTitle: true,
        items: [
          {
            label: 'communities.navigation.overview',
            exact: true,
            link: this.coursePath('', course?.slug, community?.slug),
          },
        ],
      },
    ]

    if (learningModules.length) {
      list.push({
        id: 'learning-modules',
        title: 'communities.navigation.learning-modules',
        items: learningModules,
      })
    }

    if (challenges.length) {
      list.push({
        id: 'bounties',
        title: 'communities.navigation.challenge',
        items: challenges,
      })
    }
    return list
  }
}
