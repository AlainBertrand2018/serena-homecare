
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
          <AlertDialogTitle>SERENA : La Gestion de Votre Service en Toute Intelligence</AlertDialogTitle>
          <AlertDialogDescription>
            Optimisez opérations, qualité et rentabilité avec un suivi intelligent en temps réel.
            <br />
            <strong className="mt-2 block">L’humain d’abord, le reste en un clic.</strong>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleClose}>Continuer</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
