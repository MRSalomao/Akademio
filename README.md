## Getting Started

Install **yarn** using your favorite package manager.

Once it's ready, navigate to the root of the project folder and install the project's dependencies by running:

```sh
$ yarn install
```

After that, you can execute your local development server by running:

```sh
$ yarn run server
```

Navigate to **http://localhost:8080/** to view the app.

## Testing

```sh
$ yarn test
```

## Deploying

To make the project go live, enter the following commands:

```sh
$ yarn add firebase-tools
$ yarn run build
$ firebase-tools deploy
```

This should be done very carefully, once we start having real users.