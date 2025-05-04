export interface Trip {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  destinations: Destination[];
  activities: Activity[];
  imageUrl?: string;
  destination?: string;
}

export interface Destination {
  id: string;
  name: string;
  location: string;
  description: string;
  imageUrl: string;
  activities: Activity[];
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  cost?: number;
  notes?: string;
  status?: 'planned' | 'completed' | 'cancelled';
}

export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
}

export interface Accommodation {
  id: string;
  name: string;
  location: string;
  checkIn: string;
  checkOut: string;
  cost: number;
  bookingReference?: string;
}

export interface LayoutProps {
  children: React.ReactNode;
  showThirdPane?: boolean;
  onThirdPaneToggle?: () => void;
}

export interface CardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  onClick?: () => void;
  status?: string;
  date?: string;
  time?: string;
  location?: string;
  cost?: number;
} 