/**
 * 
 */
export class WorkOnTrack {

    constructor() {
        this.workIntervals = [new WorkInterval()];
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
        this.tracks = [new TrackTypeEntry()];
    }

    intervalId: string;
    startTime: Date;
    endTimeDate: Date;
    traject: string;
    startPk: number;
    endPk: number;
    startNode: string;
    endNode: string;
    startNodeInclude: string;
    endNodeInclude: string;
    circAffected: string;
    tracks: Array<TrackTypeEntry | TrackId>;
}

/**
 * 
 */
export class TrackTypeEntry {
    trackType: TrackType;
    cutType: CutType;
}

/**
 * 
 */
export class TrackId {
    id: number;
    cutType: CutType;
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