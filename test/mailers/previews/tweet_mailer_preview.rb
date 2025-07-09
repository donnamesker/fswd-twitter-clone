class TweetMailerPreview < ActionMailer::Preview
  def notify
    tweet = Tweet.last || Tweet.new(message: "Test message", user: User.new(username: "TestUser", email: "test@example.com"))
    TweetMailer.notify(tweet)
  end
end
