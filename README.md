# Go Chat

This is a chat web app written in Go. It is configured to run in a heroku environment out of the box, so it will take some configuration to get it to work without it. 

## With Heroku 
* Install the Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli
* ```git clone https://github.com/ImVerbatim/quick-chat-websocket.git```
* cd into newly created root ```quick-chat-websocket``` directory
* ```go install -v```

### Running Locally: 
* ```cp .env .env.local```
* ```heroku local```
* Then point your browser to http://localhost:8000

### Running Remotely: 
* ```git init ```
* Add your heroku remote project: ```heroku git:remote -a remote-project```
* ``` git add . ``` 
* ``` git commit -m "message"```
* ```git push heroku master```
* Then point your browser to http://your-project.herokuapp.com

