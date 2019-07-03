<template>
  <div>
    <div>
      {{ groups }}
      <b-table striped hover :items="groups" />
    </div>
    <b-form @submit.prevent="onSubmit">
      <b-form-group
        id="input-group-1"
        label="Your name:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="name"
          type="text"
          required
          placeholder="Enter name"
        />
      </b-form-group>
      <b-button type="submit" variant="primary">
        Submit
      </b-button>
    </b-form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      name: ''
    }
  },
  computed: {
    ...mapGetters({
      groups: 'admin/groups'
    })
  },
  created() {
    this.getGroups()
  },
  methods: {
    ...mapActions({
      getGroups: 'admin/getGroups'
    }),
    onSubmit() {
      this.$store.dispatch('admin/createGroup', { name: this.name })
    }
  }
}
</script>
