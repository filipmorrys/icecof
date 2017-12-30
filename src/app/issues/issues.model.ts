/**
 * Modelo de incidencia
 */
export class Issue {

    /** Codigo de incidencia */
    code: string;

    /** Descripción de la incidencia */
    description: string;

    /** Tipo de incideneia */
    type: string;

    /** Subtipo de incidencia */
    subtype: string;

    /** Estado de la incidencia */
    state: IssueState;

    /** Nodo inicial */
    initialNode: Node;

    /** Nodo final */
    finalNode: Node;

    /** Hora inicial */
    initialHour: string;

    /** Hora final */
    finalHour: string;

    expectedFinalHour: string;

    /** Lista de tracks afectadas */
    tracks: Array<Track>;

    constructor() {
        this.tracks = [];
    }

}

/**
 * Representa un nodo
 */
export class Node {
    /** Mnemonico del nodo */
    mnemonic: string;

    /** Nombre completo del nodo */
    name: string;

    /** Nombre corto del nodo */
    shortName: string;
}

/**
 * Representa una via
 */
export class Track {

    mnemonic: string;

    name: string;

    trackType: TrackType;

    initialNode: string;

    finalNode: string;

}

/**
 * Enumerado de tipos de incidencia
 */
export enum IssueState {
    Open,
    Close,
    Cancelled
}

export enum TrackType {
    Station, 
    Circulation
}

export enum ComponentState {
    NewIssue,
    EditIssue,
    ConsultIssue,
    None  
}