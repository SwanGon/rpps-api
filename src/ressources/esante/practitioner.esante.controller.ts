import { Request, Response, response } from 'express';
import { searchPractitioner } from './practitioner.esante.service';
import { PractitionerEsanteResponse } from './practitioner.esante.model';

// Controller pour récupérer tous les praticiens
export const getPractitioner = async (req: Request, res: Response) => {
    try {
        const { rpps } = req.params;

        const id = parseInt(rpps, 10);
        // Appel à la fonction searchPractitioner avec l'ID du praticien
        const response = await searchPractitioner(id) as PractitionerEsanteResponse;

        // Initialisation du tableau pour les adresses email
        const emailAddresses: string[] = [];

        // Traitement des données pour extraire les adresses email
        response.entry.forEach(it => {
            it.resource.extension?.forEach(ext => {
                const emailExtension = ext.extension.find(ext => ext.url === 'value');
                if (emailExtension && emailExtension.valueString) {
                    emailAddresses.push(emailExtension.valueString);
                }
            });
        });

        // Vérification après traitement pour voir si des emails ont été trouvés
        if (emailAddresses.length === 0) {
            // Si aucun email n'a été trouvé, envoyer une réponse vide
            return res.json([]);
        } else {
            // Sinon, envoyer les adresses email trouvées
            return res.json(emailAddresses);
        }
    } catch (error) {
        // Gestion des erreurs
        console.error("Error fetching practicians:", error);
        res.status(500).send('Une erreur est survenue lors de la récupération des emails.');
    }
};
