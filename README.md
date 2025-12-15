To setup the project:
(if you are using node v 22, else scroll down)
step-1. Clone the project

```
git clone https://github.com/gitakramsm/node-project-boilerplate.git
```

step-2. Move in the directory where project is coded and cloned

```
cd node-project-boilerplate
```

step-3. Install dependencies

```
npm install
```
step-4. In the root directory create a .env file and add the following env variables

    PORT=<port number of your choice>
ex:

    PORT=3000

step-5. Turn up the server

```
node index.js
```

---Incase if you are below node version 22---

do this after step 2

  -> npm i nodemon

  -> replace the below line in package.json
    "scripts": {
        "dev": "node --watch ./src/index.js"
    },
    with
    "scripts": {
        "dev": "npx nodemon ./src/index.js"
    },

  then do step 3,4 and 5.


[note: nodemon is a package that automatically restarts the server after changes.]

This is a base node js project template, which anyone can use as it has been prepared, by keeping some of the most important code principles and project management recommendations. Feel free to change anything.

src -> Inside the src folder all the actual source code regarding the project will reside, this will not include any kind of tests. (You might want to make separate tests folder)

Lets take a look inside the src folder

config -> In this folder anything and everything regarding any configurations or setup of a library or module will be done. For example: setting up dotenv so that we can use the environment variables anywhere in a cleaner fashion, this is done in the server-config.js. One more example can be to setup you logging library that can help you to prepare meaningful logs, so configuration for this library should also be done here.

routes -> In the routes folder, we register a route and the corresponding middleware and controllers to it.

middlewares -> they are just going to intercept the incoming requests where we can write our validators, authenticators etc.

controllers -> they are kind of the last middlewares as post them you call you business layer to execute the budiness logic. In controllers we just receive the incoming requests and data and then pass it to the business layer, and once business layer returns an output, we structure the API response in controllers and send the output.

repositories -> this folder contains all the logic using which we interact the DB by writing queries, all the raw queries or ORM queries will go here.

services -> contains the buiness logic and interacts with repositories for data from the database

utils -> contains helper methods, error classes etc.