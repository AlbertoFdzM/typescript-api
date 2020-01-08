import { JsonWebTokenType } from '../enums/JsonWebTokenType';

export class JsonWebToken {
  constructor (
    /** JsonWebToken ID */
    public readonly jti: string,
    /** token type */
    public readonly type: JsonWebTokenType,
    /** subject */
    public readonly sub: string,
    /** audience */
    public readonly aud: string | undefined = undefined,
    /** issued at */
    public readonly iat: string,
    /** expires at */
    public readonly exp: string
  ) {}
}
