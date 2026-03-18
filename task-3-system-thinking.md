1. Scaling: With thousands of requests per minute, this task API might encounter several issues, such as:
  1. Memory Exhaustion: As the number of tasks grows, memory consumption             increases linearly. Under high load, the process may exceed its                allocated memory and crash, or cause frequent garbage collection pauses.
  2. Concurrency and Data Inconsistency: Simultaneous requests modifying the      same task ( e.g., two PATCH operations) can lead to lost updates or         inconsistent state because there is no locking mechanism. Node.js is         single-threaded, but asynchronous operations can interleave, causing         race  conditions.
  3. CPU Bottleneck: Although Node.js handles I/O efficiently, CPU-intensive      operations can block the event loop, increasing response times for all       users.
  4. Increased Latency: Without caching, every request performs a linear           scan of the tasks array. As the dataset grows, response times degrade,       and the API becomes slower for all clients.
2. Performance Improvements: To handle high load, I would apply several techniques:
   1. Use a Real Database: Replace the in‑memory array with a                       production‑grade database (PostgreSQL, MongoDB, etc.). Databases             provide efficient indexing (e.g., on assignedTo, status), ACID               transactions, and connection pooling. This eliminates memory                 limitations and enables horizontal scaling.
   2. Add Caching: For read‑heavy endpoints like GET /tasks, introduce a           caching layer (e.g., Redis) to store frequently accessed data. Cache         invalidation can be triggered when tasks are created, updated, or             deleted.
   3. Optimise Database Queries: Use indexes on columns used in WHERE               clauses (assignedTo, status). For complex filters, consider full‑text        search or dedicated search engines.
      
3. Production Monitoring: To ensure the API is healthy, I would monitor:
    1. Response Time (Latency): Track average, p95, and p99 response times           for each endpoint. Sudden increases indicate performance degradation.
    2. Error Rate: Monitor HTTP status codes (4xx, 5xx) as a percentage of           total requests. A spike in 5xx errors signals server issues; 4xx may        indicate client problems or misconfigurations.
    3. CPU and Memory Usage: High CPU usage may point to inefficient code or         a DoS attack. Memory leaks cause gradual growth and eventual crashes.
    4. Database Performance: Monitor query execution times, connection pool         usage, and slow queries. Database CPU and disk I/O are also critical.
    5. Request Rate: Track total requests per minute to detect traffic               spikes.
    6. Active Users / Concurrent Connections: Helps capacity planning.
    7. Garbage Collection Metrics: In Node.js, frequent long GC pauses              indicate memory pressure.



