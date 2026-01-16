// app/api/test-models/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    
    // Test different models to see which ones work
    const modelsToTest = [
      "gemini-pro",
      "gemini-1.5-flash",
      "gemini-1.5-pro",
      "gemini-2.0-flash-exp"
    ];
    
    const results = [];
    
    for (const modelName of modelsToTest) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        await model.generateContent("Hello");
        results.push({ model: modelName, status: "✅ Works" });
      } catch (error: any) {
        results.push({ 
          model: modelName, 
          status: "❌ Failed",
          error: error.message 
        });
      }
    }
    
    return NextResponse.json({ results });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}