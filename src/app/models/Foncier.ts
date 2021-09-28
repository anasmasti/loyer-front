export interface Foncier {
    _id?: any;
    proprietaire: string;
    type_foncier: string;
    adresse: string;
    description: string;
    lieu: string;
    assure: boolean;
    etat_du_bien: string;
    ville: string;
    code_postal: string;
    pays: string;
    montant_loyer: Number;
    meuble_equipe: boolean;
}