export interface PractitionerEsanteResponse {
    entry : Practitionner[]
}

interface Practitionner {
    resource : {
        extension : {
            extension : {
                url : string
                valueString : string
            } []
        } []
    }
}
