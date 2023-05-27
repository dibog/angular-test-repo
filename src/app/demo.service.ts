import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ObservableLoop, ObservableOnetime } from './observable.utils'

@Injectable({
  providedIn: 'root'
})
export class DemoService {
  private itemLoop = new ObservableLoop(2000, ["item-1", "item-2", "item-3"])
  private listLoop = new ObservableLoop(3000, [["entry-1"], ["entry-1", "entry-2"], ["entry-3", "entry-4", "entry-5"]])

  getItem(): Observable<string> {
    return this.itemLoop.observable$!
  }

  getList(): Observable<string[]> {
    return this.listLoop.observable$!
  }
}

export class DemoServiceOneTime {
  private itemLoop = new ObservableOnetime(20, ["item-1", "item-2", "item-3"])
  private listLoop = new ObservableOnetime(30, [["entry-1"], ["entry-1", "entry-2"], ["entry-3", "entry-4", "entry-5"]])

  getItem(): Observable<string> {
    return this.itemLoop.observable$!
  }

  getList(): Observable<string[]> {
    return this.listLoop.observable$!
  }
}

export class DemoServiceDouble {
  constructor(readonly item$: Subject<string>, readonly list$: Subject<string[]>) {}

  getItem(): Observable<string> {
    return this.item$
  }

  getList(): Observable<string[]> {
    return this.list$
  }
}
