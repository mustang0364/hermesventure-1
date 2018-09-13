var videoOneShown;
var videoTwoShown;
var videoThreeShown;
var currentScene;

const expectedActionsThree = {
    changeVideoOneShown: () => {
    return (
        videoOneShown = false
    )
  },
    changeVideoTwoShown: () => {
    return (
        videoTwoShown = true
    )
  },
    changeVideoThreeShown: () => {
    return (
        videoThreeShown = false
    )
  },
    changeCurrentScene: () => {
    return (
        currentScene = 'Maldives'
    )
  }
}

module.exports = expectedActionsThree;