class DungeonMastersController < ApplicationController
    def new
        @dungeon_master = DungeonMaster.new
    end

    def show
        dungeon_master = DungeonMaster.find(params[:id])
        game = dungeon_master.game
        party = game.party_members.map{ | member | member.character}
        partyInfo = party.map{ | character |  {id: character.id, user: character.user, name: character.name, level: character.level, class: character.character_classes, race: character.character_races}
        }
        players = party.map{ | member | member.user}
        gameInfo = {
            id: game.id, rplevel: game.rplevel, name: game.name, explevel: game.explevel, party: partyInfo, players: game.party_members.map{ | member | member.character.user}, location: game.location, desc: game.desc, messages: game.messages.map{ | message| {id: message.id, user: message.user, game: message.game, content: message.content}}, requests: game.requests.map{ |request| {id: request.id, user: request.character.user, character: {id: request.character.id, user: request.character.user, name: request.character.name, level: request.character.level, class: request.character.character_classes, race: request.character.character_races}, dungeon_master: request.dungeon_master, game: request.game, message: request.message}}
        }
        render json: {id: dungeon_master.id, game: gameInfo, user_id: dungeon_master.user_id, name: dungeon_master.name, requests: dungeon_master.requests}
    end

    def create
        @dungeon_master = DungeonMaster.create(dungeon_master_params)
        render json: @dungeon_master
    end

    private

    def dungeon_master_params
        params.require(:dungeon_master).permit(:name, :user_id, :game_id)
    end
end
