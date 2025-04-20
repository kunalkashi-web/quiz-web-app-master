## Quiz App

This project is a quiz application built with Next.js 14. It features a timer that tracks the time taken by a user to answer each question and resets for each new question. The app also stores the time spent on each question, allowing for analysis of quiz performance.

## Technologies Used

- Next.js: Framework for server-rendered React applications.
- TailwindCss: CSS Framework for styling the application.
- TypeScript
- React Hooks: Used for state management and side effects (useState, useEffect).
- clsx: For managing class strings.
- react-circular-progressbar: To show progress.
- react-rewards: For confetti animations.
- Axios: HTTP client.

## Running the App with Docker

You can run the application inside a Docker container. To do so, follow the steps below.

### Prerequisites

- Ensure you have [Docker](https://www.docker.com/) installed on your machine.

### Building and Running the Container

1. Build the Docker image:
   ```bash
   docker build -t nextjs-quiz-app
   ```
2. Run the Docker container:
   ```bash
   docker run -p 3000:3000 nextjs-quiz-app
   ```

The application will be available at http://localhost:3000.

## Running the App without Docker

1. First, clone the repository into your local machine.
   ```bash
      git clone https://github.com/kunalkashi-web/quiz-web-app-master
   ```
2. Change directory into the project folder:
   ```bash
     cd quiz-web-app
   ```
3. Open root directory in terminal and run
   ```bash
      npm install
   ```
4. Then run the development server
   ```bash
      npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Endpoints

`/api/quiz/[id]`: [GET] Fetch a specific quiz by ID.\
`/api/quiz/[id]/submission`: [PUT] Save a submission for particulat question by quiz ID.\
`/api/quiz/[id]/score`: [GET] Fetch final score for the quiz by ID.\
