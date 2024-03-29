#! /usr/bin/env ruby
require "YAML"
require "json"

tree = YAML.parse(File.open("hackermap.yml")).to_ruby

$i = -1
$group = 0
starting_group_level = 32  # Will be divided in half for each branch. Denotes line thickness.

def parse_tree(tree, weight)
  nodes = []
  links = []
  index = $i
  unless tree.nil?
    tree.each do |key, branch|
      $i += 1
      $group = case key
        when "Innoblue" then 0
        when "Find" then 1
        when "Join" then 2
        when "Network" then 3
        when "Share" then 4
        when "Reserve" then 5
        when "Innovate" then 6
        when "Create" then 7
        else
          $group # maintain same number
      end
      nodes << {"name" => key, "group" => $group}
      links << {"source" => index, "target" => $i, "value" => weight}
      branch_nodes, branch_links = parse_tree(branch, weight / 2) unless branch.nil?
      nodes += branch_nodes unless branch_nodes.nil?
      links += branch_links unless branch_links.nil?
    end
  end
  return nodes, links
end

nodes, links = parse_tree(tree, starting_group_level)
links.shift

File.open("public/hackermap.json", "w") do |f|
  f.puts ({"nodes" => nodes, "links" => links}.to_json)
end
