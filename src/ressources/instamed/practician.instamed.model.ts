interface PracticianInstamedResponse {
  "hydra:member": Practician[];
  "hydra:totalItems": number;
  "hydra:view": HydraView;
  "hydra:search": HydraSearch;
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
    finessNumber: string;
    cpsNumber: string;
    id: string;
    fullName: string;
  }
  
  interface HydraView {
    "@id": string;
    "type": string;
    "hydra:first": string;
    "hydra:last": string;
    "hydra:previous"?: string;
    "hydra:next"?: string;
  }
  
  interface HydraSearch {
    "@type": string;
    "hydra:template": string;
    "hydra:variableRepresentation": string;
    "hydra:mapping": HydraMapping[];
  }
  
  interface HydraMapping {
    "@type": string;
    variable: string;
    property: string;
    required: boolean;
  }
  