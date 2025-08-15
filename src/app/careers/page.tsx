
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
       <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">Postuler comme Soignant</h1>
        <p className="text-muted-foreground mt-2">
          Nous sommes honorés de votre candidature. Veuillez remplir le formulaire suivant. Nous vous contacterons très bientôt.
        </p>
      </div>
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className='text-3xl'>Formulaire d'Intégration pour Soignant</CardTitle>
          <CardDescription>
            À compléter par tous les soignants avant leur première affectation client.
            <br/>
            Étape {step} sur {totalSteps}.
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
              Précédent
            </Button>
          ) : <div />}
          
          {step < totalSteps && (
            <Button onClick={nextStep}>
              Suivant
            </Button>
          )}
          {step === totalSteps && (
            <Button>
              Soumettre la Candidature
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
        </div>
    )
}

const YesNoRadio = ({label, id}: {label: string, id: string}) => (
    <div className="space-y-2">
        <Label>{label}</Label>
        <RadioGroup className="flex gap-4">
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id={`${id}-yes`} />
                <Label htmlFor={`${id}-yes`}>Oui</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id={`${id}-no`} />
                <Label htmlFor={`${id}-no`}>Non</Label>
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
                    <span className="sr-only">Télécharger</span>
                </div>
            </Button>
        </div>
    </div>
)

const Section1 = () => (
  <div className="space-y-6">
    <h3 className="text-xl font-bold">SECTION 1 – IDENTIFICATION PERSONNELLE</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FileUpload label="Télécharger une photo format passeport" id="passport-photo" />
        <FileUpload label="Télécharger le CV" id="cv-upload" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="grid gap-2"><Label>Nom complet</Label><Input /></div>
        <div className="grid gap-2"><Label>Nom d'usage / Surnom</Label><Input /></div>
        <DatePicker label="Date de naissance" />
        <div className="grid gap-2">
            <Label>Identité de genre</Label>
            <Select><SelectTrigger><SelectValue placeholder="Sélectionner..." /></SelectTrigger><SelectContent><SelectItem value="male">Homme</SelectItem><SelectItem value="female">Femme</SelectItem><SelectItem value="non-binary">Non-binaire</SelectItem><SelectItem value="prefer-not-to-say">Préfère ne pas répondre</SelectItem></SelectContent></Select>
        </div>
        <div className="grid gap-2"><Label>Nationalité</Label><Input /></div>
        <div className="grid gap-2"><Label>Numéro de carte d'identité / passeport</Label><Input /></div>
    </div>
    <div className="grid gap-2"><Label>Adresse résidentielle</Label><Textarea /></div>
     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="grid gap-2"><Label>Numéro de téléphone</Label><Input type="tel" /></div>
        <div className="grid gap-2"><Label>Adresse e-mail</Label><Input type="email" /></div>
        <div className="grid gap-2"><Label>Langue(s) préférée(s)</Label><Input /></div>
        <div className="grid gap-2"><Label>Nom et numéro du contact d'urgence</Label><Input /></div>
         <div className="grid gap-2">
            <Label>État civil</Label>
            <Select><SelectTrigger><SelectValue placeholder="Sélectionner..." /></SelectTrigger><SelectContent><SelectItem value="single">Célibataire</SelectItem><SelectItem value="married">Marié(e)</SelectItem><SelectItem value="divorced">Divorcé(e)</SelectItem><SelectItem value="widowed">Veuf/Veuve</SelectItem></SelectContent></Select>
        </div>
        <div className="grid gap-2"><Label>Proche parent et lien de parenté</Label><Input /></div>
    </div>
  </div>
);

const Section2 = () => (
    <div className="space-y-6">
        <h3 className="text-xl font-bold">SECTION 2 – JURIDIQUE & DOCUMENTATION</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <YesNoRadio label="Copie de la carte d'identité fournie" id="nid-copy" />
            <div className="space-y-2">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <YesNoRadio label="Extrait de casier judiciaire" id="police-clearance"/>
                    <DatePicker label="Date d'émission"/>
                </div>
            </div>
            <div className="space-y-2">
                <Label>Permis de travail valide (si ressortissant étranger)</Label>
                 <RadioGroup className="flex gap-4">
                    <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="permit-yes" /><Label htmlFor="permit-yes">Oui</Label></div>
                    <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="permit-no" /><Label htmlFor="permit-no">Non</Label></div>
                     <div className="flex items-center space-x-2"><RadioGroupItem value="na" id="permit-na" /><Label htmlFor="permit-na">Non applicable</Label></div>
                </RadioGroup>
            </div>
        </div>
        <div className="space-y-4 p-4 border rounded-md">
            <h4 className="font-semibold">Coordonnées bancaires pour le paiement du salaire</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="grid gap-2"><Label>Nom de la banque</Label><Input /></div>
                <div className="grid gap-2"><Label>Numéro de compte</Label><Input /></div>
                <div className="grid gap-2"><Label>Code de l'agence</Label><Input /></div>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-2"><Label>Numéro de sécurité sociale / Numéro NPF</Label><Input /></div>
            <div className="grid gap-2"><Label>Numéro d'identification fiscale (TIN)</Label><Input /></div>
        </div>
    </div>
);

const Section3 = () => (
    <div className="space-y-6">
        <h3 className="text-xl font-bold">SECTION 3 – QUALIFICATIONS & FORMATION</h3>
        <div className="grid gap-2">
            <Label>Plus haut niveau d'études</Label>
            <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2"><Checkbox id="edu_primary" /><Label htmlFor="edu_primary">Primaire</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="edu_secondary" /><Label htmlFor="edu_secondary">Secondaire</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="edu_tertiary" /><Label htmlFor="edu_tertiary">Supérieur</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="edu_other" /><Label htmlFor="edu_other">Autre</Label></div>
                <Input placeholder="Si autre, veuillez préciser" className="max-w-xs"/>
            </div>
        </div>
        <div className="grid gap-2">
            <Label>Qualifications professionnelles</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center space-x-2"><Checkbox id="qual_hca" /><Label htmlFor="qual_hca">Certificat d'aide-soignant</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="qual_first_aid" /><Label htmlFor="qual_first_aid">Premiers secours / RCR</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="qual_dementia" /><Label htmlFor="qual_dementia">Soins aux personnes âgées/démence</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="qual_disability" /><Label htmlFor="qual_disability">Soutien aux personnes handicapées</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="qual_nursing" /><Label htmlFor="qual_nursing">Diplôme / Licence en soins infirmiers</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="qual_other" /><Label htmlFor="qual_other">Autre</Label></div>
            </div>
            <Input placeholder="Si autre, veuillez préciser"/>
        </div>
         <div className="grid gap-2">
            <Label>Langues parlées</Label>
            <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2"><Checkbox id="lang_en" /><Label htmlFor="lang_en">Anglais</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="lang_fr" /><Label htmlFor="lang_fr">Français</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="lang_cr" /><Label htmlFor="lang_cr">Créole</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="lang_other" /><Label htmlFor="lang_other">Autre</Label></div>
                <Input placeholder="Si autre, veuillez préciser" className="max-w-xs"/>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            <DatePicker label="Date de la dernière formation / certification"/>
            <YesNoRadio label="Prêt à suivre une formation continue ?" id="ongoing-training"/>
        </div>
    </div>
);


const Section4 = () => (
    <div className="space-y-6">
        <h3 className="text-xl font-bold">SECTION 4 – SANTÉ & SÉCURITÉ</h3>
        <div className="grid gap-2">
            <YesNoRadio label="Avez-vous des conditions médicales actuelles ?" id="med-conditions"/>
            <Input placeholder="Si oui, veuillez préciser"/>
        </div>
        <YesNoRadio label="Êtes-vous physiquement capable de soulever et d'assister les clients ?" id="physical-ability"/>
         <div className="grid gap-2">
            <YesNoRadio label="Avez-vous des allergies ou des restrictions ?" id="allergies"/>
            <Input placeholder="Si oui, veuillez préciser"/>
        </div>
        <div className="grid gap-2">
            <Label>Statut de vaccination COVID-19</Label>
             <RadioGroup className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2"><RadioGroupItem value="full" id="covid_full" /><Label htmlFor="covid_full">Entièrement vacciné</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="partial" id="covid_partial" /><Label htmlFor="covid_partial">Partiellement</Label></div>
                 <div className="flex items-center space-x-2"><RadioGroupItem value="none" id="covid_none" /><Label htmlFor="covid_none">Non vacciné</Label></div>
            </RadioGroup>
        </div>
        <div className="grid gap-2"><Label>Vaccinations supplémentaires (ex: Hépatite B, TB)</Label><Input /></div>
        <div className="grid gap-2"><Label>Détails de l'assurance maladie (si applicable)</Label><Input /></div>
    </div>
);

const Section5 = () => (
    <div className="space-y-6">
        <h3 className="text-xl font-bold">SECTION 5 – DISPONIBILITÉ & AFFECTATIONS</h3>
        <div className="grid gap-2">
            <Label>Horaire de travail préféré</Label>
            <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2"><Checkbox id="sched_full" /><Label htmlFor="sched_full">Temps plein</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="sched_part" /><Label htmlFor="sched_part">Temps partiel</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="sched_weekends" /><Label htmlFor="sched_weekends">Week-ends</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="sched_overnight" /><Label htmlFor="sched_overnight">Nuit</Label></div>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DatePicker label="Date de début de disponibilité" />
            <div className="grid gap-2"><Label>Zone / Région de travail préférée</Label><Input /></div>
        </div>
        <div className="grid gap-2">
            <Label>Êtes-vous prêt à travailler avec :</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center space-x-2"><Checkbox id="work_elderly" /><Label htmlFor="work_elderly">Personnes âgées</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="work_children" /><Label htmlFor="work_children">Enfants</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="work_disabilities" /><Label htmlFor="work_disabilities">Personnes en situation de handicap</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="work_terminal" /><Label htmlFor="work_terminal">Patients en phase terminale</Label></div>
            </div>
        </div>
        <YesNoRadio label="Pouvez-vous fournir des soins à domicile (live-in) si nécessaire ?" id="live-in"/>
        <YesNoRadio label="Avez-vous un permis de conduire valide ?" id="drivers-license"/>
    </div>
);

const Section6 = () => (
    <div className="space-y-6">
        <h3 className="text-xl font-bold">SECTION 6 – EXPÉRIENCE & RÉFÉRENCES</h3>
        <div className="grid gap-2">
            <Label>Années d'expérience en soins</Label>
            <Input type="number" />
        </div>
        <div className="space-y-4 p-4 border rounded-md">
            <h4 className="font-semibold">Employeurs précédents / Agences de soins</h4>
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="grid gap-2"><Label>Nom</Label><Input /></div>
                    <div className="grid gap-2"><Label>Durée</Label><Input /></div>
                    <div className="grid gap-2"><Label>Rôle</Label><Input /></div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="grid gap-2"><Label>Nom</Label><Input /></div>
                    <div className="grid gap-2"><Label>Durée</Label><Input /></div>
                    <div className="grid gap-2"><Label>Rôle</Label><Input /></div>
                </div>
            </div>
        </div>
        <div className="space-y-4 p-4 border rounded-md">
            <h4 className="font-semibold">Références</h4>
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="grid gap-2"><Label>Référence 1: Nom</Label><Input /></div>
                    <div className="grid gap-2"><Label>Contact</Label><Input /></div>
                    <div className="grid gap-2"><Label>Relation</Label><Input /></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="grid gap-2"><Label>Référence 2: Nom</Label><Input /></div>
                    <div className="grid gap-2"><Label>Contact</Label><Input /></div>
                    <div className="grid gap-2"><Label>Relation</Label><Input /></div>
                </div>
            </div>
        </div>
    </div>
);

const Section7 = () => (
  <div className="space-y-6">
    <h3 className="text-xl font-bold">SECTION 7 – CONDUITE PROFESSIONNELLE</h3>
    <div className="space-y-2">
        <Label>Êtes-vous à l'aise avec les tâches suivantes (cochez toutes celles qui s'appliquent) :</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <div className="flex items-center space-x-2"><Checkbox id="duty_hygiene" /><Label htmlFor="duty_hygiene">Hygiène personnelle</Label></div>
            <div className="flex items-center space-x-2"><Checkbox id="duty_meals" /><Label htmlFor="duty_meals">Préparation et aide aux repas</Label></div>
            <div className="flex items-center space-x-2"><Checkbox id="duty_meds" /><Label htmlFor="duty_meds">Rappels de médicaments</Label></div>
            <div className="flex items-center space-x-2"><Checkbox id="duty_housekeeping" /><Label htmlFor="duty_housekeeping">Entretien ménager / Lessive</Label></div>
            <div className="flex items-center space-x-2"><Checkbox id="duty_companion" /><Label htmlFor="duty_companion">Accompagnement</Label></div>
            <div className="flex items-center space-x-2"><Checkbox id="duty_transfer" /><Label htmlFor="duty_transfer">Transferts / Aide à la mobilité</Label></div>
        </div>
    </div>
    <YesNoRadio label="Comprenez-vous l'importance de la confidentialité et des droits des clients ?" id="confidentiality"/>
    <div className="grid gap-2">
        <YesNoRadio label="Avez-vous déjà fait l'objet d'une enquête pour abus, négligence ou inconduite ?" id="misconduct"/>
        <Textarea placeholder="Si oui, veuillez expliquer"/>
    </div>
     <YesNoRadio label="Consentez-vous à la vérification des antécédents et aux contrôles aléatoires ?" id="background-check"/>
  </div>
);

const Section8 = () => (
    <div className="space-y-6">
        <h3 className="text-xl font-bold">SECTION 8 – DÉCLARATION & SIGNATURE</h3>
        <div className="p-4 border rounded-md bg-muted/50 space-y-2">
            <p className="text-sm text-muted-foreground">
                Je certifie que les informations fournies sont vraies et exactes au meilleur de ma connaissance. Je comprends que fournir de fausses informations peut entraîner un licenciement ou des poursuites judiciaires.
            </p>
        </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-2">
                <Label>Signature</Label>
                <div className="p-4 border bg-background rounded-md h-24">
                    {/* Espace réservé pour un composant de signature */}
                </div>
            </div>
            <DatePicker label="Date"/>
        </div>
        <div className="grid gap-2">
            <Label>Témoin (RH/Admin)</Label>
            <Input />
        </div>
    </div>
);
