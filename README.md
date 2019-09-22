# URL Shortener

## Remarks
For simplicity purpose, the following points are assumed...

- A frontend (`client`) are provided solely for API ease of use, only a basic implementation,
no framework are being used.
- An API server (`server`) are implemented in a publicly accessible manner, refers to the
security guidelines provided below, under `Documentation` section.

## Setup

### Recommended
The easiest and fastest way to get the applications up and running is by using Docker.
Make sure Docker and Docker Compose has been installed on your computer, then
run the following command...

```
$ docker-compose up
```

- Web application will start on port 8080
- API server will start on port 3000
- MongoDB running on port 27017

### Manual Setup
To get the applications running, you would need to install the following software...

- Node.js (with `npm`)
- MongoDB

Before running the applications, you would need to install all the dependencies by
running the following command in each of the project directory (`client` and `server`)...

```
$ npm install
```

To run the web application and API server, simply run...

```
$ npm start
```

Web application will start on port 8080 and
API server will start on port 3000 by default
with connection to MongoDB on port 27017

## Tests
To run all unit tests, simply run...

```
$ npm test
```

## Documentations

- `developers/security.md` Guides to the application security and notices
- `developers/scaling.md` Guides to the application scaling and scaling issues
