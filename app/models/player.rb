class Player < ApplicationRecord
  has_many :season_stats
  has_many :season_projections

  validates_uniqueness_of :name
end
