class MessagesController < ApplicationController

    def index 
        messages = Message.all 
        message_info = messages.map{ | message | {id: message.id, user: message.user, game: message.game, content: message.content}}
        render json: message_info
    end

    def new
        message = Message.new
    end

    def show
        message = Message.find(params[:id])
        render json: { id: message.id, user: message.user, game: message.game, content: message.content}
    end

    def create
        message = Message.create(message_params)
        render json: message
    end

    private

    def message_params
        params.require(:message).permit(:user_id, :game_id, :content)
    end
end
