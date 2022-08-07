import express from 'express';
import patientService from '../services/patientService';

import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});


router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    if(e instanceof Error){
      res.status(400).send(e.message);
    }
  }
});

/**
 * 
 * Objetivo : Adicionar uma nova entry a um 
 */
router.post('/:id/entries', (req, res) => {

  const patient = patientService.findById(req.params.id);

  //Se temos patient => vamos criar o 
  if (patient) {
    //toNewEntry(req.body);
    res.send(patient);
  } else {
    res.sendStatus(404);
  }  

/*   try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    if(e instanceof Error){
      res.status(400).send(e.message);
    }
  } */

});

export default router;