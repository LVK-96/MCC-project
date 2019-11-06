# Dev environment setup

Pre-requisites:
* [Node.js](https://github.com/nvm-sh/nvm)
* [Docker](https://docs.docker.com/install/)

Clone repository and `cd` to backend.

```bash
git clone git@version.aalto.fi:CS-E4100/mcc-fall-2019-g20.git
cd mcc-fall-2019-g20/backend
```

Install dependencies.

```bash
npm install
```

Run development database container in the background.

```bash
docker run -d -p 27017:27017 --name mongodb mongo
```

Run backend.

```bash
npm run watch
```
