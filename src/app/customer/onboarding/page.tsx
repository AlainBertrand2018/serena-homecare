
'use client';

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LogoWithName } from "@/components/logo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Upload } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format, differenceInYears } from 'date-fns';
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";


export default function CustomerOnboardingPage() {
    const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>();
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const age = dateOfBirth ? differenceInYears(new Date(), dateOfBirth) : null;
    
    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

  return (
    <div className="flex justify-center items-center min-h-screen bg-muted/40 py-12">
        <Card className="w-full max-w-4xl">
            <CardHeader className="text-center">
                <div className="w-full flex justify-center mb-4">
                    <LogoWithName />
                </div>
                <CardTitle className="text-2xl">Welcome to SimpleShift</CardTitle>
                <CardDescription>
                    Please fill out your profile to help us provide the best care.
                </CardDescription>
            </CardHeader>
            <form>
                <CardContent className="space-y-8">
                    {/* Civilities Section */}
                    <div className="space-y-4 p-4 border rounded-lg">
                        <h3 className="font-semibold text-lg">1. Personal Information</h3>
                         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="grid gap-2 md:col-span-1">
                                <Label>Passport-size Photo</Label>
                                <div className="flex items-center gap-4">
                                     <div className="w-24 h-24 rounded-lg bg-muted flex items-center justify-center">
                                        {photoPreview ? (
                                            <Image src={photoPreview} alt="Customer photo" width={96} height={96} className="rounded-lg object-cover w-full h-full" />
                                        ) : (
                                            <span className="text-xs text-muted-foreground text-center">Photo Preview</span>
                                        )}
                                    </div>
                                    <div className="grid gap-1.5">
                                        <Input id="photo-upload" type="file" className="sr-only" onChange={handlePhotoChange} accept="image/*" />
                                        <Label htmlFor="photo-upload" className="cursor-pointer">
                                            <div className="flex items-center gap-2 p-2 border-2 border-dashed rounded-lg border-border/50 hover:bg-muted">
                                                <Upload className="h-5 w-5 text-muted-foreground" />
                                                <span className="text-sm text-muted-foreground">Upload</span>
                                            </div>
                                        </Label>
                                    </div>
                                </div>
                            </div>
                            <div className="grid gap-2 md:col-span-3">
                                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="title">Title</Label>
                                        <Select>
                                            <SelectTrigger id="title">
                                                <SelectValue placeholder="Select title" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="mr">Mr.</SelectItem>
                                                <SelectItem value="ms">Ms.</SelectItem>
                                                <SelectItem value="mrs">Mrs.</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="first-name">First Name</Label>
                                        <Input id="first-name" placeholder="John" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="last-name">Last Name</Label>
                                        <Input id="last-name" placeholder="Doe" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="dob">Date of Birth</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "justify-start text-left font-normal",
                                                    !dateOfBirth && "text-muted-foreground"
                                                )}
                                                >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {dateOfBirth ? format(dateOfBirth, "PPP") : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                mode="single"
                                                selected={dateOfBirth}
                                                onSelect={setDateOfBirth}
                                                initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        {age !== null && <p className="text-sm text-muted-foreground">Age: {age}</p>}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="civil-status">Civil Status</Label>
                                        <Select>
                                            <SelectTrigger id="civil-status">
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="m">Married</SelectItem>
                                                <SelectItem value="c">Single</SelectItem>
                                                <SelectItem value="d">Divorced</SelectItem>
                                                <SelectItem value="w">Widowed</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Custodian Party Section */}
                    <div className="space-y-4 p-4 border rounded-lg">
                        <h3 className="font-semibold text-lg">2. Custodian Party</h3>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                             <div className="grid gap-2">
                                <Label htmlFor="custodian-title">Title</Label>
                                <Select>
                                    <SelectTrigger id="custodian-title">
                                        <SelectValue placeholder="Select title" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="mr">Mr.</SelectItem>
                                        <SelectItem value="ms">Ms.</SelectItem>
                                        <SelectItem value="mrs">Mrs.</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="custodian-first-name">First Name</Label>
                                <Input id="custodian-first-name" placeholder="Jane" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="custodian-last-name">Last Name</Label>
                                <Input id="custodian-last-name" placeholder="Smith" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="grid gap-2 md:col-span-1">
                                <Label htmlFor="custodian-address">Address</Label>
                                <Input id="custodian-address" placeholder="456 Park Ave, Anytown, USA" />
                            </div>
                             <div className="grid gap-2">
                                <Label htmlFor="custodian-mobile">Mobile Phone</Label>
                                <Input id="custodian-mobile" type="tel" placeholder="555-987-6543" />
                            </div>
                             <div className="grid gap-2">
                                <Label htmlFor="custodian-work">Work Phone</Label>
                                <Input id="custodian-work" type="tel" placeholder="555-111-2222" />
                            </div>
                        </div>
                    </div>
                    
                    {/* Emergency Contact Section */}
                    <div className="space-y-4 p-4 border rounded-lg">
                        <h3 className="font-semibold text-lg">3. Emergency Contact</h3>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="ec-title">Title</Label>
                                <Select>
                                    <SelectTrigger id="ec-title">
                                        <SelectValue placeholder="Select title" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="mr">Mr.</SelectItem>
                                        <SelectItem value="ms">Ms.</SelectItem>
                                        <SelectItem value="mrs">Mrs.</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="ec-first-name">First Name</Label>
                                <Input id="ec-first-name" placeholder="Peter" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="ec-last-name">Last Name</Label>
                                <Input id="ec-last-name" placeholder="Jones" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                             <div className="grid gap-2">
                                <Label htmlFor="ec-relationship">Relationship</Label>
                                <Input id="ec-relationship" placeholder="Neighbor" />
                            </div>
                             <div className="grid gap-2">
                                <Label htmlFor="ec-mobile">Mobile Phone</Label>
                                <Input id="ec-mobile" type="tel" placeholder="555-333-4444" />
                            </div>
                             <div className="grid gap-2">
                                <Label htmlFor="ec-work">Work Phone</Label>
                                <Input id="ec-work" type="tel" placeholder="555-555-6666" />
                            </div>
                        </div>
                         <div className="grid gap-2">
                            <Label htmlFor="ec-address">Address</Label>
                            <Input id="ec-address" placeholder="789 River Rd, Anytown, USA" />
                        </div>
                    </div>

                    {/* Medicals Section */}
                    <div className="space-y-4 p-4 border rounded-lg">
                        <h3 className="font-semibold text-lg">4. Medical Information</h3>
                        <div className="grid gap-2">
                            <Label htmlFor="family-practitioner">Family Practitioner</Label>
                            <Input id="family-practitioner" placeholder="Dr. Emily Carter" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="conditions">Medical Conditions</Label>
                                <Input id="conditions" placeholder="Hypertension, Diabetes" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="allergies">Known Allergies</Label>
                                <Input id="allergies" placeholder="Peanuts, Shellfish" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="med-others">Others</Label>
                                <Input id="med-others" placeholder="e.g., Pacemaker" />
                            </div>
                        </div>
                         <div className="grid gap-2">
                            <Label htmlFor="medications">Current Medications</Label>
                            <Textarea id="medications" placeholder="Please list medications, dosages, and frequency." />
                        </div>
                    </div>

                     {/* Care Plan Section */}
                    <div className="space-y-2 p-4 border rounded-lg">
                        <h3 className="font-semibold text-lg">5. Care Plan</h3>
                        <Label htmlFor="care-plan">Preferences & Needs</Label>
                        <Textarea id="care-plan" rows={4} placeholder="Tell us about daily routines, preferences, and any specific needs..." />
                    </div>

                     {/* Acknowledgement Section */}
                    <div className="space-y-2 p-4 border rounded-lg">
                         <h3 className="font-semibold text-lg">6. Acknowledgement</h3>
                        <div className="items-top flex space-x-2">
                            <Checkbox id="terms1" />
                            <div className="grid gap-1.5 leading-none">
                                <label
                                htmlFor="terms1"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                Accept terms and conditions
                                </label>
                                <p className="text-sm text-muted-foreground">
                                   I hereby declare that the information provided is truthful and complete to the best of my knowledge.
                                </p>
                            </div>
                        </div>
                    </div>

                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full" size="lg" asChild>
                        <Link href="/customer/dashboard">Save Profile</Link>
                    </Button>
                </CardFooter>
            </form>
        </Card>
    </div>
  );
}
