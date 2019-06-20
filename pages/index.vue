<template>
  <div class="site-wrapper">
    <div class="site-wrapper-inner">
      <div class="cover-container">
        <nav class="navbar fixed-top navbar-light navbar-landing">
          <a class="navbar-brand" href="https://dacade.org/">
            <img src="/img/logo-white.png" height="24" alt="">
          </a>
        </nav>
        <main>
          <div>
            <b-alert show variant="warning" dismissible class="cookieAlert">
              We use browser cookies to give you the best possible experience. Learn more about our
              <a href="http://policy.dacade.org/" class="alert-link">Privacy Policy</a>.
            </b-alert>
          </div>

          <div>
            <img class="cover-img" src="/img/dacade-cover.png" alt="Card image cap">
            <h1>
              Peer-to-Peer Blockchain Learning
            </h1>
            <p class="lead">
              Earn cryptocurrency by learning about blockchain, building dApps and educating your peers.
            </p>
          </div>

          <div class="learn-more-button">
            <nuxt-link class="btn btn-primary btn-lg" to="/community-selection">
              Start LEarning
            </nuxt-link>
          </div>

          <div class="card mb-3 mx-auto video-card">
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

            <div class="card-body intro-card">
              <h4 class="card-title">
                What is dacade?
              </h4>
              <h6 class="mb-2 text-muted">
                <span>
                  <img src="https://emojipedia-us.s3.amazonaws.com/thumbs/240/apple/129/stopwatch_23f1.png"> 90 seconds
                </span>
              </h6>
            </div>
          </div>
          <!-- carousel -->
          <div class="community-carousel card mb-3 mx-auto">
            <b-carousel
              controls
              background="#ababab"
              :interval="4000"
              img-width="1024"
              img-height="480"
            >
              <!-- Text slides with image -->
              <b-carousel-slide
                img-src="https://app.dacade.org/assets/img/ITBCover.png"
              />

              <b-carousel-slide
                img-src="https://app.dacade.org/assets/img/AE101Cover.png"
              />

              <b-carousel-slide
                img-src="https://app.dacade.org/assets/img/BD101Cover.png"
              />
            </b-carousel>

            <div class="card-body">
              <h4
                class="card-title"
              >
                Our Learning Communities
              </h4>
              <p
                class="card-text"
              >
                At the moment, we have three
                communities. One gives a non-technical introduction
                to blockchain, and we have two developer communities,
                a æternity and an ethereum introduction.
              </p>
              <div
                class="community-button"
              >
                <nuxt-link
                  class="btn btn-outline-primary btn-lg btn-block"
                  to="/community-selection"
                >
                  Start Learning
                </nuxt-link>
              </div>
            </div>
          </div>

          <!-- Collaboration -->
          <div class="collaboration-card card text-white mb-3 mx-auto">
            <div class="card-header">
              <b>In Collaboration with</b>
            </div>
            <div class="card-body">
              <a
                href="https://aeternity.com"
                target="_blank"
              >
                <img
                  class="card-img-top"
                  src="https://aeternity.com/brandguide/assets/images/logo-dark-bg.png"
                  alt="Card image cap"
                >
              </a>
            </div>
          </div>

          <!-- Team -->
          <div class="card text-white mx-auto green-card">
            <div class="card-header">
              <b>Founder</b>
            </div>
            <div class="card-body">
              <img
                class="card-img-top"
                src="https://app.dacade.org/assets/img/moritz.png"
                alt="Card image cap"
              >
              <p
                style="text-align:left;"
                class="card-text"
              >
                Dacade is built and developed by Moritz Stellmacher.
                He takes care of all programming, design, videos, images, and
                text with the help of friendly advisors. One of them is
                Hannes Klöpper, former CEO of Iversity, one of Europe's
                biggest online education platforms. His experiences profoundly
                influenced the creation of dacade.
              </p>
            </div>
          </div>

          <!-- Contact -->
          <div
            class="card text-white mb-3 mx-auto green-card"
          >
            <div class="card-header">
              <b>Contact</b>
            </div>
            <div
              class="card-body"
            >
              <p
                class="card-text"
              >
                Help us to build the next education
                platform, join the conversation!
              </p>
              <a
                class="btn btn-primary btn-white btn-lg"
                href="https://t.me/dacade"
                target="_blank"
              >
                On telegram
              </a>
            </div>
          </div>

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
export default {

}
</script>

<style scoped>
.alert-dismissible {
  padding-right: 2rem;
}

.btn-primary,
.btn-primary:focus,
.btn-primary:active {
  color: white;
  text-shadow: none; /* Prevent inheritance from `body` */
  background-color: #6AD5BF;
  border: .05rem solid #6AD5BF;
    box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 5px 8px 0px rgba(0, 0, 0, 0.14),
    0px 1px 14px 0px rgba(0, 0, 0, 0.12);
}

.btn-primary:active {
  color: green;
  text-shadow: none; /* Prevent inheritance from `body` */
  background-color: #6AD5BF;
  border: .05rem solid #6AD5BF;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
  0px 5px 8px 0px rgba(0, 0, 0, 0.14),
  0px 1px 14px 0px rgba(0, 0, 0, 0.12);
}

.btn-primary:hover {
  box-shadow: 0px 7px 8px -4px rgba(0, 0, 0, 0.2),
  0px 12px 17px 2px rgba(0, 0, 0, 0.14),
  0px 5px 22px 4px rgba(0, 0, 0, 0.12);
}

.btn-lg {
  padding: .75rem 1.25rem;
  font-weight: 700;
}

.btn-outline-primary {
  border-color: #6AD5BF!important;
  cursor: pointer;
  color: #6AD5BF!important;
  font-weight: 500;
}

.btn-outline-primary:hover {
  color: #fff!important;
  background-color: #6AD5BF!important;
  border-color: #65CB99!important;
  cursor: pointer;
  font-weight: 500;
}

.btn-white{
  background-color: white;
  border: none;
  color: #53D1AF;
}

.card {
  max-width:42em;
  margin-top: 8em;
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
  width:90%;
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
}

main {
  margin-top: 2em;
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
  background-color: #53D1AF;
  margin-bottom: 2em;
}

.socialIcon {
  color:white;
  padding: 0.5em;
}

.site-wrapper{
  color:white;
  background: url('/img/bg-pattern.png'),linear-gradient(0deg,#7C4DC1, #515EB4, #658ECB, #53D1AF);
  position:relative;
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
