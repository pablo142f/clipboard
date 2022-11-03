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

## Gateway services usage

### Hello gateway <GET> *http://localhost:4000/*
Test your gateway services are running properly.

**No Parameters**

**Response**

```
{
    "msg": "Hello from Gateway"
}
```
___

### Registration <POST> *http://localhost:4000/authentication/registration*

**Parameters**

|          Name     | Required |  Type   | Description                                                |
| -----------------:|:--------:|:-------:| ---------------------------------------------------------- |
| `name`            | required | string  | User's name                                                |
| `email`           | required | string  | User's email                                               |
| `password`        | required | string  | User's password                                            |
| `phone`           | required | string  | User's phone                                               |

**Parameters example**

```
{
    "name" : "Pablo Barrera",
    "email" : "Pablo.barrera@clipboard",
    "password" : "test123",
    "phone": "8182740581"
}
```

**Response**

```
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IlBhYmxvIEJhcnJlcmEiLCJwaG9uZSI6IjgxODI3NDA1ODEiLCJpYXQiOjE2Njc0MzI2MzksImV4cCI6MTY2NzUxOTAzOX0.AcZaoYaeR6iz4qVsiRmyzixeCfErWFYHzqbV5U0gJJk",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IlBhYmxvIEJhcnJlcmEiLCJwaG9uZSI6IjgxODI3NDA1ODEiLCJpYXQiOjE2Njc0MzI2MzksImV4cCI6MTY2NzYwNTQzOX0.QyTo10Zogq4E4W_Z66SCVTDeay-hVebO6NrmzPeK8lQ"
}
```

**Error Response**

*Status 200* > Success <br/>
*Status 400* > Account already exists <br/>
*Status 500* > Bad request
___

### Login <POST> *http://localhost:4000/authentication/login*

**Parameters**

|          Name     | Required |  Type   | Description                                                |
| -----------------:|:--------:|:-------:| ---------------------------------------------------------- |
| `email`           | required | string  | User's email                                               |
| `password`        | required | string  | User's password                                            |

**Parameters example**

```
{
    "email" : "pablo.barrera@clipboard",
    "password" : "test123"
}
```

**Response**

```
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IlBhYmxvIEJhcnJlcmEiLCJwaG9uZSI6IjgxODI3NDA1ODEiLCJpYXQiOjE2Njc0MzI2MzksImV4cCI6MTY2NzUxOTAzOX0.AcZaoYaeR6iz4qVsiRmyzixeCfErWFYHzqbV5U0gJJk",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IlBhYmxvIEJhcnJlcmEiLCJwaG9uZSI6IjgxODI3NDA1ODEiLCJpYXQiOjE2Njc0MzI2MzksImV4cCI6MTY2NzYwNTQzOX0.QyTo10Zogq4E4W_Z66SCVTDeay-hVebO6NrmzPeK8lQ"
}
```
**Error Response**

*Status 200* > Success <br/>
*Status 400* > Account not found <br/>
*Status 500* > Bad request
___

IMPORTANT
## Authentication

The next microservice is protected by authentication, 

**Use the Bearer token created in registration or login to be able to call the next services**

*Example of an incorrect token or if the token is not supplied:*

![My Image](./images/2.png)

___

## Clipboard services usage

### Hello clipboard *GET* *http://localhost:4000/clipboard*
Test your clipboard services are running properly.

**No Parameters**

**Response**

```
{
    "msg": "Hello from Clipboard Services"
}
```
___

### Get all employees *GET* *http://localhost:4000/clipboard/employee/*
Added this service as a plus just to be able to fetch all the dataset

**No Parameters**

**Response**

```
[
    {
        "id": 10,
        "name": "Abhishek",
        "salary": 145000,
        "currency": "USD",
        "department": "Engineering",
        "oncontract": null,
        "sub_department": "Platform",
        "createdAt": "2022-11-02T06:01:59.217Z",
        "updatedAt": "2022-11-02T06:01:59.217Z"
    },
    {
        "id": 12,
        "name": "Anurag",
        "salary": 90000,
        "currency": "USD",
        "department": "Banking",
        "oncontract": true,
        "sub_department": "Loan",
        "createdAt": "2022-11-02T06:02:53.438Z",
        "updatedAt": "2022-11-02T06:02:53.438Z"
    }
...
]
```

**Error Response**

*Status 200* > Success <br/>
*Status 500* > Bad request
___

### Create employee *POST* *http://localhost:4000/clipboard/employee*

**Parameters**

|          Name     | Required |  Type    | Description                                                |
| -----------------:|:--------:|:--------:| ---------------------------------------------------------- |
| `name`            | required | string   | Employee's name                                            |
| `salary`          | required | float    | Employee's salary                                          |
| `currency`        | required | string   | Employee's salary currency                                 |
| `department`      | required | string   | Employee's department                                      |
| `oncontract`      | optional | boolean  | Employee's is on contract status                           |
| `sub_department`  | required | string   | Employee's sub department                                  |

**Parameters example**

```
{
    "name": "Nikhil",
    "salary": "110000",
    "currency": "USD",
    "on_contract": "true",
    "department": "Engineering",
    "sub_department": "Platform"
}
```

**Response**
Not sure what kind of response was desired here, displayed a text but its possible to return the id or any data from the employee.

```
{
    "msg": "Employee created successfully."
}
```

**Error Response**

*Status 200* > Success <br/>
*Status 400* > Field "X" is required <br/>
*Status 500* > Bad request
___

### Delete employee *DELETE* *http://localhost:4000/clipboard/employee*

**Parameters**

|          Name     | Required |  Type    | Description                                                |
| -----------------:|:--------:|:--------:| ---------------------------------------------------------- |
| `id`              | required | number   | Employee's id                                              |

**Parameters example**

```
{
    "id": 20
}
```

**Response**

```
{
    "msg": "Employee deleted successfully."
}
```

**Error Response**

*Status 200* > Success <br/>
*Status 401* > Employee is required <br/>
*Status 500* > Bad request
___

### Get summary statistics *GET* *http://localhost:4000/clipboard/ss*

**No parameters**

**Response**

```
[
    {
        "minSalary": 30,
        "maxSalary": 200000000,
        "avgSalary": 22295010
    }
]
```

**Error Response**

*Status 200* > Success <br/>
*Status 500* > Bad request
___

### Get summary statistics on contract *GET* *http://localhost:4000/clipboard/ss/oncontract*

**No Parameters**

**Response**

```
[
    {
        "minSalary": 90000,
        "maxSalary": 110000,
        "avgSalary": 100000
    }
]
```

**Error Response**

*Status 200* > Success <br/>
*Status 500* > Bad request
___


*I could merge the service of 'Get summary statistics' and 'Get summary statistics on contract' with as 'on_contract' as a parameter but decided to had to different services.*

