import { Component } from '@angular/core';
import { BtnGroupComponent } from '../../shared/btn-group/btn-group.component';

@Component({
  selector: 'tilethuc-header',
  standalone: true,
  imports: [
    BtnGroupComponent
  ],
  template: `
    <div class="container-fluid shadow-sm px-3">
      <btn-group></btn-group>

    </div>
  `,
  styleUrl: './header-tilethuc.component.css'
})
export class HeaderTilethucComponent {

}
