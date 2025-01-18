export interface User {
  id: string;
  email: string;
  role: 'admin';
}

export interface RecoveryStory {
  id: string;
  title: string;
  content: string;
  authorName: string;
  date: string;
}

export interface VideoLink {
  id: string;
  title: string;
  url: string;
  description: string;
  thumbnail: string;
}

export interface RehabCenter {
  id: string;
  name: string;
  phone: string;
  place: string;
  locationLink: string;
}

export interface Helpline {
  id: string;
  name: string;
  number: string;
  available: string;
  description: string;
}

export interface Report {
  id: string;
  type: string;
  date: string;
  description: string;
  status: 'pending' | 'resolved';
  location: string;
  photo: string;
  video: string;
}

export interface SupportGroup {
  id: string;
  name: string;
  description: string;
  meetingLink: string;
  schedule: string;
  type: string;
}

export interface Game {
  id: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  category: string;
}

export interface LawInfo {
  id: string;
  title: string;
  description: string;
  category: string;
  reference: string;
}