#!/bin/bash

if [ $# -eq 0]
then
  echo "Require ENV argument for serverless tests"
else
  npx sls invoke -s $ENV -f refreshQuoteStats
  npx sls invoke -s $ENV -f getTags
  npx sls invoke -s $ENV -f getAuthors
fi