# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

plans = [
  {
    level: 'free',
    yearly_cost_dollars: 0,
    stripe_price_id: nil
  },
  {
    level: 'pro',
    yearly_cost_dollars: 10,
    stripe_price_id: 'price_1LEEi9Fv8VES5JMTQhe0AD9v'
  }
]

plans.each { |plan| Plan.create!(plan) }