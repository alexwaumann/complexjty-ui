import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => null,
  beforeLoad: () => redirect({ to: "/trade" }),
});
