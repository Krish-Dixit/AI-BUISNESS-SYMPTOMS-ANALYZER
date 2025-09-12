
export interface PossibleDiagnosis {
  condition: string;
  description: string;
  likelihood: 'High' | 'Medium' | 'Low' | string;
}

export interface DiagnosisResult {
  possibleDiagnoses: PossibleDiagnosis[];
  recommendations: string[];
  disclaimer: string;
}
