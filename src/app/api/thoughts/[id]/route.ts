import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { updateStoredThought } from "@/lib/thoughtsStorage";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { action, reply } = body;

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "Missing thought ID."
      }, { status: 400 });
    }

    const isUnconfigured = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder");

    if (action === "like") {
      if (!isUnconfigured) {
        const { error } = await supabase.rpc("increment_likes", { thought_id: id });
        if (error) throw error;
      } else {
        updateStoredThought(id, (t) => ({ ...t, likes: (t.likes || 0) + 1 }));
      }
      return NextResponse.json({ success: true, message: "Liked!" });
    }

    if (action === "dislike") {
      if (!isUnconfigured) {
        const { error } = await supabase.rpc("increment_dislikes", { thought_id: id });
        if (error) throw error;
      } else {
        updateStoredThought(id, (t) => ({ ...t, dislikes: (t.dislikes || 0) + 1 }));
      }
      return NextResponse.json({ success: true, message: "Disliked!" });
    }

    if (action === "reply") {
      if (!reply || !reply.author || !reply.content) {
        return NextResponse.json({
          success: false,
          message: "Reply author and content are required."
        }, { status: 400 });
      }

      // Construct a clean, secure reply object
      const replyData = {
        id: reply.id || Math.random().toString(36).substring(2, 9),
        author: reply.author.trim().substring(0, 50),
        avatar: reply.avatar || `https://api.dicebear.com/7.x/notionists/svg?seed=${reply.author.trim()}`,
        content: reply.content.trim().substring(0, 500),
        timestamp: new Date().toISOString(),
        approved: true
      };

      if (!isUnconfigured) {
        const { error } = await supabase.rpc("add_reply", {
          thought_id: id,
          reply_json: replyData
        });
        if (error) throw error;
      } else {
        updateStoredThought(id, (t) => ({
          ...t,
          replies: [...(t.replies || []), replyData]
        }));
      }
      
      return NextResponse.json({
        success: true,
        message: "Reply added!",
        data: replyData
      });
    }

    return NextResponse.json({
      success: false,
      message: "Invalid action."
    }, { status: 400 });

  } catch (error: any) {
    console.error("POST /api/thoughts/[id] error:", error);
    return NextResponse.json({
      success: false,
      message: "An error occurred while updating the thought."
    }, { status: 500 });
  }
}
