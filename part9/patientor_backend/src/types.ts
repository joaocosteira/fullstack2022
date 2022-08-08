export interface Diagnose {
    code: string,
    name: string,
    latin?: string
}


export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}


export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }

export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose['code']>;
}

export interface Discharge{
    date: string,
    criteria: string,
}


export interface SickLeave{
    startDate: string,
    endDate: string,
}

export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName : string,
    sickLeave? : SickLeave

}

export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge : Discharge

}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;


/**  
 * 
 * A ideia é relativamente simples: O Tipo Entry é uma união.
 * Se quisermos fazer aquela história de omitir um dos valores,
 * Aplicar diretamente o Omit<Entry, 'id'> tem um problema: O
 * resultado devolve apenas os atributos em comum sem o id 
 * (Basicamente o BaseEntry sem id), perdendo acesso aos outros
 * atributos criados ao extender o tipo.
 * 
 * A solução consiste no UnionOmit, que é uma funcao que permite
 * omitir um certo atributo sem perder os das extensões.
 * 
 * Como exemplo foi definido o EntryWithoutId, que são Entries sem id.
 */
export type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;
export type NewEntry = UnionOmit<Entry, 'id'>;

//So this is an alternative to:
/* 
export type NewEntry =
  | Omit<HospitalEntry, "id">
  | Omit<OccupationalHealthcareEntry, "id">
  | Omit<HealthCheckEntry, "id">; 
*/
//export type NewBaseEntryId = UnionOmit<BaseEntry, 'id'>;

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender : Gender;
    occupation: string;
    entries: Entry[]
}

export type NewPatient = Omit<Patient, 'id'>;
export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;

