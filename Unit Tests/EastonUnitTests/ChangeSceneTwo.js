var videoOneShown;
var videoTwoShown;
var videoThreeShown;
var currentScene;

const expectedActionsTwo = {
    changeVideoOneShown: () => {
    return (
        videoOneShown = false
    )
  },
    changeVideoTwoShown: () => {
    return (
        videoTwoShown = false
    )
  },
    changeVideoThreeShown: () => {
    return (
        videoThreeShown = true
    )
  },
    changeCurrentScene: () => {
    return (
        currentScene = 'Peru'
    )
  }
}

module.exports = expectedActionsTwo;