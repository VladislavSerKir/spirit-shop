import { Strategy, VerifyCallback } from 'passport-google-oauth20';
interface GoogleProfile {
    id: string;
    displayName: string;
    name: {
        familyName: string;
        givenName: string;
    };
    emails: Array<{
        value: string;
    }>;
    photos: Array<{
        value: string;
    }>;
}
declare const GoogleStrategy_base: new (...args: any[]) => Strategy;
export declare class GoogleStrategy extends GoogleStrategy_base {
    constructor();
    validate(accessToken: string, profile: GoogleProfile, done: VerifyCallback): Promise<void>;
}
export {};
