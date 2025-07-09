module Api
  class TweetsController < ApplicationController
    include Rails.application.routes.url_helpers

    def index
      tweets = Tweet.all.order(created_at: :desc)
      render json: tweets.map { |tweet| serialize_tweet(tweet) }
    end

    def create
      token = cookies.signed[:twitter_session_token]
      session = Session.find_by(token: token)

      return render json: { success: false, error: "Unauthorized" }, status: :unauthorized unless session

      user = session.user
      tweet = user.tweets.new(tweet_params)

      if tweet.save
        TweetMailer.notify(tweet).deliver! unless Rails.env.development?
        render json: { success: true, tweet: serialize_tweet(tweet) }
      else
        render json: { success: false, errors: tweet.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def destroy
      token = cookies.signed[:twitter_session_token]
      session = Session.find_by(token: token)

      return render json: { success: false }, status: :unauthorized unless session

      user = session.user
      tweet = Tweet.find_by(id: params[:id])

      if tweet && (tweet.user == user) && tweet.destroy
        render json: { success: true }
      else
        render json: { success: false }, status: :unprocessable_entity
      end
    end

    def index_by_user
      user = User.find_by(username: params[:username])

      if user
        tweets = user.tweets.order(created_at: :desc)
        render json: tweets.map { |tweet| serialize_tweet(tweet) }
      else
        render json: { success: false, error: "User not found" }, status: :not_found
      end
    end

    private

    def tweet_params
      params.require(:tweet).permit(:message, :image)
    end

    def serialize_tweet(tweet)
      {
        id: tweet.id,
        username: tweet.user.username,
        message: tweet.message,
        image: tweet.image.attached? ? url_for(tweet.image) : nil
      }
    end
  end
end
