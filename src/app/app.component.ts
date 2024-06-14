import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from './component/card/card.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './component/header/header.component';
import { HomeComponent } from './component/home/home.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , CardComponent, CommonModule, HeaderComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'budget-app';
}
