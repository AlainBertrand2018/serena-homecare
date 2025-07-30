
'use client';

import { useState } from 'react';
import { caregivers as initialCaregivers, type Caregiver } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { CaregiverForm } from "./_components/caregiver-form";
import { CaregiverCard } from "./_components/caregiver-card";

export default function AdminCaregiversPage() {
  const [caregivers, setCaregivers] = useState<Caregiver[]>(initialCaregivers);

  const handleAddCaregiver = (newCaregiverData: Omit<Caregiver, 'id'>) => {
    const newCaregiver: Caregiver = {
      ...newCaregiverData,
      id: `c${Math.random().toString(36).substring(7)}`, // pseudo-random id
      skills: newCaregiverData.skills, // Skills are already an array
    };
    setCaregivers(prev => [...prev, newCaregiver]);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-2xl md:text-3xl">Caregivers</h1>
        <CaregiverForm 
            onAddCaregiver={handleAddCaregiver}
            trigger={<Button><PlusCircle /> Add New Caregiver</Button>} 
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {caregivers.map((caregiver) => (
          <CaregiverCard key={caregiver.id} caregiver={caregiver} />
        ))}
      </div>
    </>
  );
}
