
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarIcon, Upload } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { cn } from '@/lib/utils';
import { format } from "date-fns";

const totalSteps = 6;

export default function CustomerOnboardingPage() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => (prev < totalSteps ? prev + 1 : prev));
  const prevStep = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));

  return (
    <div className="min-h-screen bg-muted/40 py-12 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Customer Onboarding</CardTitle>
          <CardDescription>
            Step {step} of {totalSteps}: Please fill out the information below.
          </CardDescription>
          <Progress value={(step / totalSteps) * 100} className="mt-4" />
        </CardHeader>
        <CardContent>
          {step === 1 && <Step1 />}
          {step === 2 && <Step2 />}
          {step === 3 && <Step3 />}
          {step === 4 && <Step4 />}
          {step === 5 && <Step5 />}
          {step === 6 && <Step6 />}
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 && (
            <Button variant="outline" onClick={prevStep}>
              Previous
            </Button>
          )}
          <div /> 
          {step < totalSteps && (
            <Button onClick={nextStep}>
              Next
            </Button>
          )}
          {step === totalSteps && (
            <Button>
              Submit Onboarding Form
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

const DatePicker = () => {
    const [date, setDate] = useState<Date>();
    
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}

const Step1 = () => (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold">Customer Identity</h3>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="grid gap-2">
            <Label>Title</Label>
            <Select>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent><SelectItem value="mr">Mr.</SelectItem><SelectItem value="ms">Ms.</SelectItem><SelectItem value="mrs">Mrs.</SelectItem></SelectContent>
            </Select>
        </div>
        <div className="grid gap-2"><Label>First Name</Label><Input /></div>
        <div className="grid gap-2"><Label>Last Name</Label><Input /></div>
        <div className="grid gap-2"><Label>Preferred Name (AKA)</Label><Input /></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="grid gap-2">
            <Label>Gender</Label>
            <Select>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem><SelectItem value="other">Other</SelectItem></SelectContent>
            </Select>
        </div>
        <div className="grid gap-2"><Label>Date of Birth</Label><DatePicker /></div>
        <div className="grid gap-2"><Label>Age</Label><Input disabled placeholder="Auto-calculated" /></div>
        <div className="grid gap-2">
            <Label>Civil Status</Label>
            <Select>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="m">Married</SelectItem><SelectItem value="d">Divorced</SelectItem><SelectItem value="c">Single</SelectItem><SelectItem value="w">Widowed</SelectItem>
                </SelectContent>
            </Select>
        </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid gap-2">
            <Label>Passport-size Photo Upload</Label>
            <div className="flex items-center gap-4">
                <div className="w-24 h-24 bg-muted rounded-md flex items-center justify-center"><Upload className="text-muted-foreground" /></div>
                <Button variant="outline">Choose File</Button>
            </div>
        </div>
        <div className="grid gap-2"><Label>ID / Passport Number</Label><Input /></div>
    </div>
    <div className="grid gap-2"><Label>Address of Service</Label><Textarea /></div>
  </div>
);

const Step2 = () => (
    <div className="space-y-6">
    <h3 className="text-lg font-semibold">Custodian / Guardian Information</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="grid gap-2">
            <Label>Title</Label>
            <Select>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent><SelectItem value="mr">Mr.</SelectItem><SelectItem value="ms">Ms.</SelectItem><SelectItem value="mrs">Mrs.</SelectItem></SelectContent>
            </Select>
        </div>
        <div className="grid gap-2"><Label>First Name</Label><Input /></div>
        <div className="grid gap-2"><Label>Last Name</Label><Input /></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid gap-2">
            <Label>Passport-size Photo Upload</Label>
            <div className="flex items-center gap-4">
                <div className="w-24 h-24 bg-muted rounded-md flex items-center justify-center"><Upload className="text-muted-foreground" /></div>
                <Button variant="outline">Choose File</Button>
            </div>
        </div>
        <div className="grid gap-2"><Label>ID / Passport Number</Label><Input /></div>
    </div>
    <div className="grid gap-2"><Label>Residential Address</Label><Textarea /></div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid gap-2"><Label>Work Phone</Label><Input type="tel" /></div>
        <div className="grid gap-2"><Label>Mobile Phone</Label><Input type="tel" /></div>
    </div>
  </div>
);

const Step3 = () => (
 <div className="space-y-6">
    <h3 className="text-lg font-semibold">Emergency Contacts</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="grid gap-2">
            <Label>Title</Label>
            <Select>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent><SelectItem value="mr">Mr.</SelectItem><SelectItem value="ms">Ms.</SelectItem><SelectItem value="mrs">Mrs.</SelectItem></SelectContent>
            </Select>
        </div>
        <div className="grid gap-2"><Label>First Name</Label><Input /></div>
        <div className="grid gap-2"><Label>Last Name</Label><Input /></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid gap-2">
            <Label>Passport-size Photo Upload</Label>
            <div className="flex items-center gap-4">
                <div className="w-24 h-24 bg-muted rounded-md flex items-center justify-center"><Upload className="text-muted-foreground" /></div>
                <Button variant="outline">Choose File</Button>
            </div>
        </div>
        <div className="grid gap-2"><Label>ID / Passport Number</Label><Input /></div>
    </div>
    <div className="grid gap-2"><Label>Residential Address</Label><Textarea /></div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid gap-2"><Label>GP/ Family Doctor Name</Label><Input /></div>
        <div className="grid gap-2"><Label>GP/ Family Doctor Phone</Label><Input type="tel" /></div>
    </div>
     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid gap-2"><Label>Case Manager/ Social Worker Name</Label><Input /></div>
        <div className="grid gap-2"><Label>Case Manager/ Social Worker Phone</Label><Input type="tel" /></div>
    </div>
  </div>
);

const Step4 = () => (
 <div className="space-y-6">
    <h3 className="text-lg font-semibold">Medical Background</h3>
    <div className="space-y-2">
        <Label>Check all applicable medical conditions:</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2"><Checkbox id="diabetes" /><Label htmlFor="diabetes">Diabetes</Label></div>
            <div className="flex items-center space-x-2"><Checkbox id="hypertension" /><Label htmlFor="hypertension">Hypertension</Label></div>
            <div className="flex items-center space-x-2"><Checkbox id="alzheimer" /><Label htmlFor="alzheimer">Alzheimer</Label></div>
            <div className="flex items-center space-x-2"><Checkbox id="dementia" /><Label htmlFor="dementia">Dementia</Label></div>
            <div className="flex items-center space-x-2"><Checkbox id="stroke" /><Label htmlFor="stroke">Stroke</Label></div>
            <div className="flex items-center space-x-2"><Checkbox id="cancer" /><Label htmlFor="cancer">Cancer</Label></div>
            <div className="flex items-center space-x-2"><Checkbox id="parkinsons" /><Label htmlFor="parkinsons">Parkinson's</Label></div>
            <div className="flex items-center space-x-2"><Checkbox id="arthritis" /><Label htmlFor="arthritis">Arthritis</Label></div>
            <div className="flex items-center space-x-2"><Checkbox id="depression" /><Label htmlFor="depression">Depression</Label></div>
            <div className="flex items-center space-x-2"><Checkbox id="other_condition" /><Label htmlFor="other_condition">Other</Label></div>
        </div>
        <Input placeholder="If other condition(s), please specify which one(s)" />
    </div>
     <div className="space-y-2">
        <div className="flex items-center space-x-2"><Checkbox id="disabilities" /><Label htmlFor="disabilities">Disabilities</Label></div>
        <Input placeholder="If checked, which one(s)?" />
    </div>
     <div className="space-y-2">
        <div className="flex items-center space-x-2"><Checkbox id="allergies" /><Label htmlFor="allergies">Allergies</Label></div>
        <Input placeholder="If checked, which one(s)?" />
    </div>
     <div className="space-y-2">
        <div className="flex items-center space-x-2"><Checkbox id="mental_health" /><Label htmlFor="mental_health">Mental Health Conditions</Label></div>
        <Input placeholder="If checked, which one(s)?" />
    </div>
      <div className="space-y-2">
        <div className="flex items-center space-x-2"><Checkbox id="infection_risk" /><Label htmlFor="infection_risk">Infectious Risk Precautions</Label></div>
        <Input placeholder="If checked, which one(s)?" />
    </div>
    <div className="grid gap-2"><Label>Hospitalisation History</Label><Textarea /></div>
  </div>
);

const Step5 = () => (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold">Medication &amp; Treatments</h3>
    <div className="space-y-2">
        <div className="flex items-center space-x-2"><Checkbox id="on_medication" /><Label htmlFor="on_medication">Currently on Medication</Label></div>
        <Input placeholder="If checked, which one(s)?" />
    </div>
    <div className="grid gap-2"><Label>Medication List & Dosage</Label><Textarea /></div>
    <div className="grid gap-2"><Label>Pharmacy Contact, if any</Label><Input /></div>
    <div className="grid gap-2"><Label>Special Instructions</Label><Textarea /></div>
  </div>
);

const Step6 = () => (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold">Consent &amp; Acknowledgements</h3>
     <div className="space-y-4 p-4 border rounded-md bg-muted/50">
        <h4 className="font-medium">Disclaimer and Consent Agreement</h4>
        <p className="text-sm text-muted-foreground">
            I, the undersigned, hereby declare that all information provided in this onboarding document is true, accurate, and complete to the best of my knowledge. I understand that any false or misleading information may result in the refusal or termination of care services.
        </p>
        <p className="text-sm text-muted-foreground">
            As the client or the legally authorized custodian/guardian, I grant permission to SERENA and its designated caregivers to perform the duties outlined in the care plan. This includes, but is not limited to, providing personal care, administering medication as prescribed, assisting with mobility, and providing transportation for medical appointments or essential errands. I acknowledge that I have discussed the care plan and consent to the services described herein.
        </p>
    </div>
    <div className="flex items-center space-x-2">
      <Checkbox id="acknowledgement" />
      <Label htmlFor="acknowledgement" className="font-medium">
        I have read, understood, and agree to the terms and conditions outlined above.
      </Label>
    </div>
  </div>
);
