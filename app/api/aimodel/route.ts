import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    // Check if API key is available
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not set");
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      );
    }

    const { messages, isFinal } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages format" },
        { status: 400 }
      );
    }

    // Get the Gemini model
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    // System prompt for regular conversation
    const systemPrompt = `You are an AI Trip Planner Agent. Your goal is to help the user plan a trip by asking one relevant trip-related question at a time in the following order: 
        1) Starting location (source), 
        2) Destination city or country, 
        3) Group size (Solo, Couple, Family, Friends), 
        4) Budget (Low, Medium, High), 
        5) Trip duration (number of days), 
        6) Travel interests (e.g., adventure, sightseeing, cultural, food, nightlife, relaxation), 
        7) Special requirements or preferences (if any). 
        
        Do not ask multiple questions at once or irrelevant questions; if any answer is unclear, politely ask for clarification. Always maintain a conversational, interactive style.
        
        IMPORTANT: With each response, you must specify which UI component to display using EXACTLY these values:
        - "budget" - when asking about budget preferences
        - "groupSize" - when asking about group size  
        - "TripDuration" - when asking about trip duration/days
        - "Final" - when generating the complete final trip plan
        - "default" - for any other questions
        
        Always return a JSON response with the schema: { "resp":"Your response text", "ui":"exact ui string from above list" }`;

    const FINAL_PROMPT = `Generate a comprehensive travel plan based on all the collected information. Create a detailed trip plan with hotels and itinerary.

Return ONLY this JSON structure (no extra text):
{
  "resp": "Your trip plan has been generated successfully! You can now view all the details including hotels, activities, and daily itinerary.",
  "ui": "Final",
  "trip_plan": {
    "destination": "string",
    "duration": "string", 
    "origin": "string",
    "budget": "string",
    "group_size": "string",
    "hotels": [
      {
        "hotel_name": "string",
        "hotel_address": "string",
        "price_per_night": "string",
        "hotel_image_url": "string",
        "geo_coordinates": {
          "latitude": "number",
          "longitude": "number"
        },
        "rating": "number",
        "description": "string"
      }
    ],
    "itinerary": [
      {
        "day": "number",
        "day_plan": "string", 
        "best_time_to_visit_day": "string",
        "activities": [
          {
            "place_name": "string",
            "place_details": "string",
            "place_image_url": "string",
            "geo_coordinates": {
              "latitude": "number",
              "longitude": "number"
            },
            "place_address": "string",
            "ticket_pricing": "string",
            "time_travel_each_location": "string",
            "best_time_to_visit": "string"
          }
        ]
      }
    ]
  }
}`;

    // Build conversation history
    let conversationHistory = "";
    
    if (isFinal) {
      // Use final prompt when generating trip plan
      conversationHistory = FINAL_PROMPT + "\n\nBased on the conversation history:\n";
      messages.forEach((msg: any) => {
        conversationHistory += `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}\n`;
      });
    } else {
      // Use regular system prompt for conversation
      conversationHistory = systemPrompt + "\n\n";
      messages.forEach((msg: any) => {
        conversationHistory += `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}\n`;
      });
      conversationHistory += "\nRemember: Return ONLY valid JSON with 'resp' and 'ui' fields. Use exact UI strings: budget, groupSize, TripDuration, Final, or default.";
    }

    // Generate response
    const result = await model.generateContent(conversationHistory);
    const response = await result.response;
    const responseText = response.text();

    console.log("Gemini Response:", responseText);

    if (!responseText) {
      return NextResponse.json(
        { error: "No content received from Gemini" },
        { status: 500 }
      );
    }

    try {
      // Parse the JSON response
      const parsedResponse = JSON.parse(responseText);
      return NextResponse.json(parsedResponse);
    } catch (parseError) {
      console.error("Failed to parse Gemini response as JSON:", parseError);
      // If JSON parsing fails, return a fallback response
      return NextResponse.json({
        resp: responseText,
        ui: isFinal ? "Final" : "default",
      });
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}
