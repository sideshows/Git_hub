$(document).on('pageinit', '#home', function(){      
 /*   var url = 'http://api.themoviedb.org/3/',
        mode = 'search/movie?query=',
        movieName = '&query=Batman',        
        key = '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';   
  */  

    
    
    
/*Funkar! https://api.themoviedb.org/3/search/movie?query=&query=Batman&api_key=5fbddf6b517048e25bc3ac1bbeafb919*/  
/*Funkar! https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=5fbddf6b517048e25bc3ac1bbeafb919*/ 
    
/*https://api.themoviedb.org/3/movie/550?api_key=5fbddf6b517048e25bc3ac1bbeafb919 */
    
/*https://api.themoviedb.org/3/find/tt0266543?external_source=imdb_id&api_key=5fbddf6b517048e25bc3ac1bbeafb919*/    
    
    $.ajax({
        url: 'http://api.themoviedb.org/3/movie/550?api_key=5fbddf6b517048e25bc3ac1bbeafb919&callback=?' ,
        dataType: "jsonp",
        async: true,
        success: function (idResult) {
            idCall.parseJSONP(idResult);
        console.log(idResult);
        },
        error: function (request,error) {
            alert('Network error has occurred please try again!');
        }
    });         
//console.log(url,mode,key,movieName);

});

var movieInfo = {
    id : null,
    result : null
}

var idCall = {  
    parseJSONP:function(idResult){  
        movieInfo.idResult = idResult.results;
        $.each(idResult.results, function(i, line) {
            console.log(JSON.stringify(line));
            $('#movie-list').append('<li><a href="" data-id="' + line.id + '"><img src="http://image.tmdb.org/t/p/w92'+line.poster_path+'"/><h3>' + line.title + '</h3><p>' + line.vote_average + '/10</p></a></li>');

        });
        $('#movie-list').listview('refresh');
       
    }
}




