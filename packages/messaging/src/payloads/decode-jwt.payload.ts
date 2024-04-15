import { JwtContent } from '@kishieel/relegatio-common';

export type DecodeJwtPayload = {
    request: { jwt: string };
    response: JwtContent;
};
