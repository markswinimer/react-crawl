// helper functions

const getDifficultyColor = (n_rows, difficultyValue) => {
    let difficultyScale = (n_rows / 5) * 100

    if (difficultyValue < difficultyScale) {
        return 'silver'
    } else if (difficultyValue < difficultyScale + difficultyScale) {
        return '#B5B479'
    } else if (difficultyValue < difficultyScale + (difficultyScale * 2)) {
        return '#EEDA95'
    } else if (difficultyValue < difficultyScale + (difficultyScale * 3)) {
        return '#805566'
    } else if (difficultyValue < difficultyScale + (difficultyScale * 4)) {
        return '#CF4647'
    } else if (difficultyValue < difficultyScale + (difficultyScale * 5)) {
        return 'red'
    } else {
        return 'black'
    }
}

const generateDifficultyValue = (n_rows, x, y) => {
    let mean = n_rows / 2
    let meanX = Math.abs(mean - x)
    let meanY = Math.abs(mean - y)
    let difficultyValue = (meanX + meanY)
    difficultyValue *= Math.round(Math.random() + 1)

    return difficultyValue * 100
}

const getTimeCost = (difficultyValue, modifier = 1) => {
    return (difficultyValue + (difficultyValue * 1.1) * 2)
}

export { getDifficultyColor, generateDifficultyValue, getTimeCost };