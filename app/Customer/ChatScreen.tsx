import { useLocalSearchParams } from "expo-router";

import { ChatRoom } from "@/src/components/chat/ChatRoom";

export default function CustomerChatScreen() {
  const params = useLocalSearchParams<{
    jobId?: string;
    otherUserId?: string;
    otherUserName?: string;
    jobTitle?: string;
    conversationType?: "job" | "direct";
  }>();

  const jobId = Array.isArray(params.jobId)
    ? params.jobId[0] || ""
    : params.jobId || "";
  const otherUserId = Array.isArray(params.otherUserId)
    ? params.otherUserId[0] || ""
    : params.otherUserId || "";
  const otherUserName = Array.isArray(params.otherUserName)
    ? params.otherUserName[0] || ""
    : params.otherUserName || "";
  const jobTitle = Array.isArray(params.jobTitle)
    ? params.jobTitle[0] || ""
    : params.jobTitle || "";
  const conversationType = Array.isArray(params.conversationType)
    ? params.conversationType[0] || "job"
    : params.conversationType || "job";

  return (
    <ChatRoom
      jobId={jobId}
      otherUserId={otherUserId}
      otherUserName={otherUserName}
      jobTitle={jobTitle}
      conversationType={conversationType}
      headerSubtitle="Customer Chat"
    />
  );
}
