To run this project locally:

In the frontend directory, add to the "package.json" and set up a proxy to a port number, in my case I used port number 4000.

In the backend directory, create an ".env" file and set up the following:
PORT=<Port Number>
MONGO_URI=<MongoDB URI Setup>
SECRET=<Random set of characeter for encryption>

After setup is complete, in two separate terminals, navaigte to the frontend and backend directories. In the frontend terminal run the command "npm run start", similarily you can do the same with the backend terminal, but I adjusted the script to run nodemon which allows for editing to files without having to killing the server and restarting. So in the backend terminal run the command "npm run dev".
