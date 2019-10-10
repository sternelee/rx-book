import { of, from, fromEvent, zip, interval } from 'rxjs'
import { map, delay, switchMap, startWith, takeUntil, tap, mergeMap } from 'rxjs/operators'
import './drag2.styl'

const sourceOne = of('Hello');
const sourceTwo = of('World!');
const sourceThree = of('Goodbye');
const sourceFour = of('World!');
// 一直等到所有 observables 都发出一个值，才将所有值作为数组发出
const example = zip(
  sourceOne,
  sourceTwo.pipe(delay(1000)),
  sourceThree.pipe(delay(2000)),
  sourceFour.pipe(delay(3000))
);
// 输出: ["Hello", "World!", "Goodbye", "World!"]
const subscribe = example.subscribe(val => console.log(val));

let index = 0

const headBox = document.getElementById('head')
const boxes = document.getElementsByClassName('box')
const mouseDown$ = fromEvent(headBox, 'mousedown')
const mouseMove$ = fromEvent(document, 'mousemove')
const mouseUp$ = fromEvent(document, 'mouseup')

// const timer = interval(100)
const delayBoxes$ = from([].slice.call(boxes, 0))
.pipe(
  delay(100)
)


// const box0 = of(boxes[0]).pipe(delay(100*0))
// const box1 = of(boxes[1]).pipe(delay(100*1))
// const box2 = of(boxes[2]).pipe(delay(100*2))
// const box3 = of(boxes[3]).pipe(delay(100*3))
// .pipe(
//     map(v => v),
//     interval(100),
//     startWith(0),
//     zip(box => box)
// )
// const delayBoxes$ = zip(box0, box1, box2, box3)

mouseDown$.pipe(
    map(e => {
        const pos = getTranslate(headBox)
        return {
          pos,
          event: e,
        }
      }
    ),
    switchMap(initialState => {
        const initialPos = initialState.pos
        const { clientX, clientY } = initialState.event
        return mouseMove$.pipe(
            map(moveEvent => ({
                x: moveEvent.clientX - clientX + initialPos.x,
                y: moveEvent.clientY - clientY + initialPos.y,
              })
            ),
            takeUntil(mouseUp$)
        )
      }
    ),
    mergeMap(pos => {
        return delayBoxes$.pipe(
            tap(box => {
                setTranslate(box, pos)
            })
        )
      })
).subscribe()

function getTranslate (element) {
  const style = getComputedStyle(element)
  const regExp = /matrix\((\d+,\s){4}(\d+),\s(\d+)/i
  const result = style.transform.match(regExp)
  if (result) {
    return {
      x: parseInt(result[2], 10),
      y: parseInt(result[3], 10)
    }
  } else {
    return {
      x: 0,
      y: 0
    }
  }
}

function setTranslate (element, pos) {
  element.style.transform = `translate(${pos.x}px, ${pos.y}px)`
}
