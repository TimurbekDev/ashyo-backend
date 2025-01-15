// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy } from 'passport-google-oauth20';

// @Injectable()
// export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
//     constructor(private config: ConfigService) {
//         super({
//             clientID: config.get<string>('strategy.clientID'),
//             clientSecret: config.get<string>('strategy.clientSecret'),
//             callbackURL: config.get<string>('strategy.callbackURL'),
//             scope: ['email', 'profile']
//         });
//     }

//     async validate(accessToken: string, refreshToken: string, profile: any, done: Function) {
//         const { id, emails, displayName } = profile;
//         const user = {
//             googleId: id,
//             email: emails[0].value,
//             displayName,
//         };
//         done(null, user);
//     }
// }
