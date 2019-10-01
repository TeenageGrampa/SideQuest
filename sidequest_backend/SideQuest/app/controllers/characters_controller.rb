class CharactersController < ApplicationController
    def index 
        characters = Character.all 
        render json: characters, include:[:user, :character_classes, :character_races, :character_skills, :character_mods, :character_stats]
    end
    

    def new
        @character = Character.new
    end

    def show
        character = Character.find(params[:id])
        render json: {
            id: character.id, user: character.user, name: character.name, level: character.level, class: character.character_classes, race: character.character_races, stats: character.character_stats, skills: character.character_skills, mods: character.character_mods
        }
    end

    def create
        @character = Character.create(character_params)
        render json: @character
    end

    def destroy
        character = Character.find(params[:id])
        character.destroy
        render json: []
    end

    private

    def character_params
        params.require(:character).permit(:name, :level, :alignment, :user_id)
    end
end
