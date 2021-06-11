export interface Proprietaire {
  _id: string;
  cin?: string;
  passport: string;
  carte_sejour: string;
  nom_prenom: string;
  raison_social: string;
  n_registre_commerce: string;
  telephone: string;
  fax: string;
  adresse: string;
  n_compte_bancaire: string;
  banque: string;
  nom_agence_bancaire: string;
  has_mandataire: boolean;
  mandataire: [{
    cin_mandataire: string;
    nom_prenom_mandataire: string;
    raison_social_mandataire: string;
    telephone_mandataire: string;
    fax_mandataire: string;
    adresse_mandataire: string;
    n_compte_bancaire_mandataire: string;
  }];
}
