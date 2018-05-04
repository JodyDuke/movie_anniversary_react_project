export const convertLanguage = (lan, arr) => {
        let index = arr.findIndex((e) => e.iso_639_1 === lan)
        return arr[index].english_name
}