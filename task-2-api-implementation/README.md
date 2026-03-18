# Task Management API

A simple REST API for managing tasks with user assignment.

## Endpoints

- `POST /tasks` – Create a new task (requires `x-user-id` header)
- `GET /tasks` – List all tasks (optional filters: `assignedTo`, `status`)
- `PATCH /tasks/:id` – Update task title/priority (only assigner)
- `PATCH /tasks/:id/status` – Update task status (only assignee)
- `PATCH /tasks/:id/unassign` – Unassign task (only assigner)
- `DELETE /tasks/:id` – Delete task (only assigner)

## How to run

1. Clone the repository
2. Run `npm install`
3. Run `npm start`
4. API will be available at `http://localhost:3000`

## Authentication

Include the header `x-user-id: <userId>` with every request.
