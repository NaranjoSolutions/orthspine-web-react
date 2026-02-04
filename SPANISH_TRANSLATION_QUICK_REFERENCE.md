# Spanish Translation Quick Reference

## Common Terms Translation Table

| English | Spanish | Notes |
|---------|---------|-------|
| **General** |
| Dashboard | Panel de Control | |
| Settings | Configuración | |
| Add | Agregar | |
| Edit | Editar | |
| Delete | Eliminar | |
| Update | Actualizar | |
| Cancel | Cancelar | |
| Save | Guardar | |
| View | Ver | |
| Search | Buscar | |
| Filter | Filtro | |
| Actions | Acciones | |
| Loading... | Cargando... | |
| Close | Cerrar | |
| **Patient Management** |
| Patient | Paciente | |
| Patient Records | Expedientes de Pacientes | |
| Full Name | Nombre Completo | |
| Phone | Teléfono | |
| Email | Correo Electrónico | |
| Date of Birth | Fecha de Nacimiento | |
| Address | Dirección | |
| Medical History | Historial Médico | |
| Patient Status | Estado del Paciente | |
| Patient ID | ID del Paciente | |
| Primary Physician | Médico de Cabecera | |
| Add New Patient | Agregar Nuevo Paciente | |
| Edit Patient | Editar Paciente | |
| **Appointments** |
| Appointment | Cita | Feminine noun |
| Appointments Management | Gestión de Citas | |
| Date & Time | Fecha y Hora | |
| Doctor | Médico | |
| Reason for Visit | Motivo de Consulta | |
| Next Appointment | Próxima Cita | |
| Add New Appointment | Agregar Nueva Cita | |
| Reschedule | Reprogramar | |
| Cancel Appointment | Cancelar Cita | |
| Appointment Details | Detalles de la Cita | |
| **Medical Notes** |
| Medical Notes | Notas Médicas | |
| Add New Note | Agregar Nueva Nota | |
| Note Content | Contenido de la Nota | |
| Category | Categoría | |
| **Testimonials** |
| Testimonial | Testimonio | |
| Testimonials Management | Gestión de Testimonios | |
| Patient Name | Nombre del Paciente | |
| Message Preview | Vista Previa del Mensaje | |
| Rating | Calificación | |
| Add New Testimonial | Agregar Nuevo Testimonio | |
| Approve | Aprobar | |
| Reject | Rechazar | |
| **Status Values** |
| Pending | Pendiente | |
| Confirmed | Confirmada | Feminine (la cita) |
| Cancelled | Cancelada | Feminine |
| Completed | Completada | Feminine |
| Rescheduled | Reprogramada | Feminine |
| Active | Activo/a | Gender depends on noun |
| Inactive | Inactivo/a | |
| Approved | Aprobado/a | |
| Rejected | Rechazado/a | |
| **Tables & Lists** |
| Showing X-Y of Z records | Mostrando X-Y de Z registros | |
| Showing X to Y of Z results | Mostrando X a Y de Z resultados | |
| No results | No hay resultados | |
| No data available | No hay datos disponibles | |
| **Filters** |
| All Doctors | Todos los Médicos | |
| All Status | Todos los Estados | |
| Date Range | Rango de Fechas | |
| Clear Filters | Limpiar Filtros | |
| **Validation Messages** |
| Please enter | Por favor ingrese | |
| Please select | Por favor seleccione | |
| Required field | Campo requerido | |
| Invalid format | Formato inválido | |
| Must be at least X characters | Debe tener al menos X caracteres | |
| Must not exceed X characters | No debe exceder X caracteres | |
| **Other** |
| Back to Patients | Volver a Pacientes | |
| View Details | Ver Detalles | |
| Export Records | Exportar Expedientes | |
| Print Summary | Imprimir Resumen | |
| Archive Patient | Archivar Paciente | |
| Coming Soon | Próximamente | |
| Not Scheduled | No Programada | |
| Not Assigned | No Asignado | |
| Not Available (N/A) | N/D | No Disponible |

## Gender Agreement Rules

Spanish nouns have gender (masculine/feminine) and adjectives must agree:

### Feminine Nouns (la/una)
- **Cita** (Appointment): confirmada, cancelada, completada, reprogramada
- **Nota** (Note): nueva, médica
- **Fecha** (Date): próxima

### Masculine Nouns (el/un)
- **Paciente** (Patient): nuevo, activo, inactivo
- **Médico** (Doctor): nuevo, de cabecera
- **Estado** (Status): nuevo, pendiente
- **Testimonio** (Testimonial): nuevo, aprobado, rechazado

### Neutral Plural
- **Todos** (All - masculine plural or mixed)
- **Todas** (All - feminine plural only)

## Common Placeholder Patterns

| Pattern | Translation |
|---------|-------------|
| Enter [field] | Ingrese [campo] |
| Select [option] | Seleccione [opción] |
| Search by [criteria] | Buscar por [criterio] |
| [Action] (optional) | [Acción] (opcional) |
| Please [action] | Por favor [acción] |

## Date/Time Formats

Maintained English system formats:
- **MM/DD/YYYY** - System date format (unchanged)
- **hh:mm A** - Time format with AM/PM (unchanged)
- Display format uses Spanish month/day names when formatted

## Professional Tone Guidelines

1. **Use formal "usted" form** - Professional medical setting
2. **Por favor** - Use consistently for polite requests
3. **Medical terminology** - Use standard medical Spanish terms
4. **Clear and concise** - Professional administrative language
5. **Consistent naming** - Same terms throughout the application

## Regional Considerations

This translation uses **neutral Spanish** appropriate for:
- ✅ Mexico
- ✅ Latin America (general)
- ✅ United States (Hispanic communities)
- ⚠️ Spain (may prefer some different terms like "médico" vs "doctor")

## Notes

- All variable names remain in English (coding standard)
- Code logic and structure unchanged
- CSS classes unchanged
- API endpoints unchanged
- TypeScript types unchanged
- Only user-facing strings translated
