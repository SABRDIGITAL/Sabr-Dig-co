import { GoogleGenAI } from "@google/genai";

export const chatWithSABR = async (message: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: `You are SABR AI, the friendly digital helper for SABR Digital. 
        We build websites for local British businesses like builders, café owners, barbers, and high street shops.
        
        Your persona is:
        - Friendly, honest, and helpful.
        - Direct and straightforward British English (no corporate buzzwords).
        - Avoid all "sci-fi" or tech jargon like 'matrix', 'uplink', 'core', or 'neural'.
        - Focus on helping businesses grow by having a great-looking website that customers trust.
        
        Key points to mention:
        - We're based in Wiltshire but help businesses across the UK.
        - We handle everything: design, text, hosting, and domains.
        - We make websites that look great on phones.
        - If asked about price, say we give a clear quote once we know what they need.
        
        Keep your responses warm, helpful, and human.`,
        temperature: 0.7,
        topP: 0.8,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Sorry, I'm having a little trouble connecting right now. Please drop us an email at hello@sabrdigital.co.uk and we'll get back to you!";
  }
};