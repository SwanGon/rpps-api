import axios from 'axios';
import { Practician, PracticianInstamedResponse } from './practician.instamed.model';

const urlInstamed = 'https://data.instamed.fr/api'

export async function searchPractician(str: string, nb : number): Promise<PracticianInstamedResponse> {
  const response = await axios.get<PracticianInstamedResponse>(urlInstamed + '/rpps?page=1&_per_page=' + nb + '&search=' + str);
  return response.data;
}

export async function fetchPracticianWithRpps(rpps:number) {
  const response = await axios.get<Practician>(urlInstamed + "/rpps/" + rpps);
  return response.data
}
