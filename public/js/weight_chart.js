var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var parseDate = d3.time.format("%d-%b-%y").parse;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.weight); });

d3.json('/weights', function(people) {

  if (people.error !== undefined) {
    console.warn(people.error);
    return;
  }

  var data = Object.keys(people).map(function(person) {
    return people[person]
  })

  var allDates = data.map(function(person) {
    return person.weights.map(function(weighIn) {
      return weighIn.date;
    });
  }).reduce(function(a, b) {
    return a.concat(b);
  }).sort(d3.ascending);

  var allWeights = data.map(function(person) {
    return person.weights.map(function(weighIn) {
      return weighIn.weight;
    });
  }).reduce(function(a, b) {
    return a.concat(b);
  }).sort(d3.ascending);

  var svg = d3.select("#chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  x.domain(d3.extent(allDates, function(d) { return d; }));
  y.domain(d3.extent(allWeights, function(d) { return d; }));

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Weight");

  data.forEach(function(person, i) {
    var weights = person.weights.sort(function(a, b) {
      return d3.ascending(a.date, b.date);
    });

    svg.append("path")
        .datum(weights)
        .attr("class", function(d) {
          return 'line';
        })
        .attr('style', function(d) {
          return 'stroke: ' + colorbrewer.RdBu[9][i];
        })
        .attr("data-name", function(d) {
          return person.name;
        })
        .attr("d", line);
  });
});
