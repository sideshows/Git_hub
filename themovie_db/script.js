var movies = new Bloodhound({
    datumTokenizer: function (datum) {
        return Bloodhound.tokenizers.whitespace(datum.value);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
        url: 'http://api.themoviedb.org/3/search/movie?query=%QUERY&api_key=f22e6ce68f5e5002e71c20bcba477e7d',
        filter: function (movies) {
            // Map the remote source JSON array to a JavaScript object array
            return $.map(movies.results, function (movie) {
                return {
                    value: movie.original_title
                };
            });
        }
    }
});

// Initialize the Bloodhound suggestion engine
movies.initialize();

// Instantiate the Typeahead UI
$('.typeahead').typeahead(null, {
    displayKey: 'value',
    source: movies.ttAdapter()
});



