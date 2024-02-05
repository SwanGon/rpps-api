import axios from 'axios'; // Assurez-vous d'installer axios avec npm ou yarn

async function searchPractician(str: string): Promise<PracticianInstamedResponse[]> {
  const response = await axios.get<PracticianInstamedResponse[]>('/chemin/de/lapi/des/médecins');
  return response.data;
}
