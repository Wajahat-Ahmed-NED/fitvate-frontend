export interface User {
  id: string;
  name: string;
  email: string;
  password?: string | null;
  role: string | null;
  blocked: boolean;
  profilePic?: string | null;
  mobileNumber?: string | null;
  dateofBirth: string | null;
  gender: string | null;
  height: string | null;
  weight: string | null;
  provider?: string | null;
  fcm_token?: string | null;
  googleId?: string | null;
  facebookId?: string | null;
  createdAt?: string | null;
  premiumMembership?: boolean;
}

export interface Purchase {
  id: string;
  orderId: string;
  productId: string;
  purchaseToken: string;
  userId: string;
  createdAt: string;
}


export interface Article {
  id: string;
  title: string; // changed from Record<string, string>
  body: string;
  imageUrl: string | null;
  topic: string;
  type: string;
  locale: string;
  source: string | null;
  category: string | null;
  status: 'Draft' | 'Scheduled' | 'Published' | 'Unpublished'; // match API casing
  createdAt: string;
  updatedAt: string;
  userId: string;
}
// export interface TranslationDTO {
//   title: string;
//   body: string;
//   languagetotranslateto: string;
// }

export interface Language {
  id: number | null;
  locale: string;
  language: string;
  status: boolean;
}

export interface DashboardStats {
  dailyActiveUsers: number;
  dailyNewUsers: number;
  totalUsers: number;
  totalRevenue: number;
  premiumUsers: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}

export interface ExerciseDay {
  id: string;
  date: string;
  isRestDay: boolean;
  exercises: Exercise[];
  completionPercentage: number;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  duration?: number;
}

export interface ApiIssue {
  id: string;
  requestId: string;
  url: string;
  method: string;
  // statusCode: number;
  headers: string
  error: string;
  requestBody: any;
  response: any;
  timestamp: string;
}