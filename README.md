<!-- ## Description

- Express framework JavaScript starter repository.
- You must have NPM and Node installed to run the app.

## Installation

$ npm install

# development
$ npm run start

# watch mode
$ npm run start:dev

```
### General Tech Stack/Tools List:

# Back End

  - Node
  - Javascript
  - Apollo GraphQL
  - Expressjs
  - Mongoose
  - MongoDB

# Other
  - Github
  - Git
  - NPM
  - Open source libraries



## Postman collection URL

https://www.getpostman.com/collections/11a91768014add02c5ce


 -->

 # Check This Out, LLC #
## The Word of Mouth Marketing Accelerator ##

Check This Out enables businesses to accelerate and amplify their word of mouth marketing and business growth through text-based, incentive-driven, and highly trackable business tools.
&nbsp;

&nbsp;
***
&nbsp;

### Getting Started: ###
- You must have NPM, Node, and Lerna installed to run the app.
- To install everything in every package run the command `lerna bootstrap` from your terminal in the root directory.
- Then, you can run the platform for development purposes by running `npm run start` in the same directory.
- Linting is set up for the entire codebase but there are currently quite a lot of linting errors so in many cases you will have to suffix you commits with `--no-verify`.
- For everything to work correctly you will need the keys that are present on the deployment VM located in `env-vars/staging.env`. Put these in a file called `variables.env` in `check-this-out/packages/api/src`. This file is ignored by Git. You can of course change these to whatever you like if you wanted to run against a local database or something.
- The `staging` branch mimics what is in the staging environment https://app.checkthisout.life
- The `production` branch mimics what is in the production environment https://app.checkthisout.io
- The admin app is located at https://app.checkthisout.io/admin and the user app is located at https://app.checkthisout.io/user. It is the same for staging.
- To deploy, once you have the credentials, ssh into the deployment VM and run either `./deploy-staging` or `./deploy-production` depending on which environment you want to update. This will build and run the correlating branch.
- To create a SuperAdmin and see the super admin page on the admin site, go into the database and change the field `currentOrganizationRole` on the user object to `SuperAdmin`.

&nbsp;
### General Tech Stack/Tools List: ###

- Front End
  - Reactjs
  - Javascript
  - Styled Components
  - Apollo GraphQL
- Back End
  - Node
  - Javascript
  - Apollo GraphQL
  - Expressjs
  - Mongoose
  - MongoDB
- Hosting/Deployment
  - Docker
  - Docker-Compose
  - Google Cloud
  - Nginx
- Other
  - Github
  - Git
  - Plivo
  - Stripe
  - Fontawesome
  - NPM
  - Lerna
  - eslint
  - Open source libraries

&nbsp;
### General Tech Todo: ###

- Add unit and integration testing, could run in a pre-commit/push hook.
- Finish auto-deployment and update deployment environment infrastructure
- Apply for and switch to Plivo toll-free numbers to decrease rate limiting.
- Switch authentication texts from Plivo to Firebase/Google to decouple from other texts preventing rate limit login issues and to get 10,000 free auth texts a month. Also Safer than what we currently have because it is hashed. We could hash our current phone codes but I think the long term solution is to switch.
- Create a string resources file and move all of Check This Out's copy into it for easier updates.
- Set up Google Analytics to track app metrics.
- Set up Sentry or use Google Analytics for crash reporting and alerts.
- Improve API error handling and logging.
- Consolidate certain API's to allow for less code and more flexibility.
- Add better 'typing' for React Context API.
- Consolidate certain requests from the client with GraphQL.
- More mobile compatibility for the Admin UI.
- Animations for the UI.
- Fix all linting warnings caught by pre-commit checks.
- Auto logins if jwt in local storage in valid as well as session time outs.
- Create NPM package to share code across all CTO packages. (enums, utilities, models, etc.)
- Use OpenGraph to make text message previews more pretty.
- Clean up front end for superadmins when a user creates an org but never enters payment.
- Add styling to emails with React-MJML.
- Add role-based security to API calls in GraphQL resolvers.
- Clean up server/admin invite stuff and add phone number confirmation

Ask Mike (mjspollard@gmail.com) if you have any questions about any of these items.
