<template>
  <div>
    <section id="hero">
      <div class="container pt-7 pb-7 text-white">
        <div class="row align-items-center text-center text-md-left">
          <div class="col-lg-6">
            <h1>
              <b>{{ $t('page.protocols.title.1') }}</b
              >{{ $t('page.protocols.title.2') }}
            </h1>
            <p class="lead">
              {{ $t('page.protocols.summary') }}
            </p>
            <div class="mt-4 pt-4 mb-8">
              <a href="mailto:moritz@dacade.org" class="btn btn-dark btn-lg">
                {{ $t('page.protocols.summary') }}
                Contact Us
              </a>
            </div>
          </div>
          <div class="col-lg-6">
            <b-img class="img-fluid" src="/img/cover_learners.png" />
          </div>
        </div>
      </div>
    </section>
    <section id="adoption">
      <div class="container pt-7 pb-7 text-black">
        <div class="row">
          <div class="col-md-5">
            <h2>
              <b>{{ $t('page.protocols.adoption') }}</b>
            </h2>
            <p class="lead mb-4">
              {{ $t('page.protocols.message') }}
            </p>
            <img src="/img/usp-key.png" width="72px" class="mb-4" alt="" />
          </div>
          <div class="col-md-2" />
          <div class="col-md-5">
            <p>{{ $t('page.protocols.offers') }}</p>
            <div class="mb-4">
              <b class="dacade-case">{{ $t('page.protocols.case.results') }}</b>
            </div>
            <div class="mb-4">
              <b class="dacade-case">{{ $t('page.protocols.case.money') }}</b>
            </div>
            <div class="mb-4">
              <b class="dacade-case">{{
                $t('page.protocols.case.engagement')
              }}</b>
            </div>
            <div class="mb-4">
              <b class="dacade-case">{{ $t('page.protocols.case.tasks') }} </b>
            </div>
            <div class="mb-4">
              <b class="dacade-case"
                >{{ $t('page.protocols.case.scalable') }}
              </b>
            </div>
            <div class="mb-4">
              <b class="dacade-case"
                >{{ $t('page.protocols.case.community') }}
              </b>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="works">
      <div class="container pt-7 pb-7 text-black">
        <div class="text-center mb-8 text-white">
          <h2>
            <b>{{ $t('page.protocols.how') }}</b>
          </h2>
        </div>
        <div class="row">
          <div class="col-md-2 mb-4">
            <div class="border-case h-100">
              <div class="text-center cyan-background mb-1">
                <b>{{ $t('page.protocols.marketing.title') }}</b>
              </div>
              <p>
                {{ $t('page.protocols.marketing.text') }}
              </p>
            </div>
          </div>
          <div class="col-md-2 mb-4">
            <div class="border-case h-100">
              <div class="text-center cyan-background mb-1">
                <b>{{ $t('page.protocols.training.title') }}</b>
              </div>
              <p>
                {{ $t('page.protocols.training.text') }}
              </p>
            </div>
          </div>
          <div class="col-md-2 mb-4">
            <div class="border-case h-100">
              <div class="text-center cyan-background mb-1">
                <b>{{ $t('page.protocols.challenge.title') }}</b>
              </div>
              <p>
                {{ $t('page.protocols.challenge.text') }}
              </p>
            </div>
          </div>
          <div class="col-md-2 mb-4">
            <div class="border-case h-100">
              <div class="text-center cyan-background mb-1">
                <b>{{ $t('page.protocols.feedback.title') }}</b>
              </div>
              <p>
                {{ $t('page.protocols.title.text') }}
              </p>
            </div>
          </div>
          <div class="col-md-2 mb-4">
            <div class="border-case h-100">
              <div class="text-center cyan-background mb-1">
                <b>{{ $t('page.protocols.community.title') }}</b>
              </div>
              <p>
                {{ $t('page.protocols.community.text') }}
              </p>
            </div>
          </div>
          <div class="col-md-2 mb-4">
            <div
              class="text-white"
              style="
                padding: 0.4rem 0.6rem;
                border: 1px solid white;
                border-radius: 0.35rem;
              "
            >
              <div class="text-center mb-1">
                <b>{{ $t('page.protocols.incentives.title') }}</b>
              </div>
              <p>
                {{ $t('page.protocols.incentives.text') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="learning">
      <div class="container pt-7 pb-7 text-black">
        <div class="row">
          <div class="col-md-5">
            <h2>
              <b>{{ $t('page.protocols.education.title') }}</b>
            </h2>
            <p class="lead mb-4">
              {{ $t('page.protocols.education.text') }}
            </p>
            <img src="/img/usp-cap.png" width="72px" class="mb-2" alt="" />
          </div>
          <div class="col-md-2" />
          <div class="col-md-5">
            <p>{{ $t('page.protocols.offers.title') }}</p>
            <div class="mb-4">
              <b class="dacade-case"
                >{{ $t('page.protocols.offers.case.1') }}
              </b>
            </div>
            <div class="mb-4">
              <b class="dacade-case"
                >{{ $t('page.protocols.offers.case.2') }}
              </b>
            </div>
            <div class="mb-4">
              <b class="dacade-case">
                {{ $t('page.protocols.offers.case.3') }}
              </b>
            </div>
            <div class="mb-4">
              <b class="dacade-case"
                >{{ $t('page.protocols.offers.case.4') }}
              </b>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="demo">
      <div class="container pt-7 pb-7 text-black">
        <div class="big-shadow carousel mx-auto">
          <b-card class="bg-dark mb-4 small-shadow">
            <h4>
              <b class="white">{{ $t('page.protocols.demo.title') }}</b>
            </h4>
            <h6 class="mb-2 white">
              {{ $t('page.protocols.demo.time') }}
            </h6>
            <div>
              <div class="embed-responsive embed-responsive-16by9">
                <iframe
                  class="embed-responsive-item"
                  src="https://www.youtube.com/embed/DoacJObg4Ck?showinfo=0&rel=0"
                  allowfullscreen="allowfullscreen"
                  frameborder="0"
                />
              </div>
            </div>
          </b-card>
        </div>
      </div>
    </section>
    <section id="study">
      <div class="container pt-7 pb-7 text-black">
        <h2>
          <b>{{ $t('page.protocols.case-study.title') }}</b>
        </h2>
        <div class="row">
          <div class="col-md-5">
            {{ $t('page.protocols.case-study.text') }}
          </div>
        </div>
        <p />
        <div class="row align-items-center">
          <div class="col-md-5">
            <p>
              <b>{{ $t('page.protocols.aeternity.title') }} </b>
            </p>
            <div
              style="
                border: 1px solid black;
                border-radius: 0.35rem;
                padding: 1.4rem 0.5rem;
              "
            >
              <ul>
                <li>
                  {{ $t('page.protocols.aeternity.list.1') }}
                </li>
                <li>
                  {{ $t('page.protocols.aeternity.list.1') }}
                </li>
                <li>
                  {{ $t('page.protocols.aeternity.list.2') }}
                </li>
                <li>
                  {{ $t('page.protocols.aeternity.list.3') }}
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md-2">
            <div class="text-center fs-2">→</div>
          </div>
          <div class="col-md-5">
            <p>
              <b>{{ $t('page.protocols.impact.title') }}</b>
            </p>
            <div
              style="
                background: #1eecb3ff;
                border-radius: 0.35rem;
                padding: 1.4rem 0.5rem;
              "
            >
              <ul>
                <li>
                  {{ $t('page.protocols.impact.list.1') }}
                  <u>{{ $t('page.protocols.impact.list.2') }}</u
                  >{{ $t('page.protocols.impact.list.3') }}
                </li>
                <li>
                  {{ $t('page.protocols.impact.list.4') }}
                  <u>{{ $t('page.protocols.impact.list.5') }}</u
                  >{{ $t('page.protocols.impact.list.6') }}
                </li>
                <li>
                  {{ $t('page.protocols.impact.list.7') }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="contact">
      <div class="container pt-7 pb-7 text-black">
        <div class="text-center mb-8 text-white">
          <h2>
            <b>{{ $t('page.protocols.contact.title') }}</b>
          </h2>
        </div>
        <div class="row text-white">
          <div class="col-md-6 mb-4">
            <div class="d-flex justify-content-center">
              <div>
                <img src="/img/contact_paula.png" width="172" alt="" />
                <p class="lead">
                  {{ $t('page.protocols.contact.name.1') }}
                  <br />
                  {{ $t('page.protocols.contact.title.1') }}
                  <br />
                  <u>{{ $t('page.protocols.contact.email.1') }}</u>
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-6 mb-4">
            <div class="d-flex justify-content-center">
              <div>
                <img src="/img/contact_paul.png" width="172" alt="" />
                <p class="lead">
                  {{ $t('page.protocols.contact.name.2') }}<br />
                  {{ $t('page.protocols.contact.title.2') }}<br />
                  <u>{{ $t('page.protocols.contact.email.2') }}</u>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
ul li {
  padding: 5px 0;
}

hr {
  margin: 0;
  border-color: rgb(235, 235, 235);
}

#contact {
  background: linear-gradient(135deg, rgb(31, 235, 177), rgb(32, 173, 133));
}

#demo {
  background: linear-gradient(135deg, rgb(31, 235, 177), rgb(32, 173, 133));
}

#hero {
  background: linear-gradient(135deg, rgb(31, 235, 177), rgb(32, 173, 133));
}

#adoption {
  background: #fff;
}

#learning {
  background: #fff;
}

#works {
  background: linear-gradient(135deg, rgb(31, 235, 177), rgb(32, 173, 133));
}

#study {
  background: #fff;
}

.border-case {
  background: white;
  padding: 0.4rem 0.6rem;
  border-radius: 0.35rem;
  font-weight: 500;
}

.carousel {
  max-width: 800px;
}

.dacade-case {
  background: #1eecb3ff;
  padding: 0.4rem 0.6rem;
  border-radius: 0.35rem;
}

.lead {
  font-size: 1.25rem;
}

.btn-primary {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}

.pt-7 {
  padding-top: 7rem !important;
}

.pb-7 {
  padding-bottom: 7rem !important;
}

.text-black {
  color: #172b4d;
}

.cyan-background {
  background: #1eecb3ff;
}
</style>
