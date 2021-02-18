<template>
  <div>
    <MainSection />
    <CommunitiesSection />
    <div class="site-wrapper-inner hidden">
      <div class="container">
        <main>
          <section>
            <div class="text-cover mx-auto mb-6">
              <h2>Learning Communities</h2>
              <p class="lead">
                In our learning environments you will work with your peers to
                learn about new technology. Here is a selection:
              </p>
            </div>
            <div class="row">
              <div class="col-md-4 mb-4 sel-com">
                <nuxt-link to="/intro-to-blockchain/introduction">
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
                        Learn the most important concepts of blockchain
                        technology.
                      </p>
                    </b-card-text>
                  </b-card>
                </nuxt-link>
              </div>
              <div class="col-md-4 mb-4 sel-com">
                <nuxt-link to="/ae-dev-101/introduction">
                  <b-card
                    bg-variant="dark"
                    img-src="/img/AE-DEV-101-Cover.png"
                    img-alt="Image"
                    img-top
                    tag="article"
                  >
                    <b-card-text>
                      <h4 class="dark-white">
                        Aeternity <br>
                        Development 101
                      </h4>
                      <p class="muted-dark">
                        Learn how to build a voting dApp on top of Aeternity.
                      </p>
                    </b-card-text>
                  </b-card>
                </nuxt-link>
              </div>
              <div class="col-md-4 mb-4 sel-com">
                <nuxt-link to="/web-dev-101/introduction">
                  <b-card
                    bg-variant="dark"
                    img-src="/img/WD1_cover.png"
                    img-alt="Image"
                    img-top
                    tag="article"
                  >
                    <b-card-text>
                      <h4 class="dark-white">
                        Web <br>
                        Development 101
                      </h4>
                      <p class="muted-dark">
                        Learn how to build and host a website with bootstrap.
                      </p>
                    </b-card-text>
                  </b-card>
                </nuxt-link>
              </div>
            </div>
          </section>

          <section>
            <div class="mb-6">
              <h2>User Stories</h2>
            </div>

            <div class="container">
              <div class="row">
                <div class="col-sm mb-4">
                  <div>
                    <p>
                      <i>"Thanks for your support, love and care on
                        Dacade(Telegram and Website) it has being an awesome
                        experience. I have learned a lot and I am still learning
                        a lot."</i>
                    </p>
                    <h5 class="muted-dark">
                      emmanuelJet_
                    </h5>
                  </div>
                </div>
                <div class="col-sm mb-4">
                  <div>
                    <p>
                      <i>"Dacade is really encouraging, I didn't realize the
                        little that I know would matter. Thank you for making us
                        learn more and to make research too."</i>
                    </p>
                    <h5 class="muted-dark">
                      susen
                    </h5>
                  </div>
                </div>
                <div class="col-sm mb-4">
                  <div>
                    <p>
                      <i>"I just made submission of my quote daepp on
                        dacade.org. I'm so excited I took the course, I really
                        enjoyed it and have learned a lot."</i>
                      <br><br>
                    </p>
                    <h5 class="muted-dark">
                      Labi23
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div class="mb-6">
              <h2>Stats</h2>
            </div>
            <div class="container mb-4">
              <div class="row">
                <div class="col-md-4 mb-4 stats-column">
                  <div>
                    <b-card
                      tag="article"
                      style="border-bottom-color: #53d1af"
                      class="mb-2 small-shadow text-center bg-dark card-stats"
                    >
                      <b-card-text class="text-center mt-4">
                        <h4><b class="learning-color points">4000</b></h4>
                        <h4><b class="learning-color">Learners</b></h4>
                        <span
                          class="muted-dark"
                        >Have already registered on dacade.</span>
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
                      style="border-bottom-color: #53d1af"
                      class="mb-2 small-shadow text-center bg-dark card-stats"
                    >
                      <b-card-text class="text-center mt-4">
                        <h4><b class="learning-color points">1000</b></h4>
                        <h4><b class="learning-color">Submissions</b></h4>
                        <span
                          class="muted-dark"
                        >To the challenges by Learners who finished the
                          community tutorials.</span>
                      </b-card-text>
                    </b-card>
                  </div>
                </div>
                <div class="col-md-4 mb-4 stats-column">
                  <div>
                    <b-card
                      tag="article"
                      style="border-bottom-color: #9c58ff"
                      class="mb-2 small-shadow text-center bg-dark card-stats"
                    >
                      <b-card-text class="text-center mt-4">
                        <h4><b class="teaching-color points">3000</b></h4>
                        <h4><b class="teaching-color">Feedback</b></h4>
                        <span
                          class="muted-dark"
                        >Learners gave to submissions of their peers.</span>
                        <br>
                        <br>
                      </b-card-text>
                    </b-card>
                  </div>
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
              Dacade has a community with over 300 learners from all over the
              world in our telegram channel. Join us!
            </p>
            <a
              href="https://t.me/dacade"
              target="_blank"
              class="btn btn-outline-primary btn-lg"
            >
              On telegram
            </a>
          </section>

          <section>
            <div class="mb-6">
              <h2 class="mb-2">
                In Collaboration with
              </h2>
              <p class="lead text-cover mx-auto mb-4">
                Dacade is created in collaboration with multiple contributors.
                If this is interesting for you, please get in touch.
              </p>
            </div>

            <div class="container">
              <div class="row">
                <div class="col-sm-4 mb-4" />
                <div class="col-sm-2 mb-4">
                  <a target="blank" href="https://apeunit.com">
                    <b-img
                      rounded
                      alt="Circle image"
                      width="100%"
                      src="/img/Ape_Unit_Logo_White.png"
                    />
                  </a>
                </div>
                <div class="col-sm-2 mb-4">
                  <a target="blank" href="https://octan.group">
                    <b-img
                      rounded
                      alt="Circle image"
                      width="100%"
                      src="/img/logo_octan.png"
                    />
                  </a>
                </div>
              </div>
            </div>
          </section>

          <!--<footer class="mastfoot">-->
          <footer class="mastfoot mx-auto">
            <div class="inner">
              <div class="impressumLink">
                <a href="http://policy.dacade.org" target="blank_">
                  Impressum & Privacy Policy
                </a>
              </div>
              <a class="socialIcon" href="https://t.me/dacade" target="_blank">
                <i class="fa fa-telegram fa-2x" />
              </a>
              <a
                class="socialIcon"
                href="https://www.youtube.com/channel/UC08wXfDvuqBJvuZfNZkv3xQ"
                target="_blank"
              >
                <i class="fa fa-youtube fa-2x" />
              </a>
              <a
                class="socialIcon"
                href="https://twitter.com/dacadeorg"
                target="_blank"
              >
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
import MainSection from '@/components/sections/homepage/Main'
import CommunitiesSection from '@/components/sections/homepage/Communities'

export default {
  components: {
    MainSection,
    CommunitiesSection
  }
}
</script>
