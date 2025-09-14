"use client";

import dynamic from "next/dynamic";

const SubscriptionManager = dynamic(
  () => import("../../components/subscription/SubscriptionManager").then(mod => mod.SubscriptionManager),
  { ssr: false }
);

export default function SubscriptionPage() {
  return <SubscriptionManager />;
}
