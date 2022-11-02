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

This will run our docker with 2 microservices applications (gateway and clipboard) and 2 databases one for each set of our microservices as well. The containers should look like this:
(No need to enter the microservices projects to install dependencies since docker will do it for you)

![My Image](./images/1.png)

___

## Gateway endpoints usage

### Hello gateway
Test your gateway is running properly.

**No Parameters**

**Response**

```
{
    "msg": "Hello from Gateway"
}

```
___

### Registration

**Parameters**

|          Name     | Required |  Type   | Description                                                |
| -----------------:|:--------:|:-------:| ---------------------------------------------------------- |
| `product`         | required | string  | The product for which to perform the action. <br/><br/> Supported values: `publish` or `analyze`.                                                                     |
| `organization_id` | optional | string  | The organization ID for which to perform the action. <br/><br/> Default is `null`. <br/><br/> If passed, we will check if the user is part of that organization before returning any information. 

**Response**

```
{
    "msg": "Hello from Gateway"
}

```
___
