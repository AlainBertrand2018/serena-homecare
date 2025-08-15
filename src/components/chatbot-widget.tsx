
'use client';

import { useActionState, useEffect, useRef, useState, useTransition } from 'react';
import { useFormStatus } from 'react-dom';
import { getChatResponse, ChatState } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot, Loader2, Send, User, MessageSquare, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type Message = {
  role: 'user' | 'model';
  content: string;
};

const initialChatState: ChatState = { history: [], message: '', errors: null };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" disabled={pending}>
      {pending ? <Loader2 className="animate-spin" /> : <Send />}
      <span className="sr-only">Envoyer</span>
    </Button>
  );
}

function ChatInterface() {
    const formRef = useRef<HTMLFormElement>(null);
    const scrollViewportRef = useRef<HTMLDivElement>(null);
    const [state, dispatch, isPending] = useActionState(getChatResponse, initialChatState);

    // Fetch initial message when component mounts
    useEffect(() => {
        if (state.history.length === 0) {
            const initialFormData = new FormData();
            initialFormData.append('prompt', '');
            initialFormData.append('history', '[]');
            // The useActionState dispatch is a server action.
            // It's meant to be called from form actions or startTransition.
            // We can wrap it in a transition to satisfy React's requirement.
            startTransition(() => {
                dispatch(initialFormData);
            });
        }
    }, [dispatch, state.history.length]);
    
    const [_, startTransition] = useTransition();

    useEffect(() => {
        if (scrollViewportRef.current) {
            scrollViewportRef.current.scrollTop = scrollViewportRef.current.scrollHeight;
        }
    }, [state.history]);
    
    useEffect(() => {
        // Reset form when the model has successfully responded
        if (!isPending && state.message === 'success' && state.history.at(-1)?.role === 'model') {
            formRef.current?.reset();
        }
    }, [state, isPending]);

    return (
        <Card className="w-full h-full flex flex-col border-0 shadow-none">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarFallback><Bot /></AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle>Assistant IA</CardTitle>
                        <CardDescription>Posez-moi des questions sur nos services et tarifs.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-grow overflow-hidden pr-0">
                <ScrollArea className="h-full pr-4" viewportRef={scrollViewportRef}>
                    <div className="space-y-6">
                         {state.history.length === 0 && (
                             <div className="flex items-start gap-3 justify-start">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback><Bot /></AvatarFallback>
                                </Avatar>
                                <div className="bg-muted rounded-xl p-3 flex items-center">
                                    <Loader2 className="animate-spin h-4 w-4" />
                                </div>
                            </div>
                        )}
                        {state.history.map((message, index) => (
                        <div
                            key={index}
                            className={cn(
                            'flex items-start gap-3',
                            message.role === 'user' ? 'justify-end' : 'justify-start'
                            )}
                        >
                            {message.role === 'model' && (
                            <Avatar className="h-8 w-8">
                                <AvatarFallback><Bot /></AvatarFallback>
                            </Avatar>
                            )}
                            <div
                            className={cn(
                                'max-w-xs md:max-w-sm rounded-xl p-3',
                                message.role === 'user'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            )}
                            >
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            </div>
                            {message.role === 'user' && (
                            <Avatar className="h-8 w-8">
                                <AvatarFallback><User /></AvatarFallback>
                            </Avatar>
                            )}
                        </div>
                        ))}
                         {isPending && state.history.at(-1)?.role === 'user' && (
                           <div className="flex items-start gap-3 justify-start">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback><Bot /></AvatarFallback>
                                </Avatar>
                                <div className="bg-muted rounded-xl p-3 flex items-center">
                                    <Loader2 className="animate-spin h-4 w-4" />
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </CardContent>
            <CardFooter className="pt-4">
                 <form 
                    ref={formRef} 
                    action={dispatch} 
                    className="flex w-full items-center gap-2"
                >
                    <Input
                        name="prompt"
                        placeholder="Écrivez votre message..."
                        autoComplete='off'
                        disabled={isPending || state.history.length === 0}
                    />
                    <input type="hidden" name="history" value={JSON.stringify(state.history)} />
                    <SubmitButton />
                </form>
            </CardFooter>
        </Card>
    )
}


function ChatbotWidgetClient() {
    const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button
                variant="default"
                size="icon"
                className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
            >
                {open ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
                <span className="sr-only">Ouvrir le Chat</span>
            </Button>
        </PopoverTrigger>
        <PopoverContent 
            side="top" 
            align="end" 
            className="w-[calc(100vw-2rem)] sm:w-[400px] h-[600px] p-0 rounded-lg shadow-2xl mb-2"
        >
           {open && <ChatInterface />}
        </PopoverContent>
    </Popover>
  );
}

export function ChatbotWidget() {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    return isClient ? <ChatbotWidgetClient /> : null;
}
