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
                    <div class="embed-responsive embed-responsive-16by9 mb-3">
                      <iframe
                        class="embed-responsive-item"
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/w5Lru6t2O4s?rel=0"
                        frameborder="0"
                        allowfullscreen
                      />
                    </div>
                    <div class="embed-responsive embed-responsive-16by9">
                      <iframe
                        class="embed-responsive-item"
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/3eRRGCceoaA?rel=0"
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
              <nuxt-link class="btn btn-start btn-lg" to="/communities">
                START
              </nuxt-link>
            </div>
          </section>

          <section>
            <div class="container usp">
              <div class="row">
                <div class="col-sm mb-6">
                  <div>
                    <img src="/img/usp-cap.png" alt="">
                    <h4>
                      Learn
                    </h4>
                    <p>Dacade offers practical, active learning with real human feedback while being scaleable and affordable.</p>
                  </div>
                </div>
                <div class="col-sm mb-6">
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
                    <p>We envision dacade as an open source, community-owned platform, where decisions are made and data is owned by it's users.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div class="text-cover mx-auto mb-6">
              <h2>
                Learning Communities
              </h2>
              <p class="lead">
                In our learning environments you will work with your peers to learn about blockchain technology. Here is a selection:
              </p>
            </div>
            <div class="row">
              <div class="col-md-4 mb-4 sel-com">
                <nuxt-link
                  to="/intro-to-blockchain/introduction"
                >
                  <b-card
                    bg-variant="dark"
                    img-src="/img/ITB-Cover.png"
                    img-alt="Image"
                    img-top
                    tag="article"
                  >
                    <b-card-text>
                      <h4 class="dark-white">
                        Introduction <br>to Blockchain
                      </h4>
                      <p class="muted-dark">
                        Learn the most important concepts of blockchain technology.
                      </p>
                    </b-card-text>
                  </b-card>
                </nuxt-link>
              </div>
              <div class="col-md-4 mb-4 sel-com">
                <nuxt-link
                  to="/ae-dev-101/introduction"
                >
                  <b-card
                    bg-variant="dark"
                    img-src="/img/AE-DEV-101-Cover.png"
                    img-alt="Image"
                    img-top
                    tag="article"
                  >
                    <b-card-text>
                      <h4 class="dark-white">
                        Aeternity <br> Development 101
                      </h4>
                      <p class="muted-dark">
                        Learn how to build a voting dApp on top of Aeternity.
                      </p>
                    </b-card-text>
                  </b-card>
                </nuxt-link>
              </div>
              <div class="col-md-4 mb-4 sel-com">
                <nuxt-link
                  to="/eth-dev-101/introduction"
                >
                  <b-card
                    bg-variant="dark"
                    img-src="/img/ED1_cover.png"
                    img-alt="Image"
                    img-top
                    tag="article"
                  >
                    <b-card-text>
                      <h4 class="dark-white">
                        Ethereum <br> Development 101
                      </h4>
                      <p class="muted-dark">
                        Learn how to build a registry on top of Ethereum.
                      </p>
                    </b-card-text>
                  </b-card>
                </nuxt-link>
              </div>
            </div>
          </section>

          <section>
            <div class="mb-6">
              <h2>
                User Stories
              </h2>
            </div>

            <div class="container">
              <div class="row">
                <div class="col-sm mb-4">
                  <div>
                    <p>
                      <i>"Thanks for your support, love and care on Dacade(Telegram and Website) it has being an awesome experience. I have learned a lot and I am still learning a lot."</i>
                    </p>
                    <h5 class="muted-dark">
                      emmanuelJet_
                    </h5>
                    <b-img rounded alt="Circle image" width="64px" src="img/user_jet.png" class="mt-2 mb-3" />
                  </div>
                </div>
                <div class="col-sm mb-4">
                  <div>
                    <p>
                      <i>"Dacade is really encouraging, I didn't realize the little that I know would matter. Thank you for making us learn more and to make research too."</i>
                    </p>
                    <h5 class="muted-dark">
                      susen
                    </h5>
                    <b-img rounded alt="Circle image" width="64px" src="img/user_susen.png" class="mt-2 mb-3" />
                  </div>
                </div>
                <div class="col-sm mb-4">
                  <div>
                    <p>
                      <i>"I just made submission of my quote daepp on dacade.org. I'm so excited I took the course, I really enjoyed it and have learned a lot."</i>
                      <br><br>
                    </p>
                    <h5 class="muted-dark">
                      Labi23
                    </h5>
                    <b-img rounded alt="Circle image" width="64px" src="img/user_tosin_edit.png" class="mt-2 mb-3" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div class="mb-6">
              <h2>
                Stats
              </h2>
            </div>
            <div class="container mb-4">
              <div class="row">
                <div class="col-md-4 mb-4 stats-column">
                  <div>
                    <b-card
                      tag="article"
                      style="border-bottom-color:#53D1AF"
                      class="mb-2 small-shadow text-center bg-dark card-stats"
                    >
                      <b-card-text class="text-center mt-4">
                        <h4><b class="learning-color points">4000</b></h4>
                        <h4><b class="learning-color">Learners</b></h4>
                        <span class="muted-dark">Have already registered on dacade.</span>
                        <br>
                        <br>
                      </b-card-text>
                    </b-card>
                  </div>
                </div>
                <div class="col-md-4 mb-4 stats-column">
                  <div>
                    <b-card
                      tag="article"
                      style="border-bottom-color:#53D1AF"
                      class="mb-2 small-shadow text-center bg-dark card-stats"
                    >
                      <b-card-text class="text-center mt-4">
                        <h4><b class="learning-color points">1000</b></h4>
                        <h4><b class="learning-color">Submissions</b></h4>
                        <span class="muted-dark">To the challenges by Learners who finished the community tutorials.</span>
                      </b-card-text>
                    </b-card>
                  </div>
                </div>
                <div class="col-md-4 mb-4 stats-column">
                  <div>
                    <b-card
                      tag="article"
                      style="border-bottom-color:#9c58ff"
                      class="mb-2 small-shadow text-center bg-dark card-stats"
                    >
                      <b-card-text class="text-center mt-4">
                        <h4><b class="teaching-color points">3000</b></h4>
                        <h4><b class="teaching-color">Feedback</b></h4>
                        <span class="muted-dark">Learners gave to submissions of their peers.</span>
                        <br>
                        <br>
                      </b-card-text>
                    </b-card>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div class="mb-6">
              <h2>
                Contributors
              </h2>
              <p class="lead text-cover mx-auto">
                Dacade is an open platform, we are always looking for contributers who want to help building a decentralised education system. Here is a selection of them:
              </p>
            </div>

            <div class="container">
              <div class="row">
                <div class="col-sm mb-4">
                  <b-img rounded="circle" alt="Circle image" width="96px" src="/img/moritz-pic.png" class="mb-3" />
                  <div>
                    <h4>Moritz Stellmacher</h4>
                    <p class="muted-dark">
                      Founder of dacade
                    </p>
                  </div>
                </div>
                <div class="col-sm mb-4">
                  <b-img rounded="circle" alt="Circle image" width="96px" src="/img/hannes.png" class="mb-3" />
                  <div>
                    <h4>Hannes <br>Klöpper</h4>
                    <p class="muted-dark">
                      Former CEO of Iversity, one of europes biggest online education platforms
                    </p>
                  </div>
                </div>
                <div class="col-sm mb-4">
                  <b-img rounded="circle" alt="Circle image" width="96px" src="/img/alex.jpg" class="mb-3" />
                  <div>
                    <h4>Alexandre Peschel</h4>
                    <p class="muted-dark">
                      CEO of Ape Unit, Blockchain design and development network
                    </p>
                  </div>
                </div>
                <div class="col-sm mb-4">
                  <b-img rounded="circle" alt="Circle image" width="96px" src="/img/emin.jpg" class="mb-3" />
                  <h4>Emin <br> Mahrt</h4>
                  <p class="muted-dark">
                    CPO of Æternity, <br> a third generation Blockchain
                  </p>
                </div>
                <div class="col-sm mb-4">
                  <b-img rounded="circle" alt="Circle image" width="96px" src="/img/add_person2.png" class="mb-3" />
                  <h4>YOU<br><br></h4>
                  <p class="muted-dark">
                    Contribute to dacade and help to create effective change
                  </p>
                </div>
              </div>
            </div>
          </section>

          <!-- Contact -->
          <section>
            <h2 class="mb-2">
              Join our Community
            </h2>
            <p class="lead text-cover mx-auto mb-6">
              Dacade has an active community with over 350 blockchain learners from all over the world in our telegram channel. Join us!
            </p>
            <a href="https://t.me/dacade" target="_blank" class="btn btn-outline-primary btn-lg">
              On telegram
            </a>
          </section>

          <section>
            <div class="mb-6">
              <h2 class="mb-2">
                In Collaboration with
              </h2>
              <p class="lead text-cover mx-auto mb-4">
                We are looking forward to cooperate with more blockchain projects in the future. If this is interesting for you, please get in touch.
              </p>
            </div>

            <div class="container pb-md-5">
              <div class="row">
                <div class="col-sm-4" />
                <div class="col-sm-2 mb-4">
                  <a target="blank" href="https://aeternity.com">
                    <b-img rounded alt="Circle image" width="128px" src="/img/ae-logo.png" />
                  </a>
                </div>
                <div class="col-sm-2">
                  <a target="blank" href="https://apeunit.com">
                    <b-img rounded alt="Circle image" width="128px" src="/img/Ape_Unit_Logo_White.png" />
                  </a>
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
  border: none;
}

.card-stats{
  border:4px solid rgba(255,255,255,.1);
  border-radius:.32rem;
  padding-bottom: 3em;
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
  width:90%;
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

.points {
  font-style: italic;
  font-size: 3em;
}

.stats-column {
  padding: 0 3em;
}

section{
  margin-bottom: 6rem;
}

.sel-com .card-text{
  padding: 0 1.2rem;
}

.sel-com article{
  border: 1.6px solid #00000000;
}

.sel-com article:hover{
  border: 1.6px solid #53d1af;
}

.sel-com a:hover{
  text-decoration: none;
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

  .stats-column {
    padding: 0 2em;
  }

  .cover-img {
    margin: 4em auto 3em auto;
    max-width: 500px;
    width: 90%;
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
