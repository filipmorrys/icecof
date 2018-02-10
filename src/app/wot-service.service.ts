import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WorkOnTrack } from './work-on-tracks/work-on-tracks.model';

const END_POINT = 'http://localhost:8080/api';

@Injectable()
export class WotService {

  wots: Array<WorkOnTrack>;

  constructor(private http: HttpClient) { }

  getWots() {
    this.http.get(END_POINT + '/wot').subscribe(
      (res: any) => {
        this.wots = res;
      },
      (error) => {
        console.log("No se pudieron recuperar los workOnTracks");
      }

    );
  }

  saveWot(wot: WorkOnTrack) {
    this.http.post(END_POINT + '/wot', wot).subscribe(
      (res: any) => {
        console.log("workOnTrack salvado OK");
      },
      (error) => {
        console.log("No se pudo salvar el workOnTrack");
      }
    );
  }

}
