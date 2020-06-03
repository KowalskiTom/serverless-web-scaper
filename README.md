# serverless-web-scaper
An example web scaper using Nodejs

# Quick-Start
Prereq:
1. AWS account with IAM admin creds setup on your machine
2. Node.js/NPM installed
3. Severless Framework cli installed globally:
```console
$ npm install serverless -g
```

To get started, first clone this repository
```console
$ git clone this 
```

Then, perform an install via npm on the root dir and frontend dir

```console
$ npm install 
$ sls deploy
```

Then, copy the api-gateway subdomain from the output and replace the one in the ./frontend/.env file. 
```text
# .env file

REACT_APP_API_URL = 'https://{replace-me}.execute-api.us-east-1.amazonaws.com/dev'
```

You can also test the backend by running:
```console
$ npm test 
```

Next, perform the install and build of the frontend:
```console
$ cd frontend
$ npm install 
$ npm run build
```

Update this line in the serverless.yml file to something unique:
```text
# serverless.yml file

    bucketName: ${self:service}-${opt:stage,'dev'}-react
```

Then, deploy the frontend by going back to the root and running:
```console
$ cd ..
$ sls client deploy
```

You should then be able to access the site from the url in the output. 
