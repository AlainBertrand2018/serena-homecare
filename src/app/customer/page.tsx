
import { Suspense } from 'react';
import CustomerDashboard from "./dashboard/page";
import CustomerOnboardingPage from "./onboarding/page";

function CustomerPageContent({ isNew }: { isNew: boolean }) {
    if (isNew) {
        return <CustomerOnboardingPage />;
    }
    return <CustomerDashboard />;
}

export default function CustomerPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
    const isNew = searchParams?.new === 'true';

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CustomerPageContent isNew={isNew} />
        </Suspense>
    );
}
