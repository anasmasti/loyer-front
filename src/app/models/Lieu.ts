export interface Lieu {
  _id?: string;
  code_lieu?: string;
  intitule_lieu?: string;
  intitule_DR?: string;
  adresse?: string;
  ville?: string;
  proprietaire: [];
  code_localite?: string;
  desc_lieu_entrer?: string;
  imgs_lieu_entrer: [
    {
      _id: string,
      image: string
    }
  ];
  has_contrat?: boolean;
  has_amenagements?: boolean;
  superficie?: string;
  telephone?: string;
  fax?: string;
  etat_logement_fonction?: string;
  etage?: string;
  type_lieu?: string;
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

  amenagement: [
    {
      _id?: string;
      idm?: string;
      nature_amenagement: string;
      montant_amenagement: string;
      valeur_nature_chargeProprietaire: string;
      valeur_nature_chargeFondation: string;
      numero_facture: string;
      numero_bon_commande: string;
      date_passation_commande: Date;
      evaluation_fournisseur: string;
      date_fin_travaux: Date;
      date_livraison_local: Date;
      deleted?: boolean;
      images_apres_travaux: [];
      croquis_travaux: [];
      fournisseur?: [
        {
          nom: string;
          prenom: string;
          amenagement_effectue: string;
          deleted?: boolean;
        }
      ];
    }
  ];
}
