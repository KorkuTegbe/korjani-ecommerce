# Korjani-API
This is an api for an e-commerce shop. 

---
## Built with
- Nodejs
- Express.js
- Mongodb
- Javascript
---

### Links

- Solution URL: https://github.com/KorkuTegbe/korjani-API
- Live Site URL: 
---
## Requirements
<details>
<summary>Project Requirements</summary>
</details>

---
## Setup
- Install NodeJS, mongodb
- pull this repo
- update env 
- run `npm run start`

---
## Base URL
<!-- - https://myblogapi.cyclic.app/ -->


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
  "imageg": "/uploads/img.jpg",
  "categories": [
    "product", "for sale"
  ],
  "size": "size",
  "color": "color",
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
    message: 'Product deleted'
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
    - per_page (default: 10)
    - createdAt
    - name
    - price
    - size
    - color
    - categories


- Responses
    - Success
```
{
    status: 'success',
    results: 10,
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


### Get A product (all users - logged in or out)

- Route: /api/products/productId
- Method: GET

- Responses

    - Success
```
{
    "status": "success",
    "data": {
        "product": {
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

### Get owner's product

- Route: /api/products/userId
- Method: GET
- Query params: 
    - page (default: 1)
    - per_page (default: 10)
    - createdAt
    - name
    - price
    - size
    - color
    - categories

- Responses

Success
```
{
    status: 'success',
    results: 10,
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
---

### Create Order (logged in user)

- Route: /api/orders/
- Method: POST
- Header
    - Authorization: Bearer {token}
- Body: 
```
{
  "products": [
      {
        "productId": "12345jfhgs",
        "quantity": 3
      }
  ],
  "address": { 
    "digital":"ga-250-321"
  }
}
```

- Responses

  - Success
```
{
  "status": "success",
    "data": {
        "order": {
            "userId": "9000000jvnie09",
            "products": {
                {
                  "productId": "637ffd05f5c5b3b6a1ec6242",
                  "quantity": 3,
                  "_id": "jk3940234"
                }
            ],
            "address": {
                "digital-address": "GA-350-9812"
            },
            "status": "pending",
            "createdAt": "2022-11-25T21:49:54.000Z",
            "updatedAt": "2022-11-25T21:49:54.000Z",
            "id": "634fgdada"
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

### Update Order (logged in user)

- Route: /api/orders/orderId
- Method: PATCH
- Header
    - Authorization: Bearer {token}
- Body
```
{
  "products": [
    {
        "productId": "637d707f48b407f0bf57f2cb",
        "quantity": 12
    },
    {
        "productId": "637d707f48b407f0bf57f2cb",
        "quantity": 12
    }
    ],
    "address": {
        "street": "ofori tibo"
    }
}

```
- Responses
    - success
```
{
    "status": "success",
    "data": {
        "update": {
          "userId": "637d04e1b62da291b8c861ee",
          "products": [
              {
                  "productId": "637d707f48b407f0bf57f2cb",
                  "quantity": 12,
                  "_id": "134vr32r45"
              }
          ],
          "address": {
              "street": "ofori tibo"
          },
          "status": "pending",
          "createdAt": "2022-11-25T21:49:54.000Z",
          "updatedAt": "2022-11-25T21:53:45.328Z",
          "id": "63813881a9b2b98cf401321a"
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

### Delete Order 

- Route: /api/orders/orderId
- Method: DELETE
- Header:
    - Authorization: Bearer {token}

- Responses
    - Success
```
{
    status: 'success',
    message: 'Order deleted'
}
```
 - error
```
{
  "status": "error",
  "message": error message,
}

```

### Get Orders (all users - logged in or out)

- Route: /api/orders/userId
- Method: GET
- Request Params
    - userId
- Query params: 
    - page (default: 1)
    - per_page (default: 10)
    - createdAt
    - name
    - price
    - size
    - color
    - categories


- Responses
    - Success
```
{
    status: 'success',
    results: 10,
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

...

## Contributor
- Justice Etorko-Gbeku


