# React-books

This project was created by me as the React front-end framework course at Softuni. It represents a a place where people that loves to read can add their favourite books. They can sign up, add books, edit their books, view like other people books

## Pages accessible to logged users
<ul>
    <li> <strong> Dynamic </strong> Create Book page, where all logged in users can create a book. </li>
    <li> <strong> Dynamic </strong> Edit Book page, where all logged in users can edit their books.</li>
    <li> <strong> Dynamic </strong> My books page, where all logged in users can see their posts.</li>
    <li>404 page</li>
</ul>

## Pages accessible to logged out users
<ul>
    <li>Log in page</li>
    <li>Register page</li>
    <li>404 page</li>
    <li> <strong> Dynamic </strong> Books page, where all users can see all the books.</li>
    <li> <strong> Dynamic </strong> Details page, where all users can see all the details about any book.</li>
</ul>

## Backend Structure
### The project's backend is a locally hosted Express server, that is utilizing MongoDB as a database.

#### Database structure
<ul>
    <li>Users Schema</li>
    <li>Book Schema</li>
    <li>Token Blacklist Schema</li>
</ul>

#### Services
<ul>
    <li> Book Service </li>
    <li> User Service </li>
    
</ul>

#### Authorization and Authentication
<ul>
    <li> Done with JWT </li>
    <li> Storing the user in a Auth context </li>
    <li> Restricted pages are protected with guards </li>
</ul>

## Books system

<ul>
    <li>All registered users can make, delete and edit their books (the delete and edit functions are available to the owners only).</li>
    <li>All registered users can Like books which other users have made</li>
</ul>


## Technology Stack 
<ul>
    <li>React</li>
    <li>JavaScript</li>
    <li>HTML, CSS</li>
    <li>ExpressJS, NodeJS</li>
    <li>MongoDB, Mongoose</li>
    <li>Bcrypt</li>
    <li>JWT</li>
</ul>

## REST API End points
<ul>
    <li>All the REST API Endpoints are stored in the Word document in this repo - Books Documentation.docx</li>
</ul>

## How to start the project locally
<ul>
    <li>Install all dependencies from both API and Client with the command npm i</li>
    <li>Navigate to the API folder in the command line and start the server with the npm run start</li>
    <li>Navigate to the Client folder in the command line and start the app with npm run start. This will start the app on localhost:3000</li>
</ul>
