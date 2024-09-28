'use client';

import React, { ReactNode, useState } from 'react';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BuildType, OktoProvider } from 'okto-sdk-react';

export function ReactQueryProvider({ children }: { children: ReactNode }) {
  const [client] = useState(new QueryClient());

  return (
    <QueryClientProvider client={client}>
      <OktoProvider apiKey={process.env.OKTO_API_KEY ?? ""} buildType={BuildType.SANDBOX}>
        <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
      </OktoProvider>
    </QueryClientProvider>
  );
}
