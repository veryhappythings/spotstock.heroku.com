class AdminController < ApplicationController
  SPOTIFY_URL = /http:\/\/open\.spotify\.com\/user\/.+\/playlist\/\w+/

  def update
    bitly = Bitly.new 'bitly_account_name', 'bitly_account_key'
    @additions = []
    search = Twitter::Search.new('#spotstock').per_page(100)
    search.each do |result|
      name = result.text.gsub(/http:\/\/\S+/, '').gsub(/#\S+/, '').gsub(/@\S+/, '')
      url = nil

      if match = result.text.match(SPOTIFY_URL)
        url = match[0]
      elsif match = result.text.match(/http:\/\/bit\.ly\/(\w+)/)
        long_url = bitly.expand(match[1]).long_url
        if result.text.match(SPOTIFY_URL)
          url = long_url
        end
      end

      if url
        unless Stage.find(:first, :conditions => {:url => match[0]})
          stage = Stage.new
          stage.host = result.from_user
          stage.name = name
          stage.url = url
          stage.save!

          @additions << stage.url
        end
      end
    end

    @stages = Stage.find :all
  end
end
