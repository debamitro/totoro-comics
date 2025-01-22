import { NextResponse } from 'next/server';
import Replicate from 'replicate';

export const maxDuration = 30; // Set max duration to 30 seconds

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST() {
  try {
    const output = await replicate.run(
      "debamitro/flux-totoro:7c4663428fa999db5402e3f8bab9786ccf9d1cd00ce7a534d19ff0709acff824",
      {
        input: {
          prompt: "TOTORO is hacking on a computer at MIT, using hands to type"
        }
      }
    );

    if (!output || !Array.isArray(output) || output.length === 0) {
      throw new Error("Invalid output format");
    }
    
    const stream = output[0];
    
    // Convert stream to blob
    const response = new Response(stream);
    const blob = await response.blob();
    
    // Convert blob to base64
    const arrayBuffer = await blob.arrayBuffer();
    const base64String = Buffer.from(arrayBuffer).toString('base64');
    const dataUrl = `data:image/png;base64,${base64String}`;

    return NextResponse.json({ imageUrl: dataUrl });
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
} 