import patients from "../../data/patients";
import { Patient, PublicPatient, NewPatient } from "../types";
import { v1 as uuid } from 'uuid';

const getPatients = () : Array<Patient> => {
    return patients;
};


//console.log(getPatients());

const getNonSensitivePatients = () : Array<PublicPatient> => {

    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
      }));
};


const findById = (id: string): Patient | undefined => {
    const entry = patients.find(p => p.id === id);
    return entry;
};


const addPatient = ( entry: NewPatient ): Patient => {
    const newPatient = {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      id: uuid(),
      ...entry
    };
  
    patients.push(newPatient);
    return newPatient;
};


export default {
    getPatients,
    getNonSensitivePatients,
    addPatient,
    findById
};