<template>
  <div>
    <div>
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
export default {
  data() {
    return {
      name: ''
    }
  },
  computed: {
    groups() {
      return this.$store.getters['admin/groups']
    }
  },
  created() {
    const loadedGroups = this.$store.getters['admin/groups']
    if (loadedGroups.length === 0) {
      this.$store.dispatch('admin/getGroups')
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('admin/createGroup', { name: this.name })
    }
  }
}
</script>
