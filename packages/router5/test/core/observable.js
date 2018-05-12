import { expect } from 'chai'
import { from } from 'rxjs'
import { from as mostFrom } from 'most'
import xs from 'xstream'
import createTestRouter from '../_create-router'

describe('core/observable', function() {
    let router

    before(
        () =>
            (router = createTestRouter()
                .clone()
                .start())
    )
    after(() => router.stop())

    it('should be compatible with rxjs', function() {
        const observable = from(router)

        expect(observable.subscribe).to.exist
    })

    it('should be compatible with xstream', function() {
        expect(xs.from(router)).not.to.throw

        const observable = xs.fromObservable(router)

        expect(observable.subscribe).to.exist
    })

    it('should be compatible with most', function() {
        const observable = mostFrom(router)

        expect(observable.subscribe).to.exist
    })
})
