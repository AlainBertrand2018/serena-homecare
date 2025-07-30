
"use server";

import { summarizeCareLog } from "@/ai/flows/summarize-care-log";
import { chat } from "@/ai/flows/chatbot";
import { z } from "zod";

const summarySchema = z.object({
  careLog: z.string().min(10, { message: "Care log must be at least 10 characters." }),
});

export async function getSummary(prevState: any, formData: FormData) {
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
      errors: {},
    };
  } catch (error) {
    return {
      message: 'An error occurred while summarizing.',
      summary: '',
      errors: {},
    };
  }
}

const chatSchema = z.object({
  prompt: z.string().min(1, { message: "Prompt cannot be empty." }),
  history: z.string(), // JSON string of history
});

export async function getChatResponse(prevState: any, formData: FormData) {
  const validatedFields = chatSchema.safeParse({
    prompt: formData.get('prompt'),
    history: formData.get('history'),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      message: 'Validation failed',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const history = JSON.parse(validatedFields.data.history);

  const newMessage = { role: 'user', content: validatedFields.data.prompt };
  const updatedHistory = [...history, newMessage];

  try {
    const result = await chat({
      prompt: validatedFields.data.prompt,
      history,
    });
    
    const aiMessage = { role: 'model', content: result };
    
    return {
      history: [...updatedHistory, aiMessage],
      message: 'success',
      errors: {},
    };

  } catch (error) {
     const errorMessage = { role: 'model', content: "Sorry, I'm having trouble connecting. Please try again later." };
    return {
      history: [...updatedHistory, errorMessage],
      message: 'An error occurred.',
      errors: {},
    };
  }
}
