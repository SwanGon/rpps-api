import axios from 'axios';
import dotenv from "dotenv";
import { PractitionerEsanteResponse } from './practitioner.esante.model'

// Charge les variables d'environnement à partir d'un fichier .env
dotenv.config();

// Configure le client axios globalement une seule fois
axios.defaults.baseURL = "https://gateway.api.esante.gouv.fr/fhir/v1";
axios.defaults.headers.common['ESANTE-API-KEY'] = process.env.E_SANTE_API_KEY;

export async function searchPractitioner(id: number): Promise<PractitionerEsanteResponse> {
  try {
    // Utilisation de template strings pour construire l'URL
    const response = await axios.get<PractitionerEsanteResponse>(`/Practitioner?identifier=${id}`);
    return response.data;
  } catch (error) {
    // Ici, vous pouvez décider de gérer les erreurs spécifiques ou de les relancer
    console.error("Error fetching practitioner data:", error);
    throw new Error('Failed to fetch practitioner data');
  }
}
