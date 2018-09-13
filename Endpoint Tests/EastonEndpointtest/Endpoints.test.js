const tests = require('./Endpointstobettested.js');

it('should get expected data', () => {
    tests.getOne('/fpperu').then(response => {
        expect(response).toEqual({
            productOneId: 1,
            productOneCategory: 'Peru',
            productOneImage: 'randomurl'
        })
    })
})
it('should get expected data', () => {
    tests.getTwo('/fpmaldives').then(response => {
        expect(response).toEqual({
            productOneId: 3,
            productOneCategory: 'Maldives',
            productOneImage: 'randomurl'
        })
    })
})
it('should get expected data', () => {
    tests.getThree('/fptibet').then(response => {
        expect(response).toEqual({
            productOneId: 7,
            productOneCategory: 'Tibet',
            productOneImage: 'randomurl'
        })
    })
})
