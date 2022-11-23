# dacade

## Project description (gabs just the first rough version)

Learning and community are the core principles that dacade approaches with a multiplayer game spirit. Dacade is a Peer to peer learning platform designed to motivate developers in all stages of their learning process to continue learning and help others to do so. The platform is divided in communities and each community offers a set of courses related to the technologies that have been used to build them. 
Through incentives in the form of micro transactions, students can earn rewards if they submit a challenge or provide feedback. The ultimate goal of the learning process is to become proficient in the technologies that have been used to build real platforms, and contribute to develop and build them further. 



## API descriptions (Maybe later)

## Setup guidelines


### 1. Guide on how to install it and how to run with the project connected to the firebase dummy database


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

### 2. Requirements (what tools, node version e.g.) (gabs)

- vue.js
- node.js version 16.0.0.
- tailwinds


### 3. Provide env file, dummy firebase database

### 4. Style and components guideline

- Add fonts used in Figma inside the project
- Add colors defined in the Figma styleguide inside the project
- Create small reusable components such as
    - Buttons
    - Input fields
    - Cards
- Create the general layout by implementing things like the navigation bar (both desktop and mobile versions) and the footer.
- Add icons used in the Figma design to the project.
- Look for components that are used across different pages and create them and make sure they are reusable across the different pages.

### 5. Contribution guidelines on how to contribute to the project (nice to have) (template https://gist.github.com/PurpleBooth/b24679402957c63ec426)
#### Branching

- Before making any new changes make sure to go back to the `dev` branch pull and create a new branch from there
- Make sure to follow this branch naming convention [https://github.com/octangroup/git-guidelines/blob/main/wiki/branching_model.md](https://github.com/octangroup/git-guidelines/blob/main/wiki/branching_model.md)
- The dev branch is where developers work on
- Always use the dev branch as the base branch of your pull requests
- The staging branch has a public link that is used to show progress to the client
- The main branch is the production branch.
- Change the base branch using other methods like `git rebase` instead of using the pull request merging for the `dev`, `main`, and `staging`

#### Commits

- Follow this guideline [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for your commit messages
- Try to create a mid-sized every couple of minutes/hours. But more importantly, try to let commits be logically consistent contributions. That means if you have many changes in lines of code you can split them up into multiple commits but each of those commits should have an independent meaning that is described by the commit message.

#### PRs, Code Review

- Once you made the first commit just go ahead and push the changes
- Create a Pull request once you pushed your changes to the repository, you don't have to wait to finish the feature in order to create a pull request you can create it as soon as you have the first commit.
- Follow this PR naming convention while creating your PR [https://namingconvention.org/git/pull-request-naming.html](https://namingconvention.org/git/pull-request-naming.html)
- If a PR is still being worked on add the GitHub tag `Work in progress`
- Before marking a PR as `Ready for review` make sure that the CI (GitHub actions) and the deployment are passing.
- Request code review by adding the code reviewer as a reviewer to your PR
- After requesting for code review make sure to send a slack message to the project channel with the link to the PR and tag the code reviewer
- PRs should cover a set of related changes covering a single feature, bug fix, or other types of changes
- Delete branches once they are merged

#### Resolving Conflicts

- Be super careful, involve the others who are working on similar stuff.
- Make sure you understand what you are accepting or refusing.
- Recent changes are not always the relevant ones, always check that you are not dismissing changes that are actually fixing another bug

#### Things to avoid in git

- Avoid using the squash commits feature, it tends to bring conflicts especially when people are using other base branches
- Do not use git force push
- Do not merge your PRs unless your code has been reviewed by a code reviewer and the code reviewer has either approved your changes or accepted all the adjustments you have made upon their review.
- Avoid merging other dependencies PRs into the ones you are working on to avoid having duplicate changes into two PRs in case a change is needed to be used in another.


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

