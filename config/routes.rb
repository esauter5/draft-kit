Rails.application.routes.draw do
  root to: 'stats#index'
  get 'stats' => 'stats#index'

  resources :players do
    member do
      put 'draft'
      put 'undraft'

      put 'own'
      put 'disown'

      put 'watch'
      put 'unwatch'
    end
  end
end
