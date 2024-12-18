'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold mb-4">Game Not Found</h2>
      <p className="text-muted-foreground mb-8">
        The game you're looking for doesn't exist.
      </p>
      <Button onClick={() => router.push('/')}>
        Return to Lobby
      </Button>
    </div>
  );
}