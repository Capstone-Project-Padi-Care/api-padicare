# Api Specs PadiCare App
## Base url
https:://api.padicare.com/

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
    -   `photo`  as  `file`, must be a valid image file, max size 1MB
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
 -   Parameters
	 - `page`  as  `int`, optional
	  - `size`  as  `int`, optional
-   Headers
    -   `Authorization`:  `Bearer <token>`
- Response
```json
	{
		"error": false,
		"message": "Post successfully fetched",
		"listPost": [
			{
				"id": "post-FvU4u0Vp2S3PMsFg",
				"title": "Penyakit Hawar Daun Bakteri (HDB)",
	            "desc" : "Penyakit hawar daun bakteri (HDB) merupakan salah satu penyakit pada tanamam padi. Penyakit ini disebabkan oleh bakteri Xanthomonas oryzae pv. oryzae (Xoo). Patogen ini dapat mengenfeksi tanaman padi pada semua fase pertumbuhan tanaman dari mulai pesemaian sampai menjelang panen.",
		        "createdAt": "2022-01-08T06:34:18.598Z"
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
				"id": "post-FvU4u0Vp2S3PMsFg",
				"title": "Penyakit Hawar Daun Bakteri (HDB)",
	            "desc" : "Penyakit hawar daun bakteri (HDB) merupakan salah satu penyakit pada tanamam padi. Penyakit ini disebabkan oleh bakteri Xanthomonas oryzae pv. oryzae (Xoo). Patogen ini dapat mengenfeksi tanaman padi pada semua fase pertumbuhan tanaman dari mulai pesemaian sampai menjelang panen.",
		        "createdAt": "2022-01-08T06:34:18.598Z"
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
##  Update User

-   URL
    -   `/user`
-   Method
    -   PUT
-   Request Body
    -   `name`  as  `string`
    -   `email`  as  `string`, must be unique
    -   `password`  as  `string`, must be at least 8 characters
-   Response
    
    ```json
    {
      "error": false,
      "message": "User Edited"
    }
    ```
