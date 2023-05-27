import { Component, OnInit } from '@angular/core';
import { DemoService } from '../demo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comp1',
  templateUrl: './comp1.component.html',
  styleUrls: ['./comp1.component.css']
})
export class Comp1Component implements OnInit {
  private subItem?: Subscription
  private subList?: Subscription

  item?: string
  list?: string[]

  constructor(private service: DemoService) {}

  ngOnInit(): void {
    this.subItem = this.service.getItem().subscribe( value => {
      this.item = value
    })
    this.subList = this.service.getList().subscribe( value => {
      this.list = value
    })
  }

  ngOnDestroy(): void {
    this.subItem?.unsubscribe()
    this.subList?.unsubscribe()
  }
}
