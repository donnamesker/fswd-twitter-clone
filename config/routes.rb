Rails.application.routes.draw do
  # Root path for React single-page app
  root 'static_pages#home'

  namespace :api, defaults: { format: :json } do
    # Users
    resources :users, only: [:create]

    # Sessions
    resource :sessions, only: [:create, :destroy]
    get '/authenticated', to: 'sessions#authenticated'

    # Tweets
    resources :tweets, only: [:create, :index, :destroy]
    get '/users/:username/tweets', to: 'tweets#index_by_user'
    get '/tweets/search/:keyword', to: 'tweets#search'
  end

  # Active Storage routes for direct uploads and blobs
  # This mounts ActiveStorage’s built-in routes at /rails/active_storage
  # Needed for file/image uploads via ActiveStorage
  # Make sure you have 'include Rails.application.routes.url_helpers' in your uploader or models
  mount ActiveStorage::Engine => '/rails/active_storage'

  # React routes fallback (client-side routes)
  get '*path', to: 'static_pages#home', constraints: ->(req) { !req.xhr? && req.format.html? }
end
