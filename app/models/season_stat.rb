class SeasonStat < ApplicationRecord
  belongs_to :player

  validates :player, uniqueness: { scope: :season }
end
