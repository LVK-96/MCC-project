FROM google/cloud-sdk:latest
ENV ANDROID_HOME=/usr/local/android
ENV SDK_TOOLS_VERSION=sdk-tools-linux-4333796
ENV PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin
ENV PATH=$PATH:$ANDROID_HOME/emulator
ENV PATH=$PATH:$ANDROID_HOME/platform-tools
ENV ANDROID_SDK_ROOT=$ANDROID_HOME
ENV ANDROID_SDK_VERSION=28.0.3
ENV ANDROID_BUILD_TOOLS_VERSION=28
RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y nodejs npm openjdk-8-jdk wget unzip \
    && npm install -g firebase-tools react-native-cli \
    && mkdir -p ${ANDROID_HOME} && cd /usr/local \
    && wget -q https://dl.google.com/android/repository/${SDK_TOOLS_VERSION}.zip -O android-sdk-tools.zip \
    && unzip -q android-sdk-tools.zip -d ${ANDROID_HOME} \
    && rm -f android-sdk-tools.zip \
    && echo y | sdkmanager "platform-tools" "platforms;android-28"
