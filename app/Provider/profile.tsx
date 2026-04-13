import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import {
  ArrowLeft,
  Bell,
  CalendarCheck,
  MessageSquare,
  Star,
} from "lucide-react-native";

import { useRouter } from "@/.expo/types/router";
import { ScreenWrapper } from "@/src/components/wrapper";
import useProviderApi from "@/src/hooks/apiHooks/useProviderApi";
import { COLORS } from "@/src/theme/colors";
import { FONTS } from "@/src/theme/fonts";
import { removeTokenFromSecureStore } from "@/src/utils/localStorageKey";

export default function ProfileScreen() {
  const { getProviderProfile, isLoading } = useProviderApi();
  const [profileData, setProfileData] = useState<any>(null);

  const router = useRouter()

  useEffect(() => {
    const loadProfile = async () => {
      const data = await getProviderProfile();
      if (data) {
        setProfileData(data);
      }
    };

    loadProfile();
  }, []);

  if (!profileData && !isLoading) {
    return (
      <View style={styles.container}>
        <ScreenWrapper
          safeArea
          style={styles.wrapper}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.header}>
            <ArrowLeft size={22} color={COLORS.textPrimary} />
            <Text style={styles.brand}>Gigly</Text>
            <Bell size={20} color={COLORS.textPrimary} />
          </View>
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading profile...</Text>
          </View>
        </ScreenWrapper>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScreenWrapper
        safeArea
        style={styles.wrapper}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <ArrowLeft size={22} color={COLORS.textPrimary} />
          <Text style={styles.brand}>Gigly</Text>

          <View style={styles.headerRight}>
            <Text style={styles.location}>{profileData?.location}</Text>
            <Bell size={20} color={COLORS.textPrimary} />
          </View>
        </View>

        <View style={styles.profileCard}>
          <Image
            source={{
              uri: profileData?.profilePhotoUrl || "https://i.pravatar.cc/150",
            }}
            style={styles.avatar}
          />

          <Text style={styles.name}>
            {profileData?.fullname || "Provider Name"}
          </Text>
          <Text style={styles.role}>{profileData?.role}</Text>

          <View style={styles.skills}>
            {profileData?.skills?.map((skill: string, idx: number) => (
              <Text key={idx} style={styles.skill}>
                {skill}
              </Text>
            ))}
          </View>

          <View style={styles.trustCard}>
            <View style={styles.circle}>
              <Text style={styles.trustNumber}>{profileData?.trustScore}</Text>
              <Text style={styles.trustLabel}>TRUST SCORE</Text>
            </View>

            <Text style={styles.verified}>
              {profileData?.verified ? "✓ AI Verified Expert" : "Not Verified"}
            </Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{profileData?.rating}</Text>
            <Star size={16} color={COLORS.starFilled} />
            <Text style={styles.statLabel}>RATING</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{profileData?.reviews}</Text>
            <Text style={styles.statLabel}>REVIEWS</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{profileData?.jobsDone}</Text>
            <Text style={styles.statLabel}>JOBS</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ABOUT ME</Text>
          <Text style={styles.aboutText}>
            {profileData?.bio ||
              "Certified technician with professional experience in the field."}
          </Text>
        </View>

        <View style={styles.availableCard}>
          <CalendarCheck size={18} color={COLORS.success} />

          <View>
            <Text style={styles.availableTitle}>AVAILABLE</Text>
            <Text style={styles.availableTime}>
              {profileData?.availability?.availableDays?.join(", ") ||
                "Mon-Sat"}
              {" • "}
              {profileData?.availability?.preferredWorkHours?.join(", ") ||
                "9AM-7PM"}
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>EXPERIENCE</Text>
        </View>

        <View style={styles.experienceCard}>
          <Text style={styles.experienceYears}>
            {profileData?.yearsOfExperience}+ Years
          </Text>
          <Text style={styles.experienceText}>Professional Experience</Text>
        </View>

        {profileData?.portfolioPhotos &&
          profileData.portfolioPhotos.length > 0 && (
            <View style={styles.portfolioSection}>
              <Text style={styles.sectionTitle}>PORTFOLIO</Text>
              <View style={styles.portfolioGrid}>
                {profileData.portfolioPhotos.map(
                  (photo: string, idx: number) => (
                    <Image
                      key={idx}
                      source={{ uri: photo }}
                      style={styles.portfolioImage}
                    />
                  ),
                )}
              </View>
            </View>
          )}

        <TouchableOpacity style={styles.editBtn}>
          <Text style={styles.editBtnText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editBtn} onPress={async() => { await removeTokenFromSecureStore(); router.replace('/(auth)/Login') }}>
          <Text style={styles.editBtnText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactBtn}>
          <MessageSquare size={18} color={COLORS.primary} />
          <Text style={styles.contactBtnText}>Contact Support</Text>
        </TouchableOpacity>
      </ScreenWrapper>
    </View>
  );
}

/* -------------------- Styles -------------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  wrapper: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  brand: {
    fontSize: 18,
    fontFamily: FONTS.BOLD,
    color: COLORS.textPrimary,
  },
  headerRight: {
    alignItems: "flex-end",
    gap: 4,
  },
  location: {
    fontSize: 11,
    fontFamily: FONTS.REGULAR,
    color: COLORS.textSecondary,
  },
  profileCard: {
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontFamily: FONTS.BOLD,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    fontFamily: FONTS.REGULAR,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  skills: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
    marginBottom: 16,
  },
  skill: {
    fontSize: 11,
    fontFamily: FONTS.SEMIBOLD,
    color: COLORS.primary,
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  trustCard: {
    alignItems: "center",
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.surfaceSecondary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  trustNumber: {
    fontSize: 24,
    fontFamily: FONTS.BOLD,
    color: COLORS.primary,
  },
  trustLabel: {
    fontSize: 10,
    fontFamily: FONTS.SEMIBOLD,
    color: COLORS.textSecondary,
  },
  verified: {
    fontSize: 13,
    fontFamily: FONTS.SEMIBOLD,
    color: COLORS.success,
  },
  statsRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 12,
    marginVertical: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statNumber: {
    fontSize: 18,
    fontFamily: FONTS.BOLD,
    color: COLORS.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    fontFamily: FONTS.SEMIBOLD,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: FONTS.BOLD,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 13,
    fontFamily: FONTS.REGULAR,
    color: COLORS.textPrimary,
    lineHeight: 20,
  },
  availableCard: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginVertical: 16,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 12,
  },
  availableTitle: {
    fontSize: 12,
    fontFamily: FONTS.SEMIBOLD,
    color: COLORS.textPrimary,
  },
  availableTime: {
    fontSize: 12,
    fontFamily: FONTS.REGULAR,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  experienceCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
  },
  experienceYears: {
    fontSize: 20,
    fontFamily: FONTS.BOLD,
    color: COLORS.primary,
    marginBottom: 4,
  },
  experienceText: {
    fontSize: 13,
    fontFamily: FONTS.REGULAR,
    color: COLORS.textSecondary,
  },
  portfolioSection: {
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  portfolioGrid: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  portfolioImage: {
    width: "30%",
    aspectRatio: 1,
    borderRadius: 8,
    backgroundColor: COLORS.surfaceSecondary,
  },
  editBtn: {
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  editBtnText: {
    fontSize: 14,
    fontFamily: FONTS.SEMIBOLD,
    color: COLORS.white,
  },
  contactBtn: {
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  contactBtnText: {
    fontSize: 14,
    fontFamily: FONTS.SEMIBOLD,
    color: COLORS.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 14,
    fontFamily: FONTS.REGULAR,
    color: COLORS.textSecondary,
  },
});
