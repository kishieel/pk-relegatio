export type GqlContext = {
    user: {
        id: string;
        username: string;
        firstName: string;
        lastName: string;
        permissions: string[];
    };
    roles: Array<{
        id: string;
        name: string;
        permissions: string[];
    }>;
};
