import Bugsnag from '@bugsnag/js'
import BugsnagPluginVue from '@bugsnag/plugin-vue'
import Vue from 'vue'
import PackageJson from '../package.json'

Bugsnag.start({
  apiKey: '77a1ecc00ef7ab8ac27ac7ebfb353afd',
  plugins: [new BugsnagPluginVue()],
  appVersion: `v${PackageJson.version}`,
  appType: 'client',
  enabledReleaseStages: ['staging', 'production'],
  releaseStage: process.env.NODE_ENV,
})

const bugsnagVue = Bugsnag.getPlugin('vue')
bugsnagVue.installVueErrorHandler(Vue)
