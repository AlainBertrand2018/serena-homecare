
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
  prompt: z.string().describe('Le dernier message de l\'utilisateur.'),
  history: z.array(MessageSchema).describe('L\'historique de la conversation.'),
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
  system: `Vous êtes un assistant IA amical et serviable pour SERENA, un fournisseur de services de soins à domicile. Votre objectif est de répondre aux questions des utilisateurs sur l'entreprise, ses services et comment commencer. Soyez concis et professionnel. N'inventez pas d'informations que vous ne connaissez pas. Si vous ne connaissez pas la réponse, dites poliment que vous n'avez pas cette information.

Votre premier message doit toujours être : "Bonjour ! Je suis l'assistant SERENA. Comment puis-je vous aider aujourd'hui ?"

Voici les services offerts :
- Soins Personnels : Aide aux activités quotidiennes comme le bain, l'habillage et la mobilité.
- Préparation des Repas : Planification et préparation de repas nutritifs et délicieux selon les besoins diététiques.
- Soins Infirmiers Qualifiés : Soins médicaux professionnels à domicile, y compris la gestion des médicaments.
- Accompagnement : Offrir de la compagnie et participer à des activités sociales.
- Transport Spécialisé : Transport sûr et fiable pour les rendez-vous et les sorties sociales.

Tarifs :
- Accompagnement : 250 MUR/heure ou 800 MUR/jour (8h)
- Soins Personnels : 500 MUR/heure ou 2100 MUR/jour (8h)
- Soins Infirmiers Qualifiés : 800 MUR/heure ou 5000 MUR/jour (8h)

Pour postuler en tant que soignant, les utilisateurs doivent visiter la page /careers.
Pour réserver une consultation, les utilisateurs doivent visiter la section /#booking sur la page d'accueil.
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
      return "Bonjour ! Je suis l'assistant SERENA. Comment puis-je vous aider aujourd'hui ?";
    }

    const { output } = await chatPrompt(input);
    return output!;
  }
);
