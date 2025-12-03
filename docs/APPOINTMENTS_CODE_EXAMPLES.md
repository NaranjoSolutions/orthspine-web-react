# Appointments Management - Key Code Snippets

## 1. AppointmentStatus Enum (appointment.types.ts)

```typescript
export enum AppointmentStatus {
  CONFIRMED = 'confirmed',
  PENDING = 'pending',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
  RESCHEDULED = 'rescheduled',
}
```

## 2. Redux Slice Actions (appointmentsSlice.ts)

```typescript
const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    setAppointments(state, action: PayloadAction<AdminAppointment[]>) {
      state.appointments = action.payload;
      state.error = null;
    },
    addAppointment(state, action: PayloadAction<AdminAppointment>) {
      state.appointments.unshift(action.payload);
      state.pagination.total += 1;
    },
    updateAppointment(state, action: PayloadAction<AdminAppointment>) {
      const index = state.appointments.findIndex((a) => a.id === action.payload.id);
      if (index !== -1) {
        state.appointments[index] = action.payload;
      }
    },
    // ... more actions
  },
});
```

## 3. Service Layer (appointmentService.ts)

```typescript
class AppointmentService {
  async getAppointments(
    filters: AppointmentFilters,
    page: number,
    pageSize: number
  ): Promise<{ appointments: AdminAppointment[]; total: number }> {
    await this.delay(300);
    let filteredAppointments = [...mockAppointments];

    // Apply filters
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredAppointments = filteredAppointments.filter(
        (apt) =>
          apt.patientName.toLowerCase().includes(searchLower) ||
          apt.doctorName.toLowerCase().includes(searchLower) ||
          apt.reasonForVisit.toLowerCase().includes(searchLower)
      );
    }

    // Apply pagination
    const total = filteredAppointments.length;
    const startIndex = (page - 1) * pageSize;
    const paginatedAppointments = filteredAppointments.slice(startIndex, startIndex + pageSize);

    return { appointments: paginatedAppointments, total };
  }
}
```

## 4. AppointmentTable Component

```typescript
export const AppointmentTable: React.FC<AppointmentTableProps> = ({
  appointments,
  loading,
  pagination,
  onView,
  onReschedule,
  onCancel,
  onPageChange,
}) => {
  const columns = [
    {
      title: 'Patient',
      dataIndex: 'patientName',
      key: 'patientName',
      width: 180,
      sorter: true,
    },
    {
      title: 'Date & Time',
      dataIndex: 'dateTime',
      key: 'dateTime',
      width: 200,
      render: (dateTime: string) => (
        <div className={styles.dateTime}>
          <div className={styles.date}>{dayjs(dateTime).format('MMM DD, YYYY')}</div>
          <div className={styles.time}>{dayjs(dateTime).format('hh:mm A')}</div>
        </div>
      ),
      sorter: true,
    },
    // ... more columns
  ];

  return <Table columns={columns} dataSource={appointments} rowKey="id" loading={loading} />;
};
```

## 5. AppointmentsPage with Filters

```typescript
const AppointmentsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const appointments = useAppSelector(selectAppointments);
  const filters = useAppSelector(selectAppointmentFilters);
  const pagination = useAppSelector(selectAppointmentPagination);
  const isLoading = useAppSelector(selectAppointmentIsLoading);

  const handleSearch = () => {
    dispatch(setAppointmentFilters({ search: searchValue }));
    dispatch(setAppointmentPagination({ page: 1 }));
  };

  const handleStatusFilterChange = (status: string) => {
    dispatch(setAppointmentFilters({ status: status as AppointmentStatus | 'all' }));
    dispatch(setAppointmentPagination({ page: 1 }));
  };

  // ... more handlers

  return (
    <div className={styles.appointmentsPage}>
      <Card>
        <AppointmentTable
          appointments={appointments}
          loading={isLoading}
          pagination={pagination}
          onView={handleView}
          onReschedule={handleReschedule}
          onCancel={handleCancel}
          onPageChange={handlePageChange}
        />
      </Card>
    </div>
  );
};
```

## 6. Responsive SCSS Styling

```scss
.appointmentsPage {
  width: 100%;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }

  .filters {
    background: #f5f5f5;
    padding: 16px;
    border-radius: 6px;
    margin-bottom: 24px;
  }

  @media (max-width: 768px) {
    .header {
      flex-direction: column;
      gap: 16px;
    }
  }
}
```

---

## Mock Data Example

```typescript
const mockAppointments: AdminAppointment[] = [
  {
    id: '1',
    patientId: '1',
    patientName: 'Johnathan Smith',
    doctorId: '1',
    doctorName: 'Dr. Arlene McCoy',
    dateTime: '2024-10-26T10:30:00Z',
    reasonForVisit: 'Initial Consultation',
    status: AppointmentStatus.CONFIRMED,
    notes: 'First visit for spine evaluation',
    createdAt: '2024-10-20T10:00:00Z',
    updatedAt: '2024-10-20T10:00:00Z',
  },
  // ... more appointments
];
```

---

## Status Badge Rendering

```typescript
const getStatusColor = (status: AppointmentStatus): string => {
  const statusColors: Record<AppointmentStatus, string> = {
    confirmed: 'green',
    pending: 'orange',
    cancelled: 'red',
    completed: 'blue',
    rescheduled: 'cyan',
  };
  return statusColors[status] || 'default';
};

// Usage in render:
<Tag color={getStatusColor(appointment.status)}>{getStatusText(appointment.status)}</Tag>
```
