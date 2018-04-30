export const weightedRanking = (props, mean) => {  
    const m = 1000 //minimum vote count
    let vote_average = props.vote_average
    if(props.birthday >= 10 ) {
        vote_average += 1.5
    }
    return (props.vote_count / (props.vote_count + m)) * vote_average + (m / (props.vote_count + m)) * mean
}