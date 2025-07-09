# Konvert Cross-Border Quote API

A backend service for real-time USDT-to-fiat currency conversion, fee calculation, and quote management. Designed for cross-border crypto-to-fiat exchange use cases, with robust admin and export features.

---

## Table of Contents

- [Konvert Cross-Border Quote API](#konvert-cross-border-quote-api)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Features](#features)
  - [Technology Stack](#technology-stack)
  - [Architecture \& Project Structure](#architecture--project-structure)
  - [API Documentation](#api-documentation)
  - [Endpoints](#endpoints)
    - [Public Endpoints](#public-endpoints)
    - [Admin Endpoints](#admin-endpoints)
  - [Setup \& Installation](#setup--installation)
  - [Environment Variables](#environment-variables)
  - [Testing File Downloads](#testing-file-downloads)
  - [Security](#security)
  - [License](#license)

---

## Overview

Konvert provides a RESTful API for converting USDT to local fiat currencies (e.g., NGN, KES, ZAR) using live exchange rates. It calculates fees, stores all quote requests, and offers admin endpoints for data export and monitoring.

The API is documented with Swagger and is deployed to staging and production environments.

---

## Features

- **Live Exchange Rates:** Fetches real-time crypto-to-fiat rates from CoinGecko.
- **Quote Calculation:** Computes fiat value and applies service fees.
- **Quote History:** Persists all quote requests for auditing and analytics.
- **Admin Dashboard:** View and export the latest 50 quotes as CSV.
- **Role-Based Access:** JWT authentication and Casbin authorization for admin endpoints.
- **Swagger Docs:** Interactive API documentation and testing.

---

## Technology Stack

- **Framework:** [NestJS](https://nestjs.com/)
- **Language:** TypeScript
- **Database:** MySQL (via TypeORM)
- **API Integration:** Axios (CoinGecko)
- **Authentication:** JWT
- **Authorization:** Casbin
- **API Docs:** Swagger (OpenAPI)

---

## Architecture & Project Structure

```
src/
├── admin/         # Admin endpoints and services
├── auth/          # JWT auth and Casbin guards
├── common/        # Shared modules, decorators, filters
├── quote/         # Quote logic and services
├── main.ts        # App entry point
└── app.module.ts  # Root module
```

---

## API Documentation

- **Swagger UI:**  
  - **Staging:** `https://konvert-poc.onrender.com/docs`
- **Usage:**  
  - Authenticate via JWT (see `/auth/login` if available).
  - Interact with all endpoints, view schemas, and try requests.

---

## Endpoints

### Public Endpoints

- **POST `/api/quote`**
  - **Description:** Convert a USDT amount to a local fiat currency.
  - **Body:**  
    ```json
    {
      "input_amount": 100,
      "input_currency": "usdt"
      "output_currency": "ngn"
    }
    ```
  - **Response:**  
    ```json
    {
    "exchange_rate": 1531.68,
    "fee": 76584,
    "resulting_fiat_amount": 7658400
    }
    ```

### Admin Endpoints

> **All admin endpoints require JWT authentication and appropriate Casbin permissions.**

- **GET `/admin`**
  - **Description:** Retrieve the 50 most recent quotes.
  - **Response:** Array of quote objects.

- **GET `/admin/export`**
  - **Description:** Download the latest 50 quotes as a CSV file.
  - **Response:** `text/csv` file download.
  - **Note:** Swagger UI cannot download files directly. Use Postman, curl, or a browser.

---

## Setup & Installation

1. **Clone the repository**

2. **Install dependencies**
    ```bash
    pnpm install
    ```

3. **Configure environment**
    - Copy `.env.example` to `.env` and fill in values (see below).

4. **Run database migrations**
    ```bash
    pnpm typeorm migration:run
    ```

5. **Start the server**
    ```bash
    pnpm start:dev
    ```
    The API will be available at `http://localhost:3000`.

---

## Environment Variables

Example `.env`:
```
COIN_GECKO_API_URL=https://api.coingecko.com/api/v3
CONVERSION_FEE_PERCENTAGE=0.01
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=user
DB_PASSWORD=password
DB_DATABASE=konvert
JWT_SECRET=your-secret-key
```

---

## Testing File Downloads

- **Swagger UI:** Cannot download files directly; will show a JSON object instead.
- **Postman:**  
  - Send a `GET` request to `/admin/export` with JWT token.
  - Save the response as a file.
- **curl:**  
    ```bash
    curl -X GET "https://<domain>/admin/export" -H "Authorization: Bearer <token>" -o quotes.csv
    ```

---

## Security

- **Authentication:** JWT required for all admin endpoints.
- **Authorization:** Casbin RBAC restricts access to sensitive routes.
- **Input Validation:** DTO validation for all inputs.
- **Rate Limiting:** To prevent abuse.

---

---

## License

