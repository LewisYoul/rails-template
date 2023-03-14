class CreateTeams < ActiveRecord::Migration[7.0]
  def change
    create_table :teams do |t|
      t.string :name, null: false
      t.boolean :personal, null: false, default: true

      t.timestamps
    end

    create_table :team_users do |t|
      t.references :user, null: false, index: true
      t.references :team, null: false, index: true

      t.timestamps
    end
  end
end
