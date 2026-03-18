1. How I approached the implementation
   I started by understanding the business rules and required endpoints. I     then structured the code around RESTful principles, with clear separation     of concerns:
   1. Middleware for extracting the authenticated user (x-user-id).
   2. Route handlers for each endpoint, each performing validation,                authorisation, and the core operation.
   3. In‑memory storage for simplicity, but designed to be easily replaced         by a database later.
   4. Global error handler to catch unexpected errors and return a                 consistent 500 response.
  2. Why I structured the code the way I did
     1. Modularity: Each route handler is self‑contained, making it easy to
        test and modify.
     2. Explicit validation: I manually check each field to return helpful           error messages. This improves developer experience and security.
     3. Authorisation checks are placed immediately after finding the task,           so the logic is clear and secure.
     4. Use of HTTP status codes follows standards (201, 400, 403, 404, 204)         to make the API intuitive.
  3. Assumptions I made
     1. The x-user-id header reliably represents the authenticated user. In         a real system, this would come from an authentication token (JWT)             after proper login.
     2. User IDs are integers and exist (no validation against a user table         – that would be added in a real implementation).
     3. The assignedBy field in the creation request must match the                   authenticated user – this prevents impersonation.
     4. When unassigning, I set assignedTo to null. An alternative could be           to remove the field entirely, but null is explicit.
     5. Priority values are limited to low, medium, and high. This could be           extended.
  4. What I would improve on given more time
     1. Add a database layer – Persistent storage with transactions and               indexes.
     2. Implement authentication – Replace the header with a proper JWT               middleware.
     3. Use a validation library – Like Joi or Zod to reduce boilerplate and         improve consistency.
     4. Add logging – Structured logging (e.g., with Winston) for debugging           and monitoring.
     5. Write tests – Unit and integration tests to ensure correctness and           prevent regressions.
     6. Add more endpoints – E.g., GET /tasks/:id to fetch a single task.
     7. Implement soft deletes – Instead of permanent deletion, mark tasks           as deleted to preserve history.
   5. Tools or AI assistance used
        I used Node.js, Express, and REST API design. For the code, I wrote          it manually, with the assistance of deepseekAI 
