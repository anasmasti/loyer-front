export interface Lieu {
  _id?: string,
  code_lieu?: string,
  intitule_lieu?: string,
  intitule_DR?: string,
  adresse?: string,
  ville?: string,
  code_localite?: string,
  desc_lieu_entrer?: string,
  imgs_lieu_entrer?: string,
  has_amenagements?: boolean,
  superficie?: string,
  telephone?: number,
  fax?: number,
  etat_logement_fonction?: string,
  etage?: string,
  type_lieu?: string,
  code_rattache_DR?: string,
  code_rattache_SUP?: string,
  intitule_rattache_SUP_PV?: string,
  centre_cout_siege?: string,
  categorie_pointVente?: string,

  directeur_regional?: [
    {
      matricule?: string,
      nom?: string,
      prenom?: string,
      deleted?: boolean
    }
  ],

  amenagement?: [{
    _id?: string,
    nature_amenagement: string,
    montant_amenagement: string,
    valeur_nature_chargeProprietaire: string,
    valeur_nature_chargeFondation: string,
    numero_facture: string,
    numero_bon_commande: string,
    date_passation_commande: string,
    evaluation_fournisseur: string,
    date_fin_travaux: string,
    date_livraison_local: string,
    
    fournisseur?: [{
      nom: string,
      prenom: string,
      amenagement_effectue: string,
    }]
  }]

}
