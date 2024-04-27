import { CouchdbService } from '@app/couchdb/couchdb.service';
import dedent from 'dedent';

export default async function (couchdbService: CouchdbService) {
    await couchdbService.use('followers').insert({
        _id: '_design/follows',
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
}
