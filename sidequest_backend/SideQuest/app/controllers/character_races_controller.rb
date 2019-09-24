class CharacterRacesController < ApplicationController
    def new
        @character_race = CharacterRace.new
    end

    def show
        character_race = CharacterRace.find(params[:id])
        render json: character_race
    end

    def create
        @character_race = CharacterRace.create(character_race_params)
        render json: @character_race
    end

    private

    def character_race_params
        params.require(:character_race).permit(:character_id, :name, :desc, :age, :alignment, :size, :speed, :speed_desc, :languages, :vision, :traits)
    end
end
