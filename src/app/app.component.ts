import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppTableComponent } from '../../projects/table/src/lib/feature/app-table/app-table.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, AppTableComponent]
})
export class AppComponent {
  title = 'untitled1';
}
