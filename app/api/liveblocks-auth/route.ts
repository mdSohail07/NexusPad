import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getLiveblocks } from "@/lib/liveblocks";
import { colorForUser } from "@/lib/user-color";
import "@/liveblocks.config";

export async function POST(request: Request) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const payload = (await request.json()) as { room?: string };
  const room = payload.room;

  if (!room) {
    return new Response("Bad request", { status: 400 });
  }

  const document = await prisma.document.findFirst({
    where: { id: room, ownerId: userId },
    select: { id: true },
  });

  if (!document) {
    return new Response("Forbidden", { status: 403 });
  }

  const liveblocksSession = getLiveblocks().prepareSession(userId, {
    userInfo: {
      name: session.user.name ?? session.user.email ?? "Signed in",
      email: session.user.email ?? "",
      avatar: session.user.image ?? "",
      color: colorForUser(userId),
    },
  });

  liveblocksSession.allow(room, liveblocksSession.FULL_ACCESS);

  const { status, body } = await liveblocksSession.authorize();
  return new Response(body, { status });
}
