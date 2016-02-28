class Person < ActiveRecord::Base
  include PgSearch

  enum gender: [:male, :female]

  scope :sorted, ->{ order(first_name: :asc) }
  pg_search_scope :search,
                  against: [
                    :first_name,
                    :last_name,
                    :location,
                    :headline
                  ],
                  using: {
                    tsearch: {
                      prefix: true,
                      normalization: 2
                    }
                  }
end
