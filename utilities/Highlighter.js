import lowlight from 'lowlight/lib/core.js'
import visit from 'unist-util-visit'

export default function attacher({ include, exclude, prefix, languages } = {}) {
  // register custom languages
  lowlight.registerLanguage('solidity', require('highlightjs-solidity').definer)
  lowlight.registerLanguage('xml', require('highlight.js/lib/languages/xml'))
  lowlight.registerLanguage('css', require('highlight.js/lib/languages/css'))
  //   lowlight.registerLanguage('scss', require('highlight.js/lib/languages/scss'))
  lowlight.registerLanguage('bash', require('highlight.js/lib/languages/bash'))
  lowlight.registerLanguage('python', require('highlight.js/lib/languages/python'))
  lowlight.registerLanguage(
    'javascript',
    require('highlight.js/lib/languages/javascript')
  )
  lowlight.registerLanguage('json', require('highlight.js/lib/languages/json'))
  return (ast) => visit(ast, 'code', visitor)

  function visitor(node) {
    const { lang } = node
    let { data } = node

    if (
      !lang ||
      (include && !include.includes(lang)) ||
      (exclude && exclude.includes(lang))
    ) {
      return
    }

    if (!data) {
      data = {}
      node.data = data
    }

    if (!data.hProperties) {
      data.hProperties = {}
    }

    data.hChildren = lowlight.highlight(lang, node.value, { prefix }).value
    data.hProperties.className = [
      'hljs',
      ...(data.hProperties.className || []),
      'language-' + lang,
    ]
  }
}
