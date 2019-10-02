class GamesController < ApplicationController

    def index 
        games = Game.all
        
        game_info = games.map{ | game | {
            id: game.id, name: game.name, latitude: game.latitude, longitude: game.longitude, dungeon_master: game.dungeon_master, party_ids: game.party_members.map{ |member| member.character.user.id }, party: game.party_members.map{ | member |  {id: member.character.id, name: member.character.name, level: member.character.level, alignment: member.character.alignment, class: member.character.character_classes, race: member.character.character_races, user_id: member.character.user.id, stats: member.character.character_stats, skills: member.character.character_skills, mods: member.character.character_mods}}, players: game.party_members.map{ | member | member.character.user}, explevel: game.explevel, rplevel: game.rplevel, location: game.location, desc: game.desc, messages: game.messages
        }} 
        render json: game_info 
    end

    def new
        @game = Game.new
    end

    def show
        game = Game.find(params[:id])
        dungeon_master_user = game.dungeon_master.user
        party = game.party_members.map{ | member | member.character}
        partyInfo = party.map{ | character |  {id: character.id, user: character.user, name: character.name, level: character.level, class: character.character_classes, race: character.character_races, stats: character.character_stats, skills: character.character_skills, mods: character.character_mods}
        }
        players = party.map{ | member | member.user}
        render json: {
            id: game.id, latitude: game.latitude, longitude: game.longitude, dungeon_master: dungeon_master_user, rplevel: game.rplevel, name: game.name, explevel: game.explevel, party: partyInfo, players: game.party_members.map{ | member | member.character.user}, location: game.location, desc: game.desc, messages: game.messages.map{ | message| {id: message.id, user: message.user, game: message.game, content: message.content}}
        }
    end

    def create
        @game = Game.create(game_params)
        render json: @game
    end

    private

    def game_params
        params.require(:game).permit(:name, :rplevel, :explevel, :location, :desc, :latitude, :longitude)
    end
end
