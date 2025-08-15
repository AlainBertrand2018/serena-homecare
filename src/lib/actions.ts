
"use server";

import { summarizeCareLog } from "@/ai/flows/summarize-care-log";
import { chat } from "@/ai/flows/chatbot";
import { z } from "zod";

const summarySchema = z.object({
  careLog: z.string().min(10, { message: "Le journal de soins doit contenir au moins 10 caractères." }),
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
      message: 'La validation a échoué',
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
    console.error("Erreur de résumé:", error);
    return {
      message: 'Une erreur est survenue lors du résumé. Veuillez réessayer.',
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
  prompt: z.string().min(1, { message: "Le prompt ne peut pas être vide." }),
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
            console.error("Erreur message initial chatbot:", error);
            const errorMessage: Message = { role: 'model', content: "Désolé, j'ai des difficultés à me connecter. Veuillez réessayer plus tard." };
            return {
                history: [errorMessage],
                message: 'Une erreur est survenue.',
                errors: null,
            }
        }
    }


    const validatedFields = chatSchema.safeParse({ prompt, history: historyString });

    if (!validatedFields.success) {
        return {
        ...prevState,
        message: 'La validation a échoué',
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
        console.error("Erreur chatbot:", error);
        const errorMessage: Message = { role: 'model', content: "Désolé, j'ai des difficultés à me connecter en ce moment. Veuillez réessayer plus tard." };
        return {
        history: [...updatedHistory, errorMessage],
        message: 'Une erreur est survenue.',
        errors: null,
        };
    }
}
