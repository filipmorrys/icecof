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

    constructor(
        id: number,
        mnemonic: string,
        name: string,
        trackType: string,
        initialNode: string,
        finalNode: string,
        initialNodeShortName: string = '',
        finalNodeShortName: string = ''
    ) {
        this.id = id;
        this.mnemonic = mnemonic;
        this.name = name;
        this.trackType = trackType;
        this.initialNode = initialNode;
        this.finalNode = finalNode;
        this.initialNodeShortName = initialNodeShortName;
        this.finalNodeShortName = finalNodeShortName;
    }
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