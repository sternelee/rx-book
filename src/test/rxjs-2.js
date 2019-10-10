import { take, map, combineAll, throttleTime, scan } from 'rxjs/operators'
import { interval, fromEvent } from 'rxjs'

const source = interval(1000).pipe(take(2))
const example = source.pipe(
    map(val => interval(1000).pipe(map(i => `Result (${val}): ${i}`), take(5)))
)

const combined = example.pipe(combineAll())

const subscribe = combined.subscribe(val => console.log(val));

const button = document.querySelector('button');
fromEvent(button, 'click').pipe(
    throttleTime(1000),
    scan(count => count + 1, 0)
)
.subscribe(count => console.log(`Clicked ${count} times`));