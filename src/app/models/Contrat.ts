export interface Contrat {
  _id: string;
  piece_joint_contrat: [];
  numero_contrat?: string;
  date_debut_loyer?: Date;
  date_fin_contrat?: Date;
  date_reprise_caution?: Date;
  date_fin_avance: Date;
  date_premier_paiement: Date;
  montant_loyer: number;
  taxe_edilite_loyer: string;
  taxe_edilite_non_loyer: string;
  periodicite_paiement: string;
  duree_location: number;
  declaration_option: string;
  taux_impot: string;
  retenue_source: string;
  montant_apres_impot: number;
  montant_caution: number;
  duree_caution: string;
  statut_caution: string;
  montant_avance: number;
  duree_avance: number;
  n_engagement_depense: string;
  echeance_revision_loyer: string;
  type_lieu: string;
  foncier: any;
  nombre_part: number;
  is_avenant: boolean;
  proprietaires: any;
  has_avenant: boolean;
  //new
  montant_loyer_ttc: number;
  etat_contrat?: {
    libelle: string;
    etat: {
      n_avenant: string;
      motif: any;
      montant_nouveau_loyer: number;
      signaletique_successeur: string;
      intitule_lieu: string;
      date_suspension: Date;
      date_fin_suspension: Date;
      duree_suspension: number;
      motif_suspension: string;
      reprise_caution: string;
      date_resiliation: Date;
      etat_lieu_sortie: string;
      preavis: string;
      images_etat_res_lieu_sortie: [];
      lettre_res_piece_jointe: [];
      piece_jointe_avenant: [];
      date_effet_av: Date;
      frais_reamenagement: string;
      //caution consommé
      etat_caution_consomme: string;
      duree_consomme: number;
      duree_a_recupere: number;
    };
  };
  deleted: boolean;
  validation1_DMG: boolean;
  validation2_DAJC: boolean;
  old_contrat: any
}
