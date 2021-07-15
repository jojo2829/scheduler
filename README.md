# Interview Scheduler
This project is a single page interview booking system.
- The project focuses on a single page application, built using React.
- Data is persisted by the API server using a PostgreSQL database.
- The client application communicates with an API server over HTTP, using the JSON format.
- Jest tests are used through the development of the project.

## Final Product

!["Create new appointment"](https://github.com/jojo2829/scheduler/blob/master/docs/create-new-appointment.png?raw=true)
!["Appointment created"](https://github.com/jojo2829/scheduler/blob/master/docs/appointment-created.png?raw=true)
!["Confirmation before deleting an appointment"](https://github.com/jojo2829/scheduler/blob/master/docs/confirmation.png?raw=true)
!["Error message when encounter error"](https://github.com/jojo2829/scheduler/blob/master/docs/error-message.png?raw=true)

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Cypress Testbed
please use test database for this

```sh
npm run cypress
```

## Technology stack
- React
- Webpack, Babel
- PostgreSQL
- Axios, WebSockets
- Storybook, Webpack Dev Server, Jest, Testing Library