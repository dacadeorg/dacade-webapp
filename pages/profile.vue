<template>
  <div>
    <Navigation />
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8 col-xl-6 mx-auto mt-4">
          <div v-if="user">
            <h2 class="h-dark">
              {{ user.displayName }}
            <span>
              <img src="/img/ITB-Cover.png" style="object-fit:cover; width:40px; height:40px; border-radius:250px;" alt="ITB">
              <img src="/img/WD1_cover.png" style="object-fit:cover; width:40px; height:40px; border-radius:250px; margin-left:-0.75em;" alt="ITB">
              <img src="/img/AE-DEV-101-Cover.png" style="object-fit:cover; width:40px; height:40px; border-radius:250px; margin-left:-0.75em;" alt="ITB">
              <img src="/img/ED1_cover.png" style="object-fit:cover; width:40px; height:40px; border-radius:250px;  margin-left:-0.75em;" alt="ITB">
            </span>
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
            <div>
              <h2 class="mb-4">Communities</h2>
              <div class="float-left mr-3">
                <img src="/img/ITB-Cover.png" style="object-fit:cover; width:100px; height:100px; border-radius:250px;" alt="ITB">
              </div>
              <div class="mb-4">
                <h3 class="learning-color">
                  Introduction to Blockchain
                </h3>
                <h5>Learning Points:
                  <span class="learning-color">
                    14/20
                  </span>
                </h5>
                <h5>Teaching Points:
                  <span class="teaching-color">
                    2
                  </span>
                </h5>
                <div class="btn btn-cash-out mt-2" style="margin-left:7em; color:#53D1AF; border:1.6px solid #53D1AF">
                  See certificate
                </div>
              </div>
              <div class="float-left mr-3">
                <img src="/img/AE-DEV-101-Cover.png" style="object-fit:cover; width:100px; height:100px; border-radius:250px;" alt="ITB">
              </div>
              <div class="mb-4">
                <h3 style="color:#f22f70">Aeternity Development 101</h3>
                <h5>Learning Points:
                  <span class="learning-color">
                    14/20
                  </span>
                </h5>
                <h5>Teaching Points:
                  <span class="teaching-color">
                    2
                  </span>
                </h5>
                <div class="btn btn-cash-out mt-2" style="margin-left:7em; color:#f22f70; border:1.6px solid #f22f70">
                  See certificate
                </div>
              </div>
              <div class="float-left mr-3">
                <img src="/img/WD1_cover.png" style="object-fit:cover; width:100px; height:100px; border-radius:250px;" alt="ITB">
              </div>
              <div class="mb-4">
                <h3 style="color:#2170f3">Web Development 101</h3>
                <h5>Learning Points:
                  <span class="learning-color">
                    14/20
                  </span>
                </h5>
                <h5>Teaching Points:
                  <span class="teaching-color">
                    2
                  </span>
                </h5>
                <div class="btn btn-cash-out mt-2" style="margin-left:7em; color:#2170f3; border:1.6px solid #2170f3">
                  See certificate
                </div>
              </div>
              <div class="float-left mr-3">
                <img src="/img/ED1_cover.png" style="object-fit:cover; width:100px; height:100px; border-radius:250px;" alt="ITB">
              </div>
              <div class="mb-4">
                <h3 style="color:#a1a1a1">Ethereum Development 101</h3>
                <h5>Learning Points:
                  <span class="learning-color">
                    14/20
                  </span>
                </h5>
                <h5>Teaching Points:
                  <span class="teaching-color">
                    2
                  </span>
                </h5>
                <div class="btn btn-cash-out mt-2" style="margin-left:7em; color:#a1a1a1; border:1.6px solid #a1a1a1">
                  See certificate
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
