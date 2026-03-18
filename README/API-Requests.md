# API Requests

This document contains example requests for the Task Management API.

## Base URL
All requests are made to `http://localhost:3000`.

## Headers
Every request (except maybe the server check) must include:
- `x-user-id: <userId>` – to identify the authenticated user.

---

## 1. Create a Task
**POST** `/tasks`

### Request Body
```json
{
  "title": "Complete assessment",
  "priority": "high",
  "assignedTo": 2,
  "assignedBy": 1
}
