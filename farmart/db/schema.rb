# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170310212337) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "orders", force: :cascade do |t|
    t.string   "customer_name"
    t.string   "contact_num"
<<<<<<< HEAD
    t.datetime "pick_up_time",   default: '2017-03-14 15:40:01', null: false
=======
    t.datetime "pick_up_time",   default: '2017-03-14 21:50:08', null: false
>>>>>>> 467e3595c17ab4ebb38d0c90a9cad03b8494abbb
    t.integer  "reserve_amount"
    t.integer  "product_id"
    t.datetime "created_at",                                     null: false
    t.datetime "updated_at",                                     null: false
    t.index ["product_id"], name: "index_orders_on_product_id", using: :btree
  end

  create_table "products", force: :cascade do |t|
    t.string   "category"
    t.string   "name"
    t.integer  "amount"
    t.string   "unit_of_measure"
    t.string   "image"
    t.string   "description"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.integer  "vendor_id"
    t.index ["vendor_id"], name: "index_products_on_vendor_id", using: :btree
  end

  create_table "vendors", force: :cascade do |t|
    t.string   "name"
    t.string   "city"
    t.string   "state"
    t.string   "website"
    t.string   "image"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "orders", "products"
  add_foreign_key "products", "vendors"
end
