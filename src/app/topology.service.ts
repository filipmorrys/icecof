import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Node, Track } from './issues/issues.model';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

const END_POINT = 'http://localhost:8080/api';

@Injectable()
export class TopologyService {

  /**
   * Array de nodos de la topología
   */
  nodes: Array<Node>

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.findNodes();
  }

  /**
   * Pide al servidor la lista de nodos y devuelve un Array<Node>
   */
  findNodes() {
    return this.http.get(END_POINT + '/nodes').toPromise()
    .then(
      (response: any) => {
        console.log('Peticion de nodos: OK');
        this.nodes = response;
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

  /**
   * Devuelve el id de un nodo a partir de su mnemonico
   * @param mnemo mnemonico del nodo
   */
  getNodeIdByMnemo(mnemo: string): number {
    return this.getNodeByMnemo(mnemo).id;    
  }

  getNodeByMnemo(mnemo: string): Node {
    for (let n of this.nodes) {
      if (n.mnemonic === mnemo) {
        return n;
      }
    }    
  }

}
