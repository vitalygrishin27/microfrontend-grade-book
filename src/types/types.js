export const AccessLevelFilter = {
    ALL: 'ALL',
    ADMIN: 'ADMIN',
    TEACHER: 'TEACHER',
    PUPIL: 'PUPIL',
}
export class UserType {
    oid: number;
    firstName: string;
    secondName: string;
    lastName: string;
    login: string;
    password: string;
    accessLevel: string;
    clazzId: number;
}