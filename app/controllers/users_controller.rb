class UsersController < ApplicationController
  before_filter :authenticate_user!
  before_filter :correct_user?, :except => [:index]

  def index
    @users = User.all
    @user = current_user
  end

  def show
    @user = User.find(params[:id])
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
end
