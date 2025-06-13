import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private apiUrl = 'http://localhost:8000/tasks';

  constructor(private http: HttpClient) {}

  getTarefas(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  criarTarefa(tarefa: any): Observable<any> {
    return this.http.post(this.apiUrl, tarefa);
  }

  concluirTarefa(id: number, tarefaAtual: any): Observable<any> {
    const tarefaAtualizada = {
      title: tarefaAtual.title,
      description: tarefaAtual.description,
      due_date: tarefaAtual.due_date,
      is_done: true
    };
  
    return this.http.patch(`${this.apiUrl}/${id}`, tarefaAtualizada);
  }
  

  removerTarefa(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
