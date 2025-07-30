'use server';

/**
 * @fileOverview Summarizes care logs using an LLM.
 *
 * - summarizeCareLog - A function that summarizes the care log.
 * - SummarizeCareLogInput - The input type for the summarizeCareLog function.
 * - SummarizeCareLogOutput - The return type for the summarizeCareLog function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeCareLogInputSchema = z.object({
  careLog: z.string().describe('The care log to summarize.'),
});

export type SummarizeCareLogInput = z.infer<typeof SummarizeCareLogInputSchema>;

const SummarizeCareLogOutputSchema = z.object({
  summary: z.string().describe('The summarized care log.'),
});

export type SummarizeCareLogOutput = z.infer<typeof SummarizeCareLogOutputSchema>;

export async function summarizeCareLog(input: SummarizeCareLogInput): Promise<SummarizeCareLogOutput> {
  return summarizeCareLogFlow(input);
}

const summarizeCareLogPrompt = ai.definePrompt({
  name: 'summarizeCareLogPrompt',
  input: {schema: SummarizeCareLogInputSchema},
  output: {schema: SummarizeCareLogOutputSchema},
  prompt: `You are an experienced caregiver summarizing care logs.

  Please summarize the following care log, extracting the key activities and observations:

  Care Log:
  {{careLog}}`,
});

const summarizeCareLogFlow = ai.defineFlow(
  {
    name: 'summarizeCareLogFlow',
    inputSchema: SummarizeCareLogInputSchema,
    outputSchema: SummarizeCareLogOutputSchema,
  },
  async input => {
    const {output} = await summarizeCareLogPrompt(input);
    return output!;
  }
);
