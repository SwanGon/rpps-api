export interface PracticianInstamedResponse {
  "hydra:member": Practician[];
}

interface Practician {
    "@id": string;
    "@type": string;
    idRpps: number;
    title: string;
    lastName: string;
    firstName: string;
    specialty: string;
    address: string;
    zipcode: string;
    city: string;
    phoneNumber: string;
    email: string;
    id: string;
    fullName: string;
  }
  