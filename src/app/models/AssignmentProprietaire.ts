export interface AssignmentProprietaire {
    _id?: string;
    montant_loyer: number;
    is_mandataire: boolean;
    taux_impot: string;
    retenue_source: string;
    montant_apres_impot: number;
    declaration_option: string;
    statut: string;
    montant_avance_proprietaire: number;
    tax_avance_proprietaire: number;
    tax_par_periodicite: number;
  
    pourcentage_caution: number;
    caution_par_proprietaire: number;
  
    proprietaire_list: [];
    is_person_physique: boolean;
    part_proprietaire: number;
  }
  