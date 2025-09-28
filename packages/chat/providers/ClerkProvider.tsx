"use client";

import { ClerkProvider as ClerkAuthProvider } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_live_Y2xlcmsuc3Bpa2UubGFuZCQ";

export function ClerkProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <ClerkAuthProvider
      publishableKey={clerkPublishableKey}
      frontendApi="clerk.spike.land"
      navigate={(to) => router.push(to)}
      afterSignInUrl="/chat"
      afterSignUpUrl="/chat"
      signInUrl="/signin"
      signUpUrl="/signup"
    >
      {children}
    </ClerkAuthProvider>
  );
}