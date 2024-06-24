Getting Started
Follow these steps to set up and run the project locally.

Prerequisites
Node.js installed

Setup Instructions

1> Clone the repository:
git clone https://github.com/Jyotiraditya24/do-to-app.git

2> Install frontend dependencies:

cd frontend
npm install

3> Install backend dependencies:

cd ../backend
npm install

4> Set up environment variables:
Copy the .env file provided and paste it in the backend folder.
MONGO_DB_URI=mongodb+srv://jyotiraditya24:5678@cluster0.qwftbx3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=HELLO
NODE_ENV="development"
PORT=3001

5> Start the backend server:
npm run server


6> Start the frontend server:

Open a new terminal instance:
cd ../frontend
npm run dev


Your application should now be running!

Login Credentials :
username = "jyotir_aditya"
password = "123456"

Note: The signup feature is not implemented, but all the routes are protected.

