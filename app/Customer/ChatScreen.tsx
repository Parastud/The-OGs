import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Send,
  Paperclip,
  Camera,
  Phone,
  Video,
} from "lucide-react-native";

//
// 🔷 TYPES
//
type Message = {
  id: string;
  text?: string;
  image?: string;
  sender: "me" | "other";
  time: string;
};

//
// 🔷 DATA
//
const initialMessages: Message[] = [
  {
    id: "1",
    text: "Hi! I'm about 10 minutes away.",
    sender: "other",
    time: "09:42 AM",
  },
  {
    id: "2",
    text: "Great, come to Flat 402.",
    sender: "me",
    time: "09:43 AM",
  },
  {
    id: "3",
    text: "Perfect. See you soon.",
    sender: "other",
    time: "09:44 AM",
  },
  {
    id: "4",
    text: "Sending leak photo.",
    sender: "me",
    time: "09:45 AM",
  },
  {
    id: "5",
    image:
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7",
    sender: "me",
    time: "09:45 AM",
  },
];

export default function ChatScreen() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "me",
      time: "Now",
    };

    setMessages((prev) => [newMsg, ...prev]);
    setInput("");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <ArrowLeft size={22} />

        <View>
          <Text style={styles.name}>Siddharth V.</Text>
          <Text style={styles.sub}>Fix kitchen tap</Text>
        </View>

        <View style={styles.headerIcons}>
          <Phone size={18} />
          <Video size={18} />
        </View>
      </View>

      {/* JOB STATUS */}
      <View style={styles.jobCard}>
        <Text style={styles.jobText}>Fix kitchen tap</Text>
        <Text style={styles.status}>In Progress</Text>
      </View>

      <View style={styles.accepted}>
        <Text style={styles.acceptedText}>
          Bid of ₹650 accepted
        </Text>
      </View>

      {/* CHAT */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        inverted
        contentContainerStyle={{ paddingBottom: 10 }}
        renderItem={({ item }) => <MessageBubble msg={item} />}
      />

      {/* INPUT */}
      <View style={styles.inputRow}>
        <TouchableOpacity>
          <Paperclip size={20} color="#666" />
        </TouchableOpacity>

        <TextInput
          placeholder="Type a message..."
          value={input}
          onChangeText={setInput}
          style={styles.input}
        />

        <TouchableOpacity>
          <Camera size={20} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Send size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

//
// 🔷 MESSAGE BUBBLE
//
const MessageBubble = ({ msg }: { msg: Message }) => {
  const isMe = msg.sender === "me";

  return (
    <View
      style={[
        styles.bubbleContainer,
        isMe ? { alignItems: "flex-end" } : { alignItems: "flex-start" },
      ]}
    >
      <View
        style={[
          styles.bubble,
          isMe ? styles.myBubble : styles.otherBubble,
        ]}
      >
        {msg.image ? (
          <Image source={{ uri: msg.image }} style={styles.image} />
        ) : (
          <Text style={{ color: isMe ? "#fff" : "#000" }}>
            {msg.text}
          </Text>
        )}
      </View>

      <Text style={styles.time}>{msg.time}</Text>
    </View>
  );
};

//
// 🎨 STYLES
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FA",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
  },

  name: {
    fontWeight: "600",
  },
  sub: {
    fontSize: 12,
    color: "#666",
  },

  headerIcons: {
    flexDirection: "row",
    gap: 12,
  },

  jobCard: {
    backgroundColor: "#fff",
    marginHorizontal: 12,
    padding: 10,
    borderRadius: 10,
  },
  jobText: {
    fontWeight: "600",
  },
  status: {
    color: "#6C63FF",
    fontSize: 12,
  },

  accepted: {
    alignSelf: "center",
    backgroundColor: "#E6F7EE",
    padding: 6,
    borderRadius: 10,
    marginVertical: 6,
  },
  acceptedText: {
    fontSize: 12,
    color: "#16A34A",
  },

  bubbleContainer: {
    paddingHorizontal: 12,
    marginVertical: 4,
  },

  bubble: {
    maxWidth: "75%",
    padding: 10,
    borderRadius: 14,
  },

  myBubble: {
    backgroundColor: "#6C63FF",
  },

  otherBubble: {
    backgroundColor: "#fff",
  },

  time: {
    fontSize: 10,
    color: "#999",
    marginTop: 2,
  },

  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 0.5,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },

  input: {
    flex: 1,
    marginHorizontal: 10,
  },

  sendBtn: {
    backgroundColor: "#6C63FF",
    padding: 10,
    borderRadius: 20,
  },
});