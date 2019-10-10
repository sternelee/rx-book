import { fromEvent } from 'rxjs'

import './index.styl'

const box = document.getElementById('box')
const mouseDown$ = fromEvent(box, 'mousedown')
const mouseMove$ = fromEvent(document, 'mousemove')
const mouseUp$ = fromEvent(document, 'mouseup')

