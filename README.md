To run this project locally:

In the frontend directory, add to the "package.json" and set up a proxy to a port number, in my case I used port number 4000.

In the backend directory, create an ".env" file and set up the following:
PORT=<Port Number>
MONGO_URI=<MongoDB URI Setup>
SECRET=<Random set of characeter for encryption>