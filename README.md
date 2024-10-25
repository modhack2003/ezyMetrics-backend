# API Documentation

## Overview

This API, built with Express and MongoDB, supports operations for managing leads, campaigns, and generating reports. It also includes mock endpoints to simulate a CRM API for testing purposes.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Running the API](#running-the-api)
- [API Endpoints](#api-endpoints)
  - [Campaign Routes](#campaign-routes)
  - [Lead Routes](#lead-routes)
  - [Mock API Routes](#mock-api-routes)
  - [Report Routes](#report-routes)

---

## Prerequisites

Ensure you have the following installed:

- Node.js
- MongoDB
- A `.env` file configured with the necessary environment variables

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd <repository_folder>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up MongoDB and configure environment variables.

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```plaintext
PORT=3000                    # Server port (default: 3000)
DB_URI=mongodb://<username>:<password>@<host>:<port>/<database>
EMAIL_USER=<email_user>      # (Optional) Email username for logging
EMAIL_PASS=<email_pass>      # (Optional) Email password for logging
EMAIL_RECIVER=<email_user>      # (Optional) Report reciveing email
ETL_RUN_FREQUENCY=<hours>  # For example, how often the ETL should run (if applicable)
```

## Running the API

Start the server:

```bash
npm start
```

Or, if you’re using `nodemon` for development:

```bash
npm run dev
```

The server will be running on `http://localhost:<PORT>`.

---

## API Endpoints

### Campaign Routes

**Base URL**: `/api/campaigns`

| Method | Endpoint | Description                  |
|--------|----------|------------------------------|
| GET    | `/`      | Retrieve all campaigns       |

Example:
```bash
GET http://localhost:<PORT>/api/campaigns
```

### Lead Routes

**Base URL**: `/api/leads`

| Method | Endpoint | Description                  |
|--------|----------|------------------------------|
| GET    | `/`      | Retrieve all leads           |
| POST   | `/`      | Add a new lead               |

Example:
```bash
POST http://localhost:<PORT>/api/leads
Content-Type: application/json

{
  "name": "New Lead",
  "email": "lead@example.com"
}
```

### Mock API Routes

**Base URL**: `/api`

| Method | Endpoint          | Description                    |
|--------|--------------------|--------------------------------|
| GET    | `/crm/leads`      | Get a list of dummy leads      |
| GET    | `/crm/campaigns`   | Get a list of dummy campaigns  |

Example:
```bash
GET http://localhost:<PORT>/api/crm/leads
```

### Report Routes

**Base URL**: `/api/reports`

| Method | Endpoint | Description               |
|--------|----------|---------------------------|
| GET    | `/pdf`   | Generate and retrieve PDF |

Example:
```bash
GET http://localhost:<PORT>/api/reports/pdf
```

---

## Additional Information

- The **ETL process** starts automatically upon MongoDB connection.
- **Logging**: Sensitive data logs (`EMAIL_USER` and `EMAIL_PASS`) are used here for environment testing; remove or secure them in production.

---

Contributions are welcome!
