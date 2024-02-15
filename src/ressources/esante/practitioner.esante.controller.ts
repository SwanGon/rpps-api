import { Request, Response, response } from 'express';
import { searchPractitioner } from './practitioner.esante.service';
import { PractitionerEsanteResponse } from './practitioner.esante.model';

// Controller pour récupérer tous les praticiens
export const getPractitioner = async (req: Request, res: Response) => {
    try {
        const { rpps } = req.params;

        const id = parseInt(rpps, 10);

        // Appel à la fonction searchPractitioner avec les paramètres récupérés ou les valeurs par défaut
        const response = await searchPractitioner(id) as PractitionerEsanteResponse

        const emailAddresses: string[] = [];
        response.entry.forEach(it => {
            if (it.resource.extension == null) {
                return res.json([])
            } else {
                it.resource.extension.forEach(it => {
                    const emailExtension = it.extension.find(ext => ext.url === 'value');
                    if (emailExtension && emailExtension.valueString) {
                        emailAddresses.push(emailExtension.valueString);
                    }
                });
            }
            
        });

        // Envoi de la réponse avec uniquement le tableau de mails
        return res.json(emailAddresses);
    } catch (error) {
        // Gestion des erreurs
        console.error("Error fetching practicians:", error);
        res.status(500).send('Une erreur est survenue lors de la récupération des emails.');
    }
};
