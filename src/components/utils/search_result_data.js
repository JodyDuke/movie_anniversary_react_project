export const formatSearchData = (data, years) => {
    data.results.map((e, k) => {
        const currentDate = new Date()
        const date = new Date(e.release_date)
        const next_anniversary = calcNextAnniversary(currentDate, date, years)
        e.next_anniversary = next_anniversary
        e.next_anniversary_year = date.getFullYear() + next_anniversary
        e.anniversary_month = date.getMonth()
        e.anniversary_day = date.getDate()

        return e
    })
    return data
}

function calcNextAnniversary(date1, date2, years) {
    const day = 1000 * 60 * 60 * 24

    const currentTime = date1.getTime()
    const olderTime = date2.getTime()
    let timeDiff = currentTime - olderTime

    //convert to days difference
    timeDiff = Math.floor(timeDiff / day)
    const yearsDiff = Math.floor(timeDiff / 365)
 
    const nextAnniversary = years.find((e) => e > yearsDiff)

    return nextAnniversary
}