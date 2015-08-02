# employee_directory
NodeJS project site to practice developing a single page web application using node.

## Getting Started
### Requirements
- NodeJs installed
- MongoDb
- Mac OS X or Ubuntu

### Set up
Run in the terminal:
- npm install
This will install all the node_modules and bower_components necessary to run the project. It will also initalize some database data necessary to run the app. It fires the libe/create.sh file which is only set to run the dummyData.js to add data to MongoDb.
- npm start
This fires the app.js which handles the application data. You should be able to navigate to localhost:3000 and get the login screen. All employees are ate first.last@biz.com; all passwords are password; kyle.andrew.carter@gmail.com is an admin account.
