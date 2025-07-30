
'use client';

import { useActionState, useFormStatus } from 'react-dom';
import { getSummary } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Loader2 } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Summarizing...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" /> Summarize with AI
        </>
      )}
    </Button>
  );
}

export function CareLogSummary({ careLog }: { careLog: string }) {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  
  const initialState = { message: '', summary: '', errors: {} };
  const [state, dispatch] = useActionState(getSummary, initialState);

  useEffect(() => {
    if (state.message === 'success' && state.summary) {
       toast({
        title: "Summary Generated",
        description: "The AI summary has been successfully created.",
      });
    } else if (state.message && state.message !== 'success' && state.message !== 'Validation failed') {
      toast({
        variant: "destructive",
        title: "Summarization Failed",
        description: state.message,
      });
    }
  }, [state, toast]);


  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Original Care Log</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">{careLog}</p>
        </CardContent>
      </Card>
      
      <form ref={formRef} action={dispatch}>
        <input type="hidden" name="careLog" value={careLog} />
        <SubmitButton />
      </form>

      {state.summary && (
        <Card className="bg-accent/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground">{state.summary}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
