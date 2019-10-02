class UsersController < ApplicationController
    def index
        users = User.all 
        render json: users, include:[:characters]
    end

    def profile 
        render json: current_user
    end

    def show
        user = User.find(params[:id])
        allCharacters = user.characters.map{|character| {id: character.id, name: character.name, level: character.level, race: character.character_races, class: character.character_classes, alignment: character.alignment, stats: character.character_stats, skills: character.character_skills, mods: character.character_mods}}
        games = user.characters.map{ | character | {game: character.games.map{ | game| {
            id: game.id, name: game.name, dungeon_master: game.dungeon_master, party_ids: game.party_members.map{ |member| member.character.user.id }, party: game.party_members.map{ | member |  {id: member.character.id, name: member.character.name, level: member.character.level, alignment: member.character.alignment, class: member.character.character_classes, race: member.character.character_races, user_id: member.character.user.id, stats: character.character_stats, skills: character.character_skills, mods: character.character_mods}}, players: game.party_members.map{ | member | member.character.user}, explevel: game.explevel, rplevel: game.rplevel, location: game.location, desc: game.desc, messages: game.messages
        }} }}

        dungeon_master_games = user.dungeon_masters.map{ | dungeon_master | {
            id: dungeon_master.game.id, name: dungeon_master.game.name, dungeon_master: dungeon_master.game.dungeon_master.user, party_ids: dungeon_master.game.party_members.map{ |member| member.character.user.id }, party: dungeon_master.game.party_members.map{ | member |  {id: member.character.id, name: member.character.name, level: member.character.level, alignment: member.character.alignment, class: member.character.character_classes, race: member.character.character_races, user_id: member.character.user.id, stats: member.character.character_stats, skills: member.character.character_skills, mods: member.character.character_mods}}, players: dungeon_master.game.party_members.map{ | member | member.character.user}, explevel: dungeon_master.game.explevel, rplevel: dungeon_master.game.rplevel, location: dungeon_master.game.location, desc: dungeon_master.game.desc, messages: dungeon_master.game.messages
        }}
        render json: {
            id: user.id, username: user.username, characters: allCharacters, games: games, dungeon_master_games: dungeon_master_games
        }
    end

    def create 
        
        user = User.create(user_params)

        if user.valid? 
            render json: {token: create_token(user.id)}
        else 
            render json: {errors: user.errors.full_messages}, status: 422
        end
    end

    private

    def user_params 
        params.permit(:id, :username, :password)
    end
end
