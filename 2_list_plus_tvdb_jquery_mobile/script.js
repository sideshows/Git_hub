//-------------- Movie search ------------------------

    $('#search').submit(function(e) {
        e.preventDefault();

        var $results = $('#results-tv'),
            tv = $('#tv-search').val();

        var url = 'http://api.themoviedb.org/3/',
        mode = 'search/tv?query=',
        tvName = '&query='+encodeURI(tv),
        key = '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';

    $.ajax({
        url: url + mode + key + tvName ,
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

// --------------Headline Page ----------------------------------

$(document).on('pagebeforeshow', '#headline', function(){
    $('#tv-data').empty();
    $.each(tvInfo.result, function(i, row) {

        if(row.id == tvInfo.id) {
            $('#tv-data').append('<div><img src="http://image.tmdb.org/t/p/w92'+row.poster_path+'"></div>');
            $('#tv-data').append('<h1>'+row.original_name+'</h1>');
            $('#tv-data').append('<div>Overview : '+row.overview+'</div>');
            $('#tv-data').append('<li>Release date: '+row.release_date+'</li>');
            $('#tv-data').append('<li>Popularity : '+row.popularity+'</li>');
            $('#tv-data').append('<li>First air date : '+row.first_air_date+'</li>');
            $('#tv-data').append('<li>Vote Average: '+row.vote_average+'</li>');
            $('#tv-data').append('<div>backdrop_path: <img src="http://image.tmdb.org/t/p/w92'+row.backdrop_path+'"></a></div>');


//------------- Shows the title of subscribed tv-show, and removes it after --------------

        $('#btnSubcribe').click(function (el) {
            setTimeout(function () {
                el.children().remove('h1');
                }, 10000);
                }($('#subscription-title').append('<h1>'+row.original_name+'</h1>')));

            $('#tv-data').listview('refresh');
        }
    });
});

var tvInfo = {
    id : null,
    result : null
}

//-------------- Transfer the data to headline page ------------------

$(document).on('click', '#tv-list li a', function(){
    tvInfo.id = $(this).attr('data-id');
    $.mobile.changePage( "#headline", { transition: "slide", changeHash: true });
});

//--------------- Closes the dialog popup ----------------------

$(document).on('click', '#btnSubcribe', function() {
    setTimeout(function () {
    $('#popupDialog').popup('close');
    }, 1500);
});

//------------- Displays list of search ---------------------

var ajax = {
    parseJSONP:function(result){
        tvInfo.result = result.results;
        $.each(result.results, function(i, row) {
            console.log(result);
            $('#tv-list').append('<li><a href="#headline" data-id="' + row.id + '"><img src="http://image.tmdb.org/t/p/w92'+row.poster_path+'"/><h3>' + row.name + '</h3><p>' + row.vote_average + '/10</p></a></li>');
        });
        $('#tv-list').listview('refresh');
    }
}

//-------------- Empty the tv-list on input field click ------------------------

$('#submit-search').on('click', function() {
    $('#tv-list').children().remove();
});



// -------------------------Subscribe page ------------------------------------------------------

$('#btnSubcribe').on('click', function() {


    (function () {
    $(init);
    function init() {

        $.ajax({
            url: "https://api.themoviedb.org/3/tv/"+ tvInfo.id +"?api_key=5fbddf6b517048e25bc3ac1bbeafb919",
            dataType: "jsonp",
            success: renderTv
        });
    }

        function renderTv(tvs) {

            for (var m in tvs) {
                var tv = tvs[m];
                var title = tvs.name;
                var poster = tvs.poster_path;
                var seasons = tvs.number_of_seasons;
            }

            // --------------Sand box

            // $('#test').append('<li><h3>' + title + '</h3></li>').trigger( 'create' );
            // $('#test').append('<li><h3>' + title + '</h3></li>');
            // --------------End Sand box


            $('#subscribe-title').append('<li><img src="http://image.tmdb.org/t/p/w92'+poster+'"</li>');
            $('#subscribe-title').append('<li><a href="#single-subscribe-title" data-transition="slideup" <h3>' + title + '</h3></a></li>');

            $('#single-subscribe-title').append('<li><h3>Number of seasons:' + title + '</h3></li>');
            $('#single-subscribe-title').append('<li><h3>Number of seasons:' + seasons + '</h3></li>');
            $('#single-subscribe-title').append('<li><img src="http://image.tmdb.org/t/p/w92'+poster+'"</li>');


            $('#subscribe-title').listview('refresh');
            $('#test').listview('refresh');



             console.log(tvs);

        }
    })
();
});









////////////LIST SAVED MOVIES LOCAL STORAGE

function appendTaskToList(val) {
     // $('#subscribe-title').append("<li> Movie ID: " + tvInfo.id + " </li>");
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

// -------------------Sandbox--------------------------------





