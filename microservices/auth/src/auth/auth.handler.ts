import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { RpcRequestContent, RpcResponseContent, RpcType } from '@kishieel/relegatio-messaging';
import { TokensService } from '@app/tokens/tokens.service';

@Controller()
export class AuthHandler {
    private readonly logger = new Logger(AuthHandler.name);

    constructor(private readonly tokensService: TokensService) {
    }

    @EventPattern(RpcType.DecodeJwt)
    async onDecodeJwt(
        @Payload() payload: RpcRequestContent<RpcType.DecodeJwt>,
    ): Promise<RpcResponseContent<RpcType.DecodeJwt>> {
        return this.tokensService.verifyToken(payload.jwt);
    }
}
