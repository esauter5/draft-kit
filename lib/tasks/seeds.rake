require 'csv'

namespace :seeds do
  desc 'load players'
  task players: :environment do
    CSV.foreach('public/stats2016.csv') do |row|
      next if row[0] === "Name"
      player = Player.new({
        name: row[0].downcase,
        team: row[1].downcase,
        position: row[2].downcase
      })

      puts "#{row[0]} already in DB" unless player.save
    end

    CSV.foreach('tmp/stats2017.csv') do |row|
      next if row[0] === "Name"
      player = Player.new({
        name: row[0].downcase,
        team: row[1].downcase,
        position: row[2].downcase
      })

      puts "#{row[0]} already in DB" unless player.save
    end
  end

  desc 'load 2016 stats'
  task stats_2016: :environment do
    CSV.foreach('public/stats2016.csv') do |row|
      next if row[0] === "Name"

      player = Player.find_by(name: row[0].downcase, team: row[1].downcase, position: row[2].downcase)

      if player
        season_stat = SeasonStat.new({
          player: player,
          season: 2016,
          passing_completions: row[3],
          passing_attempts: row[4],
          passing_yards: row[5],
          passing_tds: row[6],
          passing_ints: row[7],
          rushing_attempts: row[8],
          rushing_yards: row[9],
          rushing_tds: row[10],
          receptions: row[11],
          receiving_yards: row[12],
          receiving_tds: row[13],
          targets: row[14],
          two_point_conversions: row[15],
          fumbles: row[16],
          other_tds: row[17]
        })

        puts "#{row[0]} stats already in DB" unless season_stat.save
      end
    end
  end

  desc 'load 2017 projections'
  task projections_2017: :environment do
    CSV.foreach('public/stats2017.csv') do |row|
      next if row[0] === "Name"

      player = Player.find_by(name: row[0].downcase, team: row[1].downcase, position: row[2].downcase)

      if player
        season_projection = SeasonProjection.new({
          player: player,
          season: 2017,
          passing_completions: row[3],
          passing_attempts: row[4],
          passing_yards: row[5],
          passing_tds: row[6],
          passing_ints: row[7],
          rushing_attempts: row[8],
          rushing_yards: row[9],
          rushing_tds: row[10],
          receptions: row[11],
          receiving_yards: row[12],
          receiving_tds: row[13],
        })

        puts "#{row[0]} projection already in DB" unless season_projection.save
      end
    end
  end

  desc 'load outlooks'
  task outlook_2017: :environment do
    CSV.foreach('public/outlook2017.csv') do |row|
      player = Player.find_by(name: row[0].downcase)

      if player
        season_projection = SeasonProjection.find_by(player: player, season: 2017)

        if season_projection
          season_projection.update(outlook: row[1])
        end
      end
    end
  end

  desc 'load league rules'
  task league_rules: :environment do
    LeagueRule.create({
      league_name: 'bon-bon',
      num_qbs: 1,
      num_rbs: 2,
      num_wrs: 2,
      num_tes: 1,
      num_flex: 1,
      num_bench: 7,
      points_per_passing_yard: 0.04,
      points_per_int: -2,
      points_per_passing_td: 6,
      points_per_2pc: 2,
      points_per_rushing_yard: 0.10,
      points_per_rushing_td: 6,
      points_per_reception: 1,
      points_per_receiving_yard: 0.10,
      points_per_receiving_td: 6,
      points_per_fumble: -2,
      points_per_other_td: 6
    })

    LeagueRule.create({
      league_name: 'bmore-fantasy',
      num_qbs: 1,
      num_rbs: 2,
      num_wrs: 2,
      num_tes: 1,
      num_flex: 1,
      num_bench: 6,
      points_per_passing_yard: 0.04,
      points_per_int: -2,
      points_per_passing_td: 4,
      points_per_2pc: 2,
      points_per_rushing_yard: 0.10,
      points_per_rushing_td: 6,
      points_per_reception: 1,
      points_per_receiving_yard: 0.10,
      points_per_receiving_td: 6,
      points_per_fumble: -2,
      points_per_other_td: 6
    })
  end

  desc 'rankings'
  task rankings: :environment do
    CSV.foreach('public/rankings.csv') do |row|
      next if row[1] == "Player"
      puts row[1]
      player = Player.find_by(name: row[1].downcase)

      if player
        Ranking.create({
          player: player,
          season: 2017,
          ranking: row[0],
          position_ranking: row[3],
          average_draft_position: row[9]
        })

        projection = SeasonProjection.find_by(player: player, season: 2017)
        projection.update(bye_week: row[4]) if projection
      end

    end
  end
end
