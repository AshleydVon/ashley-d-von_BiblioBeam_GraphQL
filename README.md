# ashley-d-von_BiblioBeam_GraphQL
📚✨ BiblioBeam: GraphQL-Google Books API powered book search. Discover, save, and manage your reads with ease.
### Google Books Search Engine with GraphQL

### Description

This project refactors a fully functional Google Books API search engine from a RESTful API to use GraphQL with Apollo Server. The app is built using the MERN stack (MongoDB, Express.js, React, Node.js) and enables users to search for books and save them to their personal accounts.

The application allows for user authentication, book saving, and viewing saved books, all powered by GraphQL and Apollo.

## Table of Contents

Installation
Usage
Technologies
Features
Contributing
License
Installation

## To install and run the application locally, follow these steps:

1. Clone the repository:
bash
Copy code
git clone https://github.com/YOUR_GITHUB_USERNAME/GoogleBooksGraphQL.git
2. Navigate into the project directory:
bash
Copy code
cd GoogleBooksGraphQL
3. Install the necessary dependencies:
bash
Copy code
npm install
4. Set up environment variables:
Create a .env file in the root of the project and add your MongoDB URI and JWT secret:

makefile
Copy code
MONGODB_URI=mongodb+srv://<your-mongodb-uri>
SECRET=your-secret-key
5. Start the server and client concurrently:
bash
Copy code
npm run develop
This command will start both the Node.js/Express server and the React front-end application.

### Usage

Once the application is running, you can access it in your browser at http://localhost:3000.

Functionality:
Search for Books: Enter a book title in the search bar to search for books via the Google Books API.
Save Books: If you are logged in, you can save books to your account by clicking the "Save This Book!" button.
View Saved Books: Navigate to "My Saved Books" to view all the books you have saved to your account.
Remove Books: You can also remove books from your saved list by clicking the "Remove This Book" button.
Technologies

## This application is built using the following technologies:

MongoDB: A NoSQL database for storing user and book data.
Express.js: A Node.js framework for building the back-end API.
React: A JavaScript library for building the front-end user interface.
Node.js: A runtime environment for executing JavaScript on the server.
Apollo Server: A GraphQL server to handle queries and mutations.
GraphQL: A query language for APIs that allows fetching and modifying data.
Features

Backend (GraphQL and Apollo Server)
Apollo Server: The application uses Apollo Server to handle GraphQL queries and mutations.
GraphQL Queries/Mutations:
me: Returns the authenticated user's data.
addUser: Creates a new user.
login: Logs in an existing user.
saveBook: Saves a book to the user's saved list.
removeBook: Removes a book from the user's saved list.
JWT Authentication: Users are authenticated using JSON Web Tokens (JWTs).
Frontend (React and Apollo Client)
Apollo Client: Handles interactions with the GraphQL server on the front end.
User Authentication: The front-end supports user signup and login with forms powered by Apollo Client's useMutation.
Book Search: Users can search for books using the Google Books API.
Save and Remove Books: Users can save books to their account or remove them from their saved books list.
Contributing

### Contributions are welcome! If you'd like to contribute to this project, feel free to fork the repository and submit a pull request.

### License

This project is licensed under the MIT License.

