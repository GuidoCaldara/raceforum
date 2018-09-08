Rails.application.routes.draw do
  root "pages#test"
  resources :races do
    resources :reviews
    resources :photos
    resources :questions do
      resources :answers
    end
  end

  patch "race/:id/add_photo", to: "races#add_photo", as:"add_race_photo"
  devise_for :users,  controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
