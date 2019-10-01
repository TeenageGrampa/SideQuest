class RequestsController < ApplicationController
    def new
        @request = Request.new
    end

    def index
        requests = Request.all
        render json: requests
    end

    def show
        request = Request.find(params[:id])
        character = request.character
        render json: {
            id: request.id, character: request.character, player: request.character.user, dungeon_master: request.dungeon_master, game: request.game
        }
    end

    def create
        @request = Request.create(request_params)
        render json: @request
    end

    def destroy 
        @request = Request.find(params[:id])
        @request.destroy
        render json: {}
    end

    private

    def request_params
        params.require(:request).permit(:character_id, :game_id, :dungeon_master_id, :message)
    end

end
