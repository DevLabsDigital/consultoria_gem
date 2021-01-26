

class Saddlebag::Api::V1::Auth::UsersController < ApplicationController

  def index
    @users = User.all
    render json: serializer_resource(@users), status: :ok
  end

  def show
    render json: serializer_resource(@user), status: :ok
  end

  def avatar_attachment
    user.avatar.attach params[:file]
    render json: serializer_resource(user), status: :created
  end

  def serializer_resource(user)
    UserSerializer.new(user)
  end

  def user
    @user ||= User.find params[:id]
  end

end
