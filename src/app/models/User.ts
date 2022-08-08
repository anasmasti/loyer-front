export interface User {
    _id?: string;
    deleted: boolean;
    userMatricul: String;
    nom: String;
    prenom: String;
    email: String;
    code_dr?: String;
    userRoles: Array<any>;
    password?: string;
}