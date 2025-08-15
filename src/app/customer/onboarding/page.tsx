
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
          <CardTitle>Intégration du Client</CardTitle>
          <CardDescription>
            Étape {step} sur {totalSteps}: Veuillez remplir les informations ci-dessous.
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
              Précédent
            </Button>
          )}
          <div /> 
          {step < totalSteps && (
            <Button onClick={nextStep}>
              Suivant
            </Button>
          )}
          {step === totalSteps && (
            <Button>
              Soumettre le Formulaire
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
                    {date ? format(date, "PPP") : <span>Choisir une date</span>}
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
    <h3 className="text-lg font-semibold">Identité du Client</h3>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="grid gap-2">
            <Label>Titre</Label>
            <Select>
                <SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                <SelectContent><SelectItem value="mr">M.</SelectItem><SelectItem value="ms">Mme</SelectItem><SelectItem value="mrs">Mlle</SelectItem></SelectContent>
            </Select>
        </div>
        <div className="grid gap-2"><Label>Prénom</Label><Input /></div>
        <div className="grid gap-2"><Label>Nom</Label><Input /></div>
        <div className="grid gap-2"><Label>Nom d'usage</Label><Input /></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="grid gap-2">
            <Label>Genre</Label>
            <Select>
                <SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                <SelectContent><SelectItem value="male">Homme</SelectItem><SelectItem value="female">Femme</SelectItem><SelectItem value="other">Autre</SelectItem></SelectContent>
            </Select>
        </div>
        <div className="grid gap-2"><Label>Date de Naissance</Label><DatePicker /></div>
        <div className="grid gap-2"><Label>Âge</Label><Input disabled placeholder="Auto-calculé" /></div>
        <div className="grid gap-2">
            <Label>État Civil</Label>
            <Select>
                <SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="m">Marié(e)</SelectItem><SelectItem value="d">Divorcé(e)</SelectItem><SelectItem value="c">Célibataire</SelectItem><SelectItem value="w">Veuf/Veuve</SelectItem>
                </SelectContent>
            </Select>
        </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid gap-2">
            <Label>Télécharger photo format passeport</Label>
            <div className="flex items-center gap-4">
                <div className="w-24 h-24 bg-muted rounded-md flex items-center justify-center"><Upload className="text-muted-foreground" /></div>
                <Button variant="outline">Choisir Fichier</Button>
            </div>
        </div>
        <div className="grid gap-2"><Label>Numéro d'Identité / Passeport</Label><Input /></div>
    </div>
    <div className="grid gap-2"><Label>Adresse du Service</Label><Textarea /></div>
  </div>
);

const Step2 = () => (
    <div className="space-y-6">
    <h3 className="text-lg font-semibold">Informations du Tuteur / Gardien</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="grid gap-2">
            <Label>Titre</Label>
            <Select>
                <SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                <SelectContent><SelectItem value="mr">M.</SelectItem><SelectItem value="ms">Mme</SelectItem><SelectItem value="mrs">Mlle</SelectItem></SelectContent>
            </Select>
        </div>
        <div className="grid gap-2"><Label>Prénom</Label><Input /></div>
        <div className="grid gap-2"><Label>Nom</Label><Input /></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid gap-2">
            <Label>Télécharger photo format passeport</Label>
            <div className="flex items-center gap-4">
                <div className="w-24 h-24 bg-muted rounded-md flex items-center justify-center"><Upload className="text-muted-foreground" /></div>
                <Button variant="outline">Choisir Fichier</Button>
            </div>
        </div>
        <div className="grid gap-2"><Label>Numéro d'Identité / Passeport</Label><Input /></div>
    </div>
    <div className="grid gap-2"><Label>Adresse Résidentielle</Label><Textarea /></div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid gap-2"><Label>Téléphone Professionnel</Label><Input type="tel" /></div>
        <div className="grid gap-2"><Label>Téléphone Portable</Label><Input type="tel" /></div>
    </div>
  </div>
);

const Step3 = () => (
 <div className="space-y-6">
    <h3 className="text-lg font-semibold">Contacts d'Urgence</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="grid gap-2">
            <Label>Titre</Label>
            <Select>
                <SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                <SelectContent><SelectItem value="mr">M.</SelectItem><SelectItem value="ms">Mme</SelectItem><SelectItem value="mrs">Mlle</SelectItem></SelectContent>
            </Select>
        </div>
        <div className="grid gap-2"><Label>Prénom</Label><Input /></div>
        <div className="grid gap-2"><Label>Nom</Label><Input /></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid gap-2">
            <Label>Télécharger photo format passeport</Label>
            <div className="flex items-center gap-4">
                <div className="w-24 h-24 bg-muted rounded-md flex items-center justify-center"><Upload className="text-muted-foreground" /></div>
                <Button variant="outline">Choisir Fichier</Button>
            </div>
        </div>
        <div className="grid gap-2"><Label>Numéro d'Identité / Passeport</Label><Input /></div>
    </div>
    <div className="grid gap-2"><Label>Adresse Résidentielle</Label><Textarea /></div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid gap-2"><Label>Nom du Médecin Traitant</Label><Input /></div>
        <div className="grid gap-2"><Label>Téléphone du Médecin Traitant</Label><Input type="tel" /></div>
    </div>
     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid gap-2"><Label>Nom du Gestionnaire de Cas/Travailleur Social</Label><Input /></div>
        <div className="grid gap-2"><Label>Téléphone du Gestionnaire de Cas/Travailleur Social</Label><Input type="tel" /></div>
    </div>
  </div>
);

const Step4 = () => (
 <div className="space-y-6">
    <h3 className="text-lg font-semibold">Antécédents Médicaux</h3>
    <div className="space-y-2">
        <Label>Cochez toutes les conditions médicales applicables :</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2"><Checkbox id="diabetes" /><Label htmlFor="diabetes">Diabète</Label></div>
            <div className="flex items-center space-x-2"><Checkbox id="hypertension" /><Label htmlFor="hypertension">Hypertension</Label></div>
            <div className="flex items-center space-x-2"><Checkbox id="alzheimer" /><Label htmlFor="alzheimer">Alzheimer</Label></div>
            <div className="flex items-center space-x-2"><Checkbox id="dementia" /><Label htmlFor="dementia">Démence</Label></div>
            <div className="flex items-center space-x-2"><Checkbox id="stroke" /><Label htmlFor="stroke">AVC</Label></div>
            <div className="flex items-center space-x-2"><Checkbox id="cancer" /><Label htmlFor="cancer">Cancer</Label></div>
            <div className="flex items-center space-x-2"><Checkbox id="parkinsons" /><Label htmlFor="parkinsons">Parkinson</Label></div>
            <div className="flex items-center space-x-2"><Checkbox id="arthritis" /><Label htmlFor="arthritis">Arthrite</Label></div>
            <div className="flex items-center space-x-2"><Checkbox id="depression" /><Label htmlFor="depression">Dépression</Label></div>
            <div className="flex items-center space-x-2"><Checkbox id="other_condition" /><Label htmlFor="other_condition">Autre</Label></div>
        </div>
        <Input placeholder="Si autre(s) condition(s), veuillez préciser" />
    </div>
     <div className="space-y-2">
        <div className="flex items-center space-x-2"><Checkbox id="disabilities" /><Label htmlFor="disabilities">Handicaps</Label></div>
        <Input placeholder="Si coché, le(s)quel(s) ?" />
    </div>
     <div className="space-y-2">
        <div className="flex items-center space-x-2"><Checkbox id="allergies" /><Label htmlFor="allergies">Allergies</Label></div>
        <Input placeholder="Si coché, le(s)quel(s) ?" />
    </div>
     <div className="space-y-2">
        <div className="flex items-center space-x-2"><Checkbox id="mental_health" /><Label htmlFor="mental_health">Conditions de santé mentale</Label></div>
        <Input placeholder="Si coché, le(s)quel(s) ?" />
    </div>
      <div className="space-y-2">
        <div className="flex items-center space-x-2"><Checkbox id="infection_risk" /><Label htmlFor="infection_risk">Précautions contre les risques infectieux</Label></div>
        <Input placeholder="Si coché, le(s)quel(s) ?" />
    </div>
    <div className="grid gap-2"><Label>Historique des hospitalisations</Label><Textarea /></div>
  </div>
);

const Step5 = () => (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold">Médicaments & Traitements</h3>
    <div className="space-y-2">
        <div className="flex items-center space-x-2"><Checkbox id="on_medication" /><Label htmlFor="on_medication">Actuellement sous médication</Label></div>
        <Input placeholder="Si coché, le(s)quel(s) ?" />
    </div>
    <div className="grid gap-2"><Label>Liste des médicaments & Posologie</Label><Textarea /></div>
    <div className="grid gap-2"><Label>Contact de la pharmacie, si applicable</Label><Input /></div>
    <div className="grid gap-2"><Label>Instructions spéciales</Label><Textarea /></div>
  </div>
);

const Step6 = () => (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold">Consentement & Remerciements</h3>
     <div className="space-y-4 p-4 border rounded-md bg-muted/50">
        <h4 className="font-medium">Clause de non-responsabilité et accord de consentement</h4>
        <p className="text-sm text-muted-foreground">
            Je, soussigné(e), déclare par la présente que toutes les informations fournies dans ce document d'intégration sont vraies, exactes et complètes au meilleur de ma connaissance. Je comprends que toute information fausse ou trompeuse peut entraîner le refus ou la résiliation des services de soins.
        </p>
        <p className="text-sm text-muted-foreground">
            En tant que client ou tuteur/gardien légalement autorisé, j'autorise SERENA et ses soignants désignés à effectuer les tâches décrites dans le plan de soins. Cela inclut, sans s'y limiter, la fourniture de soins personnels, l'administration de médicaments tels que prescrits, l'aide à la mobilité et le transport pour les rendez-vous médicaux ou les courses essentielles. Je reconnais avoir discuté du plan de soins et consentir aux services qui y sont décrits.
        </p>
    </div>
    <div className="flex items-center space-x-2">
      <Checkbox id="acknowledgement" />
      <Label htmlFor="acknowledgement" className="font-medium">
        J'ai lu, compris et accepte les termes et conditions décrits ci-dessus.
      </Label>
    </div>
  </div>
);
