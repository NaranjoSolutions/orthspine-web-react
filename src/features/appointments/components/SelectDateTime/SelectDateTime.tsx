import React, { useState } from 'react';
import { Button, Calendar, theme } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { TimeSlot } from '@/features/appointments/types/appointment.types';
import { availableTimeSlots } from '@/shared/resources/appointments/appointments';
import styles from './SelectDateTime.module.scss';

interface SelectDateTimeProps {
  onNext: (date: Date, timeSlot: TimeSlot) => void;
}

/**
 * SelectDateTime Component
 * Allows users to select a date and time for their appointment
 *
 * Features:
 * - Calendar for date selection
 * - Available time slots display
 * - Only shows available times for selected date
 */
export const SelectDateTime: React.FC<SelectDateTimeProps> = ({ onNext }) => {
  const { token } = theme.useToken();
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);

  const handleDateSelect = (date: Dayjs) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null); // Reset time slot when date changes
  };

  const handleTimeSlotSelect = (timeSlot: TimeSlot) => {
    if (timeSlot.available) {
      setSelectedTimeSlot(timeSlot);
    }
  };

  const handleNext = () => {
    if (selectedDate && selectedTimeSlot) {
      onNext(selectedDate.toDate(), selectedTimeSlot);
    }
  };

  // Disable past dates
  const disabledDate = (current: Dayjs) => {
    return current && current < dayjs().startOf('day');
  };

  const wrapperStyle: React.CSSProperties = {
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  // Get current and next month for dual calendar display
  const currentMonth = dayjs();
  const nextMonth = dayjs().add(1, 'month');

  return (
    <div className={styles.selectDateTime}>
      <div className={styles.breadcrumb}>
        <span>Book Appointment</span>
        <span className={styles.separator}>/</span>
        <span className={styles.current}>Select Date & Time</span>
      </div>

      <h1 className={styles.title}>Select Date & Time</h1>

      <div className={styles.calendarContainer}>
        <div className={styles.calendarWrapper} style={wrapperStyle}>
          <Calendar
            fullscreen={false}
            value={selectedDate}
            onSelect={handleDateSelect}
            disabledDate={disabledDate}
            defaultValue={nextMonth}
          />
        </div>
      </div>

      <div className={styles.timeSlotsSection}>
        <h2 className={styles.timeSlotsTitle}>Available Times on {selectedDate.format('MMMM D, YYYY')}</h2>
        <div className={styles.timeSlots}>
          {availableTimeSlots
            .filter((slot) => slot.available)
            .map((slot) => (
              <button
                key={slot.id}
                className={`${styles.timeSlot} ${selectedTimeSlot?.id === slot.id ? styles.selected : ''}`}
                onClick={() => handleTimeSlotSelect(slot)}
              >
                {slot.time}
              </button>
            ))}
        </div>
      </div>

      <div className={styles.actions}>
        <Button type="primary" size="large" onClick={handleNext} disabled={!selectedTimeSlot}>
          Next
        </Button>
      </div>
    </div>
  );
};
