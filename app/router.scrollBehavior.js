export default function (to, from, savedPosition) {
  if (to.hash) {
    return window.scrollTo({
      top:
        (document.querySelector(to.hash)
          ? document.querySelector(to.hash).offsetTop
          : 0) + window.innerHeight,
      behavior: 'smooth',
    })
  }
  return window.scrollTo({ top: 0, behavior: 'smooth' })
}
