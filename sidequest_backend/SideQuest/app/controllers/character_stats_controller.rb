class CharacterStatsController < ApplicationController
    def new
        @character_stat = CharacterStat.new
    end

    def show
        character_stat = CharacterStat.find(params[:id])
        render json: character_stat
    end

    def create
        @character_stat = CharacterStat.create(character_stat_params)
        render json: @character_stat
    end

    private

    def character_stat_params
        params.require(:character_stat).permit(:character_id, :strength, :dexterity, :constitution, :intelligence, :wisdom, :charisma, :initiative, :hp, :passive_perception, :proficiency_mod, :armor_class)
    end
end
