# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "Creating Users"
40.times do 
    User.create(
        username: Faker::DragonBall.character, 
        email:Faker::Internet.email, 
        password: "password" 
        )
end
puts "Users Created"

20.times do 
    r = Race.new(
    name: Faker::Superhero.name,
    user: User.all.sample,
    typo: ["Trail", "Road", "Skyrace", "Vertical"].sample,
    location: "Albino, 24021 Bergamo Italy",
    distance: rand(20..100),
    last_edition: Date.today - rand(200..400),
    organizer: Faker::Team.name,
    price: rand(20..50),
    website: Faker::Internet.domain_name,
    subscription_link: "www.wedosport.net",
    rating: rand(1..6)
)
    r.next_edition = r.last_edition + 365
    r.save

    15.times do 
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


