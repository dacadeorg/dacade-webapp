# dacade

## Project description (rough version)

Learning and community are the core principles that dacade approaches with a multiplayer game spirit. Dacade is a Peer to peer learning platform designed to motivate developers in all stages of their learning process to continue learning and help others to do so. The platform is divided in communities and each community offers a set of courses related to the technologies that have been used to build them. 
Through incentives in the form of micro transactions, students can earn rewards if they submit a challenge or provide feedback. The ultimate goal of the learning process is to become proficient in the technologies that have been used to build real platforms, and contribute to develop and build them further. 

## API descriptions

## Setup guidelines

### 1. Requirements

- node.js version 16.0.0.

### 2. Tech stack (included in repo)

```bash
- vue.js
- tailwinds.css
- cloud functions
- firebase
- nuxt.js
```

### 3. Guide on how to install it and how to run with the project connected to the firebase dummy database

#### Step by step installation manual

- copy the link from the repository https://github.com/dacadeorg/dacade-webapp/
- usually the link to clone should go as follows: ``` git@github.com:dacadeorg/dacade-webapp.git ```
- clone the repo with the link in your local machine, ideally in a new folder, with the command ```git clone [ repo link ] 
- install the dependencies running ```npm i``` (make sure to be using the right node version before installing the dependencies)
- add the ```.env ``` file that is provided below and add it to the root folder in the repository
- to run the application in the browser, initiate the local server with the command ```npm run dev ```

#### Relevant commands

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

### Application features and capabilities 

- authentication feature:
    - how users can create accounts, log in, and reset passwords
        - example from LEX:
            1. User creates an account using an email address and a password. 
            2. User confirms their account by clicking a link that is emailed to them. 
            3. User logs in with their email address and password. 
            4. User can reset their password if they have forgotten it. 
            5. User is logged in and can access the application.   
- information about the application's data storage capabilities, as well as any analytics tools available to track user activity
    - For the application's data storage and management we use ```Firebase ``` and  ```Cloud Functions``` :
    - https://firebase.google.com/
    - https://cloud.google.com/functions
- information about any other features available in the application
    - the user can claim their their rewards that they either have earned by submitting a challenge or by giving feedback to another user's challenge.  

### User Roles and Privileges 

```bash
- Admin 
- Editor
- Guest
```

### Accessibility Instructions 

information about how users with disabilities can access and use the web application. This could include information on both the visual interface and the underlying code, as well as any special considerations or instructions for users with disabilities.

### Browsers and Compatibility  

which browsers the web application supports, and any special instructions for using the application in certain browsers. Additionally, you should provide any warnings about using certain browsers, as well as any technical requirements or limitations of the application.

```bash
- Chrome
- Firefox
- Safari
- Edge
```

If the wrong browser is used, then the web application may not operate as expected, or may malfunction in certain areas. Additionally, using the wrong browser may lead to reduced performance of the application or incompatible features.

### Troubleshooting and Problem-Solving Guide 

### Appendix

* 
* 

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

