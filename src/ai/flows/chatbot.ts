
'use server';

/**
 * @fileOverview A simple chatbot flow for SERENA.
 *
 * - chat - A function that handles the chat conversation.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MessageSchema = z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
});

const ChatInputSchema = z.object({
  prompt: z.string().describe('The user\'s latest message.'),
  history: z.array(MessageSchema).describe('The conversation history.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

export type ChatOutput = string;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const chatPrompt = ai.definePrompt({
  name: 'chatPrompt',
  input: { schema: ChatInputSchema },
  output: { format: 'text' },
  system: `You are a friendly and helpful AI assistant for SERENA, a home care service provider. Your goal is to answer user questions about the company, its services, and how to get started. Be concise and professional. Do not make up information you don't know. If you don't know the answer, politely say that you don't have that information.

Your first message should always be: "Hello! I'm the SERENA assistant. How can I help you today?"

Here are the services offered:
- Personal Care: Assistance with daily activities like bathing, dressing, and mobility.
- Meal Preparation: Nutritious and delicious meal planning and preparation according to dietary needs.
- Skilled Nursing: Professional medical care at home, including medication management.
- Companion Care: Providing companionship and engagement in social activities.
- Specialized Transportation: Safe and reliable transportation to appointments and social outings.

Pricing:
- Companion Care: MUR250/hour or MUR800/day (8hr)
- Personal Care: MUR500/hour or MUR2100/day (8hr)
- Skilled Nursing: MUR800/hour or MUR5000/day (8hr)

To apply as a caregiver, users should visit the /careers page.
To book a consultation, users should visit the /#booking section on the homepage.
`,
  prompt: `{{#each history}}
{{#if content}}
{{role}}: {{content}}
{{/if}}
{{/each}}
user: {{prompt}}
model: `,
});

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: z.string(),
  },
  async (input) => {
    // If history is empty, it's a new conversation.
    // Return the predefined greeting from the system prompt.
    if (input.history.length === 0) {
      return "Hello! I'm the SERENA assistant. How can I help you today?";
    }

    const { output } = await chatPrompt(input);
    return output!;
  }
);
