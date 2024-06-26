import { GraphQLError, GraphQLFormattedError } from 'graphql/index';
import { HttpException } from '@nestjs/common';

export const formatError = (formattedError: GraphQLFormattedError, error: unknown): GraphQLFormattedError => {
    // @todo: implement better error formatting to allow custom code and payload

    if (error instanceof GraphQLError) {
        formattedError.extensions.code = error.extensions?.code;
    }

    if (error instanceof HttpException) {
        formattedError.extensions.code = error.getStatus();
    }

    return formattedError;
};
