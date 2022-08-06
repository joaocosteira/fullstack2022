import patientData from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
    return patientData;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) =>({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));

};

const addPatient = (entry : NewPatient) : Patient => {
    const newPatient = {
        ...entry,
        id : uuid()
    };

    patientData.push(newPatient);
    return newPatient;
};

export default{
    getPatients,
    getNonSensitivePatients,
    addPatient
};