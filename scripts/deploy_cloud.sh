#!/bin/bash

echo "Deploying cloud resources and configuring things..."
# Deploy Database and Storage rules, Cloud functions
firebase deploy
# Ready-made image resizing extension for firebase
yes Y | firebase ext:install storage-resize-images --params .resize.config
# Deploy REST API
yes Y | gcloud app deploy backend --promote
