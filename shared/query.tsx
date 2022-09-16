import {
  QueryClient,
  QueryClientProvider,
  QueryClientProviderProps,
} from "@tanstack/react-query";
import React from "react";

export const AppQueryClient = new QueryClient();

export const AppQueryClientProvider = (
  props: Omit<QueryClientProviderProps, "client" | "context">
) => {
  return <QueryClientProvider {...props} client={AppQueryClient} />;
};
