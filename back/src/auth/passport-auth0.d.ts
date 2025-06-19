// back/src/auth/passport-auth0.d.ts

declare module 'passport-auth0' {
  /**
   * Opciones que le pasas al constructor de Strategy.
   */
  export interface StrategyOptionsWithRequest {
    domain: string;
    clientID: string;
    clientSecret: string;
    callbackURL: string;
    scope?: string | string[];
    state?: boolean;
    passReqToCallback?: boolean;
  }

  /**
   * El perfil que devuelve Auth0 tras el login.
   * Ajusta según tus necesidades, aquí tienes los campos mínimos:
   */
  export interface Profile {
    id: string;
    displayName?: string;
    name?: {
      givenName?: string;
      familyName?: string;
    };
    emails?: Array<{ value: string }>;
    _json?: any;
  }

  /**
   * La estrategia en sí, que hereda de passport-strategy.
   */
  import { Strategy as PassportStrategy } from 'passport-strategy';
  export class Strategy extends PassportStrategy {
    constructor(
      options: StrategyOptionsWithRequest,
      verify?: (
        accessToken: string,
        refreshToken: string,
        extraParams: any,
        profile: Profile,
        done: (err: any, user?: any) => void
      ) => void
    );
    name: string;
  }
}
