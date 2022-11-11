export const AccessLevelFilter = {
    ALL: 'ALL',
    ADMIN: 'ADMIN',
    TEACHER: 'TEACHER',
    PUPIL: 'PUPIL',
}
export class Clazz {
    oid: number;
    name: string;
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
    clazzName: string;
    clazz: Clazz;
}