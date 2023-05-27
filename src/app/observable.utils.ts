import { Subject } from 'rxjs'

export class ObservableLoop<T> {
  private subject? = new Subject<T>()
  readonly observable$ = this.subject?.asObservable()
  private intervalId?: any

  constructor(time: number, data: T[]) {
    let counter = 0
    this.intervalId = setInterval(() => {
        if(counter >= data.length) {
          counter = 0
        }
        const next = counter++
        this.subject?.next(data[next])
    }, time)
  }

  complete() {
      if(this.intervalId) {
        clearInterval(this.intervalId)
        this.intervalId = undefined
        this.subject?.complete()
        this.subject = undefined
      }
  }
}

export class ObservableOnetime<T> {
  private subject? = new Subject<T>()
  readonly observable$ = this.subject?.asObservable()
  private intervalId?: any

  constructor(time: number, data: T[]) {
    let counter = 0
    this.intervalId = setInterval(() => {
        if(counter >= data.length) {
          this.subject?.complete()
          clearInterval(this.intervalId)
        }
        const next = counter++
        this.subject?.next(data[next])
    }, time)
  }
}

