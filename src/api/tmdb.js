export const tmdb = {
    url: 'https://api.themoviedb.org/3/',
    discover: 'discover/movie?',
    movie: 'movie/',
    videos: '/videos?',
    startString: '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&release_date.gte=',
    releaseLessThan: '&release_date.lte=',
    endString: '&vote_average.gte=5&without_genres=10770&with_original_language=en&region=GB&with_release_type=2|3',
    images : {
        base_url: "http://image.tmdb.org/t/p/",
        secure_base_url: "https://image.tmdb.org/t/p/",
        backdrop_sizes: [
            "w300",
            "w780",
            "w1280",
            "original"
        ],
        logo_sizes: [
            "w45",
            "w92",
            "w154",
            "w185",
            "w300",
            "w500",
            "original"
        ],
        poster_sizes: [
            "w92",
            "w154",
            "w185",
            "w342",
            "w500",
            "w780",
            "original"
        ]
    }

}

//small poster path - https://image.tmdb.org/t/p/w185/qiE3ovg9TPylHReZjizQ40LsKZV.jpg
//backdrop path - https://image.tmdb.org/t/p/w300/uY93JtLsAXLnd38b19dIVRv5L1X.jpg

