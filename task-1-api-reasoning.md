1. Validation: Before an order can be created, the system should perform both data validation and business logic validation. Data validation ensures that the request structure and types are correct, while business logic validation ensures that the operation is feasible and consistent with the current state.
    Data Validation:
      1. The required fields must be present. The request body must contain               userId and items
      2. Data types:
         userId must be a positive integer
         items must be a non-empty array
         Each items in items must be an object containing productId (positive integer) and quantity (positive integer, usually greater than 0)
    Business Logic Validation:
      1. User existence and Validity: The userId must correspond to an                   existing user in the system, and that user should be permitted to             place an order, i.e., it must not be an inactive account or a                blocked account.
      2. Product existence: Every productId in the items must correspond to             an existing product.
      3. Stock availability: For each product, the requested quantity must be           less than or equal to the available stock.
      4. Duplicate items: If the same product appears multiple times, the               quantities should be merged or rejected to avoid ambiguity.
  2. Possible Errors
     1. Invalid user: The userId does not exist, or the user is not                   authorised to place orders.
     2. Product not found: One or more productId values do not match any               product in the catalogue.
     3. Insufficient stock: The requested quantity for a product exceeds the           available inventory.
     4. Invalid quantity: The quantity field is zero, negative, or not a               number.
     5. Database product entries: a temporary issue with the database                 prevents order creation.
     6. Business rule violation: The order total is below a minimum required         amount, or the user has exceeded a daily order limit.
        
  3. HTTP Responses
     1. Successful order creation: The status code that is returned is "201           created" The POST request has resulted in the creation of a new               resource (the order)
     2. Invalid request body: The status code that is returned is "400 Bad             Request". The reason is that the request cannot be processed due to           malformed syntax or a missing required field. This means there is an           error on the client side in the request format.
     3. Product not found: The status code that is returned is "404 Not               Found". The resource identified by the productId does not exist. Even         though the POST target is /orders, the request references a non-              existent product, which is similar to a "not found" condition.
     4. Server error: The status code that is returned is "500 Internal                 Server Error". The reason may be  due to an unexpected condition              which occurred on the server that prevents fulfilling the request.            This error indicates that it is not the client's fault.
      
   
   
   

