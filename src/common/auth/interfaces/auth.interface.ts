export interface IAuthPayloadOptions {
    loginDate: Date;
}
export interface IAuthRefreshTokenOptions {
    // in milis
    notBeforeExpirationTime?: number | string;
    rememberMe?: boolean;
}

export interface IAuthPassword {
    salt: string;
    passwordHash: string;
}
