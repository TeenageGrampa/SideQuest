class PartyMembersController < ApplicationController
    def new
        @party_member = PartyMember.new
    end

    def show
        party_member = PartyMember.find(params[:id])
        character = party_member.character
        player = party_member.user
        render json: {
            id: party_member.id, character: character, player: player
        }
    end

    def create
        @party_member = PartyMember.create(party_member_params)
        render json: @party_member
    end

    private

    def party_member_params
        params.require(:party_member).permit(:character_id, :game_id)
    end
end
