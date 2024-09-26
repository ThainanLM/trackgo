import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  showSemanalData: boolean = false;  // Controla a exibição dos dados semanais
  showMensalData: boolean = false;   // Controla a exibição dos dados mensais
  
  // Dados semanais
  semanalDistance: number = 0;
  semanalCalories: number = 0;
  semanalActiveTime: number = 0;

  // Dados mensais
  mensalDistance: number = 0;
  mensalCalories: number = 0;
  mensalActiveTime: number = 0;

  constructor() {}

  // Método chamado ao clicar nos botões
  toggleData(period: string) {
    if (period === 'semanal') {
      this.showSemanalData = !this.showSemanalData;  // Alterna a visibilidade dos dados semanais
      if (this.showSemanalData) {
        // Simulando valores para o período semanal
        this.semanalDistance = 5;   // Exemplo: 5 Km para Semanal
        this.semanalCalories = 300; // Exemplo: 300 Kcal para Semanal
        this.semanalActiveTime = 2; // Exemplo: 2 Hrs para Semanal
      }
    } else if (period === 'mensal') {
      this.showMensalData = !this.showMensalData;  // Alterna a visibilidade dos dados mensais
      if (this.showMensalData) {
        // Simulando valores para o período mensal
        this.mensalDistance = 20;  // Exemplo: 20 Km para Mensal
        this.mensalCalories = 1200; // Exemplo: 1200 Kcal para Mensal
        this.mensalActiveTime = 8;  // Exemplo: 8 Hrs para Mensal
      }
    }
  }
}

