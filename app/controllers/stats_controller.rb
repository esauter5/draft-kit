class StatsController < ApplicationController
  def index
    respond_to do |format|
      format.json { render json: Player.includes(:season_stats, :season_projections, :rankings).sort_by { |player| player.rankings[0] ? player.rankings[0].ranking : 10000000 }.as_json(include: [:season_stats, :season_projections, :rankings], methods: [:projected_points, :last_season_points]) }
      format.html { render 'index' }
    end
  end
end
