module Consultoria
module Api
  module V1
    module Auth
      class CardsController < AuthController
        def create
          business = Cards::CardCreateBusiness.new(card_params, current_user)
          business.save!
          render json: serializer_resource(business.card), status: :created
        end

        def update
          business = Cards::CardUpdateBusiness.new(card_params, current_user)
          business.update!
          render json: serializer_resource(business.card), status: :ok
        end

        def show
          render json: serializer_resource(card), status: :ok
        end

        def copy_card
          business = Cards::CardCopyBusiness.new(params)
          business.copy_card!
          render json: serializer_resource(business.copied_card), status: :created
        end

        def move_to_list
          business = Cards::CardMoveToListBusiness.new(params, current_user)
          business.move_card!
          statusDict = {
            scheduled: {
                label: "PREVISTO"
            },
            delayed: {
                label: "ATRASADO"
            },
            in_progress: {
                label: "EM ANDAMENTO"
            },
            completed: {
                label: "CONCLUIDO"
            }
          }
          
          text = "O usuário #{current_user.name} colocou o card na lista #{statusDict[business.moved_card.list.status.to_sym][:label]}"
          CardHistoryService::CardHistoryCreate.new(business.moved_card, current_user, text, "list").call
          render json: serializer_resource(business.moved_card), status: :ok
        end

        def card_history
          render json: serializer_card_histories(card.card_histories.order(:created_at)), status: :ok
        end

        def add_user_to_card
          business = Cards::CardAddUsersBusiness.new(params, current_user)
          business.add_user_to_card!
          render json: business.card, status: :ok
        end

        def remove_users_cards
          @user_card = UserCard.where("consultoria_card_id = ? AND user_id IN (?)", params[:consultoria_card_id], params[:user_ids]).map(&:destroy)
          head :no_content
        end

        def add_lead
          @user_card = UserCard.where("consultoria_card_id = ? AND user_id = ?", params[:consultoria_card_id], params[:lead_id]).first
          if @user_card.nil?
            @user_card = UserCard.create!(consultoria_card_id: params[:consultoria_card_id], user_id: params[:lead_id], lead: true)
          else
            @user_card.lead = true
            @user_card.save
          end
          
          render json: serializer_resource(@user_card.card), status: :ok
        end

        def remove_lead
          @user_card = UserCard.where("consultoria_card_id = ? AND user_id = ? AND lead IS TRUE", params[:consultoria_card_id], params[:lead_id]).first
          @user_card.lead = nil
          @user_card.save
          render json: serializer_resource(@user_card.card), status: :ok
        end

        def destroy
          card.destroy!
          head :no_content
        end

        private

        def card_params
          params.permit(:consultoria_list_id, :id, :title, :status, :description, :start_date, :finish_date, :position, :date_conclusion, :lead_id, user_ids: [])
        end

        def serializer_resource(card)
          CardSerializer.new(card)
        end

        def serializer_card_histories(object)
          CardHistorySerializer.new(object)
        end

        def card
          @card ||= Card.find params[:id]
        end
      end
    end
  end
end
end
