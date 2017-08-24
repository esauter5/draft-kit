class LeagueRule < ApplicationRecord
  validates_uniqueness_of :league_name
end
