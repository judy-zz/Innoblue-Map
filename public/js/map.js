(function() {

  $(document).ready(function() {
    var fill, h, vis, w;
    w = 1400;
    h = 700;
    fill = d3.scale.category10();
    vis = d3.select("#chart").append("svg").attr("width", w).attr("height", h);
    return d3.json("hackermap.json", function(json) {
      var force, label, link, node;
      force = d3.layout.force().charge(-500).linkDistance(50).nodes(json.nodes).links(json.links).size([w, h]).start();
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
      node = vis.selectAll("circle").data(json.nodes, function(d) {
        return d.name;
      }).enter().append("circle").attr("class", "node").attr("cx", function(d) {
        return d.x;
      }).attr("cy", function(d) {
        return d.y;
      }).attr("r", 5).style("fill", "#333").call(force.drag);
      label = vis.selectAll("text").data(json.nodes, function(d) {
        return d.name;
      }).enter().insert("text").text(function(d) {
        return d.name;
      }).attr("x", function(d) {
        return d.x;
      }).attr("y", function(d) {
        return d.y;
      }).attr("text-anchor", "middle").style("fill", function(d) {
        return fill(d.group);
      }).call(force.drag);
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
        node.attr("cx", function(d) {
          return d.x;
        }).attr("cy", function(d) {
          return d.y;
        });
        return label.attr("x", function(d) {
          return d.x;
        }).attr("y", function(d) {
          return d.y;
        });
      });
    });
  });

}).call(this);
