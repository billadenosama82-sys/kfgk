import { UserRole } from './types';

export const ROLE_LABELS: Record<UserRole, string> = {
  ADMIN: 'Administrator Systemu',
  DIRECTOR: 'Dyrektor Jednostki',
  GUARD: 'Oddziałowy / Strażnik',
  MEDICAL: 'Psycholog / Lekarz',
  ADMIN_STAFF: 'Pracownik Administracyjny',
};

export const INCIDENT_CATEGORIES = {
  FIGHT: 'Bójka',
  ESCAPE_ATTEMPT: 'Próba ucieczki',
  SMUGGLING: 'Przemyt',
  REGULATION_VIOLATION: 'Naruszenie regulaminu',
  HEALTH_THREAT: 'Zagrożenie zdrowia',
};

export const THREAT_LEVELS = {
  LOW: 'Niski',
  MEDIUM: 'Średni',
  HIGH: 'Wysoki',
  CRITICAL: 'Krytyczny',
};

export const SECURITY_LEVELS = {
  LOW: 'Niski',
  MEDIUM: 'Średni',
  HIGH: 'Wysoki',
};
