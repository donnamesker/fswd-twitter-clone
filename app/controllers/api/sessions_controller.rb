module Api
  class SessionsController < ApplicationController
    def create
      @user = User.find_by(username: params[:user][:username])

      if @user && (BCrypt::Password.new(@user.password) == params[:user][:password])
        session = @user.sessions.create
        cookies.permanent.signed[:twitter_session_token] = {
          value: session.token,
          httponly: true
        }

        render json: {
          success: true,
          username: @user.username
        }
      else
        render json: {
          success: false,
          error: 'Invalid username or password'
        }, status: :unauthorized
      end
    end

    def authenticated
      if current_user
        render json: {
          authenticated: true,
          username: current_user.username
        }
      else
        render json: {
          authenticated: false
        }, status: :unauthorized
      end
    end

    def destroy
      token = cookies.signed[:twitter_session_token]
      session = Session.find_by(token: token)

      if session&.destroy
        render json: {
          success: true
        }
      else
        render json: {
          success: false
        }, status: :unauthorized
      end
    end
  end
end
