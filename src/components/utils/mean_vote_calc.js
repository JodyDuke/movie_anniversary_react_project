export const findMean = (d) => {
    if(d.length > 0){
        const totalRating = d.reduce((total, e) => {
            return { vote_average: total.vote_average + e.vote_average }
        })
        return totalRating.vote_average / d.length
    }
    else return null

}