export type UserUpdatedPayload = {
    uuid: string;
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    createdAt?: Date;
    updatedAt?: Date;
};
