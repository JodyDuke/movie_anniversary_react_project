export const addBirthday = (input) => {
    let mapped = input.data.map(e => {
        return e.results
    })

    mapped = mapped.concat.apply([], mapped);

    //adds a new data point to api data to match days and anniversary year in map_calendar function
    let newDataMapped = mapped.map((data, int) => {
        let releaseYear = parseInt(data.release_date.slice(0, 4), 10)
        let birthday = input.year - releaseYear
        if ((birthday <= 10 && data.popularity >= 10) || (birthday > 10 && data.popularity >= 8)) {
            let day = parseInt(data.release_date.slice(-2), 10)
            data.day = day
            data.birthday = birthday
            return data
        }
        else return ''
    })

    return newDataMapped

}