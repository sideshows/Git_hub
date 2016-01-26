(function() {
    $(init);
    function init()
    {
        $("#searchMovie").click(searchMovie);
        var movieTitle = $('#movieTitle');

        function searchMovie() {
            var title = movieTitle.val();
            alert('searchMovie' + title);

            $.ajax({
                url: "http://www.myapifilms.com/imdb/idIMDB?idIMDB=django&format=xml&language=en-us&aka=0&business=0&seasons=0&seasonYear=0&technical=0&trailer=0&movieTrivia=0&awards=0&moviePhotos=0&movieVideos=0&actors=0&biography=0&uniqueName=0&filmography=0&bornAndDead=0&starSign=0&actorActress=0&actorTrivia=0&similarMovies=0",
                success: function(response) {
                    console.log('response');
                }
            })
            }
    }
})();
