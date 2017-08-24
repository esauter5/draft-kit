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
end
