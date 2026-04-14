import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import {
  ArrowLeft,
  Bell,
  CalendarCheck,
  MessageSquare,
  Star,
  CheckCircle2,
  Clock,
  Settings,
} from "lucide-react-native";

import { ScreenWrapper } from "@/src/components/wrapper";
import { FONTS } from "@/src/theme/fonts";
import useProviderApi from "@/src/hooks/apiHooks/useProviderApi";
import { useRouter } from "expo-router";

type ProviderProfile = {
  profilePhotoUrl?: string;
  fullname?: string;
  location?: string;
  skills?: string[];
  trustScore?: number;
  verified?: boolean;
  rating?: number;
  reviews?: number;
  jobsDone?: number;
  bio?: string;
  availability?: {
    availableDays?: string[];
    preferredWorkHours?: string[];
  };
  portfolioPhotos?: string[];
};

export default function ProfileScreen() {
  const { getProviderProfile } = useProviderApi();
  const [profileData, setProfileData] = useState<ProviderProfile | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  const router = useRouter();

  const loadProfile = useCallback(async () => {
    setIsFetching(true);
    const data = await getProviderProfile();
    if (data) {
      setProfileData(data);
    }
    setIsFetching(false);
  }, [getProviderProfile]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [loadProfile]),
  );

  const handleContactSupport = () => {
    Alert.alert("Support", "Support chat will be available soon.");
  };

  return (
    <View style={styles.container}>
      <ScreenWrapper
        contentContainerStyle={styles.scrollContent}
        onRefresh={loadProfile}
      >
        <LinearGradient
          colors={["#6D5DF6", "#8A6DFF", "#B088FF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.headerTop}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.iconWrap}
            >
              <ArrowLeft size={22} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.brand}>Profile</Text>
            <View style={styles.headerRight}>
              <TouchableOpacity
                style={styles.bellWrap}
                onPress={() => router.push("/Provider/NotificationsScreen")}
              >
                <Bell size={20} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.bellWrap}
                onPress={() => router.push("/settings")}
              >
                <Settings size={20} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        {isFetching && !profileData ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#6D5DF6" />
            <Text style={styles.loadingText}>Loading profile...</Text>
          </View>
        ) : (
          <>
            <View style={styles.profileOverlap}>
              <Image
                source={{
                  uri:
                    profileData?.profilePhotoUrl || "https://i.pravatar.cc/150",
                }}
                style={styles.avatar}
              />
              <Text style={styles.name}>
                {profileData?.fullname || "Provider Name"}
              </Text>
              <Text style={styles.locationText}>
                {profileData?.location || "Mathura, UP"}
              </Text>

              <View style={styles.skills}>
                {profileData?.skills?.map((skill: string, idx: number) => (
                  <Text key={`${skill}-${idx}`} style={styles.skill}>
                    {skill}
                  </Text>
                ))}
              </View>
            </View>

            <View style={styles.sectionCard}>
              <View style={styles.trustHeader}>
                <Star size={20} color="#F59E0B" fill="#F59E0B" />
                <Text style={styles.trustTitle}>Trust Score</Text>
                <Text style={styles.trustScore}>
                  {profileData?.trustScore || "92"}/100
                </Text>
              </View>

              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${profileData?.trustScore || 92}%` },
                  ]}
                />
              </View>

              <View style={styles.badgesRow}>
                <View style={styles.badge}>
                  <Clock size={16} color="#4B5563" />
                  <Text style={styles.badgeText}>On Time</Text>
                </View>
                <View style={styles.badge}>
                  <CheckCircle2 size={16} color="#4B5563" />
                  <Text style={styles.badgeText}>
                    {profileData?.verified || true ? "Verified" : "Unverified"}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>
                  {profileData?.rating || "4.8"}
                </Text>
                <Text style={styles.statLabel}>RATING</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>
                  {profileData?.reviews || "120"}
                </Text>
                <Text style={styles.statLabel}>REVIEWS</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>
                  {profileData?.jobsDone || "34"}
                </Text>
                <Text style={styles.statLabel}>JOBS</Text>
              </View>
            </View>

            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>About Me</Text>
              <Text style={styles.aboutText}>
                {profileData?.bio ||
                  "Certified technician with professional experience in the field."}
              </Text>
            </View>

            <View style={styles.availableCard}>
              <CalendarCheck size={20} color="#6D5DF6" />
              <View>
                <Text style={styles.availableTitle}>Availability</Text>
                <Text style={styles.availableTime}>
                  {profileData?.availability?.availableDays?.join(", ") ||
                    "Mon - Sat"}
                  {" • "}
                  {profileData?.availability?.preferredWorkHours?.join(", ") ||
                    "9 AM - 7 PM"}
                </Text>
              </View>
            </View>

            {profileData?.portfolioPhotos &&
              profileData.portfolioPhotos.length > 0 && (
                <View style={styles.sectionCard}>
                  <Text style={styles.sectionTitle}>Portfolio</Text>
                  <View style={styles.portfolioGrid}>
                    {profileData.portfolioPhotos.map(
                      (photo: string, idx: number) => (
                        <Image
                          key={`${photo}-${idx}`}
                          source={{ uri: photo }}
                          style={styles.portfolioImage}
                        />
                      ),
                    )}
                  </View>
                </View>
              )}

            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.editBtn}
                onPress={() => router.push("/Provider/personal-information")}
              >
                <Text style={styles.editBtnText}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.contactBtn}
                onPress={handleContactSupport}
              >
                <MessageSquare size={18} color="#6D5DF6" />
                <Text style={styles.contactBtnText}>Contact Support</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        <View style={{ height: 80 }} />
      </ScreenWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    height: 180,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingTop: 65,
    paddingHorizontal: 20,
    shadowColor: "#6D5DF6",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerRight: {
    flexDirection: "row",
    gap: 10,
  },
  iconWrap: {
    padding: 8,
  },
  brand: {
    fontSize: 22,
    fontFamily: FONTS.BOLD,
    color: "#fff",
  },
  bellWrap: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 14,
  },
  profileOverlap: {
    alignItems: "center",
    marginTop: -60,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    borderColor: "#fff",
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontFamily: FONTS.BOLD,
    color: "#1F2937",
    marginBottom: 4,
  },
  locationText: {
    fontSize: 14,
    fontFamily: FONTS.REGULAR,
    color: "#6B7280",
    marginBottom: 10,
  },
  role: {
    fontSize: 14,
    fontFamily: FONTS.REGULAR,
    color: "#6D5DF6",
    marginBottom: 12,
  },
  skills: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
    marginTop: 6,
  },
  skill: {
    fontSize: 12,
    fontFamily: FONTS.SEMIBOLD,
    color: "#6D5DF6",
    backgroundColor: "#ECEBFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  sectionCard: {
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: FONTS.SEMIBOLD,
    color: "#1F2937",
    marginBottom: 12,
  },
  trustHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  trustTitle: {
    flex: 1,
    fontSize: 18,
    fontFamily: FONTS.SEMIBOLD,
    color: "#1F2937",
  },
  trustScore: {
    fontSize: 18,
    fontFamily: FONTS.BOLD,
    color: "#6D5DF6",
  },
  progressTrack: {
    height: 8,
    backgroundColor: "#F3F4F6",
    marginVertical: 16,
    borderRadius: 6,
  },
  progressFill: {
    height: 8,
    backgroundColor: "#6D5DF6",
    borderRadius: 6,
  },
  badgesRow: {
    flexDirection: "row",
    gap: 12,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 13,
    fontFamily: FONTS.SEMIBOLD,
    color: "#4B5563",
  },
  statsRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 12,
    marginVertical: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  statNumber: {
    fontSize: 22,
    fontFamily: FONTS.BOLD,
    color: "#1F2937",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    fontFamily: FONTS.SEMIBOLD,
    color: "#6B7280",
    marginTop: 4,
  },
  aboutText: {
    fontSize: 14,
    fontFamily: FONTS.REGULAR,
    color: "#4B5563",
    lineHeight: 22,
  },
  availableCard: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    gap: 16,
  },
  availableTitle: {
    fontSize: 16,
    fontFamily: FONTS.SEMIBOLD,
    color: "#1F2937",
  },
  availableTime: {
    fontSize: 13,
    fontFamily: FONTS.REGULAR,
    color: "#6B7280",
    marginTop: 4,
  },
  experienceCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    alignItems: "center",
  },
  experienceYears: {
    fontSize: 24,
    fontFamily: FONTS.BOLD,
    color: "#6D5DF6",
    marginBottom: 4,
  },
  experienceText: {
    fontSize: 14,
    fontFamily: FONTS.REGULAR,
    color: "#6B7280",
  },
  portfolioGrid: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },
  portfolioImage: {
    width: "31%",
    aspectRatio: 1,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
  },
  actionButtons: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  editBtn: {
    backgroundColor: "#6D5DF6",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#6D5DF6",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  editBtnText: {
    fontSize: 16,
    fontFamily: FONTS.BOLD,
    color: "#fff",
  },
  contactBtn: {
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  contactBtnText: {
    fontSize: 16,
    fontFamily: FONTS.SEMIBOLD,
    color: "#1F2937",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  loadingText: {
    fontSize: 15,
    fontFamily: FONTS.REGULAR,
    color: "#6B7280",
  },
});
