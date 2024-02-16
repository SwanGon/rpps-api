import { Request, Response } from 'express';
import { fetchPracticianWithRpps, searchPractician } from './practician.instamed.service';
import { Practician, PracticianInstamedResponse } from './practician.instamed.model';

// Controller pour récupérer tous les praticiens
export const getPracticians = async (req: Request, res: Response) => {
    const { searchString, numberToDisplay } = req.params;

        // Conversion de `numberToDisplay` en nombre
        const nb = numberToDisplay ? parseInt(numberToDisplay, 10) : 10; // Par défaut à 10 si non spécifié

        const regex = new RegExp("\d{11}")
        if (regex.test(searchString)) {
            return withRpps(parseInt(searchString, 10), res)
        } else {
            return withSearch(searchString, nb, res)
        }
};

const withRpps = async (rpps: number, res: Response) => {
    try {
        const response = await fetchPracticianWithRpps(rpps) as Practician
        
        res.json([response])
    } catch (error) {
        // Gestion des erreurs
        console.error("Error fetching practician:", error);
        res.status(500).send('Une erreur est survenue lors de la récupération du praticien.');
    }

}

const withSearch = async (searchString: string, numberToDisplay: number, res: Response) => {
    try {
        // Appel à la fonction searchPractician avec les paramètres récupérés ou les valeurs par défaut
        const response = await searchPractician(searchString || '', numberToDisplay) as PracticianInstamedResponse

        // Vérifier si `hydra:member` existe dans la réponse, sinon renvoyer un tableau vide
        const members = response["hydra:member"] ? response['hydra:member'].map(practician => ({
            rpps: practician.idRpps,
            firstName  : practician.firstName,
            lastName : practician.lastName,
            fullName : practician.fullName,
            specialty : practician.specialty,
            address : practician.address,
            zipcode : practician.zipcode,
            city : practician.city,
            phoneNumber : practician.phoneNumber
            
        })) : [];

        // Envoi de la réponse avec uniquement le tableau `hydra:member`
        res.json(members);
    } catch (error) {
        // Gestion des erreurs
        console.error("Error fetching practicians:", error);
        res.status(500).send('Une erreur est survenue lors de la récupération des praticiens.');
    }
}