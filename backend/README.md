# Dev environment setup

Pre-requisites:
* [Node.js](https://github.com/nvm-sh/nvm)
* [Firebase CLI](https://firebase.google.com/docs/cli/)

Clone repository and `cd` to backend.

```bash
git clone git@version.aalto.fi:CS-E4100/mcc-fall-2019-g20.git
cd mcc-fall-2019-g20/backend
```

Install dependencies.

```bash
npm install
```

##

Create a .env file similar to the .env.example file. Generate a new private key in the [firebase console](https://console.firebase.google.com/u/0/project/mcc-fall-2019-g20/overview) > settings > service accounts. Save the private key to mcc-fall-2019-g20/backend/secret. Replace the service account path with the path to your private key. Note! the service account path is relative to the folder backend/utils so the path will be '../secret/name-of-your-private-key.json'.

##

Run backend.

```bash
# Starts Cloud Firestore emulator and dev server
npm run start:development
```

##

[Postman collection for testing API](https://app.getpostman.com/run-collection/9c65abaf1605003814e2)
