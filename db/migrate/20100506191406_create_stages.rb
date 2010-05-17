class CreateStages < ActiveRecord::Migration
  def self.up
    create_table :stages do |t|
      t.string :host
      t.string :name
      t.string :url

      t.timestamps
    end
  end

  def self.down
    drop_table :stages
  end
end
