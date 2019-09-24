class AuthController < ApplicationController 
    def login 
        user = User.find_by(username: params[:username])
        
        is_authenticated = user.authenticate(params[:password])
        if is_authenticated
            render json: {token: create_token(user.id)}
        else 
            render json: {errors: ['You fucked up']}, status: 422
        end
    end

end