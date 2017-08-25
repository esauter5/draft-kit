class PlayersController < ApplicationController
   skip_before_action :verify_authenticity_token

  def draft
    return unless player

    player.update(drafted: true)

    render json: { player: player.as_json }
  end

  def undraft
    return unless player

    player.update(drafted: false)

    render json: { player: player.as_json }
  end

  def own
    return unless player

    player.update(owned: true)

    render json: { player: player.as_json }
  end

  def disown
    return unless player

    player.update(owned: false)

    render json: { player: player.as_json }
  end

  def watch
    return unless player

    player.update(watch: true)

    render json: { player: player.as_json }
  end

  def unwatch
    return unless player

    player.update(watch: false)

    render json: { player: player.as_json }
  end


  protected

  def player
    @player ||= Player.find(params[:id])
  end
end
