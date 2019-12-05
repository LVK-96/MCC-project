#!/bin/bash

# Deploy Database and Storage rules, Cloud functions
echo "Deploying cloud functions and rules..."
cd functions && npm install && cd ..
firebase deploy --force
# Ready-made image resizing extension for firebase
echo "Deploying image resizing..."
if firebase ext:configure storage-resize-images --params .resize.config; then
    echo "Image resizing configured!"
else
    echo "Installing image resizing..."
    echo y | firebase ext:install storage-resize-images --params .resize.config
fi
# Deploy REST API
echo "Deploying API..."
gcloud -q endpoints services deploy backend/openapi-appengine.yaml
gcloud -q app deploy backend --promote
