(function() {

  $(document).ready(function() {
    var fill, h, vis, w;
    w = 960;
    h = 500;
    fill = d3.scale.category20();
    vis = d3.select("#chart").append("svg").attr("width", w).attr("height", h);
    return d3.json("hackermap.json", function(json) {
      var force, link, node;
      force = d3.layout.force().charge(-120).linkDistance(30).nodes(json.nodes).links(json.links).size([w, h]).start();
      link = vis.selectAll("line.link").data(json.links).enter().append("line").attr("class", "link").style("stroke-width", function(d) {
        return Math.sqrt(d.value);
      }).attr("x1", function(d) {
        return d.source.x;
      }).attr("y1", function(d) {
        return d.source.y;
      }).attr("x2", function(d) {
        return d.target.x;
      }).attr("y2", function(d) {
        return d.target.y;
      });
      node = vis.selectAll("circle.node").data(json.nodes).enter().append("circle").attr("class", "node").attr("cx", function(d) {
        return d.x;
      }).attr("cy", function(d) {
        return d.y;
      }).attr("r", 5).style("fill", function(d) {
        return fill(d.group);
      }).call(force.drag);
      node.append("title").text(function(d) {
        return d.name;
      });
      return force.on("tick", function() {
        link.attr("x1", function(d) {
          return d.source.x;
        }).attr("y1", function(d) {
          return d.source.y;
        }).attr("x2", function(d) {
          return d.target.x;
        }).attr("y2", function(d) {
          return d.target.y;
        });
        return node.attr("cx", function(d) {
          return d.x;
        }).attr("cy", function(d) {
          return d.y;
        });
      });
    });
  });

}).call(this);
