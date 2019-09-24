class UsersController < ApplicationController
    def index
        users = User.all 
        render json: users, include:[:characters]
    end

    def profile 
        render json: current_user
    end

    def show
        user = User.find(params[:id])
        render json: {
            id: user.id, username: user.username, characters: user.characters
        }
    end

    def create 
        
        user = User.create(user_params)

        if user.valid? 
            render json: {token: create_token(user.id)}
        else 
            render json: {errors: user.errors.full_messages}, status: 422
        end
    end

    private

    def user_params 
        params.permit(:id, :username, :password)
    end
end
