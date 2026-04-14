import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
  ArrowLeft,
  Send,
  Phone,
  Video,
  ChevronDown,
  ChevronUp,
} from "lucide-react-native";
import { io, Socket } from "socket.io-client";

import { BASEURL } from "@/app.env";
import {
  getProfileService,
  getChatMessagesService,
  sendChatMessageService,
  getProviderJobDetailsService,
  updateProviderBidService,
  rejectProviderBidService,
  getConsumerJobBidsService,
  acceptConsumerBidService,
  rejectConsumerBidService,
} from "@/src/services";
import { getAccessTokenFromSecureStore } from "@/src/utils/localStorageKey";
import { FONTS } from "@/src/theme/fonts";
import { ScreenWrapper } from "../wrapper";

type ChatRouteParams = {
  jobId?: string;
  otherUserId: string;
  otherUserName?: string;
  jobTitle?: string;
  headerSubtitle?: string;
  conversationType?: "job" | "direct";
};

type ChatMessage = {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: "customer" | "provider";
  text: string;
  imageUrl?: string;
  createdAt: string;
};

type CurrentUser = {
  _id: string;
  fullname?: string;
  role?: "customer" | "provider";
  providerProfile?: {
    profilePhotoUrl?: string;
  };
};

type BidContext = {
  id: string;
  amount: number;
  message: string;
  status: "pending" | "accepted" | "rejected" | "completed";
};

export function ChatRoom({
  jobId,
  otherUserId,
  otherUserName,
  jobTitle,
  headerSubtitle,
  conversationType = "job",
}: ChatRouteParams) {
  const { height: windowHeight } = useWindowDimensions();
  const socketRef = useRef<Socket | null>(null);
  const messagesScrollRef = useRef<ScrollView | null>(null);
  const previousMessageCountRef = useRef(0);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isBidLoading, setIsBidLoading] = useState(false);
  const [isBidSubmitting, setIsBidSubmitting] = useState(false);
  const [bidContext, setBidContext] = useState<BidContext | null>(null);
  const [isBidPanelOpen, setIsBidPanelOpen] = useState(false);
  const [bidAmountInput, setBidAmountInput] = useState("");
  const [bidMessageInput, setBidMessageInput] = useState("");
  const isDirectChat = conversationType === "direct" || !jobId;

  const roomLabel = useMemo(
    () => jobTitle || (isDirectChat ? "Direct chat" : headerSubtitle || "Chat"),
    [headerSubtitle, isDirectChat, jobTitle],
  );

  const keyboardVerticalOffset = useMemo(() => {
    if (Platform.OS === "ios") return 8;
    return Math.max(24, Math.round(windowHeight * 0.08));
  }, [windowHeight]);

  const loadChat = useCallback(async () => {
    setIsLoading(true);
    try {
      const [profileResponse, chatResponse] = await Promise.all([
        getProfileService(),
        getChatMessagesService({
          jobId: isDirectChat ? undefined : jobId,
          otherUserId,
        }),
      ]);

      if (profileResponse?.success && profileResponse?.data) {
        setCurrentUser(profileResponse.data);
      }

      if (chatResponse?.success && chatResponse?.data) {
        setMessages(
          Array.isArray(chatResponse.data.messages)
            ? chatResponse.data.messages
            : [],
        );
      } else {
        setMessages([]);
      }
    } finally {
      setIsLoading(false);
    }
  }, [isDirectChat, jobId, otherUserId]);

  useEffect(() => {
    loadChat();
  }, [loadChat]);

  const loadBidContext = useCallback(async () => {
    if (isDirectChat || !jobId || !currentUser?.role) {
      setBidContext(null);
      setIsBidLoading(false);
      return;
    }

    if (!currentUser?.role) return;

    setIsBidLoading(true);
    try {
      if (currentUser.role === "provider") {
        const response = await getProviderJobDetailsService(jobId);
        if (response?.success && response?.data?.myBid) {
          const myBid = response.data.myBid;
          const mapped: BidContext = {
            id: String(myBid.id || ""),
            amount: Number(myBid.amount || 0),
            message: String(myBid.message || ""),
            status: String(myBid.status || "pending") as BidContext["status"],
          };
          setBidContext(mapped);
          setBidAmountInput(mapped.amount ? String(mapped.amount) : "");
          setBidMessageInput(mapped.message || "");
        } else {
          setBidContext(null);
        }
        return;
      }

      const response = await getConsumerJobBidsService(jobId);
      const bids = Array.isArray(response?.data?.bids)
        ? response.data.bids
        : [];
      const relatedBid = bids.find(
        (bid: any) => String(bid.providerId) === String(otherUserId),
      );

      if (relatedBid) {
        setBidContext({
          id: String(relatedBid.id || ""),
          amount: Number(relatedBid.bidAmount || 0),
          message: String(relatedBid.bidMessage || ""),
          status: String(
            relatedBid.status || "pending",
          ) as BidContext["status"],
        });
      } else {
        setBidContext(null);
      }
    } finally {
      setIsBidLoading(false);
    }
  }, [currentUser?.role, isDirectChat, jobId, otherUserId]);

  useEffect(() => {
    loadBidContext();
  }, [loadBidContext]);

  useEffect(() => {
    if (!bidContext) {
      setIsBidPanelOpen(false);
      return;
    }

    if (bidContext.status === "pending") {
      setIsBidPanelOpen(true);
    }
  }, [bidContext]);

  useEffect(() => {
    if (isLoading || messages.length === 0) return;

    const previousCount = previousMessageCountRef.current;
    const isInitialLoad = previousCount === 0;
    const hasNewMessage = messages.length > previousCount;

    if (isInitialLoad || hasNewMessage) {
      requestAnimationFrame(() => {
        messagesScrollRef.current?.scrollToEnd({ animated: !isInitialLoad });
      });
    }

    previousMessageCountRef.current = messages.length;
  }, [isLoading, messages.length]);

  useEffect(() => {
    let mounted = true;

    const connectSocket = async () => {
      const token = await getAccessTokenFromSecureStore();
      if (!token || !mounted) return;

      const socket = io(BASEURL, {
        transports: ["websocket"],
        auth: { token },
      });

      socketRef.current = socket;

      socket.on("connect", () => {
        socket.emit("chat:join", { jobId, otherUserId });
      });

      socket.on("chat:message", (message: ChatMessage) => {
        setMessages((prev) => {
          const exists = prev.some((item) => item.id === message.id);
          if (exists) return prev;
          return [...prev, message];
        });

        if (currentUser?._id && message.senderId !== currentUser._id) {
          socket.emit("chat:ack", { messageId: message.id });
        }
      });

      socket.on("disconnect", () => {
        // no-op
      });
    };

    connectSocket();

    return () => {
      mounted = false;
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [currentUser?._id, jobId, otherUserId]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isSending) return;

    setIsSending(true);
    try {
      const response = await sendChatMessageService({
        jobId,
        otherUserId,
        text,
      });

      if (response?.success && response?.data) {
        const sentMessage: ChatMessage = response.data;
        setMessages((prev) => {
          const exists = prev.some((item) => item.id === sentMessage.id);
          if (exists) return prev;
          return [...prev, sentMessage];
        });
        setInput("");
      }
    } finally {
      setIsSending(false);
    }
  };

  const handleUpcomingFeature = (feature: "Voice" | "Video") => {
    Alert.alert("Coming Soon", `${feature} calling is an upcoming feature.`);
  };

  const handleUpdateBid = async () => {
    if (!bidContext?.id) {
      Alert.alert("Error", "Bid details are unavailable.");
      return;
    }

    const parsedAmount = Number.parseInt(bidAmountInput.trim(), 10);
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      Alert.alert("Invalid bid", "Enter a valid bid amount.");
      return;
    }

    setIsBidSubmitting(true);
    try {
      const response = await updateProviderBidService(bidContext.id, {
        bidAmount: parsedAmount,
        bidMessage: bidMessageInput.trim(),
      });
      if (response?.success) {
        await loadBidContext();
      }
    } finally {
      setIsBidSubmitting(false);
    }
  };

  const handleRejectProviderBid = () => {
    if (!bidContext?.id) return;

    Alert.alert("Reject Bid", "Are you sure you want to reject this bid?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Reject",
        style: "destructive",
        onPress: async () => {
          setIsBidSubmitting(true);
          try {
            const response = await rejectProviderBidService(bidContext.id);
            if (response?.success) {
              setBidContext(null);
            }
          } finally {
            setIsBidSubmitting(false);
          }
        },
      },
    ]);
  };

  const handleAcceptBid = async () => {
    if (!jobId || !bidContext?.id) return;

    setIsBidSubmitting(true);
    try {
      const response = await acceptConsumerBidService({
        jobId,
        bidId: bidContext.id,
      });
      if (response?.success) {
        await loadBidContext();
      }
    } finally {
      setIsBidSubmitting(false);
    }
  };

  const handleRejectConsumerBid = () => {
    if (!jobId || !bidContext?.id) return;

    Alert.alert("Reject Bid", "Reject this bid from the conversation?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Reject",
        style: "destructive",
        onPress: async () => {
          setIsBidSubmitting(true);
          try {
            const response = await rejectConsumerBidService({
              jobId,
              bidId: bidContext.id,
            });
            if (response?.success) {
              setBidContext(null);
            }
          } finally {
            setIsBidSubmitting(false);
          }
        },
      },
    ]);
  };

  const canProviderModifyBid =
    currentUser?.role === "provider" && bidContext?.status === "pending";
  const canConsumerManageBid =
    currentUser?.role === "customer" && bidContext?.status === "pending";

  const currentUserId = currentUser?._id;

  return (
    <ScreenWrapper
      style={styles.container}
      disableScroll
      contentContainerStyle={styles.wrapperContent}
    >
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <View style={styles.root}>
          <LinearGradient
            colors={["#6D5DF6", "#8A6DFF", "#B088FF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.header}
          >
            <View style={styles.headerRow}>
              <TouchableOpacity
                onPress={() => router.back()}
                style={styles.backBtn}
              >
                <ArrowLeft size={22} color="#fff" />
              </TouchableOpacity>

              <View style={styles.headerTextWrap}>
                <Text style={styles.headerName} numberOfLines={1}>
                  {otherUserName || "Chat"}
                </Text>
                <Text style={styles.headerSubtitle} numberOfLines={1}>
                  {roomLabel}
                </Text>
              </View>

              <View style={styles.headerIcons}>
                <TouchableOpacity
                  style={styles.headerIconBtn}
                  onPress={() => handleUpcomingFeature("Voice")}
                >
                  <Phone size={18} color="#111" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.headerIconBtn}
                  onPress={() => handleUpcomingFeature("Video")}
                >
                  <Video size={18} color="#111" />
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>

          {!isDirectChat ? (
            <View style={styles.jobCard}>
              <Text style={styles.jobTitle}>{jobTitle || "Job"}</Text>
              <Text style={styles.jobSubtitle}>{roomLabel}</Text>
            </View>
          ) : (
            <View style={styles.jobCard}>
              <Text style={styles.jobTitle}>{otherUserName || "Provider"}</Text>
              <Text style={styles.jobSubtitle}>Direct chat</Text>
            </View>
          )}

          {!isDirectChat && isBidLoading ? (
            <View style={styles.bidCard}>
              <ActivityIndicator size="small" color="#6D5DF6" />
            </View>
          ) : !isDirectChat && bidContext ? (
            <View style={styles.bidCard}>
              <TouchableOpacity
                style={styles.bidHeaderRow}
                onPress={() => setIsBidPanelOpen((prev) => !prev)}
                activeOpacity={0.8}
              >
                <View>
                  <Text style={styles.bidTitle}>Bid Negotiation</Text>
                  <Text style={styles.bidMeta}>
                    INR {bidContext.amount.toLocaleString("en-IN")} •{" "}
                    {bidContext.status}
                  </Text>
                </View>
                {isBidPanelOpen ? (
                  <ChevronUp size={18} color="#6B7280" />
                ) : (
                  <ChevronDown size={18} color="#6B7280" />
                )}
              </TouchableOpacity>

              {isBidPanelOpen && (
                <>
                  {currentUser?.role === "provider" && canProviderModifyBid && (
                    <>
                      <TextInput
                        style={styles.bidInput}
                        value={bidAmountInput}
                        onChangeText={setBidAmountInput}
                        keyboardType="numeric"
                        placeholder="Update bid amount"
                        placeholderTextColor="#9CA3AF"
                        editable={!isBidSubmitting}
                      />
                      <TextInput
                        style={[styles.bidInput, styles.bidMessageInput]}
                        value={bidMessageInput}
                        onChangeText={setBidMessageInput}
                        placeholder="Update bid message"
                        placeholderTextColor="#9CA3AF"
                        editable={!isBidSubmitting}
                        multiline
                      />
                      <View style={styles.bidActionsRow}>
                        <TouchableOpacity
                          style={styles.primaryBidAction}
                          onPress={handleUpdateBid}
                          disabled={isBidSubmitting}
                        >
                          <Text style={styles.primaryBidActionText}>
                            Update Bid
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.dangerBidAction}
                          onPress={handleRejectProviderBid}
                          disabled={isBidSubmitting}
                        >
                          <Text style={styles.dangerBidActionText}>Reject</Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  )}

                  {currentUser?.role === "customer" && canConsumerManageBid && (
                    <View style={styles.bidActionsRow}>
                      <TouchableOpacity
                        style={styles.primaryBidAction}
                        onPress={handleAcceptBid}
                        disabled={isBidSubmitting}
                      >
                        <Text style={styles.primaryBidActionText}>
                          Accept Bid
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.dangerBidAction}
                        onPress={handleRejectConsumerBid}
                        disabled={isBidSubmitting}
                      >
                        <Text style={styles.dangerBidActionText}>Reject</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </>
              )}
            </View>
          ) : null}

          {isLoading ? (
            <View style={styles.loadingWrap}>
              <ActivityIndicator size="large" color="#6D5DF6" />
            </View>
          ) : (
            <ScrollView
              ref={messagesScrollRef}
              style={styles.messagesWrap}
              contentContainerStyle={styles.messagesContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {messages.length === 0 ? (
                <View style={styles.emptyWrap}>
                  <Text style={styles.emptyTitle}>Start the conversation</Text>
                  <Text style={styles.emptySub}>
                    Messages for this job will appear here in real time.
                  </Text>
                </View>
              ) : (
                messages.slice().map((message) => {
                  const isMine = message.senderId === currentUserId;
                  return (
                    <View
                      key={message.id}
                      style={[
                        styles.messageRow,
                        isMine ? styles.messageRowRight : styles.messageRowLeft,
                      ]}
                    >
                      <View
                        style={[
                          styles.bubble,
                          isMine ? styles.myBubble : styles.otherBubble,
                        ]}
                      >
                        <Text
                          style={[
                            styles.messageText,
                            isMine && styles.messageTextMine,
                          ]}
                        >
                          {message.text}
                        </Text>
                      </View>
                      <Text style={styles.timeText}>
                        {new Date(message.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Text>
                    </View>
                  );
                })
              )}
            </ScrollView>
          )}

          <View style={styles.inputBar}>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={setInput}
              placeholder={`Message ${otherUserName || "user"}...`}
              placeholderTextColor="#9CA3AF"
              multiline
            />
            <TouchableOpacity
              style={[styles.sendBtn, isSending && styles.sendBtnDisabled]}
              onPress={handleSend}
              disabled={isSending}
            >
              {isSending ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Send size={18} color="#fff" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FA",
  },
  wrapperContent: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  keyboardContainer: {
    flex: 1,
  },
  root: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    borderRadius: 24,
    paddingTop: 18,
    paddingBottom: 18,
    paddingHorizontal: 14,
    marginTop: 8,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  headerTextWrap: {
    flex: 1,
  },
  headerName: {
    color: "#fff",
    fontSize: 18,
    fontFamily: FONTS.BOLD,
  },
  headerSubtitle: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 12,
    fontFamily: FONTS.REGULAR,
    marginTop: 2,
  },
  headerIcons: {
    flexDirection: "row",
    gap: 8,
  },
  headerIconBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  jobCard: {
    backgroundColor: "#fff",
    marginTop: 12,
    padding: 14,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  jobTitle: {
    fontSize: 16,
    fontFamily: FONTS.SEMIBOLD,
    color: "#111827",
  },
  jobSubtitle: {
    marginTop: 4,
    fontSize: 12,
    fontFamily: FONTS.REGULAR,
    color: "#6B7280",
  },
  bidCard: {
    marginTop: 10,
    padding: 12,
    borderRadius: 14,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ECEBFF",
  },
  bidHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bidTitle: {
    fontFamily: FONTS.SEMIBOLD,
    color: "#111827",
    fontSize: 14,
  },
  bidMeta: {
    marginTop: 4,
    color: "#6B7280",
    fontFamily: FONTS.REGULAR,
    fontSize: 12,
  },
  bidInput: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: FONTS.REGULAR,
    fontSize: 13,
    color: "#111827",
    backgroundColor: "#fff",
  },
  bidMessageInput: {
    minHeight: 70,
    textAlignVertical: "top",
  },
  bidActionsRow: {
    marginTop: 10,
    flexDirection: "row",
    gap: 8,
  },
  primaryBidAction: {
    flex: 1,
    backgroundColor: "#6D5DF6",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  primaryBidActionText: {
    color: "#fff",
    fontFamily: FONTS.SEMIBOLD,
    fontSize: 12,
  },
  dangerBidAction: {
    borderWidth: 1,
    borderColor: "#FCA5A5",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#FEF2F2",
    alignItems: "center",
    justifyContent: "center",
  },
  dangerBidActionText: {
    color: "#B91C1C",
    fontFamily: FONTS.SEMIBOLD,
    fontSize: 12,
  },
  loadingWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  messagesWrap: {
    flex: 1,
    paddingTop: 12,
    paddingBottom: 10,
  },
  messagesContent: {
    paddingBottom: 4,
  },
  emptyWrap: {
    alignItems: "center",
    marginTop: 40,
  },
  emptyTitle: {
    fontFamily: FONTS.BOLD,
    color: "#111827",
    fontSize: 16,
  },
  emptySub: {
    marginTop: 6,
    color: "#6B7280",
    fontFamily: FONTS.REGULAR,
    fontSize: 12,
    textAlign: "center",
  },
  messageRow: {
    marginBottom: 12,
    maxWidth: "85%",
  },
  messageRowRight: {
    alignSelf: "flex-end",
    alignItems: "flex-end",
  },
  messageRowLeft: {
    alignSelf: "flex-start",
    alignItems: "flex-start",
  },
  bubble: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
    maxWidth: "100%",
  },
  myBubble: {
    backgroundColor: "#6D5DF6",
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: "#fff",
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontFamily: FONTS.REGULAR,
    color: "#111827",
    fontSize: 14,
    lineHeight: 20,
  },
  messageTextMine: {
    color: "#fff",
  },
  timeText: {
    marginTop: 4,
    fontSize: 10,
    color: "#9CA3AF",
    fontFamily: FONTS.REGULAR,
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10,
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    minHeight: 48,
    maxHeight: 120,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: "#111827",
    fontFamily: FONTS.REGULAR,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  sendBtn: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#6D5DF6",
    alignItems: "center",
    justifyContent: "center",
  },
  sendBtnDisabled: {
    opacity: 0.65,
  },
});
