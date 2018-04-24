export const addBirthday = (input) => {
    let mapped = input.data.map(e => {
        return e.results
    })

    mapped = mapped.concat.apply([], mapped);

    //adds a new data point to api data to match days and anniversary year in map_calendar function
    let newDataMapped = mapped.map((data, int) => {
        //console.log(data)
        if (data.popularity >= 9) {
            let releaseYear = parseInt(data.release_date.slice(0, 4), 10)
            let day = parseInt(data.release_date.slice(-2), 10)
            data.day = day
            data.birthday = input.year - releaseYear
            return data
        }
        else return ''
    })

    return newDataMapped

}