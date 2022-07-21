export enum Role{
    user='user',
    admin='admin',
    customer='customer'
}

export interface UserInterface{
    username:string,
    fullname:string,
    roles:Role[]
}