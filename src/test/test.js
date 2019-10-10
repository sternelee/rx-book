import { fromEvent, Observable } from 'rxjs'
import { throttleTime, scan, map } from 'rxjs/operators'

fromEvent(document, "click")
    .pipe(
        throttleTime(1000),
        map(event => event.clientX),
        scan((count, clientX) => count + clientX, 0)
    )
    .subscribe(count => console.log(`Clicked ${count} times`))

const observable = new Observable(subscriber => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    setTimeout(() => {
        subscriber.next(4);
        subscriber.complete();
    }, 1000);
});
console.log('just before subscribe');
observable.subscribe({
    next(x) {
        console.log('got value' + x)
    },
    error (err) {
        console.log('something wrong', err)
    },
    complete() {
        console.log('done')
    }
});
console.log('just after subscribe');

const ob1 = new Observable(subscriber => {
    const id = setInterval(() => {
        subscriber.next('hi')
    }, 1000)
});
const sub1 = ob1.subscribe(x => console.log(x))
setTimeout(() => {
    sub1.unsubscribe()
}, 10000)


function sub2(subscriber) {
    const intervalId = setInterval(() => {
      subscriber.next('hi');
    }, 1000);
   
    return function unsubscribe() {
      clearInterval(intervalId);
    };
  }
   
  const unsubscribe = sub2({next: (x) => console.log('111', x)});
   
  // Later:
  unsubscribe(); // dispose the resources