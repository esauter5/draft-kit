require 'csv'

namespace :seeds do
  desc 'load players'
  task players: :environment do
    CSV.foreach('tmp/stats2016.csv') do |row|
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
    CSV.foreach('tmp/stats2016.csv') do |row|
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
    CSV.foreach('tmp/stats2017.csv') do |row|
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
end
