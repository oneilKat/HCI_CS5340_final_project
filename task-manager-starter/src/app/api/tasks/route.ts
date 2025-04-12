import options from '@/config/auth';
import db from '@/db';
import { taskAssignments, tasks } from '@/db/schema';
import requireAuth from '@/utils/require-auth';
import { eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    await requireAuth();
    const session = getServerSession(options);
    console.log(session);
    if (!session) {
        return new Response('Unauthorized', { status: 401 });
    }
    const userId = session?.user?.email;
    console.log(userId);

    const taskIds = await db.select().from(taskAssignments).where(eq(taskAssignments.userId, userId))

    //const userTasks = await db.select().from(tasks).where(eq(tasks.id, taskIds.taskId))

    return NextResponse.json(taskIds);
}