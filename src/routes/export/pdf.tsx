import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/export/pdf')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello &quot;/export/pdf&quot;!</div>;
}
