class CharacterClassesController < ApplicationController
    def index 
        character_classes = CharacterClass.all 
        render json: character_classes, include:[:character]
    end
    

    def new
        @character_class = CharacterClass.new
    end

    def show
        character_class = CharacterClass.find(params[:id])
        render json: character_class
    end

    def create
        @character_class = CharacterClass.create(character_class_params)
        render json: @character_class
    end

    private

    def character_class_params
        params.require(:character_class).permit(:character_id, :name, :desc, :hit_dice, :armor_prof, :prof_tools, :prof_weapons, :prof_saving_throws, :prof_skills, :equipment, :spellcast_ability)
    end
end
