# TypeORM example

The example usage of [TypeORM](https://typeorm.io/) with MySQL.

![TypeORM Logo Image](https://user-images.githubusercontent.com/3450879/82937367-050ae900-9fcb-11ea-9371-8cd0c4bf77a0.png)


## Summary

This repogitory contains:

* Node.js Backend API (Communicate MySQL with TypeORM) (accesible from host at PORT 13000)
* MySQL

The above are provided with Docker Container so you need to be able to run Docker Compose command.

* Database TimeZone is set to Japanese (Asia/Tokyo). If you want to change TimeZone, please edit `environment variables` written in docker-compose.yml. 


## Getting Started

Launch docker containers with Docker Compose command.

```
docker-compose up
```

Then, DB migration runs automatically and table will be created.


We assume the website where users post reviews for stores. The default tables are __stores__ and __reviews__ .

### Stores Table

<table>
  <tr>
    <th>Field</th>
    <th>Type</th>
    <th>Null</th>        
    <th>Key</th>
  </tr>
  <tr>
    <td>id</td>
    <td>int(11)</td>
    <td>NO</td>        
    <td>PRI</td>
  </tr>  
  <tr>
    <td>score</td>
    <td>float</td>
    <td>NO</td>        
    <td></td>
  </tr>  
  <tr>
    <td>name</td>
    <td>varchar(255)</td>
    <td>NO</td>        
    <td></td>
  </tr>  
  <tr>
    <td>address</td>
    <td>varchar(255)</td>
    <td>NO</td>        
    <td></td>
  </tr>  
  <tr>
    <td>genre</td>
    <td>varchar(255)</td>
    <td>NO</td>        
    <td></td>
  </tr>
</table>


### Reviews Table


<table>
  <tr>
    <th>Field</th>
    <th>Type</th>
    <th>Null</th>        
    <th>Key</th>
  </tr>
  <tr>
    <td>id</td>
    <td>int(11)</td>
    <td>NO</td>        
    <td>PRI</td>
  </tr>  
  <tr>
    <td>storeId</td>
    <td>int(11)</td>
    <td>NO</td>
    <td></td>
  </tr>  
  <tr>
    <td>score</td>
    <td>float</td>
    <td>NO</td>        
    <td></td>
  </tr>  
  <tr>
    <td>title</td>
    <td>text</td>
    <td>NO</td>        
    <td></td>
  </tr>  
  <tr>
    <td>content</td>
    <td>text</td>
    <td>NO</td>        
    <td></td>
  </tr>
</table>

### MySQL Login

You can log in MySQL in docker container by executing the following command.

```
docker exec -it typeorm-example-db mysql -u user -ppass example
```


### MySQL Dump

You can dump MySQL by executing the following command.

```
docker exec typeorm-example-db mysqldump -u user -ppass example > dump.sql
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


### APIs


#### Create a store

```
# Create a store
curl -X POST -H "Content-Type: application/json" -d '{"name":"my shop name", "genre":"Fast Food", "address":"Tokyo, Japan"}' http://localhost:13000/stores
```

#### Update a store

```
# Updtate a store
curl -X PUT -H "Content-Type: application/json" -d '{"name":"my new shop name", "genre":" NEW Fast Food", "address":"Kyoto, Japan"}' http://localhost:13000/stores/1
```

#### Get all store

```
# Get all store with child reviews
curl -X GET http://localhost:13000/stores 
```

#### Get a store

```
# Get a store
curl -X GET http://localhost:13000/stores/1
```

#### Get a store with MySQL LIKE operator query

```
# Get a store with MySQL LIKE operator query
curl -X GET "http://localhost:13000/stores/find/likeName?name=new"
```

#### Get a store with MySQL FullText Search (ngram)

```
# Get a store with MySQL FullText Search (ngram)
curl "http://localhost:13000/stores/find/fullText?name=new&address=Kyoto&genre=Fast"
```


#### Create one review and calculate and set store's avarage score (Transaction)

```
# Create one review and calculate and set store's avarage score
curl -X POST -H "Content-Type: application/json" -d '{"storeId":1, "score": 5, "title":"Good!", "content": "Yummy!"}' http://localhost:13000/reviews
```


