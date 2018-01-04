import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Node } from './issues/issues.model';

const END_POINT:string = 'http://localhost:8080';

@Injectable()
export class TopologyService {

  constructor(private http:HttpClient) { }

  /**
   * Pide al servidor la lista de nodos y devuelve un Array<Node>
   */
  findNodes() {
    const res: Array<Node> = [];
    return this.http.get('http://localhost:8080/nodes').toPromise()
      .then(
        (response: any) => {
          /*
           * Recepción de la petición http
           */
          console.log('Peticion de nodos: OK');
          response.forEach((elem) => {
            res.push(elem);
          });
          return res;
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
}
