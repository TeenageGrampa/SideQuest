class CharacterModsController < ApplicationController
    def new
        @character_mod = CharacterMod.new
    end

    def show
        character_mod = CharacterMod.find(params[:id])
        render json: character_mod
    end

    def create
        @character_mod = CharacterMod.create(character_mod_params)
        render json: @character_mod
    end

    private

    def character_mod_params
        params.require(:character_mod).permit(:character_id, :strmod, :conmod, :dexmod, :intmod, :wismod, :chrmod)
    end
end
