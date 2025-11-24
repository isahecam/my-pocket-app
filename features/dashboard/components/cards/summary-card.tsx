import { Suspense } from "react";

import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  title: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export function SummaryCard({
  title,
  children,
  fallback = <Skeleton className="h-9 w-10" />,
}: Props) {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription className="uppercase">{title}</CardDescription>
        <Suspense fallback={fallback}>{children}</Suspense>
      </CardHeader>
    </Card>
  );
}
