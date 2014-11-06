class UsersController < ApplicationController
  before_filter :authenticate_user!
  #before_filter :correct_user?, :except => [:index]

  def index
    @users = User.all
    @user = current_user
    @review = Reviews.new
    @reviews = Reviews.all
    @products = Product.all
  end

  def show
    @user = User.find(params[:id])
    @reviews = Reviews.all
    @products = Product.all
  end

  def update
    @user = User.find(params[:id])
    if @user.update_attribute(:location , params[:user][:location])
      if @user.update_attribute(:company_name, params[:user][:company_name])
        redirect_to root_url, notice: "Successfully update user profile"
      end
    else
      redirect_to :edit
    end
  end

  def create
    @review = Reviews.new
    @user = User.find(params[:user_id])
    if @review.update_attribute(:title, params[:review][:title])
      if @review.update_attribute(:description, params[:review][:description])
        if @review.update_attribute(:user_id, @user.id)
          redirect_to :back, :id => current_user[:id], :notice => "Successfullly added review to user"
        end
      end
    end
  end
end
