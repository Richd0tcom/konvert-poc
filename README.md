# Cross-Border Quote API (Crypto-to-Fiat Exchange)

This project is a backend service designed to provide real-time quotes for converting USDT to various local fiat currencies (e.g., NGN, KES, ZAR). It fetches live exchange rates, calculates applicable fees, and stores all transaction quotes in a database.

## Table of Contents

- [Cross-Border Quote API (Crypto-to-Fiat Exchange)](#cross-border-quote-api-crypto-to-fiat-exchange)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technology Stack](#technology-stack)
  - [Project Structure](#project-structure)
  - [API Endpoints](#api-endpoints)
    - [Public Endpoints](#public-endpoints)
    - [Admin Endpoints](#admin-endpoints)
  - [Setup and Installation](#setup-and-installation)
  - [Gap Analysis \& Future Improvements](#gap-analysis--future-improvements)

## Features

- **Real-Time Exchange Rates**: Fetches live crypto-to-fiat exchange rates from the CoinGecko API.
- **Quote Generation**: Calculates the final fiat amount after applying a service fee.
- **Quote History**: Stores every quote request in a MySQL database for tracking and auditing.
- **Admin Functionality**: Provides an endpoint for administrators to view the 50 most recent quotes.

## Technology Stack

- **Framework**: [NestJS](https://nestjs.com/)
- **Language**: TypeScript
- **Database**: MySQL
- **ORM**: TypeORM
- **API Integration**: Axios for HTTP requests to CoinGecko
- **Authentication**: Basic JWT setup (incomplete)
- **Authorization**: Casbin for role-based access control (configured but not implemented)

## Project Structure

The project follows a standard NestJS modular architecture:

```
src
├── admin         # Handles admin-specific functionality
├── auth          # Manages user authentication and JWT strategy
├── common        # Shared modules, entities, and constants
├── quote         # Core logic for generating quotes
├── main.ts       # Application entry point
└── app.module.ts # Root module
```

## API Endpoints

### Public Endpoints

- **POST `/api/quote`**
  - **Status**: ⚠️ **Not Implemented**. The core logic exists in `QuoteService`, but the controller endpoint has not been created.
  - **Description**: Intended to accept a USDT amount and a destination country to return a real-time conversion quote.

### Admin Endpoints

- **GET `/admin`**
  - **Status**: ✅ **Implemented**
  - **Description**: Retrieves the last 50 quotes from the database.
  - **Protection**: ⚠️ **Unprotected**. This endpoint is currently public and lacks admin-only access control.

- **GET `/admin/export`**
  - **Status**: ⚠️ **Not Implemented**. The service logic `exportToCSV` exists, but it is not exposed via a controller endpoint.
  - **Description**: Intended to export the last 50 quotes to a CSV file.

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory and populate it with the necessary values (see `.env.example` if available).
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

4.  **Run database migrations:**
    ```bash
    pnpm typeorm migration:run
    ```

5.  **Start the development server:**
    ```bash
    pnpm start:dev
    ```

The application will be running at `http://localhost:3000`.

## Gap Analysis & Future Improvements

This section outlines the discrepancies between the project requirements and the current implementation.

- **`POST /api/quote` Endpoint**: The `QuoteController` is missing the route handler to expose the `getQuote` service method. This is the highest priority gap.

- **Admin Endpoint for CSV Export**: The `exportToCSV` method in `AdminService` is not connected to any controller route, making it inaccessible via the API.

- **Security**: 
  - **Admin Protection**: The admin endpoints are not protected. The existing Casbin configuration should be integrated using a guard to restrict access to authorized administrators.
  - **Input Validation**: There is no validation on the `GetQuoteInput` DTO. Validation pipes should be added to handle invalid inputs like negative amounts or unsupported country codes.
  - **Rate Limiting**: The API is vulnerable to abuse. A rate-limiting solution (e.g., `nestjs-throttler`) should be implemented.

- **Dynamic Fee Structure**: The fee is calculated using a single, hardcoded percentage. The system should be enhanced to support a dynamic, country-based fee structure, potentially managed via a separate database table.

- **Error Handling**: The current error handling is basic. A more robust global exception filter should be implemented to provide clear and consistent error responses.

