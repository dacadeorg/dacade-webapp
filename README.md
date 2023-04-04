# dacade

## Project description

Learning and community are the core principles that dacade approaches with a multiplayer game spirit. Dacade is a Peer to peer learning platform designed to motivate developers in all stages of their learning process to continue learning and help others to do so. The platform is divided in communities and each community offers a set of courses related to the technologies that have been used to build them. 
Through incentives in the form of micro transactions, students can earn rewards if they submit a challenge or provide feedback. The ultimate goal of the learning process is to become proficient in the technologies that have been used to build real platforms, and contribute to develop and build them further. 


## 1. Requirements

To run the project, you will need the following:
	•	Node.js (v16 or higher)
	•	npm (v6 or higher)

## 2. Tech stack 

```bash
- vue.js
- tailwinds.css
- google cloud functions
- firebase
- nuxt.js
```


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


## 4. Setup

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

## 5. Features

- authentication feature:
    Users can sign up and log in to the platform using their email and password or through their Google    
    accounts. Firebase Authentication API is used to manage user authentication  
    
- Learning Materials
The platform provides users with access to learning materials, including videos, quizzes, and text-based content. Users can navigate through the materials and track their progress.

- Feedback and Collaboration
Users can provide feedback to each other on their projects through a custom API. The API allows users to comment on each other's work and collaborate on their projects.

- Gamification
The platform features gamification elements, including badges and rewards, to motivate users and encourage participation.

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

### Contributing
Contributions to the project are welcome. To contribute, follow these steps:
	1.	Fork the project to your GitHub account.
	2.	Create a new branch for your changes.
	3.	Make your changes and commit them to your branch.
	4.	Submit a pull request to merge your changes into the main branch.

### License

This project is licensed under the MIT License. See the LICENSE file for details.

### Troubleshooting and Problem-Solving Guide 

### Appendix


For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

