// Tror inte vi behöver den här... =)  $(document).on('pagebeforeshow', '#home', function(){

    $('#sok').submit(function(e) {
        e.preventDefault();

        var $results = $('#results-movies'),
            movie = $('#movie-search').val();
            // $results.html('Din film är: ' + movie )


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

// Tror inte vi behöver den här... =)  });
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
            // $('#movie-data').append('<ul>Vote Average: <a href="https://image.tmdb.org/t/p/w780'+row.backdrop_path+'">Backdrop</a></ul>');



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
    $.mobile.changePage( "#headline", { transition: "slide", changeHash: true });

});


// List

var ajax = {
    parseJSONP:function(result){
        movieInfo.result = result.results;
        $.each(result.results, function(i, row) {
            console.log(JSON.stringify(row));
            $('#movie-list').append('<li><a href="#headline" data-id="' + row.id + '"><img src="http://image.tmdb.org/t/p/w92'+row.poster_path+'"/><h3>' + row.title + '</h3><p>' + row.vote_average + '/10</p></a></li>');
        });
        $('#movie-list').listview('refresh');
    }
}

// Tömmer resultaten i listan på fokus

$('#submit-search').on('click', function() {
    $('#movie-list').children().remove();
});



// Subscribe page


// $(document).on('pageinit', '#subscriptions', function(){

// var request = new XMLHttpRequest();

// request.open('GET', 'https://api.themoviedb.org/3/movie/550?api_key=5fbddf6b517048e25bc3ac1bbeafb919');

// request.setRequestHeader('Accept', 'application/json');

// request.onreadystatechange = function () {
//   if (this.readyState === 4) {

//     console.log('Status:', this.status);
//     console.log('Headers:', this.getAllResponseHeaders());
//     console.log('Body:', this.responseText);

//   }
// };

// request.send();




// });





////////////LIST SAVED MOVIES LOCAL STORAGE

function appendTaskToList(val) {
     $('#subscribe-title').append("<li> Movie ID: " + movieInfo.id + " </li>");
}

if (localStorage['tasks']) {
    var tasks = JSON.parse(localStorage['tasks']);
}else {
    var tasks = [];
}

for(var i=0;i<tasks.length;i++) {
    appendTaskToList(tasks[i]);
}

var addTask = function(){
    // get value from #name input
    var val = $('#name').val();

    // add the task to the array
    tasks.push(val);

    // save to local storage
    localStorage["tasks"] = JSON.stringify(tasks);

    // append the name to the list
    appendTaskToList(val);

    // reset the input field and focus it.
    $('#name').val("").focus();

}
//if click favorite, add to ID to list
$('#popupDialog').click(addTask);
$('#name').keyup(function(e){
    if (e.keyCode === 13) {
        addTask();
    }
});


// approach 1
/*$('.done-btn').click(function(){
    $(this).parent('li').addClass('done');
});*/



   window.localStorage.clear();

////////////LIST SAVED MOVIES LOCAL STORAGE -----END-----



