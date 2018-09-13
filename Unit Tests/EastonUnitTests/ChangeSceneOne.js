var videoOneShown;
var videoTwoShown;
var videoThreeShown;
var currentScene;

const expectedActions = {
    changeVideoOneShown: () => {
    return (
        videoOneShown = true
    )
  },
    changeVideoTwoShown: () => {
    return (
        videoTwoShown = false
    )
  },
    changeVideoThreeShown: () => {
    return (
        videoThreeShown = false
    )
  },
    changeCurrentScene: () => {
    return (
        currentScene = 'Tibet'
    )
  }
}

module.exports = expectedActions;