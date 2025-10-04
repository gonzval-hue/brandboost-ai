import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

async function getStats(userId: string) {
  const clientCount = await db.client.count({ where: { userId } });
  const campaignCount = await db.campaign.count({ where: { userId } });
  const generatedContentCount = await db.generatedContent.count({
    where: { campaign: { userId } },
  });
  const scheduledPostsCount = await db.scheduledPost.count({
    where: { generatedContent: { campaign: { userId } } },
  });
  return { clientCount, campaignCount, generatedContentCount, scheduledPostsCount };
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  const { clientCount, campaignCount, generatedContentCount, scheduledPostsCount } = await getStats(session.user.id);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaignCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Generated Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{generatedContentCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{scheduledPostsCount}</div>
          </CardContent>
        </Card>
      </div>
      {/* We will add the client list here later */}
    </div>
  );
}
