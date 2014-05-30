var allWeights;

d3.json('/weights', function(weights) {
  allWeights = weights;
});
