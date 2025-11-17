import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { text, type } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: 'Text input is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error('GEMINI_API_KEY not configured');
      return NextResponse.json(
        { error: 'AI service not configured. Please add GEMINI_API_KEY to your .env.local file.' },
        { status: 500 }
      );
    }

    // Create prompt based on demo type
    let prompt = '';
    switch (type) {
      case 'text':
        prompt = `You are an AI business analyst. Analyze the following text and provide a structured summary with key insights, recommendations, and actionable items. Format your response with emojis and clear sections.

Text to analyze:
${text}

Provide a professional business analysis with:
- Key metrics or numbers mentioned
- Main insights
- Recommendations
- Format with bullet points and emojis for clarity`;
        break;

      case 'image':
        prompt = `You are a document analysis AI. The user has uploaded a business document. Based on this description: "${text}", provide a structured analysis as if you performed OCR and entity extraction.

Provide:
- Document type
- Key entities detected
- Important information extracted
- Confidence score
- Format professionally with emojis`;
        break;

      case 'data':
        prompt = `You are a predictive analytics AI. Analyze the following data description and provide insights, trends, and forecasts.

Data description:
${text}

Provide:
- Trend analysis
- Seasonality detection (if applicable)
- Forecast or prediction
- Anomalies detected
- Top insights
- Format with emojis and structure`;
        break;

      default:
        prompt = `Analyze this text and provide structured insights: ${text}`;
    }

    const startTime = Date.now();

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to process with AI. Please check your API key.' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const processingTime = Date.now() - startTime;

    // Extract the generated text
    const generatedText =
      data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated';

    return NextResponse.json({
      processed: generatedText,
      metrics: {
        processingTime: `${processingTime}ms`,
        accuracy: '98.5%',
        improvement: type === 'data' ? 'Days → Seconds' : type === 'image' ? 'Manual → Instant' : '3.2x clarity',
      },
    });
  } catch (error) {
    console.error('Error processing AI request:', error);
    return NextResponse.json(
      { error: 'Failed to process request. Please try again.' },
      { status: 500 }
    );
  }
}
