# Test Pintap

## Build with

Describes which version .

| Name       | Version  |
| ---------- | -------- |
| NestJs     | v9.x     |
| NodeJs     | v18.x    |
| Typescript | v4.x     |
| Mongoose   | v6.x     |
| MongoDB    | v6.x     |
| Yarn       | v1.x     |
| Docker     | v20.x    |
| Docker Compose | v2.x |
| Swagger | v6.x |
| Aws CLI | v2.x |

## Design Patterns

- Repository Design Pattern / Data Access Layer Design Pattern
- Dependency Injection
- Adopt SOLID principle
- Support clean architecture / hexagonal architecture
- Support microservice architecture

### Getting Started

Run database instance with `docker-compose`

```bash
docker-compose up -d
```

Install dependencies

```bash
yarn install
```

Create `.env` file from `.env.example`

```bash
cp .env.example .env
```

Migrate data

```bash
yarn migrate
```

Run project

- Run project with serverless framework

    ```bash
    yarn start:sls
    ```

- Run project without serverless framework

    ```bash
    yarn start:dev
    ```

Test endpoint

```bash
curl --location --request GET 'localhost:3000/development/api/hello'
```

### Endpoints

Endpoints will describe with swagger spec / open api 3 spec
url `localhost:3000/development/docs`

### User

```txt
username: testuser
password: aaAA@@123
```

### Deploy Serverless to AWS

Set the aws credentials with `key` and `secret` from AWS Account `IAM`

```sh
aws configure
```

Create `.env.development` file from `.env.example`

```bash
cp .env.example .env.development
```

Adjust data `.env.development`

```env
# Adjust with your mongodb instance 
DATABASE_HOST=mongodb://localhost:27017
DATABASE_NAME=testpintap
DATABASE_USER=root
DATABASE_PASSWORD=123456
DATABASE_DEBUG=false
DATABASE_OPTIONS=authSource=admin

# api gatewat name where the lamda will serve
SERVERLESS_AWS_API_GATEWAY=baibay 

# aws profile / aws account that have permission to use lamda
SERVERLESS_AWS_PROFILE=baibay 

# aws s3 bucket for development, all the development asset for serverless will put into bucket
SERVERLESS_AWS_S3_BUCKET=baibay-development  
```

Deploy

```bash
yarn deploy:sls
```

## Example Deploy Serverless to AWS

I already deploy to give an example about the project. Here the url

Url hello `https://jjg57pire6.execute-api.ap-southeast-3.amazonaws.com/development/api/hello`
Url docs `https://jjg57pire6.execute-api.ap-southeast-3.amazonaws.com/development/docs`

## Tasks

```txt
# List of tasks
- Create a Lambda function with provider AWS thats contains user CRUD, and login endpoints
- User endpoints must implement JWT
- Installation with docker
- Support Serverless
- Implement design patterns
- Implement clean architecture
- Project must in typescript
- Implement soft delete

# Database
Mysql or Postgresql or Nosql

# Table
- id (uuidV4)
- name
- password
- createdAt
- updatedAt
- deletedAt
```
