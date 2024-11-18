'use server';

import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

// Define the cacheable models

type GoogleModelCacheableId = 'models/gemini-1.5-flash-001' | 'models/gemini-1.5-pro-001';
// Function to generate a recipe
export const generateRecipe = async (prompt: string) => {
  try {
    const model: GoogleModelCacheableId = 'models/gemini-1.5-pro-001';

    // Skip cache for small content and generate directly
    const { text } = await generateText({
      model: google(model),
      prompt: prompt,
    });

    console.log('🚀 ~ apiKey:', text);
    return text;
  } catch (error) {
    console.error('Error generating recipe:', error);
    throw new Error('Failed to generate recipe. Please try again later.');
  }
};
