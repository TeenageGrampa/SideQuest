class CharacterSkillsController < ApplicationController
    def new
        @character_skill = CharacterSkill.new
    end

    def show
        character_skill = CharacterSkill.find(params[:id])
        render json: character_skill
    end

    def create
        @character_skill = CharacterSkill.create(character_skill_params)
        render json: @character_skill
    end

    private

    def character_skill_params
        params.require(:character_skill).permit(:character_id, :acrobatics, :animal_handling, :arcana, :athletics, :deception, :history, :insight, :intimidation, :investigation, :medicine, :nature, :perception, :performance, :persuasion, :religion, :sleight_of_hand, :stealth)
    end
end
