## Dev environment setup

Pre-requisites:
* [Android studio](https://developer.android.com/studio/index.html)
* [OpenJDK 8](https://openjdk.java.net/install/)
* [Watchman](https://facebook.github.io/watchman/docs/install.html#buildinstall)
* [Node.js](https://github.com/nvm-sh/nvm)

Install the Android 9 SDK (28) using [the SDK manager](https://developer.android.com/studio/intro/update). Also create a new virtual device with atleast SDK version 28 using the [AVD manager](https://developer.android.com/studio/run/managing-avds).

Configure environment variables. Copy these to .bashrc, .zshrc etc.
```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```
Source the config file to load the new environment variables.

```bash
source ~/.bashrc
```

Install react native cli.

```bash
npm install -g react-native-cli
```

Clone this repo and `cd` to `frontend`.

```bash
git clone git@version.aalto.fi:CS-E4100/mcc-fall-2019-g20.git
cd mcc-fall-2019-g20/frontend 
```
Install dependencies.

```bash
npm install
```

Start node.js dev server.

```bash
react-native start
```

Run app on emulator.

```bash
react-native run-android
```

##
[Official React Native getting started tutorial](https://facebook.github.io/react-native/docs/getting-started)

