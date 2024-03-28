export type Auth = {
    user: {
        uuid: string;
        username: string;
        firstName: string;
        lastName: string;
        permissions: string[];
    };
};
