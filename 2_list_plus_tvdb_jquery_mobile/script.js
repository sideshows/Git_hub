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

//------------- Displays list of search ---------------------

var ajax = {
    parseJSONP:function(result){
        tvInfo.result = result.results;
        $.each(result.results, function(i, row) {
            $('#tv-list').append('<li><a href="#headline" data-id="' + row.id + '"><img src="http://image.tmdb.org/t/p/w92'+row.poster_path+'"/><h3>' + row.name + '</h3><p>' + row.vote_average + '/10</p></a></li>');
        });
        $('#tv-list').listview('refresh');
    }
}


// --------------Headline Page ----------------------------------

$(document).on('pagebeforeshow', '#headline', function(){
    $('#tv-data').empty();
    $.each(tvInfo.result, function(i, row) {

        if(row.id == tvInfo.id) {
            $('#tv-data').append('<div class="bg-headline" style="background-image:url(http://image.tmdb.org/t/p/w500'+row.backdrop_path+');"><div><img src="http://image.tmdb.org/t/p/w92'+row.poster_path+'"></div></div>');
            $('#tv-data').append('<h1>'+row.original_name+'</h1>');
            $('#tv-data').append('<div>Overview : '+row.overview+'</div>');
            $('#tv-data').append('<li>Release date: '+row.release_date+'</li>');
            $('#tv-data').append('<li>Popularity : '+row.popularity+'</li>');
            $('#tv-data').append('<li>First air date : '+row.first_air_date+'</li>');
            $('#tv-data').append('<li>Vote Average: '+row.vote_average+'</li>');


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
                var episodes = tvs.episodes;
            }

            $('#subscribe-title').append('<li><a href="#single-subscriptions" data-id="' + tvs.id + '" data-transition="slideup"><img src="http://image.tmdb.org/t/p/w92'+poster+'"><h3>' + title + '</h3></a></li>');
            
            
            $('#single-subscribe-title').append('<li><h3>' + title + '</h3></li>');
                    $('#single-subscribe-title').append('<li><h3>Number of seasons:' + seasons + '</h3></li>');
                    $('#single-subscribe-title').append('<li><img src="http://image.tmdb.org/t/p/w92'+poster+'"</li>');

            $(document).on('click', '#subscriptions li a', function(){
                $.mobile.changePage( "#single-subscriptions", { transition: "slide", changeHash: true });
            });
            
            
//---------------------Get tv/season/latest-------------------
            
            $.ajax({
                url: "https://api.themoviedb.org/3/tv/"+ tvInfo.id +"/season/"+ seasons +"?api_key=5fbddf6b517048e25bc3ac1bbeafb919",
                dataType: "jsonp",
                //----Success pharse data to variable
                success: function(data) {                
                            for (var m in data) {
                            var tv = data[m];
                            var air = data.air_date;
                            var epi = data.episodes;           
            }

                    
//---------------------Array Episodes-------------------------
                    
$.each(epi, function (key, data) {
    
  //  console.log(data.air_date, data.episode_number, data.name)

var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds    
//Create date from input value  Hämtat från: http://jsfiddle.net/mzdqc/
var inputDate = new Date(data.air_date);

//Get today's date
var todaysDate = new Date();
     
//call setHours to take the time out of the comparison
if(inputDate.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0));
{
//Date equals today's date
}   
    
    
 
//---------------------Show Next Episodes-----------------    
    
if (todaysDate < inputDate){   
    
   // Days counter from: http://www.vijayjoshi.org/2008/10/24/faq-calculate-number-of-days-between-two-dates-in-javascript/
    

var diffNext = Math.round(Math.abs((todaysDate.getTime() - inputDate.getTime())/(oneDay)));
    console.log(diffNext)   
   
    
        
    $('#single-subscribe-title').append('<li><h3>Next episode in <b>'+ diffNext +'</b> days... Episode '+ data.episode_number +': <i>'+data.name+'</i> '+ data.air_date +'</h3></li>');
}
    
    
//---------------------Show Previous Episodes---------------------        
    //style="background: url(https://image.tmdb.org/t/p/w300/'+data.still_path +');"
    else {    
        var diffPrev = Math.round(Math.abs((todaysDate.getTime() - inputDate.getTime())/(oneDay)));
    console.log(diffPrev)    
        $('#single-subscribe-title').append('<li ><h3>Previous episode aired '+ diffPrev +' days ago... episode '+ data.episode_number +' '+ data.air_date + '</h3></li>');
    }
     
                        })
                    }               
                });            
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





