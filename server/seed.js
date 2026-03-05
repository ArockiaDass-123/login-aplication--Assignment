require('dotenv').config();
const mongoose = require('mongoose');
const Event = require('./models/Event');

const mockEvents = [
    {
        name: "Tech Innovators Summit 2026",
        organizer: "Bellcorp Engineering",
        location: "San Francisco, CA",
        date: new Date("2026-05-15T09:00:00Z"),
        description: "A deep dive into the latest AI and Cloud technologies.",
        capacity: 200,
        availableSeats: 200,
        category: "Technology",
        image: "https://images.unsplash.com/photo-1540575861501-7ad0582373f3?auto=format&fit=crop&q=80&w=800"
    },
    {
        name: "Global Music Festival",
        organizer: "Harmony Events",
        location: "Austin, TX",
        date: new Date("2026-06-10T18:00:00Z"),
        description: "Experience the best of world music and local artists.",
        capacity: 500,
        availableSeats: 450,
        category: "Entertainment",
        image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800"
    },
    {
        name: "Professional Networking Brunch",
        organizer: "Career Boost",
        location: "New York, NY",
        date: new Date("2026-04-20T10:00:00Z"),
        description: "Connect with industry leaders and like-minded professionals.",
        capacity: 50,
        availableSeats: 15,
        category: "Business",
        image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=800"
    },
    {
        name: "Yoga & Mindfulness Retreat",
        organizer: "Zen Living",
        location: "Bali, Indonesia",
        date: new Date("2026-07-01T08:00:00Z"),
        description: "A week-long journey to inner peace and physical wellness.",
        capacity: 30,
        availableSeats: 5,
        category: "Health",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800"
    },
    {
        name: "Chef's Table: Modern Fusion",
        organizer: "Culinary Masters",
        location: "London, UK",
        date: new Date("2026-03-12T19:00:00Z"),
        description: "An exclusive dining experience featuring 7 experimental courses.",
        capacity: 20,
        availableSeats: 2,
        category: "Food",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800"
    },
    {
        name: "Startup Pitch Night",
        organizer: "Venture Capital Hub",
        location: "Berlin, Germany",
        date: new Date("2026-05-02T18:30:00Z"),
        description: "Early-stage startups pitch to a panel of expert investors.",
        capacity: 100,
        availableSeats: 100,
        category: "Business",
        image: "https://images.unsplash.com/photo-1475721027187-402ad2989a3b?auto=format&fit=crop&q=80&w=800"
    },
    {
        name: "Digital Art Expo",
        organizer: "Creative Pulse",
        location: "Tokyo, Japan",
        date: new Date("2026-08-15T10:00:00Z"),
        description: "Interactive installations and NFT galleries from global artists.",
        capacity: 150,
        availableSeats: 150,
        category: "Art",
        image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800"
    },
    {
        name: "Salsa Night in the Plaza",
        organizer: "Dance Community",
        location: "Miami, FL",
        date: new Date("2026-04-12T20:00:00Z"),
        description: "Free beginner lesson followed by open dancing under the stars.",
        capacity: 300,
        availableSeats: 300,
        category: "Entertainment",
        image: "https://images.unsplash.com/photo-1524156869117-e9608e0b57e0?auto=format&fit=crop&q=80&w=800"
    },
    {
        name: "AI for Sustainability Workshop",
        organizer: "Green Tech Initiative",
        location: "Seattle, WA",
        date: new Date("2026-03-30T13:00:00Z"),
        description: "Hands-on workshop on using ML models for climate solutions.",
        capacity: 40,
        availableSeats: 40,
        category: "Technology",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800"
    },
    {
        name: "The History of Coffee: Tasting Tour",
        organizer: "Roasters Coop",
        location: "Addis Ababa, Ethiopia",
        date: new Date("2026-09-20T11:00:00Z"),
        description: "Trace the origins of coffee with expert-guided cupping sessions.",
        capacity: 15,
        availableSeats: 8,
        category: "Food",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800"
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected for seeding...');

        await Event.deleteMany({});
        console.log('Existing events cleared.');

        await Event.insertMany(mockEvents);
        console.log('Mock events seeded successfully!');

        process.exit();
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seedDB();
