# dacade

## Project description (rough version)

Learning and community are the core principles that dacade approaches with a multiplayer game spirit. Dacade is a Peer to peer learning platform designed to motivate developers in all stages of their learning process to continue learning and help others to do so. The platform is divided in communities and each community offers a set of courses related to the technologies that have been used to build them. 
Through incentives in the form of micro transactions, students can earn rewards if they submit a challenge or provide feedback. The ultimate goal of the learning process is to become proficient in the technologies that have been used to build real platforms, and contribute to develop and build them further. 

## API descriptions

## Setup guidelines

### 1. Requirements (what tools, node version e.g.) (gabs)

- node.js version 16.0.0.

### 2. Tech stack (included in repo)

- vue.js
- tailwinds.css
- cloud functions
- firebase
- nuxt.js


### 3. Guide on how to install it and how to run with the project connected to the firebase dummy database


```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```


### 4. Provide env file, dummy firebase database

```bash
NUXT_ENV_FIREBASE_API_KEY="AIzaSyDjGCuQB-aOc0qFZPNJTfF9Is-UywXakUg"
NUXT_ENV_FIREBASE_AUTH_DOMAIN="dacade-mvp-1.firebaseapp.com"
NUXT_ENV_FIREBASE_PROJECT_ID="dacade-mvp-1"
NUXT_ENV_FIREBASE_MEASUREMENT_ID="${config.measurementId}"
NUXT_ENV_FIREBASE_APP_ID="1:1087159887585:web:67f23902be38515b23f9a0"

NUXT_ENV_API_BASE_URL="https://europe-west1-dacade-mvp-1.cloudfunctions.net/api"

NUXT_ENV_BUGSNAG_API_KEY="77a1ecc00ef7ab8ac27ac7ebfb353afd"
NUXT_ENV_SHOW_LANGUAGE_SELECTOR=true

NUXT_ENV_DISCORD_CLIENT_ID="906837787976794162"
NUXT_ENV_DISCORD_CALLBACK_URL="https://europe-west1-dacade-mvp-1.cloudfunctions.net/api/discord-bot/oauth/callback"
NUXT_ENV_DISCORD_OAUTH_BASE_URL="https://discord.com/api/oauth2/authorize"
NUXT_ENV_DISCORD_SCOPE="identify email"

NUXT_ENV_GOOGLE_TRANSLATE_API_KEY="AIzaSyC6XYHCctzfWaxQK6Lbl9eZ0JUzbATcjpM"
```


* 
* 
* 
* 
* 
* 
* 
* 
* 
* 
* 
* 
* 
* 
* 
* 
* 
* 
* 
* 
* 
* 

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

