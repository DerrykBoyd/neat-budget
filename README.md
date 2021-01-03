# Neat Budget

A zero based budgeting progressive web app, developed using Svelte and [Firebase](https://firebase.google.com).

This project was bootstrapped with this project template for [Svelte](https://svelte.dev) apps. It lives at https://github.com/sveltejs/template.

To create a new project based on this template using [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit sveltejs/template svelte-app
cd svelte-app
```

*Note that you will need to have [Node.js](https://nodejs.org) installed.*


## Get started

Install the dependencies...

```bash
cd budget-app-svelte
npm install
```

This project needs a connected firebase project to run. You can create a firebase project [here](https://firebase.google.com) once you have created your firebase project create a .env file based on the .env-example and replace the firebase config values.

#### Deploy Firebase Functions and Rules

This app uses firebase functions which requires a Blaze firebase plan. Upgrade your plan using the firebase console and install the firebase cli tools.

```bash
npm install -g firebase-tools
```

Login to your firebase account

```bash
firebase login
```

Initialize your firebase project

```bash
firebase init
```

Deploy the firebase security rules for storage and firestore

```bash
firebase deploy --only storage, firestore
```

Navigate to the functions dir and deploy

```bash
cd functions/
npm install
firebase deploy --only functions
```

#### Start the development server

Start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.

If you're using [Visual Studio Code](https://code.visualstudio.com/) we recommend installing the official extension [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode). If you are using other editors you may need to install a plugin in order to get syntax highlighting and intellisense.

## Building and running in production mode

To create an optimized version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).


## Single-page app mode

By default, sirv will only respond to requests that match files in `public`. This is to maximise compatibility with static fileservers, allowing you to deploy your app anywhere.

If you're building a single-page app (SPA) with multiple routes, sirv needs to be able to respond to requests for *any* path. You can make it so by editing the `"start"` command in package.json:

```js
"start": "sirv public --single"
```
