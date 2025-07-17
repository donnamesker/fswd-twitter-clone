module Api
  class TweetsController < ApplicationController
    include Rails.application.routes.url_helpers

    def index
      @tweets = Tweet.all.order(created_at: :desc)
      render 'api/tweets/index'
    end

    def create
      token = cookies.signed[:twitter_session_token]
      session = Session.find_by(token: token)

      return render json: { success: false, error: 'Unauthorized' }, status: :unauthorized unless session

      user = session.user
      @tweet = user.tweets.new(tweet_params)

      if @tweet.save
        begin
          TweetMailer.notify(@tweet).deliver!
        rescue => e
          Rails.logger.error "Email delivery failed: #{e.message}"
        end
        # render 'api/tweets/create'
        render json: {
          success: true,
          tweet: {
            id: @tweet.id,
            message: @tweet.message,
            image_url: @tweet.image.attached? ? url_for(@tweet.image) : nil,
            created_at: @tweet.created_at,
            user: {
              username: user.username
            }
          }
        }, status: :created
      else
        render json: { success: false, errors: @tweet.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def destroy
      token = cookies.signed[:twitter_session_token]
      session = Session.find_by(token: token)

      return render json: { success: false } unless session

      user = session.user
      tweet = Tweet.find_by(id: params[:id])

      if tweet && (tweet.user == user) && tweet.destroy
        render json: {
          success: true
        }
      else
        render json: {
          success: false
        }
      end
    end

    def index_by_user
      user = User.find_by(username: params[:username])

      if user
        @tweets = user.tweets
        render 'api/tweets/index'
      end
    end

    private

    def tweet_params
      params.require(:tweet).permit(:message, :image)
    end
  end
end
