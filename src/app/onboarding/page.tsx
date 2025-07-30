
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { LogoWithName } from '@/components/logo';

const formConfig = {
  title: 'Caregiver Onboarding Form',
  sections: [
    {
      title: 'SECTION 1 - CLIENT IDENTIFICATION',
      fields: [
        { type: 'text', label: 'Full Name', name: 'full_name' },
        { type: 'text', label: 'Preferred Name / Pronouns', name: 'preferred_name' },
        { type: 'date', label: 'Date of Birth', name: 'dob' },
        { type: 'text', label: 'Gender Identity', name: 'gender' },
        { type: 'text', label: 'Primary Language(s)', name: 'language' },
        { type: 'text', label: 'Cultural/Religious Considerations', name: 'culture' },
      ],
    },
    {
      title: 'SECTION 2 - CONTACT & EMERGENCY INFORMATION',
      fields: [
        { type: 'text', label: 'Home Address (Service Location)', name: 'address' },
        { type: 'text', label: 'Primary Contact Name & Relationship', name: 'primary_contact' },
        { type: 'tel', label: 'Primary Contact Phone', name: 'primary_phone' },
        { type: 'tel', label: 'Emergency Contact Name & Phone', name: 'emergency_contact' },
        { type: 'text', label: 'GP/Doctor Name & Phone', name: 'doctor' },
        { type: 'text', label: 'Case Manager / Social Worker', name: 'case_manager' },
      ],
    },
    {
      title: 'SECTION 3 - MEDICAL BACKGROUND',
      fields: [
        { type: 'checkbox', label: 'Diabetes', name: 'diabetes' },
        { type: 'checkbox', label: 'Hypertension', name: 'hypertension' },
        { type: 'checkbox', label: 'Dementia', name: 'dementia' },
        { type: 'checkbox', label: 'Stroke', name: 'stroke' },
        { type: 'checkbox', label: 'Cancer', name: 'cancer' },
        { type: 'checkbox', label: "Parkinson's", name: 'parkinsons' },
        { type: 'checkbox', label: 'Arthritis', name: 'arthritis' },
        { type: 'checkbox', label: 'Depression', name: 'depression' },
        { type: 'checkbox', label: 'Other Condition', name: 'other_condition' },
        { type: 'text', label: 'Disabilities', name: 'disabilities' },
        { type: 'text', label: 'Allergies', name: 'allergies' },
        { type: 'text', label: 'Mental Health Conditions', name: 'mental_health' },
        { type: 'text', label: 'Hospitalisation History', name: 'hospital_history' },
        { type: 'text', label: 'Infection Risk Precautions', name: 'infection_precautions' },
      ],
    },
    {
      title: 'SECTION 4 - MEDICATIONS & TREATMENTS',
      fields: [
        { type: 'text', label: 'Is the client currently on medication?', name: 'medication_status' },
        { type: 'textarea', label: 'Medication List & Dosage', name: 'medication_list' },
        { type: 'textarea', label: 'Special Instructions for Medication', name: 'medication_instructions' },
        { type: 'text', label: 'Pharmacy Contact Info', name: 'pharmacy_contact' },
      ],
    },
    {
      title: 'SECTION 5 - CARE PLAN & DAILY ROUTINE',
      fields: [
        { type: 'checkbox', label: 'Personal Hygiene', name: 'hygiene' },
        { type: 'checkbox', label: 'Meal Assistance', name: 'meals' },
        { type: 'checkbox', label: 'Mobility Help', name: 'mobility' },
        { type: 'checkbox', label: 'Companionship', name: 'companionship' },
        { type: 'checkbox', label: 'Wound Care', name: 'wound_care' },
        { type: 'checkbox', label: 'Medication Administration', name: 'meds_admin' },
        { type: 'checkbox', label: 'Other', name: 'other_task' },
        { type: 'textarea', label: 'Specific Tasks to Perform', name: 'specific_tasks' },
        { type: 'textarea', label: 'Morning Routine Instructions', name: 'morning_routine' },
        { type: 'textarea', label: 'Evening Routine Instructions', name: 'evening_routine' },
        { type: 'text', label: 'Preferred Bedtime / Wake Time', name: 'bedtime' },
      ],
    },
  ],
};

const OnboardingField = ({ field }: { field: any }) => {
  const { type, label, name } = field;

  switch (type) {
    case 'checkbox':
      return (
        <div className="flex items-center space-x-2 py-2">
          <Checkbox id={name} name={name} />
          <Label htmlFor={name} className="font-normal">{label}</Label>
        </div>
      );
    case 'textarea':
      return (
        <div className="grid gap-2">
          <Label htmlFor={name}>{label}</Label>
          <Textarea id={name} name={name} />
        </div>
      );
    default:
      return (
        <div className="grid gap-2">
          <Label htmlFor={name}>{label}</Label>
          <Input id={name} name={name} type={type} />
        </div>
      );
  }
};


export default function OnboardingPage() {
    const [step, setStep] = useState(0);
    const totalSteps = formConfig.sections.length;
    const progress = ((step + 1) / totalSteps) * 100;

    const currentSection = formConfig.sections[step];

    const handleNext = () => {
        if (step < totalSteps - 1) {
            setStep(s => s + 1);
        }
    };

    const handlePrev = () => {
        if (step > 0) {
            setStep(s => s - 1);
        }
    };

  return (
    <div className="flex justify-center items-center min-h-screen bg-muted/40 py-12">
        <Card className="w-full max-w-3xl">
        <CardHeader className="text-center">
            <div className="w-full flex justify-center mb-4">
                <LogoWithName />
            </div>
            <CardTitle className="text-2xl">{formConfig.title}</CardTitle>
            <CardDescription>Please complete all sections to finalize your onboarding.</CardDescription>
            <Progress value={progress} className="mt-4" />
        </CardHeader>

        <form>
            <CardContent className="space-y-8 min-h-[450px]">
                <section>
                    <h2 className="text-xl font-semibold mb-4">{currentSection.title}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {currentSection.fields.map(field => (
                            <OnboardingField key={field.name} field={field} />
                        ))}
                    </div>
                </section>
            </CardContent>

            <CardFooter className="flex justify-between">
                {step > 0 ? (
                    <Button type="button" variant="outline" onClick={handlePrev}>
                        <ArrowLeft className="mr-2" /> Previous
                    </Button>
                ) : <div />}

                {step < totalSteps - 1 ? (
                    <Button type="button" onClick={handleNext}>
                        Next <ArrowRight className="ml-2" />
                    </Button>
                ) : (
                    <Button type="submit" asChild>
                         <Link href="/dashboard">Submit Application</Link>
                    </Button>
                )}
            </CardFooter>
        </form>
        </Card>
    </div>
  );
}
