
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const LOCAL_STORAGE_KEY = 'hasSeenWelcomePopup';

export function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!hasSeenPopup) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, 'true');
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="w-1/2 mx-auto mb-4">
            <Image
              src="/images/popupLogo.webp"
              alt="SERENA Logo"
              width={200}
              height={100}
              className="w-full h-auto object-contain"
              data-ai-hint="logo"
            />
          </div>
          <AlertDialogTitle>La Gestion de Votre Service de Soins à la Personne en Toute Intelligence</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className='space-y-3'>
              <p>
                Optimisez vos opérations, assurez la qualité et la rentabilité de votre service avec un suivi intelligent en temps réel.
              </p>
              <ul className="list-disc list-inside space-y-1 text-left">
                  <li>Tableau de bord pour une vue d'ensemble : Comptabilité, Calendrier, Clients, Personnels</li>
                  <li>Gestion et recrutement des aides-soignants</li>
                  <li>Intégration clients simplifiée</li>
                  <li>Prise de Rendez-vous et gestion des visites à domicile</li>
              </ul>
              <p className="font-bold pt-2">L’humain d’abord, le reste en un clic.</p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleClose}>Continuer</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
