import express from 'express';
import diagnosesServices from '../services/diagnoseService';

const router = express.Router();

//Get All Diagnoses
router.get('/', (_req, res) => {
    res.send(diagnosesServices.getDiagnoses());
});


export default router;

