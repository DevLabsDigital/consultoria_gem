Consultoria::Engine.routes.draw do
    get '/counter', to: 'counter#index'

    namespace :api do
	    namespace :v1 do
	      namespace :auth do
	        namespace :boards do
	          get ':consultoria_board_id/protocols', to: 'protocols#index'
	          post ':consultoria_board_id/protocols', to: 'protocols#create'
	        end
	        resources :boards do
	          get '/search_by', to: 'boards#search_by'
	        end

	        resources :users
	        
	        get ':consultoria_board_id/lists', to: 'lists#index'
	        get ':consultoria_list_id/cards/:id', to: 'cards#show'
	        get ':consultoria_board_id/tags', to: 'tags#index'
	        get ':users/tags', to: 'tags#index'
	        get ':users/:id', to: 'users#show'
	        post ':users/:id/avatar_attachment', to: 'users#avatar_attachment'

	        # TasksController
	        get ':consultoria_checklist_id/tasks', to: 'tasks#index'

	        post ':consultoria_card_id/card_attachments', to: 'card_attachments#create'
	        post ':consultoria_list_id/cards', to: 'cards#create'
	        post ':consultoria_card_id/add_lead', to: 'cards#add_lead'
	        post ':consultoria_list_id/cards/copy_card', to: 'cards#copy_card'
	        post ':consultoria_board_id/tags', to: 'tags#create'
	        post ':consultoria_card_id/tagging', to: 'taggings#create'
	        post ':consultoria_card_id/comments', to: 'comments#create'
	        post ':consultoria_card_id/add_user_to_card', to: 'cards#add_user_to_card'
	        put ':consultoria_card_id/comments/:id', to: 'comments#update'
	        post ':consultoria_card_id/comments/:id/replies', to: 'comments#replies'
	        post ':consultoria_card_id/checklists', to: 'checklists#create'
	        post ':consultoria_checklist_id/tasks', to: 'tasks#create'
	        put ':consultoria_checklist_id/tasks/:id', to: 'tasks#update'

	        put 'cards/move_to_list', to: 'cards#move_to_list'
	        put ':consultoria_list_id/cards/:id', to: 'cards#update'
	        put ':consultoria_list_id/cards/change_status', to: 'cards#change_status'

	        delete ':consultoria_card_id/tagging', to: 'taggings#destroy'
	        delete ':consultoria_card_id/checklists/:id', to: 'checklists#destroy'
	        delete ':consultoria_card_id/comments/:id', to: 'comments#destroy'
	        delete ':consultoria_card_id/remove_users_cards', to: 'cards#remove_users_cards'
	        delete ':consultoria_card_id/remove_lead', to: 'cards#remove_lead'
	        delete ':consultoria_list_id/cards/:id', to: 'cards#destroy'
	        delete 'card_attachments/:consultoria_attachment_id', to: 'card_attachments#destroy'
	        delete ':consultoria_checklist_id/tasks', to: 'tasks#destroy'
	        #history
	        get ':consultoria_list_id/cards/:id/history', to: 'cards#card_history'

	        namespace :tasks do
	          put 'mark_as_completed/:consultoria_task_id', to: 'mark_as_completed#update'
	        end
	      end
	    end
    end
end
