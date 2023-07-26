# handcrafted-harmony-ui

## Overview

Handcrafted Crafts is a web application for a small business that sells handmade crafts online. The application allows the business owner to manage their crafts, including adding new crafts, editing existing ones, and viewing a list of all crafts for sale. Customers can browse and purchase crafts through the public-facing page. The frontend of the application is built using Bootstrap and Next.js.

## Features

- The business owner can log in to access a dashboard for managing crafts.
- The dashboard allows the business owner to Create, Read, Update, and Delete crafts.
- Validate form inputs for proper data entry and display error messages for invalid inputs.
- The business owner can view analytics related to craft sales, such as total sales and top-selling crafts.
- Support for database connectivity with a relational or non-relational database.

## Technology Stack

- Frontend: NextJS, Redux, React hooks, Axios
- CSS Framework: Bootstrap with Atomic design
- Backend: Node.js & Express
- Database: MongoDB

## Installation

1. Clone the repository: `git clone [repository-url]`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## Configuration

- The application makes API requests to the backend server, which should be running on a specific URL. Set the backend URL in the .env file.

## Testing

Unit tests and integration tests are implemented using the React Testing Library. To run the tests, use the following command:

```bash
npm run test
```

## Authors

Aravinda Meewalaarachchi