
'use client';

import { useMemo, useState } from 'react';
import { type Visit } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  format,
  isSameDay,
} from 'date-fns';
import { fr } from 'date-fns/locale';
import { VisitDetails } from './visit-details';

const statusVariants = {
    'À venir': 'bg-gray-500 hover:bg-gray-600',
    'Terminée': 'bg-green-600 hover:bg-green-700',
    'En cours': 'bg-orange-500 hover:bg-orange-600',
    'Annulée': 'bg-red-600 hover:bg-red-700',
} as const;

export function MonthlyPlanner({ visits, currentDate }: { visits: Visit[], currentDate: Date }) {
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);

  const daysInMonth = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentDate), { locale: fr });
    const end = endOfWeek(endOfMonth(currentDate), { locale: fr });
    return eachDayOfInterval({ start, end });
  }, [currentDate]);

  const daysOfWeek = ['lun', 'mar', 'mer', 'jeu', 'ven', 'sam', 'dim'];

  return (
    <>
      <div className="border rounded-lg">
        <div className="grid grid-cols-7 border-b">
          {daysOfWeek.map(day => (
            <div key={day} className="p-2 text-center font-medium text-muted-foreground text-sm capitalize">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 grid-rows-5">
          {daysInMonth.map((day, index) => {
            const visitsForDay = visits.filter(visit => isSameDay(visit.date, day));
            return (
              <div
                key={day.toString()}
                className={cn(
                  'p-2 border-r border-b h-40 flex flex-col',
                  !isSameMonth(day, currentDate) && 'bg-muted/50 text-muted-foreground',
                  (index + 1) % 7 === 0 && 'border-r-0' 
                )}
              >
                <div className={cn(
                    'flex items-center justify-center h-6 w-6 rounded-full text-sm',
                    isToday(day) && 'bg-primary text-primary-foreground'
                  )}
                >
                  {format(day, 'd')}
                </div>
                <div className="flex-grow mt-1 space-y-1 overflow-y-auto pr-1">
                  {visitsForDay.map(visit => (
                      <button key={visit.id} className="w-full text-left" onClick={() => setSelectedVisit(visit)}>
                          <Badge
                              className={cn("w-full text-left justify-start truncate cursor-pointer text-white", statusVariants[visit.status])}
                          >
                            {visit.clientName}
                          </Badge>
                      </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
       {selectedVisit && (
        <VisitDetails 
          visit={selectedVisit} 
          isOpen={!!selectedVisit}
          onOpenChange={(isOpen) => !isOpen && setSelectedVisit(null)}
        />
      )}
    </>
  );
}
