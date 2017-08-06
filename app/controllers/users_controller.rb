class UsersController < ApplicationController
  before_action :json_authenticate_user
  before_action :set_user, only: %i[show update]

  def create
    return head :forbidden unless current_user.admin?
    @user = User.create!(user_params)
    json_response(@user, :created)
  end

  def index
    head :method_not_allowed
  end

  def show
    if current_user[:id] == @user[:id] || current_user.admin?
      json_response(@user, :ok)
    else
      json_response(@user.public_attributes_to_json)
    end
  end

  def update
    return head :forbidden unless current_user[:id] == @user[:id] || current_user.admin?
    @user.update(user_params)
    head :no_content
  end

  # TODO: Add destroy method

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.permit(
      :first_name,
      :last_name,
      :email,
      :password,
      :admin,
      :mentor
    )
  end
end
