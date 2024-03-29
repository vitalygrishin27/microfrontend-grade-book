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
    selectedSubjects: Array
}

export class Subject {
    oid: number;
    name: string;
    schedulerInternalId: string;
    teachers: Array;
    selectedTeacher: Array;
}

export class DayScheduler {
    name: string;
    items: [Subject];
}

export class Scheduler {
    clazz: Clazz
    scheduler: [DayScheduler]
}

export const DAYS = ["MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"]
export const fullSchedulerMaxLessonsPerDay = new Array(7).fill(0)
