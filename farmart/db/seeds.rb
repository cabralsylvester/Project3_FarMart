# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Vendor.destroy_all
# Consumer.destroy_all
Product.destroy_all
Order.destroy_all

pommes = 	Vendor.create(name: "C'est la Pommes" , city: "Bayville", state: "VA", website: "#"  , image: "http://cdn.rosannadavisonnutrition.com/wp-content/uploads/2015/12/apples.jpeg")
famous = Vendor.create(name: "Angus Famous"  , city: "Culpeper", state: "VA"  , website: "#"   , image: "http://healthylivingmarket.com/wp-content/uploads/2016/01/meat_nose_to_tail2-1.jpg")
deli = Vendor.create(name: "Délicieux"  , city: "Falls Church", state: "VA"  , website: "#"  , image: "https://wallpaperscraft.com/image/shopping_baking_bread_loaf_pretzels_dried_76665_3840x2400.jpg")
greyjoy = Vendor.create(name: "Greyjoy Seafood"  , city: "Annapolis" , state: "MD" , website: "#"  , image: "https://previews.123rf.com/images/alexraths/alexraths1202/alexraths120200016/12351132-Seafood-on-ice-at-the-fish-market-Stock-Photo-fresh.jpg")

# jane = Consumer.create(name: "Jane", city: "Washington", state: "DC")
# larry = Consumer.create(name: "Larry", city: "Silver Spring", state: "Maryland")
# john = Consumer.create(name: "John", city: "Arlington", state: "Virginia")
# deondre = Consumer.create(name: "Deondre", city: "Bowie", state: "Maryland")

briskpom = Product.create(category: "Meat, Poultry, and Fish" , name: "Brisket" , amount:  15 , vendor: pommes , unit_of_measure: "pounds", image:  "https://www.robsbutchers.co.uk/wp-content/uploads/2016/09/Brisket-400x400.jpg" , description:  "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. ")
Product.create(category: "Bread" , name: "Sourdough" , amount:  20 , vendor: pommes, unit_of_measure: "loaves", image:  "http://www.breadsmith.com/wp-content/uploads/2015/02/landingphoto_tumblingsourdough.jpg" , description:  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo." )
briskfam = Product.create(category: "Meat, Poultry, and Fish", vendor: famous , name: "Brisket" , amount:  15 , unit_of_measure: "pounds", image:  "https://www.robsbutchers.co.uk/wp-content/uploads/2016/09/Brisket-400x400.jpg" , description:  "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. ")
famap = Product.create(category: "Produce" , vendor: famous, name: "Apple" , amount: 100 , unit_of_measure: "pieces", image:  "http://hlbuyersclub.com/wp-content/uploads/2017/01/apples-400x400.jpg" , description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.")
greyap = Product.create(category: "Produce" , vendor: greyjoy, name: "Apple" , amount: 100 , unit_of_measure: "pieces", image:  "http://hlbuyersclub.com/wp-content/uploads/2017/01/apples-400x400.jpg" , description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.")
deltuna = Product.create(category: "Meats, Poultry, and Fish" , vendor: deli, name: "Tuna" , amount:  15 , unit_of_measure: "fillets", image:  "http://www.grandtrods.com/image/cache/data/tuna/tuna%201-400x400.jpg" , description:  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." )


Order.create(customer_name: "jane", contact_num: "12346123414", reserve_amount: 5,   product: greyap )
Order.create( customer_name: "jane", contact_num: "123489012", reserve_amount: 5,   product: briskpom )
Order.create( customer_name: "larry", contact_num: "5123461352", reserve_amount: 5,   product: greyap )
Order.create( customer_name: "deondre", contact_num: "1234151321", reserve_amount: 5,   product: greyap )
Order.create( customer_name: "deondre", contact_num: "13249714821", reserve_amount: 5,   product: briskfam )
Order.create( customer_name: "john",contact_num: "4651234358", reserve_amount: 5, product: famap )
Order.create( customer_name: "eric",contact_num: "4651234358", reserve_amount: 3, product: deltuna )
