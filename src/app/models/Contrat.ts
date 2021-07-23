export interface Contrat {
    _id: String;
    etat: String;
    Date_debut_loyer: Date;
    Date_fin_contrat_bail: Date;
    Duree_location: Number;
    Periodicite_paiement: String;
    Montant_loyer: Number;
    Taxe_edilite_loyer: Number;
    Taxe_edilite_non_loyer: Number;
    Declaration_option: String;
    Taux_impot: Number;
    Retenue_source: String;
    Montant_apres_impot: Number;
    Montant_caution: Number;
    Effort_caution:String;
    Date_reprise_caution :Date;
    Statut_caution:String;
    Montant_lavance:Number;
    Date_fin_lavance:Date;
    Date_1er_paiement:Date;
    Duree_lavance:Number;
    N_dengagement_depense:Number;
    Echeance_revision_loyer:String;
}

