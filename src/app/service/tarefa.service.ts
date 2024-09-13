import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { Tarefa } from '../interface/tarefa';

@Injectable({
  providedIn: 'root',
})
export class TarefaService {
  private readonly API = 'http://localhost:3000/tarefas';
  private tarefasSubjetc = new BehaviorSubject<Tarefa[]>([]);
  tarefas$ = this.tarefasSubjetc.asObservable();

  constructor(private http: HttpClient) {}

  listar(): void {
    let params = new HttpParams().appendAll({
      _sort: 'id',
      _order: 'desc',
    });
    this.http.get<Tarefa[]>(this.API, { params }).subscribe(tarefas => {
      let tarefasTemporarias = this.tarefasSubjetc.getValue();
      tarefasTemporarias = tarefasTemporarias.concat(tarefas);
      this.tarefasSubjetc.next(tarefasTemporarias);
    });
  }

  criar(tarefa: Tarefa): void {
    this.http.post<Tarefa>(this.API, tarefa).subscribe(novaTarefa => {
      const tarefas = this.tarefasSubjetc.getValue();
      tarefas.unshift(novaTarefa);
      this.tarefasSubjetc.next(tarefas);
    });
  }

  editar(tarefa: Tarefa, subject: boolean): void {
    const url = `${this.API}/${tarefa.id}`;
    if(subject){
      this.http.put<Tarefa>(url, tarefa).subscribe(tarefaEditada => {
        const tarefas = this.tarefasSubjetc.getValue();
        const index = tarefas.findIndex(tarefa => tarefa.id === tarefaEditada.id);
        if(index !== -1){
          tarefas[index] = tarefaEditada;
          this.tarefasSubjetc.next(tarefas);
        }
      });
    }
  }

  excluir(id: number): void {
    const url = `${this.API}/${id}`;
    this.http.delete<Tarefa>(url).subscribe(() => {
      const tarefas = this.tarefasSubjetc.getValue();
      const index = tarefas.findIndex(tarefa => tarefa.id === id);
      if(index !== -1){
        tarefas.splice(index, 1);
        this.tarefasSubjetc.next(tarefas);
      }
    });
  }

  buscarPorId(id: number): Observable<Tarefa> {
    const url = `${this.API}/${id}`;
    return this.http.get<Tarefa>(url);
  }

  atualizarStatusTarefa(tarefa: Tarefa): void {
    tarefa.statusFinalizado = !tarefa.statusFinalizado;
    this.editar(tarefa, false);
  }
}
