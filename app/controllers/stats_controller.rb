class StatsController < ApplicationController
  def index
    respond_to do |format|

      format.json { render json: Player.includes(:season_stats, :season_projections).as_json(include: [:season_stats, :season_projections], methods: [:projected_points, :last_season_points]) }
    end
  end
end
