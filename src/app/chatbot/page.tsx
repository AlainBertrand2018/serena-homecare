
'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { getChatResponse } from '@/lib/actions';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bot, Loader2, Send, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type Message = {
  role: 'user' | 'model';
  content: string;
};

const initialHistory: Message[] = [
  { role: 'model', content: 'Hello! How can I help you today?' },
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" disabled={pending}>
      {pending ? <Loader2 className="animate-spin" /> : <Send />}
      <span className="sr-only">Send</span>
    </Button>
  );
}

export default function ChatbotPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const initialState = { history: initialHistory, message: '', errors: {} };
  const [state, dispatch] = useFormState(getChatResponse, initialState);

  useEffect(() => {
    if (state.message === 'success') {
      formRef.current?.reset();
    }
  }, [state.message]);
  
  useEffect(() => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({
            top: scrollAreaRef.current.scrollHeight,
            behavior: 'smooth'
        });
    }
  }, [state.history.length]);


  return (
    <div className="flex justify-center items-center h-[calc(100vh-8rem)] bg-muted/40">
      <Card className="w-full max-w-2xl h-[90%] flex flex-col">
        <CardHeader>
          <div className="flex items-center gap-3">
             <Avatar>
                <AvatarFallback><Bot /></AvatarFallback>
            </Avatar>
            <div>
                <CardTitle>AI Assistant</CardTitle>
                <CardDescription>Ask me about our services, pricing, or careers.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow overflow-hidden">
            <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
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
                            'max-w-xs md:max-w-md rounded-xl p-3',
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
        <CardFooter>
            <form ref={formRef} action={dispatch} className="flex w-full items-center gap-2">
                <Input
                    name="prompt"
                    placeholder="Type your message..."
                    autoComplete='off'
                    disabled={useFormStatus().pending}
                />
                <input type="hidden" name="history" value={JSON.stringify(state.history)} />
                <SubmitButton />
            </form>
        </CardFooter>
      </Card>
    </div>
  );
}
