# Todo Organizer React App

More than just a means to post all your todos and check them off, Todo Organizer React App provides four categories to characterize your todos based on the four quadrants of time management.
The React App is the client side of this app and can be run together with the server side in Todo Organizer App (https://github.com/mendelcohen/todo-organizer-app).

## Run Locally

1. Using the command line git clone the repo in a local directory:

```
git clone https://github.com/mendelcohen/todo-organizer-react-app.git
```

2. See Todo Organizer App (link above) in the README for instructions to install the server side code and to run locally.

3. The client side uses localhost:3000 by default. Make sure port 3001 is available for running the server side code. If you change the port in the server side code use the new port for the proxy in the package.json file here.

4. In your terminal:

```
cd todo-organizer-react-app
npm run start
```

## Roadmap

- Replace remaining fetch api calls with axios.

- Install a JavaScript calendar library in the view todo page for users to see their scheduled todos in a calendar format. The calendar should also have it's own path to display all the todos in a calendar format.
