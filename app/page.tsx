import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { DashboardView } from "@/components/dashboard/dashboard-view";

export default async function HomePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-full bg-white">
      <DashboardView
        name={session.user.name}
        email={session.user.email}
        image={session.user.image}
      />
    </div>
  );
}
