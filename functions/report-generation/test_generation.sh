#!/bin/sh
curl -X POST -H "Content-Type: application/json" -d @project.json http://localhost:5001/mcc-fall-2019-g20/us-central1/generatePDF
