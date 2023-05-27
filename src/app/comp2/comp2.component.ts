import { Component } from '@angular/core';
import { DemoService } from '../demo.service';

@Component({
  selector: 'app-comp2',
  templateUrl: './comp2.component.html',
  styleUrls: ['./comp2.component.css']
})
export class Comp2Component {
  item$ = this.service.getItem()
  list$ = this.service.getList()

  constructor(readonly service: DemoService) {}
}
