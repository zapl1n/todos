## Newspaper

Newspaper is a simple express app that allows you to create a simple blog.

### Installation

1. Clone the repo
2. Run `cp backend/.env.example backend/.env` to create the backend environment file
3. Run `cp frontend/.env.example frontend/.env` to create the frontend environment file
4. Run `npm run install` to install the dependencies for both the frontend and the backend
5. Run `cd backend && npx prisma db push && cd ..` to create the database tables
6. Run `npm run dev` from the project root directory to start the frontend and the backend servers at the same time
7. Go to `localhost:5173` to see the app

### Documentation

The API documentation is at [http://localhost:3000/docs](http://localhost:3000/docs)

### Tests

To run backend tests, run `npm test in the backend directory`

