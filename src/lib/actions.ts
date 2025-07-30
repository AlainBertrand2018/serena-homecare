
"use server";

import { summarizeCareLog } from "@/ai/flows/summarize-care-log";
import { chat } from "@/ai/flows/chatbot";
import { z } from "zod";

const summarySchema = z.object({
  careLog: z.string().min(10, { message: "Care log must be at least 10 characters." }),
});

type SummaryState = {
  message: string;
  summary: string;
  errors: { careLog?: string[] } | null;
}

export async function getSummary(prevState: SummaryState, formData: FormData): Promise<SummaryState> {
  const validatedFields = summarySchema.safeParse({
    careLog: formData.get('careLog'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Validation failed',
      errors: validatedFields.error.flatten().fieldErrors,
      summary: '',
    };
  }
  
  try {
    const result = await summarizeCareLog({ careLog: validatedFields.data.careLog });
    return {
      message: 'success',
      summary: result.summary,
      errors: null,
    };
  } catch (error) {
    console.error("Summarization error:", error);
    return {
      message: 'An error occurred during summarization. Please try again.',
      summary: '',
      errors: null,
    };
  }
}

type Message = {
  role: 'user' | 'model';
  content: string;
};

const chatSchema = z.object({
  prompt: z.string().min(1, { message: "Prompt cannot be empty." }),
  history: z.string(), // JSON string of history
});

export type ChatState = {
    history: Message[];
    message: string;
    errors: { prompt?: string[] } | null;
}

export async function getChatResponse(prevState: ChatState, formData: FormData): Promise<ChatState> {
    const prompt = formData.get('prompt') as string;
    const historyString = formData.get('history') as string;

    const history = historyString ? (JSON.parse(historyString) as Message[]) : [];
    
    // Handle initial state
    if (prompt === '' && history.length === 0) {
        try {
            const result = await chat({ prompt: '', history: [] });
            const aiMessage: Message = { role: 'model', content: result };
            return {
                history: [aiMessage],
                message: 'success',
                errors: null,
            };
        } catch (error) {
            console.error("Chatbot initial message error:", error);
            const errorMessage: Message = { role: 'model', content: "Sorry, I'm having trouble connecting. Please try again later." };
            return {
                history: [errorMessage],
                message: 'An error occurred.',
                errors: null,
            }
        }
    }


    const validatedFields = chatSchema.safeParse({ prompt, history: historyString });

    if (!validatedFields.success) {
        return {
        ...prevState,
        message: 'Validation failed',
        errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const newMessage: Message = { role: 'user', content: validatedFields.data.prompt };
    const updatedHistory = [...history, newMessage];

    try {
        const result = await chat({
        prompt: validatedFields.data.prompt,
        history,
        });
        
        const aiMessage: Message = { role: 'model', content: result };
        
        return {
        history: [...updatedHistory, aiMessage],
        message: 'success',
        errors: null,
        };

    } catch (error) {
        console.error("Chatbot error:", error);
        const errorMessage: Message = { role: 'model', content: "Sorry, I'm having trouble connecting at the moment. Please try again later." };
        return {
        history: [...updatedHistory, errorMessage],
        message: 'An error occurred.',
        errors: null,
        };
    }
}
