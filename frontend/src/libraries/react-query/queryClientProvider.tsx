import React from "react";
import { QueryClient, QueryClientProvider as ClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

export default function QueryClientProvider({ children }: { children: React.ReactNode }) {
	return <ClientProvider client={client}>{children}</ClientProvider>;
}
