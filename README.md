
# CRUD REST API

> This is a simple API made in Nodejs and Express with CRUD operation on Post, with JWT Authentication. 
---
## Installation

Requires [Node.js](https://nodejs.org/) v14+ to run.

Follow the step to Install on your machine before this configure the .env file with Mongo URL and your Secret
```sh
 git clone https://github.com/CHAHATMB/ACRUD-API.git
 cd auth-crud-api
 npm install
 npm start 
```
> Now you can access the api using http://localhost:3000/api at local machine

## API Endpoints
#### User
  - Get /api
  - POST /api/user/signup
  - POST /api/user/login
#### Post
  - GET /api/post/
  - POST /api/post/create
  - GET /api/post/{:id}
  - PUT /api/post/update/{:id}
  - Delete /api/post/delete/{:id}




## License

MIT
**Free Software**
  
   [node.js]: <http://nodejs.org>
