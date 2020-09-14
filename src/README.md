# Nest CLI Basics :

```bash
--------------------------------------------
# nest create new project named <nestjs-task-management>:-

$ nest new nestjs-task-management
⚡  We will scaffold your app in a few seconds..

CREATE nestjs-task-management/.eslintrc.js (663 bytes)
CREATE nestjs-task-management/.prettierrc (51 bytes)
CREATE nestjs-task-management/README.md (3370 bytes)
CREATE nestjs-task-management/nest-cli.json (64 bytes)
CREATE nestjs-task-management/package.json (1904 bytes)
CREATE nestjs-task-management/tsconfig.build.json (97 bytes)
CREATE nestjs-task-management/tsconfig.json (339 bytes)
CREATE nestjs-task-management/src/app.controller.spec.ts (617 bytes)
CREATE nestjs-task-management/src/app.controller.ts (274 bytes)
CREATE nestjs-task-management/src/app.module.ts (249 bytes)
CREATE nestjs-task-management/src/app.service.ts (142 bytes)
CREATE nestjs-task-management/src/main.ts (208 bytes)
CREATE nestjs-task-management/test/app.e2e-spec.ts (630 bytes)
CREATE nestjs-task-management/test/jest-e2e.json (183 bytes)

? Which package manager would you ❤️  to use? yarn
✔ Installation in progress... ☕

🚀  Successfully created project nestjs-task-management
👉  Get started with the following commands:

$ cd nestjs-task-management
$ yarn run start


            Thanks for installing Nest 🙏
Please consider donating to our open collective
        to help us maintain this package.


🍷  Donate: https://opencollective.com/nest

--------------------------------------------
# nest generate new module named <tasks>:-

$ nest g module tasks
CREATE src/tasks/tasks.module.ts (82 bytes)
UPDATE src/app.module.ts (159 bytes)

--------------------------------------------
# nest generate new controller named <tasks> (without unit test specs):-

$ nest g controller tasks --no-spec
CREATE src/tasks/tasks.controller.ts (99 bytes)
UPDATE src/tasks/tasks.module.ts (170 bytes)

--------------------------------------------
# nest generate new service named <tasks> (without unit test specs):-

$ nest g service tasks --no-spec
CREATE src/tasks/tasks.service.ts (89 bytes)
UPDATE src/tasks/tasks.module.ts (247 bytes)
```

# Navigate to Swagger UI :

- Swagger API Doc: http://localhost:3000/api
- Swagger API JSON: http://localhost:3000/api-json

# Deploying App in Firebase as a Function :

- https://firebase.google.com/docs/functions/manage-functions

```bash
# Generate .firebaserc and firebase.json files having "functions" default config

$ firebase init functions
::::::::::::::::
=== Project Setup
::::::::::::::::
? Please select an option: Use an existing project
? Select a default Firebase project for this directory: nestjs-task-management-app (nestjs-task-management-app)
i  Using project nestjs-task-management-app (nestjs-task-management-app)

=== Functions Setup

A functions directory will be created in your project with a Node.js
package pre-configured. Functions can be deployed with firebase deploy.

? What language would you like to use to write Cloud Functions? TypeScript
? Do you want to use TSLint to catch probable bugs and enforce style? No
✔  Wrote functions/package.json
✔  Wrote functions/tsconfig.json
✔  Wrote functions/src/index.ts
✔  Wrote functions/.gitignore
? Do you want to install dependencies with npm now? No

i  Writing configuration info to firebase.json...
i  Writing project information to .firebaserc...

✔  Firebase initialization complete!
```

```js
// Modify package.json:
{
  "engines": { "node": "12" }, // Billing Account needed for Node >= 10
  "main": "dist/main.firebase.js"
}

// Modify firebase.json for "functions":
{
  "functions": {
    "predeploy": "yarn build", // optional
    "source": "." // default rootDir -> functions
  }
}
```

```bash
# After all above configuration finished, then start the deployment.

$ firebase deploy --only functions
⚠  functions: package.json indicates an outdated version of firebase-functions.
Please upgrade using npm install --save firebase-functions@latest in your functions directory.

=== Deploying to 'nestjs-task-management-app'...

i  deploying functions
i  functions: ensuring required API cloudfunctions.googleapis.com is enabled...
i  functions: ensuring required API cloudbuild.googleapis.com is enabled...
⚠  functions: missing required API cloudbuild.googleapis.com. Enabling now...
✔  functions: required API cloudfunctions.googleapis.com is enabled

Error: HTTP Error: 400, Billing account for project '962688513737' is not found. Billing must be enabled for activation of service(s) 'cloudbuild.googleapis.com,containerregistry.googleapis.com' to proceed.
```

- Open - https://console.cloud.google.com/apis/library?project=nestjs-task-management-app
- Search **Cloud build API** and Enable the Service if not enabled.
- Try Re-deploying the functions again
- Open - https://console.firebase.google.com/u/0/project/nestjs-task-management-app/functions/list
- After successful deployment, Api Url - https://us-central1-nestjs-task-management-app.cloudfunctions.net/api

# Deploying App in Heroku :

```bash
---------------------------------------------
# Find all apps:

$ heroku apps
::::::::::::::
nestjs-task-management-rama89 (eu)

# Attach Project to the heroku app (only needed once):

$ heroku git:remote -a nestjs-task-management-rama89
set git remote heroku to https://git.heroku.com/nestjs-task-management-rama89.git

---------------------------------------------
# Create a Procfile at the root location:

$ cat Procfile
web: yarn start:prod

---------------------------------------------
# Push Committed code to Heroku:

$ git push heroku master
::::::::::::::
remote: -----> Node.js app detected
remote:
remote: -----> Creating runtime environment
remote:
remote:        NPM_CONFIG_LOGLEVEL=error
remote:        USE_YARN_CACHE=true
remote:        NODE_ENV=production
remote:        NODE_MODULES_CACHE=true
remote:        NODE_VERBOSE=false
remote:
remote: -----> Installing binaries
remote:        engines.node (package.json):  unspecified
remote:        engines.npm (package.json):   unspecified (use default)
remote:        engines.yarn (package.json):  unspecified (use default)
remote:
remote:        Resolving node version 12.x...
remote:        Downloading and installing node 12.18.3...
remote:        Using default npm version: 6.14.6
remote:        Resolving yarn version 1.22.x...
remote:        Downloading and installing yarn (1.22.5)
remote:        Installed yarn 1.22.5
remote:
remote: -----> Installing dependencies
remote:        Installing node modules (yarn.lock)
remote:        yarn install v1.22.5
remote:        [1/4] Resolving packages...
remote:        [2/4] Fetching packages...
remote:        [3/4] Linking dependencies...
remote:        [4/4] Building fresh packages...
remote:        Done in 62.93s.
remote:
remote: -----> Build
remote:        Running build (yarn)
remote:        yarn run v1.22.5
remote:        $ rimraf dist
remote:        $ nest build
remote:        Done in 14.42s.
remote:
remote: -----> Pruning devDependencies
remote:        yarn install v1.22.5
remote:        [1/4] Resolving packages...
remote:        [2/4] Fetching packages...
remote:        [3/4] Linking dependencies...
remote:        [4/4] Building fresh packages...
remote:        warning Ignored scripts due to flag.
remote:        Done in 10.24s.
remote:
remote: -----> Caching build
remote:        - yarn cache
remote:
remote: -----> Build succeeded!
remote:
remote: -----> Discovering process types
remote:        Procfile declares types -> web
remote:
remote: -----> Compressing...
remote:        Done: 43.5M
remote: -----> Launching...
remote:        Released v3
remote:        https://nestjs-task-management-rama89.herokuapp.com/ deployed to Heroku
remote:
remote: Verifying deploy... done.
To https://git.heroku.com/nestjs-task-management-rama89.git
 * [new branch]      master -> master

---------------------------------------------
# Check heroku Process:

$ heroku ps
Free dyno hours quota remaining this month: 547h 21m (99%)
Free dyno usage for this app: 0h 0m (0%)
For more information on dyno sleeping and how to upgrade, see:
https://devcenter.heroku.com/articles/dyno-sleeping

=== web (Free): yarn start:prod (1)
web.1: up 2020/09/13 11:04:41 +0530 (~ 16m ago)

# Access heroku Process Terminal:

$ heroku ps:exec --status
=== Heroku Exec ⬢ nestjs-task-management-rama89
Dyno   Proxy Status  Dyno Status
─────  ────────────  ───────────
web.1  running       up

$ heroku ps:exec
Establishing credentials... done
Connecting to web.1 on ⬢ nestjs-task-management-rama89...
~ $ ls
Procfile     dist	    package.json	 tsconfig.build.json
README.md    firebase.json  script.bootstrap.sh  tsconfig.json
README_2.md  nest-cli.json  src			 yarn.lock
config	     node_modules   test
~ $ exit
logout
```

# Testing | CICD ( using CircleCI ) :

- https://github.com/rama5789/circleci-demo-javascript-express
- https://github.com/rama5789/nest-starter-testing
- https://github.com/rama5789/nodejs-circleci

### Vanilla config.yml file :

```yml
version: 2.1
# Job Definitions
jobs:
  # Job 1
  run_tests:
    # Job Executor - where job will be executed. "VM" is another type of Executor.
    docker:
      - image: circleci/node:12.18.2
    # Steps to be performed inside Docker image
    steps:
      # Checkout from Git
      - checkout
      - run:
          name: Install npm dependencies
          command: npm install
      # Mocha Test Cases
      - run:
          name: Run Unit Tests
          command: ./node_modules/mocha/bin/mocha test/ --reporter mochawesome --reporter-options reportDir=test-results,reportFilename=test-results
      - store_test_results:
          path: test-results
      - store_artifacts:
          path: test-results
# Job Pipeline
workflows:
  build_test:
    jobs:
      - run_tests
```

### config.yml file ( using Orbs ) :

```yml
version: 2.1
orbs:
  node: circleci/node@3.0.0
jobs:
  run_tests:
    executor:
      name: node/default
    steps:
      - checkout
      - node/install-packages
      - run:
          command: npm run test
workflows:
  build_test:
    jobs:
      - run_tests
```
