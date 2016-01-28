$(document).on('pagebeforeshow', '#home', function(){
//$(document).ready(function () {
    $('#sok').submit(function(e) {
        e.preventDefault();

        var $results = $('#results-movies'),
            movie = $('#movie-search').val();
            $results.html('Din film är: ' + movie )


        var url = 'http://api.themoviedb.org/3/',
        mode = 'search/movie?query=',
        movieName = '&query='+encodeURI(movie),
        key = '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';

    $.ajax({
        url: url + mode + key + movieName ,
        dataType: "jsonp",
        async: true,
        success: function (result) {
            ajax.parseJSONP(result);
        },
        error: function (request,error) {
            alert('Network error has occurred please try again!');

        }
    });
});
});

//Det som visas på individuell sida
$(document).on('pagebeforeshow', '#headline', function(){
    $('#movie-data').empty();
    $.each(movieInfo.result, function(i, row) {

        if(row.id == movieInfo.id) {
            $('#movie-data').append('<li><img src="http://image.tmdb.org/t/p/w92'+row.poster_path+'"></li>');
            $('#movie-data').append('<li>Title: '+row.original_title+'</li>');
            $('#movie-data').append('<li>Overview : '+row.overview+'</li>');
            $('#movie-data').append('<li>Release date: '+row.release_date+'</li>');
            $('#movie-data').append('<li>Popularity : '+row.popularity+'</li>');
            $('#movie-data').append('<li>Vote Average: '+row.vote_average+'</li>');

            $('#movie-data').listview('refresh');
        }

    });

});

var movieInfo = {
    id : null,
    result : null
}

$(document).on('click', '#movie-list li a', function(){
    movieInfo.id = $(this).attr('data-id');
    $.mobile.changePage( "#headline", { transition: "slide", changeHash: false });

});



var ajax = {
    parseJSONP:function(result){
        movieInfo.result = result.results;
        $.each(result.results, function(i, row) {
            console.log(JSON.stringify(row));
            $('#movie-list').append('<li><a href="#headline" data-id="' + row.id + '"><img src="http://image.tmdb.org/t/p/w92'+row.poster_path+'"/><h3>' + row.title + '</h3><p>' + row.vote_average + '/10</p> <p>' + row.overview + '</p></a></li>');
        });
        $('#movie-list').listview('refresh');
    }
}





