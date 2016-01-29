//Pouplar movie list TMDB Angular

// defining the app module of the project
var tutorialProject = angular.module('tutorialApp', [])

// defining popular movie list controller
tutorialProject.controller('PopularMovieListController', ['$scope', '$http',
    function ($scope, $http) {

    }]
);

var popularMoviesEndpoint = "https://api.themoviedb.org/3/movie/popular?api_key=5fbddf6b517048e25bc3ac1bbeafb919";

$scope.movieList = [];

$http({method: 'GET', url: popularMoviesEndpoint}).
  success(function (data, status, headers, config) {

    if (status == 200) {
      $scope.movieList = data.results;
      console.log($scope.movieList)
    } else {
      console.error('Error happened while getting the movie list.')
    }

  }).
  error(function (data, status, headers, config) {
    console.error('Error happened while getting the movie list.')
  });

