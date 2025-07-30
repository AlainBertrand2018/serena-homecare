"use server";

import { summarizeCareLog } from "@/ai/flows/summarize-care-log";
import { z } from "zod";

const schema = z.object({
  careLog: z.string().min(10, { message: "Care log must be at least 10 characters." }),
});

export async function getSummary(prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
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
