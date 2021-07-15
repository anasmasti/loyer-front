export interface Lieu {
    deleted: Boolean;
    _id: String;
    type_lieu: String;
    intitule_de_lieu: String;
    intitule_direction_regional: String;
    ville: String;
    raison_sociale: String;
    telephone: Number;
    fax: Number;
    code_localite: String;
    superficie: String;
    etage: String;
    code_Rattachement_DR: String;
    code_Rattachement_SUP: String;
    intitule_Rattachement_supervision_POS: String;
    centre_cout_Siege: String;
    categorie_point_Vente: String;
    has_amenagement: Boolean;
    amenagement:[
        {
            proprietaire: {
              nature: String;
              valeur: Number;
            };
            fondation: {
              nature: String;
              valeur: Number;
            };
            deleted: false;
            _id: String;
            nature: String;
            montant: Number;
            n_Facture: Number;
            n_bon_Cde: Number;
            date_Passation_Cde: Date;
            evaluation_Fournisseur: String;
            date_Fin_travaux: Date;
            date_Livraison_local: Date;
            croquis: String;
          },
    ]
}
