import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // 1. Validate env
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Missing GEMINI_API_KEY" },
        { status: 500 }
      );
    }

    // 2. Parse body
    const { question, context = [], plan } = await req.json();

    if (!question) {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      );
    }

    // 3. Construct prompt
    const planDetails = JSON.stringify(plan, null, 2);

    const contextMessages =
      context.length > 0
        ? `Here is the previous conversation history:\n${context
            .map((q: string) => `- ${q}`)
            .join("\n")}`
        : "";

    const prompt = `
You are an expert Media Planning AI Assistant.
Your role is to help users understand their generated media plan.
Be helpful, insightful, and provide clear explanations.

Here is the media plan that was generated for the user:
${planDetails}

${contextMessages}

The user's new question is:
"${question}"

Please provide a concise and helpful answer based on the media plan and conversation history.
`;

    // 4. Init Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({   model: "gemini-2.0-flash-exp"  // This model works with v1beta API keys
  // or "gemini-1.5-pro" or "gemini-2.0-flash-exp"
 });

    // 5. Generate
    const result = await model.generateContent(prompt);
    const answer = result.response.text();

    // 6. Respond
    return NextResponse.json({
      answer,
      category: "Plan Analysis",
    });
  } catch (err: any) {
    console.error("Gemini API error:", err);
    return NextResponse.json(
      { error: err.message || "Gemini API failed" },
      { status: 500 }
    );
  }
}
