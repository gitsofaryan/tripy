import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
    try {
        // Check if API key is available
        if (!process.env.GEMINI_API_KEY) {
            console.error('GEMINI_API_KEY is not set');
            return NextResponse.json({ error: 'Gemini API key not configured' }, { status: 500 });
        }

        const { messages } = await req.json();

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 });
        }

        // Get the Gemini model
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            generationConfig: {
                responseMimeType: "application/json",
            },
        });

        // Convert messages to Gemini format
        const systemPrompt = `You are an AI Trip Planner Agent. Your goal is to help the user plan a trip by asking one relevant trip-related question at a time in the following order: 
        1) Starting location (source), 
        2) Destination city or country, 
        3) Group size (Solo, Couple, Family, Friends), 
        4) Budget (Low, Medium, High), 
        5) Trip duration (number of days), 
        6) Travel interests (e.g., adventure, sightseeing, cultural, food, nightlife, relaxation), 
        7) Special requirements or preferences (if any). Do not ask multiple questions at once or irrelevant questions; 
        if any answer is unclear, politely ask for clarification. Always maintain a conversational, interactive style, and with each response also send which UI component to display (e.g., 'budget/groupSize/tripDuration/final', where Final means generating the complete final output). Once all details are collected, generate and return a strict JSON response only (no explanations or extra text) with the schema: { "resp":"Text Resp", "ui":"budget/groupSize/tripDuration/final" }`;

        // Build conversation history
        let conversationHistory = systemPrompt + "\n\n";
        messages.forEach((msg: any) => {
            conversationHistory += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n`;
        });

        // Generate response
        const result = await model.generateContent(conversationHistory);
        const response = await result.response;
        const responseText = response.text();

        console.log('Gemini Response:', responseText);

        if (!responseText) {
            return NextResponse.json({ error: 'No content received from Gemini' }, { status: 500 });
        }

        try {
            // Parse the JSON response
            const parsedResponse = JSON.parse(responseText);
            return NextResponse.json(parsedResponse);
        } catch (parseError) {
            console.error('Failed to parse Gemini response as JSON:', parseError);
            // If JSON parsing fails, return a fallback response
            return NextResponse.json({
                resp: responseText,
                ui: "default"
            });
        }

    } catch (error) {
        console.error('Gemini API Error:', error);
        return NextResponse.json({
            error: error instanceof Error ? error.message : 'An unknown error occurred'
        }, { status: 500 });
    }
}
