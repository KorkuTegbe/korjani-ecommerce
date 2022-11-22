# Zainaku or Korjani-API
This is an api for a blog. Altschool Africa Nodejs second semester project 

---
## Built with
- Nodejs
- Express.js
- Mongodb
- Javascript
---

### Links

- Solution URL: https://github.com/KorkuTegbe/Blog-API
- Live Site URL: https://myblogapi.cyclic.app/
---
## Requirements
<details>
<summary>Project Requirements</summary>
1. Users should have a first_name, last_name, email, password, (you can add other attributes you want to store about the user)
2. A user should be able to sign up and sign in into the blog app
3. Use JWT as authentication strategy and expire the token after 1 hour
4. A blog can be in two states; draft and published
5. Logged in and not logged in users should be able to get a list of published blogs created
6. Logged in and not logged in users should be able to to get a published blog
7. Logged in users should be able to create a blog.
8. When a blog is created, it is in draft state
9. The owner of the blog should be able to update the state of the blog to published
10. The owner of a blog should be able to edit the blog in draft or published state
11. The owner of the blog should be able to delete the blog in draft or published state
12. The owner of the blog should be able to get a list of their blogs. 
  a. The endpoint should be paginated
  b. It should be filterable by state
13. Blogs created should have title, description, tags, author, timestamp, state, read_count, reading_time and body.
14. The list of blogs endpoint that can be accessed by both logged in and not logged in users should be paginated, 
  a. default it to 20 blogs per page. 
  b. It should also be searchable by author, title and tags.
  c. It should also be orderable by read_count, reading_time and timestamp
15. When a single blog is requested, the api should return the user information(the author) with the blog. The read_count of the blog too should be updated by 1
16. Come up with any algorithm for calculating the reading_time of the blog.
17. Write tests for all endpoints
</details>

---
## Setup
- Install NodeJS, mongodb
- pull this repo
- update env 
- run `npm run start:dev`

---
## Base URL
- https://myblogapi.cyclic.app/


## Models
---

### User
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required |
|  email |  string |  required |
|  username | string  |  required|
|  password     | string  |  required |


### Product
| field  |  data_type | constraints  |
|---|---|---|
|  name |  string |  required, unique |
|  desc |  string |  required |
|  img | string  |  required|
|  categories  |  array |  required  |
|  size  |  string |  required  |
|  owner     | ref User  |  required |
|  color |   string |  required,  |
|  price |  number |  required, default: 0 |
|  quantity |  number |  required, default: 1 |
|  createdAt |  date |  required |
|  updatedAt  |  date |  required  |


### Order
| field  |  data_type | constraints  |
|---|---|---|
|  userId |  ref User |  required |
|  products |  array |  required |
|  address | object  |  required|
|  status  |  string |  required , default: pending |
|  createdAt |  date |  required |
|  updatedAt  |  date |  required  |


### Cart
| field  |  data_type | constraints  |
|---|---|---|
|  userId |  ref User |  required |
|  products |  array |  required |
|  createdAt |  date |  required |
|  updatedAt  |  date |  required  |



## APIs
---

### Signup User

- Route: /auth/signup
- Method: POST
- Body: 
```
{
  "email": "example@mail.com",
  "username": "jon",
  "password": "somePassword"
}
```

- Responses

    - Success
```
{
    status: "success"
    message: 'Signup successful',
    "user": {
        "email": "example@mail.com",
        "username": "jon",
        "id": "12345f678"
       }   
    }
}
```
- error
```
{
    status: "error",
    message: 'error message',
}
```

---
### Login User

- Route: /auth/login
- Method: POST
- Body: 
```
{
  "email": "example@mail.com",
  "username: "example"
  "password": "somePassword",
}
```

- Responses

    - Success
```
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "userId": "6366f7b0aa0dd83e768f7d3b",
    "email": "korku@mail.com",
    "token": "eyJhbGciOiJIUzI1NiIs"
  }
}
```
- error
```
{
  "status": "error",
  "message": error message,
}

```

---
### Create product (logged in user)

- Route: /api/products/
- Method: POST
- Header
    - Authorization: Bearer {token}
- Body: 
```
{
  "name": "Product 1",
  "desc": "about product 1",
  "img": "img.jpg",
  "categories": [
    "product", "for sale"
  ],
  "size": "size",
  "color": "color",
  "quantity": 2,
  "price" : 20
}
```

- Responses

  - Success
```
{
  "status": "success",
  "data": {
    "product": {
      {
        "_id": "6376a3074b9a854579655bc9",
        "name": "product 1",
        "desc": "about product 1",
        "img": "img.jpg",
        "categories": [
            "product", "for sale"
        ],
        "size": "size",
        "color": "color",
        "price": 20,
        "quantity": 2,
        "owner": "userId3894r5",
        "createdAt": "2022-11-17T21:09:27.866Z",
        "updatedAt": "2022-11-19T20:43:39.707Z",
        "__v": 0
    }
    }
  }
}
```
- error
```
{
  "status": "error",
  "message": error message,
}

```
---

### Update Product (logged in owner)

- Route: /api/products/blogId
- Method: PATCH
- Header
    - Authorization: Bearer {token}
- Body
```
{
  "name": 'a new name',
  "desc": 'here's a description',
  "price": 30
}

```
- Responses
    - success
```
{
    "status": "success",
    "data": {
        "update": {
            "_id": "productId",
            "name": "a new name",
            "desc": "here's a description",
            "img": "img.jpg",
            "categories": [
            "product", "for sale"
              ],
            "size": "size",
            "color": "color",
            "price": 20,
            "quantity": 2,
            "owner": "userId3894r5",
            "createdAt": "2022-11-17T21:09:27.866Z",
            "updatedAt": "2022-11-21T10:27:54.237Z",
            "__v": 0
        }
    }
}
```
 - error
```
{
  "status": "error",
  "message": error message,
}

```

### Delete product (logged in owner)

- Route: /api/products/productId
- Method: DELETE
- Header:
    - Authorization: Bearer {token}

- Responses
    - Success
```
{
    status: 'success',
    message: 'Blog deleted'
}
```
 - error
```
{
  "status": "error",
  "message": error message,
}

```

### Get Products (all users - logged in or out)

- Route: /api/products/
- Method: GET
- Query params: 
    - page (default: 1)
    - per_page (default: 20)
    - state(default: 'published')
    - created_at
    - author
    - title
    - tags

- Responses
    - Success
```
{
    status: 'success',
    results: 20,
    data: {
        [{products}]
    }
}
```
- error
```
{
  "status": "error",
  "message": error message,
}

```


### Get A Published Blog (all users - logged in or out)

- Route: /api/blog/blogId
- Method: GET

- Responses

    - Success
```
{
    status: 'success',
    data: {
        "blog": {
      "_id": "blogId",
      "title": "blog title",
      "tags": [blog tags],
      "author": {
        "first_name": "first_name",
        "last_name": "last_name",
        "id": "authorId"
      },
      "state": "published",
      "read_count": 0,
      "createdAt": "2022-11-05T23:56:33.095Z",
      "updatedAt": "2022-11-06T17:03:04.565Z",
      "reading_time": "1"
    }
}
```
- error
```
{
  "status": "error",
  "message": error message,
}

```

### Get owner blogs

- Route: /api/blog/userId
- Method: GET
- Query params: 
    - page (default: 1)
    - per_page (default: 20)
    - state(default: 'published')
    - created_at
    - title
    - tags

- Responses

Success
```
{
    status: 'success',
    results: 20,
    data: {
        [{blogs}]
    }
}
```
- error
```
{
  "status": "error",
  "message": error message,
}

```
---

...

## Contributor
- Justice Etorko-Gbeku


