'use server';

import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { subDays, subHours } from 'date-fns';

export interface IContent {
  role: 'user' | 'assistant';
  content: { type: 'text'; text: string }[];
}

type GoogleModelCacheableId = 'models/gemini-1.5-flash-001' | 'models/gemini-1.5-pro-001';
export const generateRecipe = async (prompt: string) => {
  try {
    const model: GoogleModelCacheableId = 'models/gemini-1.5-pro-001';

    const { text } = await generateText({
      model: google(model),
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'My name is Nikhil Bansal',
            },
          ],
        },
        {
          role: 'assistant',
          content: [
            {
              type: 'text',
              text: 'Nice to meet you, Nikhil Bansal! 👋 Is there anything I can help you with today? 😊',
            },
          ],
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: prompt,
            },
          ],
        },
      ],
    });

    console.log('🚀 ~ apiKey:', text);
    return text;
  } catch (error) {
    console.error('Error generating recipe:', error);
    throw new Error('Failed to generate recipe. Please try again later.');
  }
};
