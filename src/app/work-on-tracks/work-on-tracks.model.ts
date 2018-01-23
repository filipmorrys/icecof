/**
 * 
 */
export class WorkOnTrack {

    constructor() {
        this.workIntervals = [];
    }

    id: number;
    description: string;
    contractor: string;
    workOnTrackClass: string;
    personContact: string;
    phone: string;
    responsable: string;
    occupationZone: string;
    issueId: number;
    workIntervals: Array<WorkInterval>;
}
/**
 * 
 */
export class WorkInterval {

    constructor() {
        this.tracks = [];
    
    }

    intervalId: string;
    startTime: Date;
    endTime: Date;
    traject: string;
    startPk: number;
    endPk: number;
    startNode: string;
    endNode: string;
    startNodeInclude: string;
    endNodeInclude: string;
    circAffected: string;
    tracks: Array<TrackTypeEntry | TrackIdEntry>;
}


export class TrackEntry {
    cutType: number;
}

/**
 * 
 */
export class TrackTypeEntry extends TrackEntry {
    trackType: number;
}

/**
 * 
 */
export class TrackIdEntry extends TrackEntry {
    id: number;
}

/**
 * 
 */
export enum CutType {
    TOTAL = 0, ELECT = 1
}

/**
 * 
 */
export enum TrackType {
    EVEN = 0,
    ODD = 1,
    BOTH = 2,
    STATION = 3
}