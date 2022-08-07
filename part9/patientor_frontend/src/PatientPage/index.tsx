import { useParams, useNavigate } from "react-router-dom";
import { addPatientCache, useStateValue } from "../state";
import { useEffect,useState } from "react";
import { Patient } from "../types";
import axios from "axios";
import { apiBaseUrl } from "../constants";

//Gender Icons
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import EntriesList from "../components/EntriesList";


/**  
 * EX:
 * - Fetch the data from the endpoint created in the previous exercise
 * - Add the fetched information to the application's state.
 * - Do not fetch the information if it already is in the app state
 * 
 * Solution:
 * I'm going to create in the state some kind of "Patientcache", where
 * the entire known info is stored.
 * 
 * New State:
 * {
 *  patient : "Public known info"
 *  patientCache : "All Patient info"
 * }
 */
const PatientPage = () => {

    const navigate = useNavigate();
    const [patient,setPatient] = useState<null | Patient>(null);
    const [{patientsCache},dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();


    useEffect(()=>{

        const fetchPatient = async () =>{
            try{
                if(id && id in patientsCache){ //Already In cache => Get user
                    setPatient(patientsCache[id]);
                }else{  //Get user user from backend
                    if(id){
                        const {data : pat} = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);  
                        setPatient(pat);
                        dispatch(addPatientCache(pat)); //Add user to cache
                    }
                }
            }catch(e){  //Not found or Error ? Redirect to homepage
                console.log(e);
                navigate('/');
            }
        };
        void fetchPatient();
    },[]);

    //Mount component while loading
    if(patient === null){
        return(<p>Loading...</p>);
    //Render user
    }else{  

        return(
            <div>
                <h2>{patient.name}                
                { 
                    patient.gender === 'male' ? <MaleIcon/>
                    : patient.gender === 'female' ? <FemaleIcon/>
                    : <TransgenderIcon/>
                }
                </h2>
                { patient.ssn && <p>ssh: {patient.ssn} </p> }
                <p>Occupation: {patient.occupation}</p>

                <EntriesList entries={patient.entries} />
            </div>
        );

    }
    
};


export default PatientPage;