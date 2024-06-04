import { FileHandle } from "./file-handle.model"

export type Demande = {
    id?:number
    dateCreation?:Date
    nom?:string
    prenom?:string
    adresse?:string
    cin?:string
    document:FileHandle[]
}

export interface demandeFormData  {
    id:number
    dateCreation:Date
    nom:string
    prenom:string
    adresse:string
    cin:string
    document:FileHandle[] 
}