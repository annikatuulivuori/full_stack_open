import patientData from '../data/patients';
import { NonSensitivePatient, Patient } from '../types';

const removeSensitiveInfo = (patient: Patient): NonSensitivePatient => {
  const { id, name, dateOfBirth, gender, occupation } = patient;
  return { id, name, dateOfBirth, gender, occupation };
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patientData.map(p => removeSensitiveInfo(p));
};

const getPatients = (): Patient[] => {
  return patientData;
};

export default { 
  getNonSensitivePatients,
  getPatients
};