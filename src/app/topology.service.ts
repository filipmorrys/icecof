import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Node, Track } from './issues/issues.model';

const END_POINT = 'http://localhost:8080';

@Injectable()
export class TopologyService {

  constructor(private http: HttpClient) { }

  /**
   * Pide al servidor la lista de nodos y devuelve un Array<Node>
   */
  findNodes() {
    const resNodes: Array<Node> = [];
    return this.http.get(END_POINT + '/nodes').toPromise()
    .then(
      (response: any) => {
        /*
          * Recepción de la petición http
          */
        console.log('Peticion de nodos: OK');
        response.forEach((elem) => {
          resNodes.push(elem);
        });
        return resNodes;
      },
      (error: any) => {
        /*
          * Recepción de error en la petición http
          */
        console.log('Peticion de nodos: ERROR');
        console.log(error);
      }
    );
  }

  /**
   * Devuelve las vías de estación y de circulación entre el nodo
   * inicial y final. Pide dichas vías al servidor. Devuelve Array<Track>
   *
   * @param initialNode identificador del nodo inicial
   * @param finalNode identificador del nodo final
   */
  findTracks(initialNode: number, finalNode: number) {
    const resTracks: Array<Track> = [];
    return this.http.get(END_POINT + '/tracks/' + initialNode + '/' + finalNode).toPromise()
    .then(
      (response: any) => {
        console.log('Peticion de vías: OK');
        response.forEach(
          (elem) => {
            resTracks.push(elem);
          }
        );
        return resTracks;
      },
      (error) => {
        console.log('Peticion de vías: ERROR');
        console.log(error);
      }
    );
  }
}
