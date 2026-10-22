import mongoose from "mongoose";
import { Trip } from "../models/trip";
import { connectToDatabase } from "../db";

process.loadEnvFile();

async function seed() {
  await connectToDatabase();

  // Start from an empty collection so running the seed twice doesn't create duplicates
  await Trip.deleteMany({});

  const trips = await Trip.create([
    {
      title: "Weekend in Rome",
      destination: "Rome, Italy",
      startDate: new Date("2026-11-13"),
      endDate: new Date("2026-11-16"),
      budget: 600,
      travelers: 2,
      status: "booked",
      description: "Colosseum tickets booked for Saturday morning.",
    },
    {
      title: "Christmas in Paris",
      destination: "Paris, France",
      startDate: new Date("2026-12-23"),
      endDate: new Date("2026-12-27"),
      budget: 800,
      travelers: 2,
      description: "Christmas markets and a day trip to Versailles.",
    },
    {
      title: "Summer on Paros",
      destination: "Paros, Greece",
      startDate: new Date("2026-07-25"),
      endDate: new Date("2026-08-01"),
      budget: 1000,
      travelers: 4,
      status: "completed",
      description: "Beach days in Naoussa and sunsets in Parikia.",
    },
    {
      title: "Spring in Japan",
      destination: "Tokyo & Kyoto, Japan",
      startDate: new Date("2027-04-01"),
      endDate: new Date("2027-04-14"),
      budget: 450000,
      currency: "JPY",
      travelers: 1,
      description:
        "Cherry blossom season, with the bullet train between cities.",
    },
    {
      title: "Highlands road trip",
      destination: "Edinburgh, Scotland",
      startDate: new Date("2027-06-10"),
      endDate: new Date("2027-06-17"),
      travelers: 3,
      currency: "GBP",
    },
  ]);
  console.log(`Created ${trips.length} trips`);

  // Close the connection so the script can exit
  await mongoose.disconnect();
}

seed().catch(async (error) => {
  console.error("Seed failed:", error);
  await mongoose.disconnect();
  process.exit(1);
});
