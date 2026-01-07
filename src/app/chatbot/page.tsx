
'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { getChatResponse } from '@/lib/actions';
import { useEffect, useRef, useState } from 'react';
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

const initialHistory: Message[] = [
  { role: 'model', content: 'Bonjour! Comment puis-je vous aider aujourd\'hui?' },
];

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

    const initialState = { history: initialHistory, message: '', errors: {} };
    const [state, dispatch] = useFormState(getChatResponse, initialState);

    useEffect(() => {
        if (state.message === 'success') {
        formRef.current?.reset();
        }
    }, [state.message]);
    
    useEffect(() => {
        if (scrollViewportRef.current) {
            scrollViewportRef.current.scrollTop = scrollViewportRef.current.scrollHeight;
        }
    }, [state.history.length]);


    return (
        <Card className="w-full h-full flex flex-col border-0 shadow-none">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarFallback><Bot /></AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle>Assistant IA</CardTitle>
                        <CardDescription>Posez-moi des questions sur nos services, nos tarifs ou nos carrières.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-grow overflow-hidden pr-0">
                <ScrollArea className="h-full pr-4" viewportRef={scrollViewportRef}>
                    <div className="space-y-6">
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
                            <p className="text-sm">{message.content}</p>
                            </div>
                            {message.role === 'user' && (
                            <Avatar className="h-8 w-8">
                                <AvatarFallback><User /></AvatarFallback>
                            </Avatar>
                            )}
                        </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
            <CardFooter className="pt-4">
                <form ref={formRef} action={dispatch} className="flex w-full items-center gap-2">
                    <Input
                        name="prompt"
                        placeholder="Tapez votre message..."
                        autoComplete='off'
                        disabled={useFormStatus().pending}
                    />
                    <input type="hidden" name="history" value={JSON.stringify(state.history)} />
                    <SubmitButton />
                </form>
            </CardFooter>
        </Card>
    )
}


export function ChatbotWidget() {
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
            className="w-[400px] h-[600px] p-0 rounded-lg shadow-2xl mr-4 mb-2"
        >
           <ChatInterface />
        </PopoverContent>
    </Popover>
  );
}

export default ChatbotWidget;
