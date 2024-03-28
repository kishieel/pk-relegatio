import { RpcType } from '@lib/consts/rpc-type.enum';
import { DecodeJwtPayload } from '@lib/payloads/decode-jwt.payload';

export type RpcPayloadMap = {
    [RpcType.DecodeJwt]: DecodeJwtPayload;
};
