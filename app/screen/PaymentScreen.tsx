import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  Wallet,
  Landmark,
} from "lucide-react-native";

type Method = "upi" | "card" | "wallet" | "bank";

export default function PaymentScreen() {
  const [selected, setSelected] = useState<Method>("upi");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <ArrowLeft size={22} />
          <Text style={styles.title}>Confirm Payment</Text>
          <Text style={styles.logo}>Gigly</Text>
        </View>

        {/* SERVICE CARD */}
        <View style={styles.card}>
          <View style={styles.row}>
            <Image
              source={{
                uri: "https://randomuser.me/api/portraits/men/10.jpg",
              }}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.service}>
                Professional Home Painting
              </Text>
              <Text style={styles.sub}>with Alex Rivers</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <PriceRow label="Service fee" value="₹650" />
          <PriceRow label="Platform fee (5%)" value="₹32" />

          <View style={styles.divider} />

          <PriceRow label="Total" value="₹682" bold />

          {/* ESCROW */}
          <View style={styles.escrow}>
            <ShieldCheck size={16} color="#16A34A" />
            <Text style={styles.escrowText}>
              Payment held in escrow until job completion
            </Text>
          </View>
        </View>

        {/* PAYMENT METHODS */}
        <Text style={styles.section}>Payment Method</Text>

        <PaymentOption
          label="UPI"
          icon={<CreditCard size={18} />}
          active={selected === "upi"}
          onPress={() => setSelected("upi")}
        />

        <PaymentOption
          label="Card"
          icon={<CreditCard size={18} />}
          active={selected === "card"}
          onPress={() => setSelected("card")}
        />

        <PaymentOption
          label="Wallet"
          icon={<Wallet size={18} />}
          active={selected === "wallet"}
          onPress={() => setSelected("wallet")}
        />

        <PaymentOption
          label="Net Banking"
          icon={<Landmark size={18} />}
          active={selected === "bank"}
          onPress={() => setSelected("bank")}
        />

        {/* SECURE NOTE */}
        <Text style={styles.secure}>
          🔒 Secure Checkout • 256-bit SSL Encryption
        </Text>

        {/* CTA */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            Complete Payment • ₹682
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

//
// 🔷 COMPONENTS
//
const PriceRow = ({
  label,
  value,
  bold = false,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) => (
  <View style={styles.priceRow}>
    <Text style={{ color: "#666" }}>{label}</Text>
    <Text style={{ fontWeight: bold ? "700" : "500" }}>
      {value}
    </Text>
  </View>
);

const PaymentOption = ({
  label,
  icon,
  active,
  onPress,
}: any) => (
  <TouchableOpacity
    style={[
      styles.paymentCard,
      active && styles.activePayment,
    ]}
    onPress={onPress}
  >
    <View style={styles.row}>
      {icon}
      <Text style={{ marginLeft: 10 }}>{label}</Text>
    </View>

    <View
      style={[
        styles.radio,
        active && styles.radioActive,
      ]}
    />
  </TouchableOpacity>
);

//
// 🎨 STYLES
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FA",
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontWeight: "600",
  },
  logo: {
    color: "#6C63FF",
    fontWeight: "700",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginTop: 10,
    elevation: 3,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },

  service: {
    fontWeight: "600",
  },
  sub: {
    fontSize: 12,
    color: "#666",
  },

  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 10,
  },

  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },

  escrow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E6F7EE",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  escrowText: {
    fontSize: 12,
    marginLeft: 6,
    color: "#16A34A",
  },

  section: {
    marginTop: 20,
    fontWeight: "600",
  },

  paymentCard: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  activePayment: {
    borderWidth: 1,
    borderColor: "#6C63FF",
  },

  radio: {
    width: 18,
    height: 18,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },

  radioActive: {
    backgroundColor: "#6C63FF",
    borderColor: "#6C63FF",
  },

  secure: {
    textAlign: "center",
    fontSize: 12,
    color: "#999",
    marginTop: 16,
  },

  button: {
    backgroundColor: "#6C63FF",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});