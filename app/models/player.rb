class Player < ApplicationRecord
  has_many :season_stats
  has_many :season_projections
  has_many :rankings

  validates_uniqueness_of :name

  def projected_points
    league_rules = LeagueRule.first
    season_projection = SeasonProjection.where(season: 2017, player_id: id)[0]

    if season_projection
      return (
        league_rules.points_per_passing_yard * season_projection.passing_yards +
        league_rules.points_per_int * season_projection.passing_ints +
        league_rules.points_per_passing_td * season_projection.passing_tds +
        league_rules.points_per_rushing_yard * season_projection.rushing_yards +
        league_rules.points_per_rushing_td * season_projection.rushing_tds +
        league_rules.points_per_reception * season_projection.receptions +
        league_rules.points_per_receiving_yard * season_projection.receiving_yards +
        league_rules.points_per_receiving_td * season_projection.receiving_tds
      ).to_f.round(2)
    else
      nil
    end
  end

  def last_season_points
    league_rules = LeagueRule.first
    season_stats = SeasonStat.where(season: 2016, player_id: id)[0]

    if season_stats
      return (
        league_rules.points_per_passing_yard * season_stats.passing_yards +
        league_rules.points_per_int * season_stats.passing_ints +
        league_rules.points_per_passing_td * season_stats.passing_tds +
        league_rules.points_per_rushing_yard * season_stats.rushing_yards +
        league_rules.points_per_rushing_td * season_stats.rushing_tds +
        league_rules.points_per_reception * season_stats.receptions +
        league_rules.points_per_receiving_yard * season_stats.receiving_yards +
        league_rules.points_per_receiving_td * season_stats.receiving_tds +
        league_rules.points_per_fumble * season_stats.fumbles +
        league_rules.points_per_other_td * season_stats.other_tds
      ).to_f.round(2)
    else
      nil
    end

  end
end
