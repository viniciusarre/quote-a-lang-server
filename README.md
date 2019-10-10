# Quote A Lang Server
A Node/Express API for quote-a-lang

Hello! Welcome to this repository!

This project is aimed for helping people learn new languages using quotes. It currently is powered by a Python web crawler which fetches data from WikiQuotes and adds it to the DB. 

We're looking for help in order to expand the number of languages supported by the app (currently, we're able to fetch only quotes in French), possibly implementing integrations for social networks and SRS systems, as well as (futurally) having our own approach to it.

The project's aimed to be opensource and we'll be accepting contributions in the future!

# Running the project

The project has currently a simple node env, we designed two scripts:

`npm run dev` - starts development environment, with hot-reloading

`npm start` - starts the production server, without hot reloading...

To install the project dependencies:

`npm install`

To run the tests:

`npm test`

## Running MongoDB

The server tries to connect to a MongoDB instance at port 27017 on localhost. You can do this easily using docker with the following command:

`docker run -it -p27017:27017 --name mongodb -d mongo`

This runs a new container with the last version of the `mongo` image and forwards the local port 27017 to the port 27017 in the container instance with name `mongodb`.

## Populating the database

You can populate the database by running our [Web Crawler](https://github.com/viniciusarre/quote-a-lang-crawler) by making sure you run it in the same db as the server. 

Stand-alone populate scripts will be coming soon!

## Contributors 

A warm thanks to all the contributors helping this project grow! I appreciate your effort! 

[cainwatson](https://github.com/cainwatson), [Nerocodes](https://github.com/Nerocodes) and [spassarop](https://github.com/spassarop)

