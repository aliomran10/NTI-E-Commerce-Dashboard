import { Component } from '@angular/core';
import { HeroComponent } from "../hero/hero.component";
import { MenubarComponent } from "../menubar/menubar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, MenubarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
