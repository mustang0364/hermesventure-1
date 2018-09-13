const expectedActions = require('./ChangeSceneOne.js');
const updateAddress = require('./ShipToAddress.js');
const expectedActionsTwo = require('./ChangeSceneTwo.js');
const expectedActionsThree = require('./ChangeSceneThree.js');

test('Should update state to correct values for Tibet', () => {
    expect(expectedActions.changeVideoOneShown()).toBe(true);
    expect(expectedActions.changeVideoTwoShown()).toBe(false);
    expect(expectedActions.changeVideoThreeShown()).toBe(false);
    expect(expectedActions.changeCurrentScene()).toBe('Tibet');
})

test('Should update state to correct values for Peru', () => {
    expect(expectedActionsTwo.changeVideoOneShown()).toBe(false);
    expect(expectedActionsTwo.changeVideoTwoShown()).toBe(false);
    expect(expectedActionsTwo.changeVideoThreeShown()).toBe(true);
    expect(expectedActionsTwo.changeCurrentScene()).toBe('Peru');
})

test('Should update state to correct values for Maldives', () => {
    expect(expectedActionsThree.changeVideoOneShown()).toBe(false);
    expect(expectedActionsThree.changeVideoTwoShown()).toBe(true);
    expect(expectedActionsThree.changeVideoThreeShown()).toBe(false);
    expect(expectedActionsThree.changeCurrentScene()).toBe('Maldives');
})

test('Should update ship to address correctly', () => {
    expect(updateAddress(1, '1000 N Fake St')).toEqual([1, '1000 N Fake St'])
})