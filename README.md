# TypeORM example

The example usage of [TypeORM](https://typeorm.io/)

## Summary

Contains

* Node.js Backend API (Communicate MySQL with TypeORM) (accesible from host at PORT 13000)
* MySQL

The above are provided with Docker Container so you need to be able to run Docker Compose command.

* Database TimeZone is set to Japanese (Asia/Tokyo). If you want to change TimeZone, please edit `environment variables` written in docker-compose.yml. 


## Getting Started

Launch docker containers with Docker Compose command.

```
docker-compose up
```

Then, DB migration runs and table will be created.


### MySQL Login

```
docker exec -it typeorm-example-db mysql -u user -ppass example
```


### MySQL Dump

```
docker exec typeorm-example-db mysqldump -u user -ppass example > dump.sql
```


### APIs


```
# create a store
curl -X POST -H "Content-Type: application/json" -d '{"name":"my shop name", "genre":"Fast Food", "address":"Tokyo, Japan"}' http://localhost:13000/stores
```

```
# updtate a store
curl -X PUT -H "Content-Type: application/json" -d '{"name":"my new shop name", "genre":" NEW Fast Food", "address":"Kyoto, Japan"}' http://localhost:13000/stores/1
```

```
# Get all store
curl -X GET http://localhost:13000/stores 
```

```
# Get a store
curl -X GET http://localhost:13000/stores/1
```

```
# Get a store with MySQL LIKE operator query
curl -X GET "http://localhost:13000/stores/showByName/1?name=new"
```


### Create Migration File


```
# From Host Machine
docker exec -it typeorm-example-api yarn create:migration myFooBarTable


# Inside Container
$(npm bin)/ts-node -r tsconfig-paths/register $(npm bin)/typeorm migration:create -n myFooBarTable
```

Then edit `api/src/migration/myFooBarTable/` 


### Execute Migration

```
docker exec -it typeorm-example-api yarn migrate

# The following command revert migration
# docker exec -it typeorm-example-api yarn migrate:revert

# Inside Container
yarn migrate
```



