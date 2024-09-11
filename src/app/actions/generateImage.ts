'use server'

import * as fal from "@fal-ai/serverless-client";

interface FluxResult {
  images: { url: string }[];
}

export async function generateImage(prompt: string) {
  try {
    const result = await fal.subscribe("fal-ai/flux/dev", {
      input: {
        prompt: prompt,
        num_inference_steps: 28,
        guidance_scale: 3.5,
        num_images: 1,
        enable_safety_checker: true,
      },
    }) as FluxResult;

    return result.images[0].url;
  } catch (error) {
    console.error("Error generating image:", error);
    throw new Error("Failed to generate image");
  }
}