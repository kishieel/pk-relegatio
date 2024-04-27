export interface IMigrationDocument {
    _id?: string;
    _rev?: string;
    type: 'migration';
    startedAt: string;
    finishedAt?: string;
    failedAt?: string;
    error?: string;
}

export interface IFollowDocument {
    _id?: string;
    _rev?: string;
    type: 'follow';
    followerId: string;
    followeeId: string;
}

export interface IUserDocument {
    _id?: string;
    _rev?: string;
    type: 'user';
    firstName: string;
    lastName: string;
}
