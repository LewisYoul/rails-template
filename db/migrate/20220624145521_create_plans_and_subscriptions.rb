class CreatePlansAndSubscriptions < ActiveRecord::Migration[7.0]
  def change
    create_table :plans do |t|
      t.string :level, null: false
      t.string :stripe_price_id
      t.integer :yearly_cost_dollars, null: false
    end

    create_table :subscriptions do |t|
      t.references :plan, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.datetime :start_datetime
      t.datetime :end_datetime
      t.boolean :cancel_at_period_end, null: false, default: false
      t.string :stripe_subscription_id
      t.string :status, null: false

      t.timestamps
    end

    add_column :users, :stripe_customer_id, :string
  end
end
