# Expense Tracker

A full-stack Expense Tracker application built using React, Express.js, Node.js, Tailwind CSS, and Recharts.

## Chosen Exercise

I selected Exercise 2: Mini Expense Tracker because it allowed me to demonstrate full-stack development skills including CRUD operations, filtering, analytics, data visualization, and responsive UI design.

## Features

### Core Features

* Add new expenses
* Edit existing expenses
* Delete expenses
* View all expenses
* Persistent storage using JSON file
* Category-based filtering
* Date range filtering

### Dashboard Features

* Total Spent summary card
* Highest Expense summary card
* Total Transactions summary card
* Total spending per category
* Expense distribution chart

### Additional Features

* CSV Export
* Form validation
* Responsive UI
* Animated summary cards
* Tailwind CSS styling

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Recharts
* Framer Motion
* React Icons
* Axios

### Backend

* Node.js
* Express.js
* CORS

### Storage

* JSON File Storage

## Project Structure

```text
expense-tracker
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── routes
│   ├── data
│   └── server.js
│
└── README.md
```

## Installation

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

## API Endpoints

### Get Expenses

```http
GET /api/expenses
```

### Add Expense

```http
POST /api/expenses
```

### Update Expense

```http
PUT /api/expenses/:id
```

### Delete Expense

```http
DELETE /api/expenses/:id
```

## What Works

* CRUD operations
* Category filtering
* Date range filtering
* Expense summaries
* Expense chart
* CSV export
* Validation
* Responsive UI

## Future Improvements

* User Authentication
* Monthly Budget Tracking
* Advanced Analytics
* Database Integration (MongoDB/PostgreSQL)
* Unit Testing
* Toast Notifications

## Deployment
