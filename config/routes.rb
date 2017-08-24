Rails.application.routes.draw do
  root to: 'stats#index'
  get 'stats' => 'stats#index'
end
