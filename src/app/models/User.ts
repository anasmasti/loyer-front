export interface User {
    _id?: string;
    deleted: boolean;
    userMatricul: String;
    nom: String;
    prenom: String;
    userRoles: Array<any>;
}