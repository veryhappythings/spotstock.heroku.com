class RootController < ApplicationController
  def index
    @stages = Stage.find :all
  end
end
