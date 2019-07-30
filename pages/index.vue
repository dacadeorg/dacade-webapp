<template>
  <div class="site-wrapper">
    <div class="site-wrapper-inner">
      <Navigation />
      <div class="container">
        <main>
          <div>
            <b-alert show variant="warning" dismissible class="cookieAlert">
              We use browser cookies to give you the best possible experience. Learn more about our
              <a href="http://policy.dacade.org/" class="alert-link">Privacy Policy</a>.
            </b-alert>
          </div>

          <section>
            <div>
              <div class="img-wrapper">
                <b-img class="img-responsive cover-img" src="/img/dacade-cover.png" />
                <div class="img-overlay">
                  <b-button v-b-modal.modal-xl class="play-button">
                    <i class="fa fa-play-circle fa-5x play-button2" />
                  </b-button>
                  <b-modal id="modal-xl" size="xl" hide-footer class="bg-dark">
                    <div class="embed-responsive embed-responsive-16by9">
                      <iframe
                        class="embed-responsive-item"
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/fS69nu3riM0?rel=0"
                        frameborder="0"
                        allowfullscreen
                      />
                    </div>
                  </b-modal>
                </div>
              </div>
              <div class="text-cover mx-auto">
                <h1>
                  Peer-to-Peer <br>
                  Blockchain Learning
                </h1>
                <p class="lead">
                  Earn cryptocurrency by learning about blockchain,
                  building dApps and educating your peers.
                </p>
              </div>
            </div>

            <div class="learn-more-button">
              <nuxt-link class="btn btn-primary btn-lg" to="/community-selection">
                START
              </nuxt-link>
            </div>
          </section>

          <section>
            <div class="container pb-md-5">
              <div class="row">
                <div class="col-sm">
                  <div>
                    <h1>
                      2200+
                    </h1>
                    <p>User</p>
                  </div>
                </div>
                <div class="col-sm">
                  <div>
                    <h1>
                      600+
                    </h1>
                    <p>Submissions</p>
                  </div>
                </div>
                <div class="col-sm">
                  <div>
                    <h1>
                      1700+
                    </h1>
                    <p>Feedbacks</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div class="pb-md-5 text-cover mx-auto">
              <h2>
                Learning Communities
              </h2>
              <p class="lead">
                Earn cryptocurrency by learning about blockchain,
                building dApps and educating your peers.
              </p>
            </div>

            <b-card-group deck>
              <b-card bg-variant="dark" img-src="/img/ITB-Cover.png" img-alt="Image" img-top>
                <b-card-text>
                  <h4>Introduction to Blockchain</h4>
                </b-card-text>
                <nuxt-link
                  class="btn btn-outline-primary btn-lg btn-block"
                  to="/intro-to-blockchain/introduction"
                >
                  Learn more
                </nuxt-link>
              </b-card>

              <b-card bg-variant="dark" img-src="/img/AE-DEV-101-Cover.png" img-alt="Image" img-top>
                <b-card-text>
                  <h4>Aeternity Development 101</h4>
                </b-card-text>
                <nuxt-link
                  class="btn btn-outline-primary btn-lg btn-block"
                  to="/intro-to-blockchain/introduction"
                >
                  Learn more
                </nuxt-link>
              </b-card>
            </b-card-group>
            <br><br>
            <b-card-group deck>
              <b-card bg-variant="dark" img-src="/img/ED1_cover.png" img-alt="Image" img-top>
                <b-card-text>
                  <h4>Ethereum Development 101</h4>
                </b-card-text>
                <nuxt-link
                  class="btn btn-outline-primary btn-lg btn-block"
                  to="/intro-to-blockchain/introduction"
                >
                  Learn more
                </nuxt-link>
              </b-card>

              <b-card bg-variant="dark" img-src="/img/WD1_cover.png" img-alt="Image" img-top>
                <b-card-text>
                  <h4>Web Development 101</h4>
                </b-card-text>
                <nuxt-link
                  class="btn btn-outline-primary btn-lg btn-block"
                  to="/intro-to-blockchain/introduction"
                >
                  Learn more
                </nuxt-link>
              </b-card>
            </b-card-group>
          </section>

          <section>
            <div class="pb-md-5">
              <h2>
                User Stories
              </h2>
            </div>

            <div class="container pb-md-5">
              <div class="row">
                <div class="col-sm">
                  <div>
                    <i>"I just made submission of my quote deapp on dacade.org. I'm so excited i took the course really enjoyed and learnt more."</i>
                    <br><br>
                    <h5>Tosin miniro</h5>
                  </div>
                </div>
                <div class="col-sm">
                  <div>
                    <i>"Thanks for your support, love and care on Dacade(Telegram and Website) it has being an awesome experience. I have learnt a lot and am still learning a lot."</i>
                    <br><br>
                    <h5>Emmanuel Joseph(JET)</h5>
                  </div>
                </div>
                <div class="col-sm">
                  <div>
                    <i>"..I'm very greatful. Your platform has really helped me in learning. Also the submission on GitHub is like building a portfolio which is very cool."</i>
                    <br><br>
                    <h5>EBENEZER OSEZELE</h5>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div class="pb-md-5">
              <h2>
                Contributor
              </h2>
            </div>

            <div class="container pb-md-5">
              <div class="row">
                <div class="col-sm">
                  <b-img rounded="circle" alt="Circle image" width="96px" src="https://app.dacade.org/assets/img/moritz.png" />
                  <div>
                    <h4>Moritz Stellmacher</h4>
                    <p>Founded after </p>
                  </div>
                </div>
                <div class="col-sm">
                  <b-img rounded="circle" alt="Circle image" width="96px" src="https://app.dacade.org/assets/img/moritz.png" />
                  <div>
                    <h4>Moritz Stellmacher</h4>
                    <p>Founded after </p>
                  </div>
                </div>
                <div class="col-sm">
                  <b-img rounded="circle" alt="Circle image" width="96px" src="https://app.dacade.org/assets/img/moritz.png" />
                  <div>
                    <h4>Moritz Stellmacher</h4>
                    <p>Founded after </p>
                  </div>
                </div>
                <div class="col-sm">
                  <b-img rounded="circle" alt="Circle image" width="96px" src="https://media.licdn.com/dms/image/C4D03AQEPlpRFTnmrCQ/profile-displayphoto-shrink_200_200/0?e=1570060800&v=beta&t=8VeCLwamWuGh28bliuLzgQSuKbIxXRwYe2Ojr388C5Q" />
                </div>
                <div class="col-sm">
                  <b-img rounded="circle" alt="Circle image" width="96px" src="https://media.creativemornings.com/uploads/user/avatar/123843/_MG_0255klein.jpg" />
                  <div>test</div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div class="pb-md-5">
              <h2>
                In Collaboration with
              </h2>
            </div>

            <div class="container pb-md-5">
              <div class="row">
                <div class="col-sm">
                  <b-img rounded alt="Circle image" width="128px" src="https://aeternity.com/brandguide/assets/images/logo-dark-bg.png" />
                </div>
                <div class="col-sm">
                  <h1>APE UNIT</h1>
                </div>
              </div>
            </div>
          </section>

          <!-- Contact -->
          <button type="button" class="btn btn-outline-primary btn-lg">
            Join us on telegram
          </button>

          <!--<footer class="mastfoot">-->
          <footer
            class="mastfoot"
          >
            <div
              class="inner"
            >
              <div
                class="impressumLink"
              >
                <a
                  href="http://policy.dacade.org"
                  target="blank_"
                >
                  Impressum & Privacy Policy
                </a>
              </div>
              <a class="socialIcon" href="https://t.me/dacade" target="_blank">
                <i class="fa fa-telegram" />
              </a>
              <a class="socialIcon" href="https://www.youtube.com/channel/UC08wXfDvuqBJvuZfNZkv3xQ" target="_blank">
                <i class="fa fa-youtube" />
              </a>
              <a class="socialIcon" href="https://twitter.com/dacadeorg" target="_blank">
                <i class="fa fa-twitter" />
              </a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'

export default {
  components: {
    Navigation
  }
}
</script>

<style scoped>
.alert-dismissible {
  padding-right: 2rem;
}

b-button{
  background: none;
}

.card {
  max-width:42em;
  box-shadow:
    0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14),
    0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  border:none;
  border-top:1px solid rgba(0,0,0,.125);
}

.card:hover{
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
      0px 4px 5px 0px rgba(0, 0, 0, 0.14),
      0px 1px 10px 0px rgba(0, 0, 0, 0.12);
}

.collaboration-card {
  background-color: #311B58;
  text-align: center;
}

.collaboration-card img{
  width: 10em;
  padding:2em;
}

.collaboration-card img{
  width: 10em;
  padding:2em;
}

.community-button {
  text-align: center;
}

.community-button button{
  margin-top: 1em;
  font-weight:400;
}

.community-carousel {
  padding:0.25em;
}

.community-carousel .card-body{
    color:rgba(0,0,0,.8);
    text-align:left;
}

.cookieAlert {
  font-size: 1em;
  position:fixed;
  z-index:3;
  right:0;
  left:0;
  width:100%;
  max-width:52rem;
  margin:0 auto;
  margin-top:2em;
}

.cover-container {
  margin-right: auto;
  margin-left: auto;
}

.cover-img {
  display: block;
  margin: 0em auto 2em auto;
  padding-top: 4em;
  max-width:600px;
  width: 100%;
}

.cover .btn-lg {
  padding: .75rem 1.25rem;
  font-weight: 700;
}

.green-card {
  background-color: #53D1AF;
  color: white;
  text-align: center;
}

.green-card img {
  width: 10em;
  border: 2px solid white;
  margin-bottom: 1em;
}

h1{
  font-weight: 600;
}

.img-wrapper {
  position: relative;
}

.img-overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}

.img-overlay:before {
  content: ' ';
  display: block;
  /* adjust 'height' to position overlay content vertically */
  height: 50%;
}

.impressumLink {
  color:white;
  cursor:pointer;
  margin-bottom:0.25em;
  text-decoration:underline;
}

.impressumLink a {
  color:white;
  cursor:pointer;
  margin-bottom:0.25em;
  text-decoration:underline;
}

.inner {
  padding:0.5rem 1rem;
}

.intro-card {
  color:rgba(0,0,0,.8);
}

.intro-card h6 {
  color:rgba(0,0,0,.2)!important;
  margin-bottom:-.25rem!important;
}

.intro-card img {
  width:16px;
  padding-bottom: .3em;
}

.learn-more-button {
  margin: 2em 0;
  font-weight: 900;
  letter-spacing: 2px;
}

main {
  padding-bottom: 10em;
  text-align: center;
}

.mastfoot {
  bottom: 0;
  color: hsla(0,0%,100%,.5);
  margin-bottom:2em;
  margin-top:4em;
  position: absolute;
}

.navbar-landing {
  text-shadow: 0px 6px 10px rgba(0, 0, 0, 0.2);
  background-color: #53D1AF;
  margin-bottom: 2em;
}

.play-button{
  background-color: transparent;
  border:none;
}

.play-button2{
  text-shadow: 0px 6px 10px rgba(0, 0, 0, 0.2);
}

.play-button2:hover{
  text-shadow: none;
}

section{
  margin-bottom: 6rem;
}

.socialIcon {
  color:white;
  padding: 0.5em;
}

.site-wrapper{
  color:white;
  background: linear-gradient(0deg,#343a40, #343a40, #658ECB, #53D1AF);
  position:relative;
}

.text-cover{
  max-width: 42em;
}

.video-card {
  margin-top:4em;
  padding:0.25em;
  text-align:left;
}

@media (max-width: 768px) {
  h1 {
    font-size: 2em;
  }
  .mastfoot {
    width: 90%;
  }
  .site-wrapper {
    padding:0 1em;
  }
}

@media (min-width: 768px) {
  .lead {
    padding:0 1em;
  }

  /* Pull out the header and footer */
  .masthead {
    position: fixed;
    top: 0;
  }

  /* Start the vertical centering */
  .site-wrapper-inner {
    vertical-align: middle;
  }

  /* Handle the widths */
  .masthead,
  .mastfoot,
  .cover-container {
    width: 100%; /* Must be percentage or pixels for horizontal alignment */
  }
}

@media (min-width: 992px) {
  .masthead-brand {
    float: left;
  }
  .nav-masthead {
    float: right;
  }
}

.cover {
  padding: 0 1.5rem;
}

.cover .btn-lg {
  padding: .75rem 1.25rem;
  font-weight: 700;
}

/*
 * Footer
 */

.mastfoot {
  color: rgba(255,255,255,.5);
}

/*
 * Affix and center
 */

@media (min-width: 1200px) {
  .masthead,
  .mastfoot,
  .cover-container {
    width: 42rem;
  }
}

</style>
