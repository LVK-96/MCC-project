#!/bin/bash

cd frontend
npm ci
react-native bundle \
    --platform android \
    --dev false \
    --entry-file index.js \
    --bundle-output android/app/src/main/assets/index.android.bundle \
    --assets-dest android/app/src/main/res/

# apk is found from app/build/outputs/apk/debug/app-debug.apk
cd android && ./gradlew assembleDebug
