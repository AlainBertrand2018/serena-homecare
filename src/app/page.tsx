
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
import { BedDouble, Stethoscope, UtensilsCrossed, CheckCircle, Calendar as CalendarIcon, Car, Check } from 'lucide-react';

const services = [
  {
    icon: <BedDouble className="h-10 w-10 text-primary" />,
    title: "Personal Care",
    description: "Assistance with daily activities like bathing, dressing, and mobility.",
  },
  {
    icon: <UtensilsCrossed className="h-10 w-10 text-primary" />,
    title: "Meal Preparation",
    description: "Nutritious and delicious meal planning and preparation according to dietary needs.",
  },
  {
    icon: <Stethoscope className="h-10 w-10 text-primary" />,
    title: "Skilled Nursing",
    description: "Professional medical care at home, including medication management.",
  },
  {
    icon: <CheckCircle className="h-10 w-10 text-primary" />,
    title: "Companion Care",
    description: "Providing companionship and engagement in social activities.",
  },
  {
    icon: <Car className="h-10 w-10 text-primary" />,
    title: "Specialized Transportation",
    description: "Safe and reliable transportation to appointments and social outings.",
  }
];

const testimonials = [
  {
    name: "Margaret T.",
    review: "The caregiver from JOVE HOME CARE has been a true blessing for our family. So compassionate and reliable.",
    avatar: "https://placehold.co/100x100.png",
    aiHint: "elderly woman"
  },
  {
    name: "John & Susan P.",
    review: "We were so worried about finding good care for my father. JOVE HOME CARE made the process seamless and stress-free.",
    avatar: "https://placehold.co/100x100.png",
    aiHint: "elderly couple"
  },
  {
    name: "David L.",
    review: "Excellent service. The caregivers are professional, and the administration is always helpful and responsive.",
    avatar: "https://placehold.co/100x100.png",
    aiHint: "man"
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center text-center text-white">
          <Image
            src="/images/CareGiver.webp"
            alt="Caregiver with elderly person"
            fill
            className="absolute inset-0 z-0 brightness-50 object-cover"
            data-ai-hint="caregiver elderly"
          />
          <div className="relative z-10 p-4 space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold">
              Reliable In-Home Care, Delivered with Dignity
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Providing compassionate and professional care for your loved ones in the comfort of their own home.
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <Button size="lg" asChild>
                <Link href="#booking">Book Consultation</Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/careers">Apply as Caregiver</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section id="services" className="py-12 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              Our Services
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
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
                <Button variant="outline">Learn More About Our Services</Button>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-12 md:py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              Flexible Care Plans
            </h2>
            <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3 items-start">
              {/* Plan 1 */}
              <Card>
                <CardHeader>
                  <CardTitle>Companion Care <span className="text-base font-normal text-muted-foreground">(Non-medical)</span></CardTitle>
                  <CardDescription>Ideal for clients who need social interaction and light assistance.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-4xl font-bold">MUR250<span className="text-lg font-normal text-muted-foreground">/hour</span></div>
                  <p className="text-sm font-medium">or MUR800/day (8hr)</p>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Companionship & conversation</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Light housekeeping</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Meal reminders</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Accompanying to appointments</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline">Choose Plan</Button>
                </CardFooter>
              </Card>

              {/* Plan 2 - Highlighted */}
              <Card className="border-primary border-2 relative">
                 <div className="absolute top-0 -translate-y-1/2 w-full flex justify-center">
                    <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                <CardHeader className="pt-10">
                  <CardTitle>Personal Care <span className="text-base font-normal text-muted-foreground">(Non-medical)</span></CardTitle>
                  <CardDescription>Comprehensive assistance with daily activities.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-4xl font-bold">MUR500<span className="text-lg font-normal text-muted-foreground">/hour</span></div>
                  <p className="text-sm font-medium">or MUR2100/day (8hr)</p>
                   <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2 font-semibold text-foreground"><Check className="h-4 w-4 text-primary" />Everything in Companion Care</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Bathing & dressing assistance</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Mobility support</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Meal preparation</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Medication reminders</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Choose Plan</Button>
                </CardFooter>
              </Card>

              {/* Plan 3 */}
              <Card>
                <CardHeader>
                  <CardTitle>Skilled Nursing <span className="text-base font-normal text-muted-foreground">(Medical)</span></CardTitle>
                  <CardDescription>For clients with medical needs requiring a licensed professional.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-4xl font-bold">MUR800<span className="text-lg font-normal text-muted-foreground">/hour</span></div>
                   <p className="text-sm font-medium">or MUR5000/day (8hr)</p>
                   <ul className="space-y-3 text-sm text-muted-foreground">
                     <li className="flex items-center gap-2 font-semibold text-foreground"><Check className="h-4 w-4 text-primary" />Everything in Personal Care</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Medication administration</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Wound care</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Vital signs monitoring</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Post-operative care</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline">Choose Plan</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Carousel */}
        <section id="testimonials" className="py-12 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              What Our Clients Say
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

        {/* Booking Section */}
        <section id="booking" className="py-12 md:py-20 bg-muted/40">
          <div className="container mx-auto px-4">
             <Card className="max-w-3xl mx-auto shadow-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl">Request a Consultation</CardTitle>
                    <CardDescription>Fill out the form below and we'll get in touch to schedule your free consultation.</CardDescription>
                </CardHeader>
                 <CardContent>
                    <form className="grid gap-6">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" placeholder="John Doe" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="john@example.com" />
                            </div>
                        </div>
                         <div className="grid gap-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" type="tel" placeholder="(555) 123-4567" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="service-type">Type of Service</Label>
                            <Input id="service-type" placeholder="e.g., Personal Care, Companion Care" />
                        </div>
                         <div className="grid gap-2">
                            <Label htmlFor="consultation-date">Preferred Consultation Date</Label>
                             <div className="relative">
                                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input id="consultation-date" type="text" placeholder="Select a date" className="pl-10" />
                            </div>
                        </div>
                         <div className="grid gap-2">
                            <Label htmlFor="message">Additional Information (Optional)</Label>
                            <Textarea id="message" placeholder="Tell us more about your needs..."/>
                        </div>
                        <Button type="submit" size="lg" className="w-full">Confirm Request</Button>
                    </form>
                 </CardContent>
             </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
