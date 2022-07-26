import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
    | {
      type: "SET_DIAGNOSE_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_DIAGNOSE";
      payload: Diagnosis;
    }
  | {
    type: "ADD_PATIENT_CACHE";
    payload: Patient;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
      case "SET_DIAGNOSE_LIST":
        return {
          ...state,
          diagnoses: {
            ...action.payload.reduce(
              (memo, diagnpse) => ({ ...memo, [diagnpse.code]: diagnpse }),
              {}
            ),
            ...state.diagnoses
          }
        };
      case "ADD_DIAGNOSE":
        return {
          ...state,
          diagnoses: {
            ...state.diagnoses,
            [action.payload.code]: action.payload
          }
        };      
      case "ADD_PATIENT_CACHE":
        return {
          ...state,
          patientsCache: {
            ...state.patientsCache,
            [action.payload.id]: action.payload
          }
        };      
      
    default:
      return state;
  }
};


//Action Creators:
export const setPatientList = (patientListFromApi : Patient[]) : Action =>{
  return(
    {
      type: "SET_PATIENT_LIST", payload: patientListFromApi
    }
  );
};

export const addPatient = (patient : Patient) : Action  =>{
  return(
    {
      type: "ADD_PATIENT", payload: patient
    }
  );
};


export const setDiagnoseList = (diagnoseListFromApi : Diagnosis[]) : Action =>{
  return(
    {
      type: "SET_DIAGNOSE_LIST", payload: diagnoseListFromApi
    }
  );
};

export const addDiagnose = (diagnose : Diagnosis) : Action  =>{
  return(
    {
      type: "ADD_DIAGNOSE", payload: diagnose
    }
  );
};


export const addPatientCache = (patient : Patient) : Action  =>{
  return(
    {
      type: "ADD_PATIENT_CACHE", payload: patient
    }
  );
};


