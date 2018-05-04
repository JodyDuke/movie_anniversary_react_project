export const daySup = (int) => {
    const st = [1, 21, 31]
    const rd = [3, 23]
    const nd = [2, 22]

    if(st.includes(int)){
        return 'st'
    }
    else if(rd.includes(int)) {
        return 'rd'
    }
    else if(nd.includes(int)) {
        return 'nd'
    }
    return 'th'
}