/* eslint-disable camelcase */
import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required, email, min, max_value } from 'vee-validate/dist/rules'

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

extend('max_value', {
  ...max_value,
  message: 'The {_field_} is too high',
})

// Register it globally
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
