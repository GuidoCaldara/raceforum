# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'csv'

40.times do
    User.create(
        username: Faker::DragonBall.character,
        email:Faker::Internet.email,
        password: "password"
        )
end
puts "Users Created"

filepath = File.open(File.join(Rails.root, 'db', 'races.csv'))
csv_options = { col_sep: ',', quote_char: '"' }

CSV.foreach(filepath, csv_options) do |row|
  if row != []
  location = row[0]
  date = Date.parse row[1]
  name = row[2].strip
  distance = row[3]
  elevation = row[4]
  website = row[5]
  type =["road", "trail", "skyrace"].sample  if row[6] == ""
  type ="road"  if row[6] == "Strada"
  type ="trail"  if row[6] == "Trail"
  r = Race.new(
  name: name,
  user: User.all.sample,
  elevation: elevation,
  typo: type,
  location:  location,
  race_distance: rand(10...50),
  next_edition: Date.today + rand(10...60) ,
  last_edition: nil,
  price: rand(20..50),
  website: website
)
  r.save

  p "#{r.name} created - #{Race.all.size}"

end

  5.times do
      Review.create(
          user: User.all.sample,
          race: r,
          path_rating: rand(1..6),
          organization_rating: rand(1..6),
          quality_price_rating: rand(1..6),
          difficulty: rand(1..6),
          title: "Review Title",
          text: Faker::Lorem.paragraph(2, true)
      )
  end
  10.times do
      Question.create(
          race: r,
          user: User.all.sample,
          title: "Question Title",
          text: Faker::Lorem.paragraph(2, true)
      )

      5.times do
          Answer.create(
              race: r,
              question: Question.last,
              user: User.all.sample,
              text: Faker::Lorem.paragraph(2, true)
          )
      end
  end


end
