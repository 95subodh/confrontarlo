class ReviewsController < ApplicationController
  before_filter :authenticate_user!
  before_filter :correct_user?, :except => [:index]

  def index
    @review = Reviews.new
  end

  def create
    @review = Reviews.find(params[:id])
    if @review.update_attribute(:title, params[:review][:title])
      redirect_to users_url, :notice => "Successfullly added review to user"
    end
  end
end