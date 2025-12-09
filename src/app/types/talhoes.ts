export interface Talhao {
  idTalhao?: number;
  nomeTalhao: string;
  cultura: string;
  variedade: string;
  estagioIni: string;
  dataPlantio: string;   // formato ISO
  dataColheita: string;  // formato ISO
  notasAdicionais?: string;
  idSens?: number;
}
