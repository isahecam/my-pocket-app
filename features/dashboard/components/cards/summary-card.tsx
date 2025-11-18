import { Suspense } from "react";

import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  title: string;
  children: React.ReactNode;
  customFallback?: React.ReactNode;
}

export function SummaryCard({
  title,
  children,
  customFallback = <Skeleton className="h-9 w-10" />,
}: Props) {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription className="uppercase">{title}</CardDescription>
        <Suspense fallback={customFallback}>{children}</Suspense>
      </CardHeader>
    </Card>
  );
}
