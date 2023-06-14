# Api Specs PadiCare App
## Base url
https://api-padicare-services-u32uxejmvq-et.a.run.app/

## List Features
  - Login
  - Register
  - Get Post
  - Add Post
  - Add Comment
  - Get Comment
  - Delete Comment
  - Scan Image
  - Update Photo Profile User
  - Update Profil
  - Logout


## Scan image
 
- URL
	 - /scan  
-   Method
    -   POST
-   Headers
    -   `Content-Type`:  `multipart/form-data`
    -   `Authorization`:  `Bearer <token>`
-   Request Body
    -   `photo`  as  `file`, must be a valid image file, max size 1MB
- Response
```json
        {
           "error": false,
           "data" : {
	           "name": "Penyakit Hawar Daun Bakteri (HDB)",
	           "desc" : "Penyakit hawar daun bakteri (HDB) merupakan salah satu penyakit pada tanamam padi. Penyakit ini disebabkan oleh bakteri Xanthomonas oryzae pv. oryzae (Xoo). Patogen ini dapat mengenfeksi tanaman padi pada semua fase pertumbuhan tanaman dari mulai pesemaian sampai menjelang panen.",
	           "solution" : "Donec sodales metus sed tempor lobortis. Praesent ornare orci eu vulputate pretium. Vivamus accumsan nisl urna, quis viverra diam aliquam eu. Sed porta sed dolor id porttitor. Proin tristique, orci a mollis mollis, purus risus egestas leo, a bibendum sem nunc nec sem. Aenean sollicitudin nec dui non hendrerit. Mauris fermentum nulla ex, sit amet pellentesque odio fringilla fermentum.Donec sodales metus sed tempor lobortis. Praesent ornare orci eu vulputate pretium. Vivamus accumsan nisl urna, quis viverra diam aliquam eu. Sed porta sed dolor id porttitor. Proin tristique, orci a mollis mollis, purus risus egestas leo, a bibendum sem nunc nec sem. Aenean sollicitudin nec dui non hendrerit. Mauris fermentum nulla ex, sit amet pellentesque odio fringilla fermentum."
           }
        }
  ````

## Upload Post
- URL
	 - /post  
-   Method
    -   POST
-   Headers
    -   `Content-Type`:  `multipart/form-data`
    -   `Authorization`:  `Bearer <token>`
-   Request Body
	- `title` as `string`
  	- `description` as `string`
    -  `photo`  as  `file`, must be a valid image file, max size 1MB
- Response 
    ```json
        {
            "error": false,
            "message": "Post success created"
        }
    ``` 
##  Get All Post
- URL
	- /post
- Method
	- GET
- Parameters
	- `page`  as  `int`, optional
	- `size`  as  `int`, optional
- Headers
    - `Authorization`:  `Bearer <token>`
- Response
    ```json
    {
        "error": false,
        "message": "Posts successfully fetched",
        "listPost": [
            {
                "id": "post-7b12e659-e7ac-43c2-bad3-6486427c3c68",
                "title": "hello",
                "description": "test post",
                "userId": "user-94076d92-a1d9-4672-a503-5dec3517f91f",
                "photoUrl": "https://storage.googleapis.com/padicare/290183b1-6666-4eb5-837d-9470f9fc642a.jpeg",
                "like": 0,
                "views": 0,
                "createdAt": "2023-05-31T02:46:14.000Z",
                "updatedAt": "2023-05-31T02:46:14.000Z",
                "user": {
                    "username": "user-1",
                    "photoUrl": null
                }
            }
        ]
    }
    ```
## Get Detail Post
- URL
	- /post/:id
- Method
	- GET
-   Headers
    -   `Authorization`:  `Bearer <token>`
- Response
    ```json
    {
        "error": false,
        "message": "Post successfully fetched",
        "data": {
            "id": "post-7b12e659-e7ac-43c2-bad3-6486427c3c68",
            "title": "post test",
            "description": "post test 1",
            "userId": "user-94076d92-a1d9-4672-a503-5dec3517f91f",
            "photoUrl": "https://storage.googleapis.com/padicare/290183b1-6666-4eb5-837d-9470f9fc642a.jpeg",
            "like": 0,
            "views": 0,
            "createdAt": "2023-05-31T02:46:14.000Z",
            "updatedAt": "2023-05-31T02:46:14.000Z"
        }
    }
    ```

## Login

-   URL
    -   `/login`
-   Method
    -   POST
-   Request Body
    -   `email`  as  `string`
    -   `password`  as  `string`
-   Response
    
    ```json
    {
        "error": false,
        "message": "success",
        "loginResult": {
            "userId": "user-yj5pc_LARC_AgK61",
            "name": "Arif Faizin",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VyLXlqNXBjX0xBUkNfQWdLNjEiLCJpYXQiOjE2NDE3OTk5NDl9.flEMaQ7zsdYkxuyGbiXjEDXO8kuDTcI__3UjCwt6R_I"
        }
    }
    ```
##  Register

-   URL
    -   `/register`
-   Method
    -   POST
-   Request Body
    -   `name`  as  `string`
    -   `email`  as  `string`, must be unique
    -   `password`  as  `string`, must be at least 8 characters
-   Response
    
    ```json
    {
        "error": false,
        "message": "User Created"
    }
    ```

## Add Comment

-   URL
    -   `/posts/:idPost/comment`
-   Method
    -   POST
-   Request Body
    -   `comment`  as  `string`
-   Response
    
    ```json
    {
        "error": false,
        "message": "Comment added!"
    }
    ```

## Get Comment
-   URL
    -   `/posts/:idPost/comment`
-   Method
    -   GET
-   Request Body
    -   `comment`  as  `string`
-   Response
    
    ```json
    {
        "error": false,
        "listComment": [
            {
                "id": "comment-c3b47a6f-bd3a-43d0-ba19-0f8a7a6ade6b",
                "comment": "coba 1",
                "userId": "user-94076d92-a1d9-4672-a503-5dec3517f91f",
                "postId": "post-7b12e659-e7ac-43c2-bad3-6486427c3c68",
                "createdAt": "2023-05-31T05:18:44.000Z",
                "updatedAt": "2023-05-31T05:18:44.000Z"
            }
        ]
    }
    ```

## Dependencies

### Google Cloud Storage
https://cloud.google.com/storage/docs

### Tensorflow JS
https://www.tensorflow.org/js

### Bcrypt
https://www.npmjs.com/package/bcrypt

### Body Parser
https://www.npmjs.com/package/body-parser

### Dotenv
https://www.npmjs.com/package/dotenv

### Express JS
https://expressjs.com/

### JSON Webtoken
https://www.npmjs.com/package/jsonwebtoken

### Multer
https://www.npmjs.com/package/multer

### MySQL
https://dev.mysql.com/doc/

### Sequelize
https://www.npmjs.com/package/sequelize

### UUID
https://www.npmjs.com/package/uuid
