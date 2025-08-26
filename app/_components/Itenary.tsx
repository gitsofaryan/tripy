import React from 'react'

const TRIP_DATA={
    destination: "Paris",
    duration: "5 days",
    origin: "New York",
    budget: "Medium",
    group_size: "Couple",
    hotels: [
      {
        hotel_name: "Hotel Le Meurice",
        hotel_address: "228 Rue de Rivoli, 75001 Paris, France",
        price_per_night: "$500",
        hotel_image_url: "https://example.com/hotel1.jpg",
        geo_coordinates: {
          latitude: 48.8656,
          longitude: 2.3212
        },
        rating: 4.5,
        description: "Luxury hotel in the heart of Paris."
      }
    ],
    itinerary: [
      {
        day: 1,
        day_plan: "Arrival in Paris",
        best_time_to_visit_day: "Morning",
        activities: [
          {
            place_name: "Eiffel Tower",
            place_details: "Iconic symbol of Paris.",
            place_image_url: "https://example.com/eiffel.jpg",
            geo_coordinates: {
              latitude: 48.8584,
              longitude: 2.2945
            },
            place_address: "Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France",
            ticket_pricing: "$25",
            time_travel_each_location: "30 mins",
            best_time_to_visit: "Evening"
          }
        ]
      }
    ]
}

export default function Itenary() {
  return (
    <div>
      
    </div>
  )
}
