Rails.application.routes.draw do
  root "unauthenticated#index"

  devise_for :users, path: "auth", controllers: {
    sessions: "users/sessions",
    registrations: "users/registrations"
  }

  scope :auth do
    get "is_signed_in", to: "auth#signed_in?"
  end

  get "hackers", to: "hacker_view#index"
  match "hackers/*path", to: "hacker_view#index", via: :all

  get "admin", to: "admin_view#index"
  match "admin/*path", to: "admin_view#index", via: :all

  get "/users/me", to: "users#show_self", as: :user_me, via: :get
  put "/users/me", to: "users#update_self", as: :user_me_update, via: :put
  get "/users/deleted", to: "users#index_deleted"
  delete "/users/:id/destroy", to: "users#hard_destroy"
  resources :users

  get "/competition", to: "competition#show"
  post "/competition", to: "competition#create"
  put "/competition", to: "competition#update"
  delete "/competition", to: "competition#destroy"
  get "/competition/invites", to: "competition#list_attendees"
  post "/competition/invites", to: "competition#invite_attendee"
end
