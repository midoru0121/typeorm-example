# TypeORM サンプル

[TypeORM](https://typeorm.io/) の基本的なクエリ。データベースには __MySQL__ を用いています。

![TypeORM Logo Image](https://user-images.githubusercontent.com/3450879/82937367-050ae900-9fcb-11ea-9371-8cd0c4bf77a0.png)


## 概要

このリポジトリは下記のコンテンツを含んでいます。

* Node.jsのバックエンドAPI (MySQとTypeORMで通信) (13000番ポートでホストからアクセス可能です。)
* MySQL

上記はDockerコンテナとして、作っていますので、 __Docker Compose__ コマンドで動作させてください。


ユーザーが店舗をレビューするようなシステムを想定しており、店舗テーブル (__stores__) とレビューテーブル (__reviews__) がデフォルトのテーブルとして定義されています。APIを使って店舗・レビューをCRUDできます。

### Storesテーブル (店舗情報テーブル)

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


### Reviewsテーブル (レビューテーブル)


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


* データベースのタイムゾーンは (Asia/Tokyo) にデフォルトでセットされています。もし、変更したい場合には docker-compose.yml で環境変数を渡していますので、そこを編集してください。 


## 起動方法

__Docker Compose__ コマンドでコンテナを起動します。


```
docker-compose up
```

DBマイグレーションが自動で走って、テーブルが作成されます。


### MySQLにログイン

下記のコマンドでMySQLにログインできます。

```
docker exec -it typeorm-example-db mysql -u user -ppass example
```


### MySQL Dump

下記のコマンドで mysqldump を実行することができます。

```
docker exec typeorm-example-db mysqldump -u user -ppass example > dump.sql
```


### マイグレーションの作成

自分でマイグレーションファイルを作成する場合には、下記コマンドを実行します。

```
# ホストから実行する場合
docker exec -it typeorm-example-api yarn create:migration myFooBarTable


# コンテナの中で実行する場合
$(npm bin)/ts-node -r tsconfig-paths/register $(npm bin)/typeorm migration:create -n myFooBarTable
```

Then edit `api/src/migration/myFooBarTable/` 


### マイグレーションの実行

自分でマイグレーションファイルを作成した場合には下記コマンドで実行します。

```
docker exec -it typeorm-example-api yarn migrate

# The following command revert migration
# docker exec -it typeorm-example-api yarn migrate:revert

# Inside Container
yarn migrate
```

### API


#### 店舗を作成する

```
# Create a store
curl -X POST -H "Content-Type: application/json" -d '{"name":"my shop name", "genre":"Fast Food", "address":"Tokyo, Japan"}' http://localhost:13000/stores
```

#### 店舗情報を更新する

```
# Updtate a store
curl -X PUT -H "Content-Type: application/json" -d '{"name":"my new shop name", "genre":" NEW Fast Food", "address":"Kyoto, Japan"}' http://localhost:13000/stores/1
```

#### 店舗情報を削除する

```
# Delete a store
curl -X DELETE -H "Content-Type: application/json" http://localhost:13000/stores/2
```

#### 全ての店舗を取得する (子のリレーションであるレビュー一覧も併せて取得)

```
# Get all store with child reviews
curl -X GET http://localhost:13000/stores 
```

#### 単一の店舗を取得する

```
# Get a store
curl -X GET http://localhost:13000/stores/1
```

#### 店舗をLikeで取得する

```
# Get a store with MySQL LIKE operator query
curl -X GET "http://localhost:13000/stores/find/likeName?name=new"
```

#### 店舗をMySQLの全文検索 (ngram) で取得する

```
# Get a store with MySQL FullText Search (ngram)
curl "http://localhost:13000/stores/find/fullText?name=new&address=Kyoto&genre=Fast"
```


#### レビューを作成して、全レビューの平均を対象店舗にセットする (トランザクション)

```
# Create one review and calculate and set store's avarage score (Transaction)
curl -X POST -H "Content-Type: application/json" -d '{"storeId":1, "score": 5, "title":"Good!", "content": "Yummy!"}' http://localhost:13000/reviews
```

