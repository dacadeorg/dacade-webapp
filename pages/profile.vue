<template>
  <div>
    <Navigation />
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8 col-xl-6 mx-auto">
          <div class="site-wraper">
            <div v-if="user">
              <h2 class="h-dark">
                {{ user.displayName }}
              </h2>
              <h4 class="muted-dark">
                {{ user.email }}
              </h4>
              <h4>
                Learning Points:
                <span class="learning-color">
                  {{ user.learningPoints }}
                </span>
              </h4>
              <h4>
                Teaching Points:
                <span class="teaching-color">
                  {{ user.teachingPoints }}
                </span>
              </h4>
              <h4>
                Balance:
                <span class="earning-color">
                  {{ user.balance }}$
                </span>
              </h4>
              <div class="btn-cash-out btn mt-2 mb-6">
                Cash out
              </div>
              <div class="muted-dark">
                <h5>
                  Verification:
                  <span>
                    None
                  </span>
                </h5>
                <h5>
                  AE walletaddress:
                  <span>
                    None
                  </span>
                </h5>
                <h5>
                  ETH walletaddress:
                  <span>
                    None
                  </span>
                </h5>
                <div class="btn-edit btn mt-2 mb-6">
                  Edit
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-console */
import Navigation from '@/components/Navigation'
import { mapGetters } from 'vuex'

export default {
  components: {
    Navigation
  },
  computed: {
    ...mapGetters({
      user: 'user'
    })
  },
  methods: {
  }
}
</script>

<style scoped>
.btn-cash-out {
  color: #ffcc00;
  text-shadow: none; /* Prevent inheritance from `body` */
  background-color: none;
  border: 1.6px solid #ffcc00;
  border-radius: .35rem;
  padding: 10px 40px;
  font-weight: 700;
}
.btn-cash-out:hover {
  color: black;
  cursor: pointer;
  background-color: #ffcc00;
}
.btn-edit {
  color: rgba(255,255,255,.3);
  text-shadow: none; /* Prevent inheritance from `body` */
  background-color: none;
  border: 1.6px solid rgba(255,255,255,.3);
  border-radius: .35rem;
  padding: 10px 40px;
  font-weight: 700;
}
.btn-edit:hover{
  color: black;
  cursor: pointer;
  background-color: rgba(255,255,255,.3);
}

.notification {
  border: 1px solid grey;
  border-radius: 0.35rem;
  padding: 1em;
}

.notification:hover {
  background: #343b42;
  text-decoration: none;
}

.unread {
  color: #53d1af;
  border-color:#53d1af;
}

.unread a{
  color: #53d1af;
}
</style>
