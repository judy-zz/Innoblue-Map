$(document).ready () ->

  # The force-directed map I'll do later.
  w = 1400
  h = 700
  fill = d3.scale.category10()

  vis = d3.select("#chart").append("svg")
    .attr("width", w)
    .attr("height", h)

  d3.json "hackermap.json", (json) ->
    force = d3.layout.force()
      .charge(-500)
      .linkDistance(50)
      .nodes(json.nodes)
      .links(json.links)
      .size([w, h])
      .start()

    link = vis.selectAll("line.link")
      .data(json.links)
      .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", (d) -> Math.sqrt(d.value))
      .attr("x1", (d) -> d.source.x)
      .attr("y1", (d) -> d.source.y)
      .attr("x2", (d) -> d.target.x)
      .attr("y2", (d) -> d.target.y)

    node = vis.selectAll("circle")
      .data(json.nodes, (d) -> d.name)
      .enter()
      .append("circle")
      .attr("class", "node")
      .attr("cx", (d) -> d.x )
      .attr("cy", (d) -> d.y )
      .attr("r", 5)
      .style("fill", "#333" )
      .call(force.drag)

    label = vis.selectAll("text")
      .data(json.nodes, (d) -> d.name)
      .enter()
      .insert("text")
      .text((d) -> d.name )
      .attr("x", (d) -> d.x )
      .attr("y", (d) -> d.y )
      .attr("text-anchor", "middle")
      .style("fill", (d) -> fill(d.group) )
      .call(force.drag)

    force.on "tick", ->
      link.attr("x1", (d) -> d.source.x )
        .attr("y1", (d) -> d.source.y )
        .attr("x2", (d) -> d.target.x )
        .attr("y2", (d) -> d.target.y )

      node.attr("cx", (d) -> d.x )
        .attr("cy", (d) -> d.y )

      label.attr("x", (d) -> d.x )
        .attr("y", (d) -> d.y )
