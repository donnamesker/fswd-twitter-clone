json.tweets do
  json.array! @tweets do |tweet|
    json.id tweet.id
    json.username tweet.user.username
    json.message tweet.message
    if tweet.image.attached?
      # Use rails_blob_url to generate the image URL correctly
      json.image_url rails_blob_url(tweet.image, host: request.base_url)
    end
  end
end
