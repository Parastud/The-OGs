import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { ChevronDown, Calendar } from 'lucide-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../../theme/colors';
import {
  BOLD_TEXT,
  REGULAR_TEXT,
} from '../../theme/styles.global';
import { RootState } from '../../redux/store';
import { setTimeFrame } from '../../redux/slices/timeFrame.slice';
import {
  setSelectedSiteId,
  selectAllSites,
  getSelectedSite,
  getAllSiteList,
  ALL_SITES,
} from '../../redux/slices/sites.slice';
import DateFilterSelectorModal from '../modal/DateFilterSelectorModal';
import ItemSelectionModal from '../modal/ItemSelectionModal';

// Special value for "All Sites" option in modal
const ALL_SITES_VALUE = null;

interface Props {
  showSiteProfileHeader?: boolean;
}

export const HomeScreenHeader = (props: Props) => {
  const { showSiteProfileHeader = false } = props;
  const dispatch = useDispatch();

  // Redux state for timeframe
  const { timeFrameType } = useSelector((state: RootState) => state.timeFrame);

  // Redux state for sites using selectors
  const selectedSite = useSelector(getSelectedSite);
  const allSiteList = useSelector(getAllSiteList);

  // Derive display name
  const siteName =
    selectedSite === ALL_SITES ? 'All Sites' : selectedSite.site_name;

  // Modal visibility state
  const [showDateModal, setShowDateModal] = useState(false);
  const [showSiteModal, setShowSiteModal] = useState(false);

  // Convert site list to ItemSelectionModal format with "All Sites" option
  const siteListForModal = useMemo(() => {
    const allSitesOption = { label: 'All Sites', value: ALL_SITES_VALUE };
    const siteOptions = allSiteList.map(site => ({
      label: site.site_name,
      value: site.site_id,
    }));
    return [allSitesOption, ...siteOptions];
  }, [allSiteList]);

  const handleTimeFrameChange = (type: string) => {
    dispatch(setTimeFrame(type));
    setShowDateModal(false);
  };

  const handleSiteSelect = (item: { label: string; value: any }) => {
    if (item.value === ALL_SITES_VALUE) {
      dispatch(selectAllSites());
    } else {
      dispatch(setSelectedSiteId(item.value));
    }
    setShowSiteModal(false);
  };

  return (
    <>
      <View
        style={[
          styles.container,
          { paddingTop: showSiteProfileHeader ? 5 : 0 },
        ]}
      >
        <View style={styles.leftSection}>
          {showSiteProfileHeader ? (
            // Profile Header with Avatar
            <TouchableOpacity
              style={styles.profileSelector}
              onPress={() => setShowSiteModal(true)}
            >
              <View style={styles.avatarContainer}>
                <View style={styles.avatarInner}>
                  <Text style={BOLD_TEXT(14, COLORS.primary)}>
                    {siteName.charAt(0).toUpperCase()}
                  </Text>
                </View>
              </View>
              <Text
                style={[BOLD_TEXT(16, COLORS.textPrimary), styles.siteText]}
                numberOfLines={1}
              >
                {siteName}
              </Text>
              <ChevronDown
                size={16}
                strokeWidth={2}
                color={COLORS.textPrimary}
              />
            </TouchableOpacity>
          ) : (
            // Default Header
            <>
              <Text
                style={REGULAR_TEXT(10, COLORS.textSecondary)}
                numberOfLines={1}
              >
                MANAGEMENT DASHBOARD
              </Text>
              <TouchableOpacity
                style={styles.siteSelector}
                onPress={() => setShowSiteModal(true)}
              >
                <Text
                  style={[BOLD_TEXT(16, COLORS.textPrimary), styles.siteText]}
                  numberOfLines={1}
                >
                  {siteName}
                </Text>
                <ChevronDown
                  size={scale(16)}
                  strokeWidth={2}
                  color={COLORS.textPrimary}
                />
              </TouchableOpacity>
            </>
          )}
        </View>

        <View style={styles.rightSection}>
          <TouchableOpacity
            onPress={() => setShowDateModal(true)}
            style={styles.dateSelector}
          >
            <Calendar
              size={scale(12)}
              strokeWidth={2}
              color={COLORS.blueAccent}
            />
            <Text
              style={BOLD_TEXT(10, COLORS.blueAccent)}
              numberOfLines={1}
            >
              {timeFrameType}
            </Text>
            <ChevronDown
              size={scale(12)}
              strokeWidth={2}
              color={COLORS.blueAccent}
            />
          </TouchableOpacity>
        </View>
      </View>

      <DateFilterSelectorModal
        visible={showDateModal}
        currentTimeFrame={timeFrameType}
        onSelectTimeFrame={handleTimeFrameChange}
        onCancel={() => setShowDateModal(false)}
      />

      <ItemSelectionModal
        visible={showSiteModal}
        data={siteListForModal}
        title="Select Site"
        searchable={true}
        onSelect={handleSiteSelect}
        onCancel={() => setShowSiteModal(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: scale(16),
  },
  leftSection: {
    flex: 1,
    maxWidth: '50%',
  },
  rightSection: {
    flex: 1,
    maxWidth: '50%',
    alignItems: 'flex-end',
  },
  siteSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
  },
  siteText: {
    flexShrink: 1,
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    backgroundColor: COLORS.white,
    paddingHorizontal: scale(10),
    paddingVertical: scale(6),
    borderRadius: scale(16),
  },
  profileSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.primary,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInner: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
    backgroundColor: '#E8F4FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
