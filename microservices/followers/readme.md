### Schema

#### Follow

```json
{
  "_id": "string",
  "_rev": "string",
  "followerId": "string",
  "followeeId": "string",
  "type": "follow"
}
```

#### User

```json
{
  "_id": "string",
  "_rev": "string",
  "firstName": "string",
  "lastName": "string",
  "type": "user"
}
```

### Views

#### Followers

```js
function(doc) {
    if (doc.type === "follow") {
        emit(doc.followedId, { _id: doc.followerId });
    }
}
```

#### Following

```js
function(doc) {
    if (doc.type === "follow") {
        emit(doc.followerId, { _id: doc.followeeId });
    }
}
```

### Creating View

```ts
interface IUserDocument {
    _id: string;
    _rev: string;
    type: 'user';
    firstName: string;
    lastName: string;
}

interface IFollowDocument {
    _id: string;
    _rev: string;
    type: 'follow';
    followerId: string;
    followeeId: string;
}

type IDocument = IUserDocument | IFollowDocument;

await this.couchdbService.use<IDocument>('followers').insert({
    _id: '_design/followers',
    views: {
        followers: {
            map: dedent(`
                function (doc) {
                    if (doc.type === 'follow') {
                        emit(doc.followeeId, { _id: doc.followerId });
                    }
                }
            `),
        },
        following: {
            map: dedent(`
                function (doc) {
                    if (doc.type === 'follow') {
                        emit(doc.followerId, { _id: doc.followeeId });
                    }
                }
            `),
        },
    },
});
```
