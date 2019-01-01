#!/usr/bin/env ruby
require 'graphlient'

client = Graphlient::Client.new('https://alicemacs.com/graphql')
response = client.query do
  query do
    profile do
      name
      birthday
      country
      email
      job
    end
  end
end

p response.data.profile
