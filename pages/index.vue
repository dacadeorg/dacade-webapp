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
                <b-img class="img-responsive cover-img" src="/img/hero_img2.png" />
                <div class="img-overlay">
                  <i v-b-modal.modal-xl class="fa fa-play-circle fa-5x play-button2" />
                  <b-modal
                    id="modal-xl"
                    title="Dacade in 90 seconds"
                    header-text-variant="light"
                    size="xl"
                    hide-footer
                  >
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
                  Earn cryptocurrency by learning about blockchain technology,
                  building dApps and educating your peers.
                </p>
              </div>
            </div>

            <div class="learn-more-button">
              <nuxt-link class="btn btn-primary btn-lg" to="/community-selection">
                LEarn
              </nuxt-link>
            </div>
          </section>

          <section>
            <div class="container usp">
              <div class="row">
                <div class="col-sm">
                  <div>
                    <img src="/img/usp-cap.png" alt="">
                    <h4>
                      Learn
                    </h4>
                    <p>Dacade offers practical active learning with real human feedback while being scaleable and affordable.</p>
                  </div>
                </div>
                <div class="col-sm">
                  <div>
                    <img src="/img/usp-coin.png" alt="">
                    <h4>
                      Earn
                    </h4>
                    <p>You have the possibility to earn cryptocurrencies by solving challenges and giving feedback to your peers.</p>
                  </div>
                </div>
                <div class="col-sm">
                  <div>
                    <img src="/img/usp-key.png" alt="">
                    <h4>
                      Own
                    </h4>
                    <p>Dacade is designed as an open source, community owned platform, where decsions are made and data is owned by it's users.</p>
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
                In our learning environments you will work with your peers to learn about blockchain technology. Here is a selection:
              </p>
            </div>

            <b-card-group deck>
              <b-card bg-variant="dark" img-src="/img/ITB-Cover.png" img-alt="Image" img-top>
                <b-card-text>
                  <h4 class="h-dark">
                    Introduction <br>to Blockchain
                  </h4>
                  <p>Learn the most important concepts for blockchain technology.</p>
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
                  <h4 class="h-dark">
                    Aeternity <br> Development 101
                  </h4>
                  <p>Learn how to build a voting dApp on top of Aeternity.</p>
                </b-card-text>
                <nuxt-link
                  class="btn btn-outline-primary btn-lg btn-block"
                  to="/intro-to-blockchain/introduction"
                >
                  Learn more
                </nuxt-link>
              </b-card>

              <b-card bg-variant="dark" img-src="/img/ED1_cover.png" img-alt="Image" img-top>
                <b-card-text>
                  <h4 class="h-dark">
                    Ethereum <br> Development 101
                  </h4>
                  <p>Learn how to build a registry on top of Ethereum.</p>
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
                    <i>"I just made submission of my quote daepp on dacade.org. I'm so excited I took the course, I really enjoyed it and have learned a lot."</i>
                    <br><br><br>
                    <h5>Labi23</h5>
                    <b-img rounded="circle" alt="Circle image" width="62px" src="img/user_tosin_edit.png" class="mt-4" />
                  </div>
                </div>
                <div class="col-sm">
                  <div>
                    <i>"Thanks for your support, love and care on Dacade(Telegram and Website) it has being an awesome experience. I have learned a lot and I am still learning a lot."</i>
                    <br><br>
                    <h5>emmanuelJet_</h5>
                    <b-img rounded="circle" alt="Circle image" width="62px" src="img/user_jet.png" class="mt-4" />
                  </div>
                </div>
                <div class="col-sm">
                  <div>
                    <i>"I'm still baffled that I can earn for learning, so are my friends - Dacade's courses are visual, practical and you can learn about blockchain through interactions."</i>
                    <br><br>
                    <h5>ced000</h5>
                    <b-img rounded="circle" alt="Circle image" width="62px" src="img/user_ced.jpg" class="mt-4" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div class="pb-md-5">
              <h2>
                Stats
              </h2>
            </div>
            <div class="container pb-md-5">
              <div class="row">
                <div class="col-sm">
                  <div>
                    <h4>
                      2700+
                    </h4>
                    <p>Over 2700 Learners have already registered on dacade.</p>
                  </div>
                </div>
                <div class="col-sm">
                  <div>
                    <h4>
                      700+
                    </h4>
                    <p>Learners finnished the community tutorials and made a submission to the challenge.</p>
                  </div>
                </div>
                <div class="col-sm">
                  <div>
                    <h4>
                      1700+
                    </h4>
                    <p>Over 1700 times Learners gave feedback to a submission of their peer.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div class="pb-md-5">
              <h2>
                Contributors
              </h2>
              <p class="lead text-cover mx-auto">
                Dacade is an open platform, we are always looking for contributers who want to help building a decentralised education system. Here is a selection of them:
              </p>
            </div>

            <div class="container pb-md-5">
              <div class="row">
                <div class="col-sm">
                  <b-img rounded="circle" alt="Circle image" width="96px" src="/img/moritz-pic.png" class="mb-4" />
                  <div>
                    <h4>Moritz Stellmacher</h4>
                    <p>Founder of dacade</p>
                  </div>
                </div>
                <div class="col-sm">
                  <b-img rounded="circle" alt="Circle image" width="96px" src="https://media.licdn.com/dms/image/C4D03AQEPlpRFTnmrCQ/profile-displayphoto-shrink_200_200/0?e=1570060800&v=beta&t=8VeCLwamWuGh28bliuLzgQSuKbIxXRwYe2Ojr388C5Q" class="mb-4" />
                  <div>
                    <h4>Hannes <br>Klöpper</h4>
                    <p>Former CEO of Iversity, one of europes biggest MOOCs</p>
                  </div>
                </div>
                <div class="col-sm">
                  <b-img rounded="circle" alt="Circle image" width="96px" src="https://media.creativemornings.com/uploads/user/avatar/123843/_MG_0255klein.jpg" class="mb-4" />
                  <div>
                    <h4>Alexandre Peschel</h4>
                    <p>CEO of APE Unit, Blockchain developer network</p>
                  </div>
                </div>
                <div class="col-sm">
                  <b-img rounded="circle" alt="Circle image" width="96px" src="https://aeternity.com/user/pages/01.home/_10.team/emin.jpg" class="mb-4" />
                  <h4>Emin <br> Mahrt</h4>
                  <p>CPO of Aeternity, <br> a third generation Blockchain</p>
                </div>
                <div class="col-sm">
                  <b-img rounded="circle" alt="Circle image" width="96px" src="/img/add_person2.png" class="mb-4" />
                  <h4>YOU<br><br></h4>
                  <p>Contribute to dacade and help to create a peer learning revolution</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Contact -->
          <section class="pb-md-5">
            <h2 class="mb-6">
              Join our Community
            </h2>
            <button type="button" class="btn btn-outline-primary btn-lg">
              On telegram
            </button>
          </section>

          <section>
            <div class="pb-md-5">
              <h2>
                In Collaboration with
              </h2>
            </div>

            <div class="container pb-md-5">
              <div class="row">
                <div class="col-sm-4" />
                <div class="col-sm-2">
                  <b-img rounded alt="Circle image" width="128px" src="https://aeternity.com/brandguide/assets/images/logo-dark-bg.png" />
                </div>
                <div class="col-sm-2">
                  <b-img rounded alt="Circle image" width="128px" src="/img/Ape_Unit_Logo_White.png" />
                </div>
              </div>
            </div>
          </section>

          <!--<footer class="mastfoot">-->
          <footer
            class="mastfoot mx-auto"
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
                <i class="fa fa-telegram fa-2x" />
              </a>
              <a class="socialIcon" href="https://www.youtube.com/channel/UC08wXfDvuqBJvuZfNZkv3xQ" target="_blank">
                <i class="fa fa-youtube fa-2x" />
              </a>
              <a class="socialIcon" href="https://twitter.com/dacadeorg" target="_blank">
                <i class="fa fa-twitter fa-2x" />
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

.btn-primary{
  color:white;
}

.card {
  max-width:42em;
  box-shadow:
    0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14),
    0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  border:none;
}

.card-text {
  color:#acb2be !important;
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
  max-width:54rem;
  margin:0 auto;
  margin-top:2em;
  bottom: 1em;
}

.cover-container {
  margin-right: auto;
  margin-left: auto;
}

.cover-img {
  display: block;
  margin: 4em auto 4em auto;
  max-width:500px;
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
  font-size:2em;
  font-weight: 600;
  color:white;
}

h2,h3,h4 {
  font-weight: 700;
  color:white;
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
  height: 30%;
}

.impressumLink {
  font-size: 19px;
  color:white;
  margin-bottom:2em;
  font-weight: 700;
}

.impressumLink a {
  color: white;
}

.impressumLink a:hover{
  color: #53D1AF;
  text-decoration: none;
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
  padding-bottom: 6em;
  text-align: center;
}

.mastfoot {
  bottom: 0;
  color: hsla(0,0%,100%,.5);
  margin-top:4em;
}

.navbar-landing {
  text-shadow: 0px 6px 10px rgba(0, 0, 0, 0.2);
  background-color: #53D1AF;
  margin-bottom: 2em;
}

.play-button{
  background-color: transparent;
  border:none;
  color: white;
}

.play-button2{
  text-shadow: 0px 6px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  color: white;
}

.play-button2:hover{
  text-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
}

section{
  margin-bottom: 6rem;
}

.socialIcon {
  color:white;
  padding: 0.5em;
}

.site-wrapper{
  /* color:white; */
  /* background: linear-gradient(0deg,#22262b, #22262b, #658ECB, #53D1AF); */
  background: #22262b;
  position:relative;
}

.text-cover{
  max-width: 42em;
}

.usp img{
  margin-bottom: 1em;
  width: 50px;
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
