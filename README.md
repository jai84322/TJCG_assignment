# TJCG_assignment

- you can find the code on branch named "backend"


## Project - TJCG_assignment

### Key points
- Created a database `TJCG_assignment`. 
- Branch name is `backend`

### Models
- User Model
```yaml
{ 
  fname: {string, mandatory},
  lname: {string, mandatory},
  email: {string, mandatory, valid email, unique}, 
  password: {string, mandatory, minLen 8, maxLen 25},
  createdAt: {timestamp},
  updatedAt: {timestamp}
}
```

- Blog Model
```yaml
{ 
  title: {string, mandatory},
  description: {string, mandatory}, 
  createdAt: {timestamp},
  updatedAt: {timestamp},
}
```

- Comments Model
```yaml
{ 
  blogId: {ObjectId, mandatory},
  comment: {string, mandatory}, 
  commentBy: {string, mandatory},
  createdAt: {timestamp},
  updatedAt: {timestamp},
}
```

## User APIs 
### POST /users
- Created a user document from request body.
- Returned HTTP status 201 on a succesful user creation. Also returned the user document. The response is a JSON object like [this](#successful-response-structure)
- Returned HTTP status 400 if no params or invalid params received in request body. The response is a JSON object like [this](#error-response-structure)

### POST /login
- Here I have allowed a user to login with their email and password.
- On a successful login attempt returned a JWT token contatining the userId. 
- If the credentials are incorrect returned a suitable error message with a valid HTTP status code. 


## Blogs API
### POST /blogs
- Created a blog document from request body.
- Authentication middleware is implemented here
- Return HTTP status 201 on a succesful event creation. Also returned the blog document. 
- Return HTTP status 400 for an invalid request.

### GET /blogs
- This api is used for user to see what all blogs that are available 
- Authentication middleware is implemented here

### GET /blogs/:id
- This api is for getting specific blog. User will be giving blogId in params. 
- Authentication middleware is implemented here

### PUT /blogs/:id
- This api is for updating a specific blog. User will be giving blogId in params.
- Authentication middleware is implemented here

### DELETE /blogs/:id
- This api is for deleting a specific event. User will be giving blogId in params.
- Authentication middleware is implemented here


## Comments API
### POST /comments
- Created a comment document from request body.
- Authentication middleware is implemented here
- Return HTTP status 201 on a succesful event creation. Also returned the comment document. 
- Return HTTP status 400 for an invalid request.

### GET /getcomments/:blogId
- This api is used to see all the comments that are available on the blog. User will be giving blogId in params.
- Authentication middleware is implemented here

### GET /comments/:id
- This api is for getting specific comment. User will be giving commentId in params. 
- Authentication middleware is implemented here

### PUT /comments/:id
- This api is for updating a specific comment. User will be giving commentId in params.
- Authentication middleware is implemented here

### DELETE /comments/:id
- This api is for deleting a specific comment. User will be giving commentId in params.
- Authentication middleware is implemented here



### Authentication
- It is implemented on all routes of events api's and logout, change password route of users api's. 

## Response

### Successful Response structure
```yaml
{
  status: true,
  message: 'Success',
  data: {

  }
}
```
### Error Response structure
```yaml
{
  status: false,
  message: ""
}
```

## Collections
## users
```yaml
{
  _id: ObjectId("88abc190ef0288abc190ef02"),
  fname: "John",
  lname: "Doe",
  email: "John@yahoo.com", 
  password: "John@12345",
  "createdAt": "2021-09-17T04:25:07.803Z",
  "updatedAt": "2021-09-17T04:25:07.803Z",
}
```