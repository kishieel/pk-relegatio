import { GraphQLError } from 'graphql';

export const createException = (code: string, message?: string) => {
    return class extends GraphQLError {
        constructor() {
            super(message ?? code, { extensions: { code } });
        }

        static getCode = () => code;
    };
};
