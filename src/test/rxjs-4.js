import { of, from } from 'rxjs'
import { mergeMap, delay } from 'rxjs/operators'

function mockHTTPRequest(url) {
    return of(`Response from ${url}`).pipe(
        delay(Math.random() * 1000)
    )
}

var urls = ['url-1', 'url-2', 'url-3', 'url-4'];

from(urls).pipe(
    mergeMap(url => mockHTTPRequest(url))
).subscribe(val => console.log(val));