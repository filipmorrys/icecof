/**
 * Modelo de incidencia
 */
export class Issue {

    /** Identificador de la issue */
    id: number;

    /** Codigo de incidencia */
    code: string;

    /** Descripción de la incidencia */
    description: string;

    /** Tipo de incideneia */
    type: string;

    /** Subtipo de incidencia */
    subtype: string;

    /** Estado de la incidencia */
    state: number;

    /** Mnemonico del Nodo inicial */
    initialNode: string;

    /** Mnemonico del Nodo final */
    finalNode: string;

    /** Hora inicial */
    initialHour: Date;

    /** Hora final */
    finalHour: Date;

    /** Hora final esperada */
    expectedFinalHour: Date;

    /** Lista de mnemonicos de las tracks afectadas */
    tracks: Array<string>;

    constructor() {
        this.tracks = [];
    }

}

/**
 * Representa un nodo
 */
export class Node {
    /** Identificador del nodo */
    id: number;

    /** Mnemonico del nodo */
    mnemonic: string;

    /** Nombre completo del nodo */
    name: string;

    /** Nombre corto del nodo */
    shortName: string;

    /** Punto kilometrico del nodo */
    sectionKp: number;
}

/**
 * Representa una via
 */
export class Track {

    id: number;

    mnemonic: string;

    name: string;

    trackType: string;

    initialNode: string;

    finalNode: string;

    initialNodeShortName: string;

    finalNodeShortName: string;

}

/**
 * Enumerado de tipos de incidencia
 */
export enum IssueState {
    Open = 0,
    Close = 1,
    Cancelled = 2
}

export enum TrackType {
    Station = 0,
    Circulation = 1
}

export enum ComponentState {
    Default = 0,
    NewIssue = 1,
    EditIssue = 2,
    ConsultIssue = 3
}
