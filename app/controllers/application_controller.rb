class ApplicationController < ActionController::Base
    def current_user
        token = cookies.signed[:twitter_session_token]
        return nil if token.nil?

        session = Session.find_by(token: token)
        return nil unless session

        session.user
    end

    def authenticate_user!
        unless current_user
            render json: { error: 'Unauthorized' }, status: :unauthorized
        end
    end
end
