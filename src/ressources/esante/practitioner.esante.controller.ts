import { Request, Response, response } from 'express';
import { searchPractitioner } from './practitioner.esante.service';
import { PractitionerEsanteResponse } from './practitioner.esante.model';

// Controller pour récupérer tous les praticiens
export const getPractitioner = async (req: Request, res: Response) => {
    try {
        const { rpps } = req.params;

        // Conversion de `numberToDisplay` en nombre
        const id = rpps ? parseInt(rpps, 10) : 10; // Par défaut à 10 si non spécifié

        // Appel à la fonction searchPractitioner avec les paramètres récupérés ou les valeurs par défaut
        const response = await searchPractitioner(id) as PractitionerEsanteResponse

        const emailAddresses: string[] = [];
        response.entry.forEach(entry => {
            entry.resource.extension.forEach(extension => {
                const emailExtension = extension.extension.find(ext => ext.url === 'value');
                if (emailExtension && emailExtension.valueString) {
                    emailAddresses.push(emailExtension.valueString);
                }
            });
        });

        // Envoi de la réponse avec uniquement le tableau de mails
        res.json({emailAddresses});
    } catch (error) {
        // Gestion des erreurs
        console.error("Error fetching practicians:", error);
        res.status(500).send('Une erreur est survenue lors de la récupération des emails.');
    }
};
