class StatsController < ApplicationController
  def index
    respond_to do |format|
      format.json { render json: Player.includes(:season_stats, :season_projections, :rankings).as_json(include: [:season_stats, :season_projections, :rankings], methods: [:projected_points, :last_season_points]) }
      format.html { render 'index' }
    end
  end
end
