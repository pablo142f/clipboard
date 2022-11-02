## Gateway microservice application

This microservice is to handle registration and authentication.
This gateway has its unique database called gateway_db in the docker compose.

## Clipboard microservice application

This microservice is to handle the endpoints that fetch the information from the employees database.
This clipboard service has its unique database called clipboard_db in the docker compose.

`Also keep on mind that I know .env files shouldn't be published to git and should be handled with secrets or aws variables but for the purpose of this testing I left them in the repositories.`

## Running the docker application

Just one simple command to run our docker.

```bash
docker-compose up --build
```

This will run our docker with 2 microservices applications (gateway and clipboard) and 2 databases one for each set of our microservices as well.

![My Image](./images/1.png)