import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Platform,
  ScrollView,
} from 'react-native';
import { scale } from 'react-native-size-matters';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { X, CalendarDays, Clock, ChevronDown } from 'lucide-react-native';
import { COLORS } from '../../theme/colors';
import { BOLD_TEXT, REGULAR_TEXT, SEMI_BOLD_TEXT } from '../../theme/styles.global';
import { formatDate, formatTime } from '../../utils/roomUtils';

export type TimeframeItem = { label: string; value: string };

export type DateTimeFilter =
  | { type: 'preset'; item: TimeframeItem }
  | { type: 'custom'; startDate: Date; startTime: Date; endDate: Date; endTime: Date };

type PickerTarget = 'start-date' | 'start-time' | 'end-date' | 'end-time' | null;

type Props = {
  visible: boolean;
  timeData: TimeframeItem[];
  selectedFilter: DateTimeFilter;
  onApply: (filter: DateTimeFilter) => void;
  onCancel: () => void;
};

const START_COLOR = COLORS.primary;
const END_COLOR = '#E8543A';

const combineDateAndTime = (date: Date, time: Date): Date => {
  const r = new Date(date);
  r.setHours(time.getHours(), time.getMinutes(), 0, 0);
  return r;
};

type ChipProps = {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  accentColor: string;
  onPress: () => void;
};

function Chip({ icon, label, isActive, accentColor, onPress }: ChipProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      style={[
        styles.chip,
        isActive ? { borderColor: accentColor, backgroundColor: `${accentColor}12` } : styles.chipIdle,
      ]}
    >
      {icon}
      <Text style={[SEMI_BOLD_TEXT(12, isActive ? accentColor : COLORS.textPrimary), { flex: 1 }]} numberOfLines={1}>
        {label}
      </Text>
      <ChevronDown
        size={scale(13)}
        color={isActive ? accentColor : COLORS.textSecondary}
        strokeWidth={2.5}
        style={{ transform: [{ rotate: isActive ? '180deg' : '0deg' }] }}
      />
    </TouchableOpacity>
  );
}

type InlinePickerProps = {
  visible: boolean;
  value: Date;
  mode: 'date' | 'time';
  onChange: (d: Date) => void;
  maximumDate?: Date;
};

function InlinePicker({ visible, value, mode, onChange, maximumDate }: InlinePickerProps) {
  if (!visible || Platform.OS !== 'ios') return null;
  return (
    <View style={styles.inlinePickerWrapper}>
      <DateTimePicker
        value={value}
        mode={mode}
        display="spinner"
        maximumDate={maximumDate}
        onChange={(_: DateTimePickerEvent, d?: Date) => d && onChange(d)}
        style={styles.iosPicker}
      />
    </View>
  );
}

export default function DateTimeFilterModal({ visible, timeData, selectedFilter, onApply, onCancel }: Props) {
  const isCustom = selectedFilter.type === 'custom';

  const [activeMode, setActiveMode] = useState<'preset' | 'custom'>(selectedFilter.type);
  const [selectedPreset, setSelectedPreset] = useState<TimeframeItem>(
    selectedFilter.type === 'preset' ? selectedFilter.item : timeData[0],
  );

  const midnight = () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const [startDate, setStartDate] = useState<Date>(isCustom ? (selectedFilter as any).startDate : new Date());
  const [startTime, setStartTime] = useState<Date>(isCustom ? (selectedFilter as any).startTime : midnight());
  const [endDate, setEndDate] = useState<Date>(isCustom ? (selectedFilter as any).endDate : new Date());
  const [endTime, setEndTime] = useState<Date>(isCustom ? (selectedFilter as any).endTime : new Date());

  const [openTarget, setOpenTarget] = useState<PickerTarget>(null);
  const [androidTarget, setAndroidTarget] = useState<PickerTarget>(null);
  const [rangeError, setRangeError] = useState<string | null>(null);

  const applyPicked = (target: PickerTarget, picked: Date) => {
    setRangeError(null);
    if (target === 'start-date') setStartDate(picked);
    else if (target === 'start-time') setStartTime(picked);
    else if (target === 'end-date') setEndDate(picked);
    else if (target === 'end-time') setEndTime(picked);
  };

  const togglePicker = (target: PickerTarget) => {
    setRangeError(null);
    if (Platform.OS === 'android') {
      setAndroidTarget(target);
    } else {
      setOpenTarget(prev => (prev === target ? null : target));
    }
  };

  const handleAndroidChange = (event: DateTimePickerEvent, picked?: Date) => {
    const t = androidTarget;
    setAndroidTarget(null);
    if (event.type === 'set' && picked) applyPicked(t, picked);
  };

  const handleApply = () => {
    if (activeMode === 'preset') {
      onApply({ type: 'preset', item: selectedPreset });
      return;
    }
    const start = combineDateAndTime(startDate, startTime);
    const end = combineDateAndTime(endDate, endTime);
    if (end <= start) {
      setRangeError('End must be after start');
      return;
    }
    onApply({ type: 'custom', startDate, startTime, endDate, endTime });
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onCancel}>
      <Pressable style={styles.backdrop} onPress={onCancel}>
        <Pressable style={styles.sheet} onPress={e => e.stopPropagation()}>

          <View style={styles.header}>
            <Text style={BOLD_TEXT(16, COLORS.textPrimary)}>Filter by Date & Time</Text>
            <TouchableOpacity onPress={onCancel} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <X size={scale(20)} color={COLORS.textSecondary} strokeWidth={2} />
            </TouchableOpacity>
          </View>

          <View style={styles.modeToggle}>
            {(['preset', 'custom'] as const).map(mode => (
              <TouchableOpacity
                key={mode}
                style={[styles.modeBtn, activeMode === mode && styles.modeBtnActive]}
                onPress={() => { setActiveMode(mode); setRangeError(null); setOpenTarget(null); }}
                activeOpacity={0.7}
              >
                <Text style={SEMI_BOLD_TEXT(13, activeMode === mode ? COLORS.white : COLORS.textSecondary)}>
                  {mode === 'preset' ? 'Quick Select' : 'Custom Range'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollBody}
          >
            {activeMode === 'preset' && (
              <View style={styles.presetList}>
                {timeData.map(item => {
                  const sel = selectedPreset.value === item.value;
                  return (
                    <TouchableOpacity
                      key={item.value}
                      style={[styles.presetRow, sel && styles.presetRowSelected]}
                      onPress={() => setSelectedPreset(item)}
                      activeOpacity={0.7}
                    >
                      <Text style={SEMI_BOLD_TEXT(14, sel ? COLORS.primary : COLORS.textPrimary)}>{item.label}</Text>
                      {sel && <View style={styles.selectedDot} />}
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}

            {activeMode === 'custom' && (
              <View style={styles.rangeCard}>
                <View style={styles.rail}>
                  <View style={[styles.railDot, { backgroundColor: START_COLOR }]} />
                  <View style={styles.railLine} />
                  <View style={[styles.railDot, { backgroundColor: rangeError ? COLORS.error : END_COLOR }]} />
                </View>

                <View style={styles.rangeContent}>
                  <View style={styles.rangeSection}>
                    <Text style={SEMI_BOLD_TEXT(11, START_COLOR)}>FROM</Text>
                    <View style={styles.chipRow}>
                      <View style={styles.chipWrap}>
                        <Chip
                          icon={<CalendarDays size={scale(14)} color={openTarget === 'start-date' ? START_COLOR : COLORS.textSecondary} strokeWidth={2} />}
                          label={formatDate(startDate)}
                          isActive={openTarget === 'start-date'}
                          accentColor={START_COLOR}
                          onPress={() => togglePicker('start-date')}
                        />
                      </View>
                      <View style={styles.chipWrap}>
                        <Chip
                          icon={<Clock size={scale(14)} color={openTarget === 'start-time' ? START_COLOR : COLORS.textSecondary} strokeWidth={2} />}
                          label={formatTime(startTime)}
                          isActive={openTarget === 'start-time'}
                          accentColor={START_COLOR}
                          onPress={() => togglePicker('start-time')}
                        />
                      </View>
                    </View>
                    <InlinePicker
                      visible={openTarget === 'start-date'}
                      value={startDate}
                      mode="date"
                      maximumDate={new Date()}
                      onChange={d => applyPicked('start-date', d)}
                    />
                    <InlinePicker
                      visible={openTarget === 'start-time'}
                      value={startTime}
                      mode="time"
                      onChange={d => applyPicked('start-time', d)}
                    />
                  </View>

                  <View style={styles.sectionGap} />

                  <View style={styles.rangeSection}>
                    <Text style={SEMI_BOLD_TEXT(11, rangeError ? COLORS.error : END_COLOR)}>TO</Text>
                    <View style={styles.chipRow}>
                      <View style={styles.chipWrap}>
                        <Chip
                          icon={<CalendarDays size={scale(14)} color={openTarget === 'end-date' ? END_COLOR : COLORS.textSecondary} strokeWidth={2} />}
                          label={formatDate(endDate)}
                          isActive={openTarget === 'end-date'}
                          accentColor={rangeError ? COLORS.error : END_COLOR}
                          onPress={() => togglePicker('end-date')}
                        />
                      </View>
                      <View style={styles.chipWrap}>
                        <Chip
                          icon={<Clock size={scale(14)} color={openTarget === 'end-time' ? END_COLOR : COLORS.textSecondary} strokeWidth={2} />}
                          label={formatTime(endTime)}
                          isActive={openTarget === 'end-time'}
                          accentColor={rangeError ? COLORS.error : END_COLOR}
                          onPress={() => togglePicker('end-time')}
                        />
                      </View>
                    </View>
                    <InlinePicker
                      visible={openTarget === 'end-date'}
                      value={endDate}
                      mode="date"
                      maximumDate={new Date()}
                      onChange={d => applyPicked('end-date', d)}
                    />
                    <InlinePicker
                      visible={openTarget === 'end-time'}
                      value={endTime}
                      mode="time"
                      onChange={d => applyPicked('end-time', d)}
                    />
                    {rangeError && (
                      <View style={styles.errorBox}>
                        <Text style={SEMI_BOLD_TEXT(11, COLORS.error)}>{rangeError}</Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            )}

            {activeMode === 'custom' && !rangeError && (
              <View style={styles.summaryStrip}>
                <View style={styles.summaryItem}>
                  <Text style={REGULAR_TEXT(10, COLORS.textSecondary)}>FROM</Text>
                  <Text style={SEMI_BOLD_TEXT(12, COLORS.textPrimary)}>{formatDate(startDate)}</Text>
                  <Text style={SEMI_BOLD_TEXT(11, START_COLOR)}>{formatTime(startTime)}</Text>
                </View>
                <View style={styles.summaryDivider} />
                <View style={styles.summaryItem}>
                  <Text style={REGULAR_TEXT(10, COLORS.textSecondary)}>TO</Text>
                  <Text style={SEMI_BOLD_TEXT(12, COLORS.textPrimary)}>{formatDate(endDate)}</Text>
                  <Text style={SEMI_BOLD_TEXT(11, END_COLOR)}>{formatTime(endTime)}</Text>
                </View>
              </View>
            )}
          </ScrollView>

          <TouchableOpacity style={styles.applyBtn} onPress={handleApply} activeOpacity={0.8}>
            <Text style={BOLD_TEXT(15, COLORS.white)}>Apply Filter</Text>
          </TouchableOpacity>

        </Pressable>
      </Pressable>

      {Platform.OS === 'android' && androidTarget !== null && (
        <DateTimePicker
          value={
            androidTarget === 'start-date' ? startDate :
            androidTarget === 'start-time' ? startTime :
            androidTarget === 'end-date' ? endDate : endTime
          }
          mode={androidTarget.includes('time') ? 'time' : 'date'}
          display="default"
          maximumDate={androidTarget.includes('date') ? new Date() : undefined}
          onChange={handleAndroidChange}
        />
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: scale(24),
    borderTopRightRadius: scale(24),
    paddingTop: scale(20),
    paddingHorizontal: scale(20),
    paddingBottom: scale(36),
    maxHeight: '92%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(16),
  },
  modeToggle: {
    flexDirection: 'row',
    backgroundColor: COLORS.grayLight,
    borderRadius: scale(12),
    padding: scale(4),
    marginBottom: scale(20),
  },
  modeBtn: {
    flex: 1,
    paddingVertical: scale(9),
    alignItems: 'center',
    borderRadius: scale(10),
  },
  modeBtnActive: {
    backgroundColor: COLORS.primary,
  },
  scrollBody: {
    paddingBottom: scale(8),
  },
  presetList: {
    gap: scale(4),
  },
  presetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: scale(14),
    paddingHorizontal: scale(14),
    borderRadius: scale(12),
    borderWidth: 1.5,
    borderColor: 'transparent',
    backgroundColor: COLORS.grayLight,
    marginBottom: scale(8),
  },
  presetRowSelected: {
    borderColor: COLORS.primary,
    backgroundColor: `${COLORS.primary}12`,
  },
  selectedDot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: COLORS.primary,
  },
  rangeCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.grayLight,
    borderRadius: scale(18),
    padding: scale(16),
    gap: scale(16),
    marginBottom: scale(14),
  },
  rail: {
    width: scale(16),
    alignItems: 'center',
    paddingTop: scale(20),
  },
  railDot: {
    width: scale(12),
    height: scale(12),
    borderRadius: scale(6),
    zIndex: 1,
  },
  railLine: {
    flex: 1,
    width: scale(2),
    marginVertical: scale(4),
    backgroundColor: COLORS.divider,
    borderRadius: scale(1),
  },
  rangeContent: {
    flex: 1,
  },
  rangeSection: {
    gap: scale(8),
  },
  sectionGap: {
    height: scale(20),
  },
  chipRow: {
    flexDirection: 'row',
    gap: scale(8),
  },
  chipWrap: {
    flex: 1,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
    borderRadius: scale(10),
    borderWidth: 1.5,
    paddingVertical: scale(9),
    paddingHorizontal: scale(10),
  },
  chipIdle: {
    borderColor: COLORS.divider,
    backgroundColor: COLORS.white,
  },
  inlinePickerWrapper: {
    borderRadius: scale(12),
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.divider,
  },
  iosPicker: {
    height: scale(150),
  },
  errorBox: {
    backgroundColor: `${COLORS.error}12`,
    borderRadius: scale(8),
    paddingVertical: scale(8),
    paddingHorizontal: scale(12),
    borderWidth: 1,
    borderColor: `${COLORS.error}35`,
    marginTop: scale(2),
  },
  summaryStrip: {
    flexDirection: 'row',
    backgroundColor: COLORS.grayLight,
    borderRadius: scale(14),
    overflow: 'hidden',
    marginBottom: scale(4),
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: scale(12),
    gap: scale(2),
  },
  summaryDivider: {
    width: 1,
    backgroundColor: COLORS.divider,
    marginVertical: scale(10),
  },
  applyBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: scale(14),
    paddingVertical: scale(15),
    alignItems: 'center',
    marginTop: scale(16),
  },
});