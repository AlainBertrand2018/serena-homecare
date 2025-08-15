
'use client';

import Image from "next/image";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BedDouble, Stethoscope, UtensilsCrossed, HeartHandshake, FileText, Award, Check, Car, Clock } from 'lucide-react';
import { useState } from "react";


const services = [
  {
    icon: <BedDouble className="h-10 w-10 text-primary" />,
    title: "Soins Personnels",
    description: "Aide aux activités quotidiennes comme le bain, l'habillage et la mobilité.",
  },
  {
    icon: <UtensilsCrossed className="h-10 w-10 text-primary" />,
    title: "Préparation des Repas",
    description: "Planification et préparation de repas nutritifs et délicieux selon les besoins diététiques.",
  },
  {
    icon: <Stethoscope className="h-10 w-10 text-primary" />,
    title: "Soins Infirmiers Qualifiés",
    description: "Soins médicaux professionnels à domicile, y compris la gestion des médicaments.",
  },
  {
    icon: <HeartHandshake className="h-10 w-10 text-primary" />,
    title: "Accompagnement",
    description: "Offrir de la compagnie et participer à des activités sociales.",
  },
  {
    icon: <Car className="h-10 w-10 text-primary" />,
    title: "Transport Spécialisé",
    description: "Transport sûr et fiable pour les rendez-vous et les sorties sociales.",
  }
];

const whyChooseUs = [
    {
        icon: <Award className="h-10 w-10 text-primary" />,
        title: "Certifiés & Compatissants",
        description: "Nos soignants sont rigoureusement sélectionnés, formés et partagent une véritable passion pour aider les autres.",
    },
    {
        icon: <FileText className="h-10 w-10 text-primary" />,
        title: "Plans de Soins Personnalisés",
        description: "Nous travaillons avec vous pour créer un plan de soins personnalisé qui correspond à vos besoins et préférences uniques.",
    },
    {
        icon: <HeartHandshake className="h-10 w-10 text-primary" />,
        title: "Support 24/7",
        description: "Notre équipe est toujours disponible pour répondre à vos questions et vous apporter son soutien quand vous en avez besoin.",
    }
];

const testimonials = [
  {
    name: "Marguerite T.",
    review: "Le soignant de SERENA a été une véritable bénédiction pour notre famille. Si compatissant et fiable.",
    avatar: "https://placehold.co/100x100.png",
    aiHint: "femme âgée"
  },
  {
    name: "Jean & Suzanne P.",
    review: "Nous étions si inquiets de trouver de bons soins pour mon père. SERENA a rendu le processus simple et sans stress.",
    avatar: "https://placehold.co/100x100.png",
    aiHint: "couple de personnes âgées"
  },
  {
    name: "David L.",
    review: "Excellent service. Les soignants sont professionnels et l'administration est toujours serviable et réactive.",
    avatar: "https://placehold.co/100x100.png",
    aiHint: "homme"
  },
];

function UrgentVisitModal({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Votre demande de visite urgente</DialogTitle>
          <DialogDescription>
            Remplissez le formulaire suivant et nous vous contacterons pour plus d'informations.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-6 py-4" onSubmit={(e) => { e.preventDefault(); setOpen(false); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="customer-name">Nom du Client</Label>
                    <Input id="customer-name" placeholder="John Doe" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="customer-phone">Téléphone portable / Whatsapp</Label>
                    <Input id="customer-phone" type="tel" placeholder="+123456789" />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="guardian-name">Nom du Tuteur</Label>
                    <Input id="guardian-name" placeholder="Jane Doe" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="guardian-phone">Téléphone Portable / Whatsapp</Label>
                    <Input id="guardian-phone" type="tel" placeholder="+123456789" />
                </div>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="address">Adresse d'intervention</Label>
                <Textarea id="address" placeholder="123 Rue Principale, Anytown..." />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="instructions">Instructions Spéciales</Label>
                <Textarea id="instructions" placeholder="ex: Clé sous le paillasson, allergique aux arachides..." />
            </div>
            <DialogFooter>
                <Button type="submit">Soumettre</Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Section Héros */}
        <section className="relative h-screen flex items-center justify-center text-center text-white">
          <Image
            src="/images/CareGiver.webp"
            alt="Soignant avec une personne âgée"
            fill
            className="absolute inset-0 z-0 brightness-50 object-cover"
            data-ai-hint="caregiver elderly"
          />
          <div className="relative z-10 p-4 space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold">
              Soins à Domicile Fiables, Dispensés avec Dignité
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Fournir des soins compatissants et professionnels à vos proches dans le confort de leur propre maison.
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <Button size="lg" asChild>
                <Link href="#booking">Prendre Rendez-vous</Link>
              </Button>
              <UrgentVisitModal trigger={
                <Button size="lg" variant="secondary" style={{ backgroundColor: 'hsl(43, 96%, 56%)' }}>
                  <Clock /> Demander une Visite Urgente
                </Button>
              } />
            </div>
          </div>
        </section>

        {/* Section Pourquoi Nous Choisir */}
        <section id="why-us" className="py-12 md:py-20 bg-muted/40">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
                    Pourquoi Choisir SERENA ?
                </h2>
                <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
                    {whyChooseUs.map((item) => (
                        <div key={item.title} className="text-center">
                             <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                            <p className="text-muted-foreground">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>


        {/* Aperçu des Services */}
        <section id="services" className="py-12 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              Nos Services Complets
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Card key={service.title} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit">
                      {service.icon}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
             <div className="text-center mt-10">
                <Button variant="outline">En Savoir Plus Sur Nos Services</Button>
            </div>
          </div>
        </section>

        {/* Section Tarifs */}
        <section id="pricing" className="py-12 md:py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              Plans de Soins Flexibles
            </h2>
            <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3 items-start">
              {/* Plan 1 */}
              <Card>
                <CardHeader>
                  <CardTitle>Accompagnement <span className="text-base font-normal text-muted-foreground">(Non-médical)</span></CardTitle>
                  <CardDescription>Idéal pour les clients ayant besoin d'interaction sociale et d'une aide légère.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-4xl font-bold">MUR250<span className="text-lg font-normal text-muted-foreground">/heure</span></div>
                  <p className="text-sm font-medium">ou MUR800/jour (8h)</p>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Compagnie & conversation</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Entretien ménager léger</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Rappels de repas</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Accompagnement aux rendez-vous</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline">Choisir le Plan</Button>
                </CardFooter>
              </Card>

              {/* Plan 2 - Mis en avant */}
              <Card className="border-primary border-2 relative">
                 <div className="absolute top-0 -translate-y-1/2 w-full flex justify-center">
                    <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                      Le Plus Populaire
                    </div>
                  </div>
                <CardHeader className="pt-10">
                  <CardTitle>Soins Personnels <span className="text-base font-normal text-muted-foreground">(Non-médical)</span></CardTitle>
                  <CardDescription>Assistance complète pour les activités quotidiennes.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-4xl font-bold">MUR500<span className="text-lg font-normal text-muted-foreground">/heure</span></div>
                  <p className="text-sm font-medium">ou MUR2100/jour (8h)</p>
                   <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2 font-semibold text-foreground"><Check className="h-4 w-4 text-primary" />Tout ce qui est inclus dans l'Accompagnement</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Aide au bain et à l'habillage</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Soutien à la mobilité</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Préparation des repas</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Rappels de médicaments</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Choisir le Plan</Button>
                </CardFooter>
              </Card>

              {/* Plan 3 */}
              <Card>
                <CardHeader>
                  <CardTitle>Soins Infirmiers <span className="text-base font-normal text-muted-foreground">(Médical)</span></CardTitle>
                  <CardDescription>Pour les clients ayant des besoins médicaux nécessitant un professionnel agréé.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-4xl font-bold">MUR800<span className="text-lg font-normal text-muted-foreground">/heure</span></div>
                   <p className="text-sm font-medium">ou MUR5000/jour (8h)</p>
                   <ul className="space-y-3 text-sm text-muted-foreground">
                     <li className="flex items-center gap-2 font-semibold text-foreground"><Check className="h-4 w-4 text-primary" />Tout ce qui est inclus dans les Soins Personnels</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Administration des médicaments</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Soins des plaies</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Surveillance des signes vitaux</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Soins post-opératoires</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline">Choisir le Plan</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Carrousel des Témoignages */}
        <section id="testimonials" className="py-12 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              Ce que Disent Nos Clients
            </h2>
            <Carousel
              opts={{ align: "start", loop: true }}
              className="w-full max-w-4xl mx-auto"
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                      <Card className="flex flex-col h-full">
                        <CardContent className="flex-grow p-6 space-y-4">
                           <p className="text-muted-foreground">"{testimonial.review}"</p>
                           <div className="flex items-center gap-4 pt-4">
                              <Avatar>
                                <AvatarImage src={testimonial.avatar} data-ai-hint={testimonial.aiHint} />
                                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <p className="font-semibold">{testimonial.name}</p>
                           </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>

        {/* Section Réservation */}
        <section id="booking" className="py-12 md:py-20 bg-muted/40">
          <div className="container mx-auto px-4">
             <Card className="max-w-3xl mx-auto shadow-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl">Demander une Consultation</CardTitle>
                    <CardDescription>Remplissez le formulaire ci-dessous et nous vous contacterons pour planifier votre consultation gratuite.</CardDescription>
                </CardHeader>
                 <CardContent>
                    <form className="grid gap-6">
                         <div className="grid gap-2">
                            <Label htmlFor="name">Nom Complet</Label>
                            <Input id="name" placeholder="John Doe" />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="john@exemple.com" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="phone">Numéro de Téléphone</Label>
                                <Input id="phone" type="tel" placeholder="(+33) 1 23 45 67 89" />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="service-type">Type de Service Requis</Label>
                            <Input id="service-type" placeholder="ex: Soins Personnels, Accompagnement" />
                        </div>
                         <div className="grid gap-2">
                            <Label htmlFor="consultation-date">Date / Heure de Consultation Préférée</Label>
                            <Input id="consultation-date" type="text" placeholder="ex: Matinées en semaine, Mardi prochain après-midi" />
                        </div>
                         <div className="grid gap-2">
                            <Label htmlFor="message">Informations Supplémentaires (Optionnel)</Label>
                            <Textarea id="message" placeholder="Dites-nous en plus sur vos besoins..."/>
                        </div>
                        <Button type="submit" size="lg" className="w-full">Confirmer la Demande</Button>
                    </form>
                 </CardContent>
             </Card>
          </div>
        </section>
      </main>
    </div>
  );
