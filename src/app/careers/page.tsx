
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const totalSteps = 8;

export default function CaregiverOnboardingPage() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => (prev < totalSteps ? prev + 1 : prev));
  const prevStep = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));

  return (
    <div className="min-h-screen bg-muted/40 py-12 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className='text-3xl'>Caregiver Onboarding Form</CardTitle>
          <CardDescription>
            To be completed by all caregivers prior to first client assignment. 
            <br/>
            Step {step} of {totalSteps}.
          </CardDescription>
          <Progress value={(step / totalSteps) * 100} className="mt-4" />
        </CardHeader>
        <CardContent>
          {step === 1 && <Section1 />}
          {step === 2 && <Section2 />}
          {step === 3 && <Section3 />}
          {step === 4 && <Section4 />}
          {step === 5 && <Section5 />}
          {step === 6 && <Section6 />}
          {step === 7 && <Section7 />}
          {step === 8 && <Section8 />}
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 ? (
            <Button variant="outline" onClick={prevStep}>
              Previous
            </Button>
          ) : <div />}
          
          {step < totalSteps && (
            <Button onClick={nextStep}>
              Next
            </Button>
          )}
          {step === totalSteps && (
            <Button>
              Submit Application
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

const DatePicker = ({label}: {label: string}) => {
    const [date, setDate] = useState<Date>();
    
    return (
        <div className="grid gap-2">
            <Label>{label}</Label>
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
        </div>
    )
}

const YesNoRadio = ({label, id}: {label: string, id: string}) => (
    <div className="space-y-2">
        <Label>{label}</Label>
        <RadioGroup className="flex gap-4">
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id={`${id}-yes`} />
                <Label htmlFor={`${id}-yes`}>Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id={`${id}-no`} />
                <Label htmlFor={`${id}-no`}>No</Label>
            </div>
        </RadioGroup>
    </div>
)

const FileUpload = ({label, id}: {label: string, id: string}) => (
    <div className="grid gap-2">
        <Label htmlFor={id}>{label}</Label>
        <div className="flex items-center gap-2">
            <Input id={id} type="file" className="flex-grow"/>
            <Button variant="outline" size="icon" asChild>
                <div>
                    <Upload className="h-4 w-4"/>
                    <span className="sr-only">Upload</span>
                </div>
            </Button>
        </div>
    </div>
)

const Section1 = () => (
  <div className="space-y-6">
    <h3 className="text-xl font-bold">SECTION 1 – PERSONAL IDENTIFICATION</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FileUpload label="Upload Passport-size Photo" id="passport-photo" />
        <FileUpload label="Upload CV" id="cv-upload" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="grid gap-2"><Label>Full Name</Label><Input /></div>
        <div className="grid gap-2"><Label>Preferred Name / Nickname</Label><Input /></div>
        <DatePicker label="Date of Birth" />
        <div className="grid gap-2">
            <Label>Gender Identity</Label>
            <Select><SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger><SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem><SelectItem value="non-binary">Non-binary</SelectItem><SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem></SelectContent></Select>
        </div>
        <div className="grid gap-2"><Label>Nationality</Label><Input /></div>
        <div className="grid gap-2"><Label>National ID / Passport Number</Label><Input /></div>
    </div>
    <div className="grid gap-2"><Label>Residential Address</Label><Textarea /></div>
     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="grid gap-2"><Label>Phone Number</Label><Input type="tel" /></div>
        <div className="grid gap-2"><Label>Email Address</Label><Input type="email" /></div>
        <div className="grid gap-2"><Label>Preferred Language(s)</Label><Input /></div>
        <div className="grid gap-2"><Label>Emergency Contact Name & Number</Label><Input /></div>
         <div className="grid gap-2">
            <Label>Marital Status</Label>
            <Select><SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger><SelectContent><SelectItem value="single">Single</SelectItem><SelectItem value="married">Married</SelectItem><SelectItem value="divorced">Divorced</SelectItem><SelectItem value="widowed">Widowed</SelectItem></SelectContent></Select>
        </div>
        <div className="grid gap-2"><Label>Next of Kin & Relationship</Label><Input /></div>
    </div>
  </div>
);

const Section2 = () => (
    <div className="space-y-6">
        <h3 className="text-xl font-bold">SECTION 2 – LEGAL & DOCUMENTATION</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <YesNoRadio label="National ID Copy Provided" id="nid-copy" />
            <div className="space-y-2">
                <div className="flex items-center gap-4">
                    <YesNoRadio label="Police Clearance Certificate" id="police-clearance"/>
                    <DatePicker label="Date Issued"/>
                </div>
            </div>
            <div className="space-y-2">
                <Label>Valid Work Permit (if foreign national)</Label>
                 <RadioGroup className="flex gap-4">
                    <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="permit-yes" /><Label htmlFor="permit-yes">Yes</Label></div>
                    <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="permit-no" /><Label htmlFor="permit-no">No</Label></div>
                     <div className="flex items-center space-x-2"><RadioGroupItem value="na" id="permit-na" /><Label htmlFor="permit-na">Not Applicable</Label></div>
                </RadioGroup>
            </div>
        </div>
        <div className="space-y-4 p-4 border rounded-md">
            <h4 className="font-semibold">Bank Account Details for Salary Payment</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="grid gap-2"><Label>Bank Name</Label><Input /></div>
                <div className="grid gap-2"><Label>Account Number</Label><Input /></div>
                <div className="grid gap-2"><Label>Branch Code</Label><Input /></div>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-2"><Label>Social Security Number / NPF Number</Label><Input /></div>
            <div className="grid gap-2"><Label>Tax Identification Number (TIN)</Label><Input /></div>
        </div>
    </div>
);

const Section3 = () => (
    <div className="space-y-6">
        <h3 className="text-xl font-bold">SECTION 3 – QUALIFICATIONS & TRAINING</h3>
        <div className="grid gap-2">
            <Label>Highest Education Level</Label>
            <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2"><Checkbox id="edu_primary" /><Label htmlFor="edu_primary">Primary</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="edu_secondary" /><Label htmlFor="edu_secondary">Secondary</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="edu_tertiary" /><Label htmlFor="edu_tertiary">Tertiary</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="edu_other" /><Label htmlFor="edu_other">Other</Label></div>
                <Input placeholder="If other, please specify" className="max-w-xs"/>
            </div>
        </div>
        <div className="grid gap-2">
            <Label>Professional Qualifications</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center space-x-2"><Checkbox id="qual_hca" /><Label htmlFor="qual_hca">Health Care Assistant Certificate</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="qual_first_aid" /><Label htmlFor="qual_first_aid">First Aid / CPR</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="qual_dementia" /><Label htmlFor="qual_dementia">Elderly/Dementia Care</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="qual_disability" /><Label htmlFor="qual_disability">Disability Support</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="qual_nursing" /><Label htmlFor="qual_nursing">Nursing Diploma / Degree</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="qual_other" /><Label htmlFor="qual_other">Other</Label></div>
            </div>
            <Input placeholder="If other, please specify"/>
        </div>
         <div className="grid gap-2">
            <Label>Languages Spoken</Label>
            <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2"><Checkbox id="lang_en" /><Label htmlFor="lang_en">English</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="lang_fr" /><Label htmlFor="lang_fr">French</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="lang_cr" /><Label htmlFor="lang_cr">Creole</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="lang_other" /><Label htmlFor="lang_other">Other</Label></div>
                <Input placeholder="If other, please specify" className="max-w-xs"/>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            <DatePicker label="Date of Last Training / Certification"/>
            <YesNoRadio label="Willing to Attend Ongoing Training?" id="ongoing-training"/>
        </div>
    </div>
);


const Section4 = () => (
    <div className="space-y-6">
        <h3 className="text-xl font-bold">SECTION 4 – HEALTH & SAFETY</h3>
        <div className="grid gap-2">
            <YesNoRadio label="Do you have any current medical conditions?" id="med-conditions"/>
            <Input placeholder="If yes, please specify"/>
        </div>
        <YesNoRadio label="Are you physically able to lift and assist clients?" id="physical-ability"/>
         <div className="grid gap-2">
            <YesNoRadio label="Do you have any allergies or restrictions?" id="allergies"/>
            <Input placeholder="If yes, please specify"/>
        </div>
        <div className="grid gap-2">
            <Label>COVID-19 Vaccination Status</Label>
             <RadioGroup className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2"><RadioGroupItem value="full" id="covid_full" /><Label htmlFor="covid_full">Fully Vaccinated</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="partial" id="covid_partial" /><Label htmlFor="covid_partial">Partially</Label></div>
                 <div className="flex items-center space-x-2"><RadioGroupItem value="none" id="covid_none" /><Label htmlFor="covid_none">Not Vaccinated</Label></div>
            </RadioGroup>
        </div>
        <div className="grid gap-2"><Label>Additional Vaccinations (e.g., Hepatitis B, TB)</Label><Input /></div>
        <div className="grid gap-2"><Label>Health Insurance Details (if applicable)</Label><Input /></div>
    </div>
);

const Section5 = () => (
    <div className="space-y-6">
        <h3 className="text-xl font-bold">SECTION 5 – AVAILABILITY & ASSIGNMENTS</h3>
        <div className="grid gap-2">
            <Label>Preferred Work Schedule</Label>
            <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2"><Checkbox id="sched_full" /><Label htmlFor="sched_full">Full-Time</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="sched_part" /><Label htmlFor="sched_part">Part-Time</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="sched_weekends" /><Label htmlFor="sched_weekends">Weekends</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="sched_overnight" /><Label htmlFor="sched_overnight">Overnight</Label></div>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DatePicker label="Availability Start Date" />
            <div className="grid gap-2"><Label>Preferred Work Area / Region</Label><Input /></div>
        </div>
        <div className="grid gap-2">
            <Label>Are you willing to work with:</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center space-x-2"><Checkbox id="work_elderly" /><Label htmlFor="work_elderly">Elderly</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="work_children" /><Label htmlFor="work_children">Children</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="work_disabilities" /><Label htmlFor="work_disabilities">Persons with Disabilities</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="work_terminal" /><Label htmlFor="work_terminal">Terminally Ill Patients</Label></div>
            </div>
        </div>
        <YesNoRadio label="Can you provide live-in care if needed?" id="live-in"/>
        <YesNoRadio label="Do you have a valid driver’s license?" id="drivers-license"/>
    </div>
);

const Section6 = () => (
    <div className="space-y-6">
        <h3 className="text-xl font-bold">SECTION 6 – EXPERIENCE & REFERENCES</h3>
        <div className="grid gap-2">
            <Label>Years of Experience in Caregiving</Label>
            <Input type="number" />
        </div>
        <div className="space-y-4 p-4 border rounded-md">
            <h4 className="font-semibold">Previous Employers / Care Agencies</h4>
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="grid gap-2"><Label>Name</Label><Input /></div>
                    <div className="grid gap-2"><Label>Duration</Label><Input /></div>
                    <div className="grid gap-2"><Label>Role</Label><Input /></div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="grid gap-2"><Label>Name</Label><Input /></div>
                    <div className="grid gap-2"><Label>Duration</Label><Input /></div>
                    <div className="grid gap-2"><Label>Role</Label><Input /></div>
                </div>
            </div>
        </div>
        <div className="space-y-4 p-4 border rounded-md">
            <h4 className="font-semibold">References</h4>
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="grid gap-2"><Label>Reference 1: Name</Label><Input /></div>
                    <div className="grid gap-2"><Label>Contact</Label><Input /></div>
                    <div className="grid gap-2"><Label>Relationship</Label><Input /></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="grid gap-2"><Label>Reference 2: Name</Label><Input /></div>
                    <div className="grid gap-2"><Label>Contact</Label><Input /></div>
                    <div className="grid gap-2"><Label>Relationship</Label><Input /></div>
                </div>
            </div>
        </div>
    </div>
);

const Section7 = () => (
  <div className="space-y-6">
    <h3 className="text-xl font-bold">SECTION 7 – PROFESSIONAL CONDUCT</h3>
    <div className="space-y-2">
        <Label>Are you comfortable with the following duties (tick all that apply):</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <div className="flex items-center space-x-2"><Checkbox id="duty_hygiene" /><Label htmlFor="duty_hygiene">Personal Hygiene</Label></div>
            <div className="flex items-center space-x-2"><Checkbox id="duty_meals" /><Label htmlFor="duty_meals">Meal Preparation & Feeding</Label></div>
            <div className="flex items-center space-x-2"><Checkbox id="duty_meds" /><Label htmlFor="duty_meds">Medication Reminders</Label></div>
            <div className="flex items-center space-x-2"><Checkbox id="duty_housekeeping" /><Label htmlFor="duty_housekeeping">Housekeeping / Laundry</Label></div>
            <div className="flex items-center space-x-2"><Checkbox id="duty_companion" /><Label htmlFor="duty_companion">Companionship</Label></div>
            <div className="flex items-center space-x-2"><Checkbox id="duty_transfer" /><Label htmlFor="duty_transfer">Transfers / Mobility Assistance</Label></div>
        </div>
    </div>
    <YesNoRadio label="Do you understand the importance of confidentiality and client rights?" id="confidentiality"/>
    <div className="grid gap-2">
        <YesNoRadio label="Have you ever been investigated for abuse, neglect, or misconduct?" id="misconduct"/>
        <Textarea placeholder="If yes, please explain"/>
    </div>
     <YesNoRadio label="Do you consent to background verification and random checks?" id="background-check"/>
  </div>
);

const Section8 = () => (
    <div className="space-y-6">
        <h3 className="text-xl font-bold">SECTION 8 – DECLARATION & SIGNATURE</h3>
        <div className="p-4 border rounded-md bg-muted/50 space-y-2">
            <p className="text-sm text-muted-foreground">
                I certify that the information provided is true and correct to the best of my knowledge. I understand that providing false information may result in dismissal or legal action.
            </p>
        </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-2">
                <Label>Signature</Label>
                <div className="p-4 border bg-background rounded-md h-24">
                    {/* Placeholder for a signature pad component */}
                </div>
            </div>
            <DatePicker label="Date"/>
        </div>
        <div className="grid gap-2">
            <Label>Witnessed By (HR/Admin)</Label>
            <Input />
        </div>
    </div>
);

    
    