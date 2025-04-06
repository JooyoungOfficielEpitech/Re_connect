import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function OnboardingIndex() {
  const router = useRouter();

  useEffect(() => {
    // Automatically redirect to step1
    router.replace('/onboarding/step1');
  }, []);

  return null; // No UI needed as this is just a redirect
} 