import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing'

import { Comp1Component } from './comp1.component'
import { DemoService, DemoServiceDouble } from '../demo.service'
import { Subject } from 'rxjs'

describe('Comp1Component', () => {
  let component: Comp1Component
  let fixture: ComponentFixture<Comp1Component>
  let item = new Subject<string>()
  let list  = new Subject<string[]>()

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Comp1Component ],
      providers: [{ provide: DemoService, useValue: new DemoServiceDouble(item, list)}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Comp1Component);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('verify item', fakeAsync((): void => {
    const element = fixture.nativeElement
    fixture.detectChanges()

    expect(element.querySelector("h2").textContent).toEqual('')

    item.next("# item-1")
    fixture.detectChanges()
    flush()
    expect(element.querySelector("h2").textContent).toEqual('# item-1')

    item.next("# item-2")
    fixture.detectChanges()
    flush()
    expect(element.querySelector("h2").textContent).toEqual('# item-2')

    item.next("# item-3")
    fixture.detectChanges()
    flush()
    expect(element.querySelector("h2").textContent).toEqual('# item-3')
  }))

  it('verify list', fakeAsync((): void => {
    const element = fixture.nativeElement
    fixture.detectChanges()

    expect(element.querySelector("#i0")).toEqual(null)

    list.next(["a","b"])
    fixture.detectChanges()
    flush()
    expect(element.querySelector("#i0").textContent).toEqual('a')
    expect(element.querySelector("#i1").textContent).toEqual('b')

    list.next(["x","y", "z"])
    fixture.detectChanges()
    flush()
    expect(element.querySelector("#i0").textContent).toEqual('x')
    expect(element.querySelector("#i1").textContent).toEqual('y')
    expect(element.querySelector("#i2").textContent).toEqual('z')
  }))
});


