## ECOM

Basic backend for ecommerce platform.

Packages used - bcrypt, jsonwebtoken, express.js, mongoose also typescript is used to maintain type safety in code.

To test this project convert `sampleenv` file to `.env` and change variables.

Also, you to test it with postman, import `thunder-collection_ecom_postman.json` file in a Postman environment.

---

### Models

Models are defined along with corresponding interfaces to maintain type safety in the codebase.

---

### Controllers

Defined functionalities in the separate files from route files for a neat and readable codebase.

---

### Database

MongoDB database is used along with Mongoose ODM to maintain schema.

---

### Routes

Using express.js allows us to deliver robustly and also modularise code in separate files. All different routes are defined in their corresponding file. Also middleware

#### Auth `/auth`

1. `POST` `/login`  
    input `username`, `password` in the request body and if the credentials are correct it will return a JWT in authorization header.

2. `POST` `/signin`
    input `username`, `password`, `name` in the request body and if `username` is available and the credentials are valid it will return JWT in authorization header.

3. `GET` `/`
    logout` Clears authorization header.


#### Product `/product`

1. `POST` `/`
    To create a product, pass in the fields `title`, `availability`, `categoryId`, `description`, `price`.

2. `DELETE` `/:id`
    only authorized users can delete a product
    To delete a product from the database pass in the product id. 

3. `GET` `/`
    To get the list of products pass `query` required parameter and optional parameters like `minPrice`, `maxPrice`, `availability`, `categoryId`.

4. `GET` `/:id` 
    To receive a specific product pass `id` to get detailed information.

#### Order `/order`
    The secured route, using auth middleware.

1. `POST` `/`
    provide `itemRef` in the request body to create an order.

2. `GET` `/`
    returns all the orders of authorized user.

3. `GET` `/:id`
    return detailed information about specific order.

#### Cart `/cart`
    The Secured route using auth middleware.

1. `POST` `/`
    pass `productId`, `quantity` in the request body to add product in the authorized user cart.

2. `GET` `/`
    returns all products in the authorized user cart. 

3. `PUT` `/:id` 
    update the quantity of a specific product pass `quantity` in the query. It will increment the previous value by given value.

4. `DELETE` `/`
    clear the cart of the authorized user.

5. `DELETE` `/:id`
    remove a particular product from user's cart.

#### Category `/category`

1. `POST` `/`
    pass `name`, `description` to add a category, returns the category id.

2. `GET` `/`
    returns all category `name` and `id`.

3. `GET` `/:id` 
    returns detailed information about the category for the provided `id`.
