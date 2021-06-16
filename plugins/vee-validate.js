/* eslint-disable camelcase */
import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required, email, min } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'This field is required',
})

extend('email', {
  ...email,
  message: 'This must be a valid email address',
})

extend('min', {
  ...min,
  message: 'The {_field_} is too short',
})

extend('length', {
  validate(value, { length }) {
    return value.length > length
  },
  params: ['length'],
  message: 'This field must be at least {length} characters.',
})

extend('url', {
  validate(value) {
    if (value) {
      return /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9-]+([-.]{1}[a-z0-9-]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(
        value
      )
    }

    return false
  },
  message: 'This value must be a valid URL',
})

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
