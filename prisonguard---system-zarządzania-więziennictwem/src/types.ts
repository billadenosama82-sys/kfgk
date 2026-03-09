export type UserRole = 'ADMIN' | 'DIRECTOR' | 'GUARD' | 'MEDICAL' | 'ADMIN_STAFF';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  employeeId: string;
  department: string;
  contactNumber?: string;
  photoURL?: string;
  createdAt: string;
}

export interface Inmate {
  id: string;
  firstName: string;
  lastName: string;
  inmateNumber: string; // Numer identyfikacyjny
  dateOfBirth: string;
  citizenship: string;
  photoURL?: string;
  
  // Legal data
  sentence: string;
  sentenceLength: string;
  startDate: string;
  endDate: string;
  crimeType: string;
  
  // Penitentiary data
  cellNumber: string;
  wardId: string;
  securityLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  transferHistory: TransferRecord[];
  
  // Status
  status: 'ACTIVE' | 'RELEASED' | 'TRANSFERRED';
}

export interface TransferRecord {
  date: string;
  fromCell: string;
  toCell: string;
  reason: string;
}

export interface BehaviorRecord {
  id: string;
  inmateId: string;
  type: 'REWARD' | 'PUNISHMENT' | 'INCIDENT' | 'REPORT';
  date: string;
  reporterId: string;
  reporterName: string;
  description: string;
  status: 'PENDING' | 'RESOLVED' | 'ARCHIVED';
}

export interface Incident {
  id: string;
  date: string;
  time: string;
  location: string;
  involvedInmates: string[]; // IDs
  involvedStaff: string[]; // IDs
  description: string;
  threatLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  category: 'FIGHT' | 'ESCAPE_ATTEMPT' | 'SMUGGLING' | 'REGULATION_VIOLATION' | 'HEALTH_THREAT';
  attachments?: string[]; // URLs
  status: 'REPORTED' | 'INVESTIGATING' | 'CLOSED';
}

export interface Ward {
  id: string;
  name: string;
  description: string;
}

export interface Cell {
  id: string;
  wardId: string;
  number: string;
  capacity: number;
  currentOccupancy: number;
  isSpecial: boolean;
  isLocked: boolean;
}

export interface Visit {
  id: string;
  inmateId: string;
  visitorName: string;
  relationship: string;
  date: string;
  time: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  visitorIdCard?: string;
}

export interface MedicalRecord {
  id: string;
  inmateId: string;
  date: string;
  diagnosis: string;
  medications: string[];
  hospitalization?: string;
  doctorName: string;
  doctorId: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  authorId: string;
  authorName: string;
  type: 'GENERAL' | 'PROCEDURE' | 'WARNING';
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}
