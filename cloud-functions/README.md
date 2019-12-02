# Running cloud functions locally

Install the [Cloud functions emulator](https://cloud.google.com/functions/docs/emulator).


Configure the projectID and path:
```bash
functions-emulator config set mcc-fall-2019-g20
mkdir ~/cloud-functions && touch ~/cloud-functions/default.log
functions-emulator config set logFile /home/username/cloud-functions/default.log
```

Start the emulator
```bash
cloud-functions start
```

Deploy a function i.e.
```bash
cd notifications/sendCreated
functions-emulator deploy sendCreated --trigger-http
```
