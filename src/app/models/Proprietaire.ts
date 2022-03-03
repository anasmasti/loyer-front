export interface Proprietaire {
  _id?: string;
  cin: string;
  passport: string;
  carte_sejour: string;
  nom_prenom: string;
  raison_social: string;
  n_registre_commerce: string;
  telephone: string;
  fax: string;
  adresse: string;
  n_compte_bancaire: string;
  banque_rib: string;
  ville_rib:string;
  cle_rib:string;
  banque: string;
  nom_agence_bancaire: string;
  montant_loyer: number;
  is_mandataire: boolean;
  taux_impot: string;
  retenue_source: string;
  montant_apres_impot: number;
  declaration_option: string;

  montant_avance_proprietaire: number,
  tax_avance_proprietaire: number,
  tax_par_periodicite: number,

  pourcentage_caution: number,
  caution_par_proprietaire: number,

  proprietaire_list:[],
  is_person_physique: boolean
  // mandataire: [{
  //   cin_mandataire: string;
  //   nom_prenom_mandataire: string;
  //   raison_social_mandataire: string;
  //   telephone_mandataire: string;
  //   fax_mandataire: string;
  //   adresse_mandataire: string;
  //   n_compte_bancaire_mandataire: string;
  // }];
}
