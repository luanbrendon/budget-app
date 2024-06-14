import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  AfterViewInit, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
CommonModule
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);



@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements AfterViewInit {
  @ViewChild('myChart') myChart!: ElementRef<HTMLCanvasElement>;
  isBrowser: boolean;

  chartData: number[] = [12, 19, 3, 5, 2, 3];
  categories = [
    { name: 'Gastos Fixos', percentage: 0.5 },
    { name: 'Gastos Variáveis', percentage: 0.3 },
    { name: 'Investimentos', percentage: 0.2 }
  ];
  expenses: number[] = [1000, 600, 400];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.createChart();
    }
  }

  createChart(): void {
    const ctx = this.myChart.nativeElement.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: this.categories.map(category => category.name),
          datasets: [{
            label: 'Distribuição de Gastos',
            data: this.categories.map(category => category.percentage * 100),
            backgroundColor: [
              'rgba(170, 217, 119, 1)',
              'rgba(245, 135, 138, 1)',
              'rgba(234, 147, 135, 1)',
            ],
            hoverOffset: 4,
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1
          }]
        },
        options: {
          cutout: '70%',
          responsive: true,
          maintainAspectRatio: false
        }
      });
    } else {
      console.error('Failed to acquire context for chart');
    }
  }

  getAllocatedAmount(category: any): number {
    return 3000 * category.percentage;
  }

  getRemainingAmount(index: number): number {
    return this.getAllocatedAmount(this.categories[index]) - this.expenses[index];
  }
}