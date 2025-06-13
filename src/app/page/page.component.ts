import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
  imports: [CommonModule, FormsModule]
})
export class PageComponent implements OnInit {
  tarefas: any[] = [];
  filtro: string = 'todas';
  novaTarefa = {
    title: '',
    description: '',
    due_date: '',
    is_done: false
  };
  

  constructor(private service: ServicesService) {}

  ngOnInit(): void {
    this.buscarTarefas();
  }

  buscarTarefas(): void {
    this.service.getTarefas().subscribe(
      (res) => {
        this.tarefas = res;
        console.log('Tarefas carregadas:', this.tarefas);
      },
      (erro) => {
        console.error('Erro ao buscar tarefas:', erro);
      }
    );
  }

  
  criarTarefa(form: any): void {
    this.service.criarTarefa(this.novaTarefa).subscribe(
      () => {
        form.resetForm();
        this.novaTarefa = { title: '', description: '', due_date: '', is_done: false };
        this.buscarTarefas();
      },
      erro => console.error('Erro ao criar tarefa:', erro)
    );
  }
  

  concluir(id: number): void {
    const tarefa = this.tarefas.find(t => t.id === id);
    if (!tarefa) return;
  
    this.service.concluirTarefa(id, tarefa).subscribe(
      () => this.buscarTarefas(),
      erro => console.error('Erro ao concluir:', erro)
    );
  }  

  remover(id: number): void {
    if (confirm('Tem certeza que deseja remover?')) {
      this.service.removerTarefa(id).subscribe(
        () => this.buscarTarefas(),
        (erro) => console.error('Erro ao remover:', erro)
      );
    }
  }

  tarefasFiltradas(): any[] {
    if (this.filtro === 'todas') return this.tarefas;
    if (this.filtro === 'pendente') return this.tarefas.filter(t => !t.is_done);
    if (this.filtro === 'concluida') return this.tarefas.filter(t => t.is_done);
    return [];
  }
}
