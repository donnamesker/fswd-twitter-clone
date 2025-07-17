class ApplicationMailer < ActionMailer::Base
  default from: 'donnamesker1@gmail.com'
  layout 'mailer'

  def default_url_options
    {
      host: ENV['HOST'] || (Rails.env.production? ? 'fswd-twitter-clone.herokuapp.com' : 'localhost:3000')
    }
  end
end
