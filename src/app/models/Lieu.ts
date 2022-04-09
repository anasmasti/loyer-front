export interface Lieu {
  _id?: string;
  code_lieu?: string;
  intitule_lieu?: string;
  code_localite?: string;
  telephone?: string;
  fax?: string;
  etat_logement_fonction?: string;
  type_lieu?: string;
  attached_DR?: any;
  attached_SUP?: any;
  code_rattache_DR?: string;
  code_rattache_SUP?: string;
  intitule_rattache_SUP_PV?: string;
  centre_cout_siege?: string;
  categorie_pointVente?: string;
  deleted?: boolean;

  directeur_regional?: [
    {
      matricule?: string;
      nom?: string;
      prenom?: string;
      deleted?: boolean;
    }
  ];
}
