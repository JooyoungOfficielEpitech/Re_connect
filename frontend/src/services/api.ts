import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:8000/api';

// axios 인스턴스 생성
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 토큰을 가져오는 함수
const getToken = async () => {
  try {
    return await AsyncStorage.getItem('token');
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

// 요청 인터셉터 - 토큰 추가
api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터 - 에러 처리
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

// API 응답 타입 정의
interface LoginResponse {
  access_token: string;
  token_type: string;
}

interface UserResponse {
  id: number;
  email: string;
  username: string;
  full_name: string;
}

interface MissionResponse {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  user_id: number;
}

// 온보딩 관련 타입 정의
interface OnboardingStep1Data {
  breakup_date: string;
  relationship_years: number;
  relationship_months: number;
  my_tendency: string;
  partner_tendency: string;
}

interface OnboardingStep2Data {
  breakup_reason: string;
}

interface OnboardingStep3Data {
  strategy_type: string;
}

interface OnboardingResponse {
  id: number;
  user_id: number;
  breakup_date: string;
  relationship_years: number;
  relationship_months: number;
  my_tendency: string;
  partner_tendency: string;
  breakup_reason: string;
  strategy_type: string;
}

// 미션 관련 API
export const missionApi = {
  // 미션 목록 조회
  getMissions: async (): Promise<MissionResponse[]> => {
    const response = await api.get<MissionResponse[]>('/missions/');
    return response.data;
  },

  // 미션 상세 조회
  getMission: async (id: number): Promise<MissionResponse> => {
    const response = await api.get<MissionResponse>(`/missions/${id}`);
    return response.data;
  },

  // 미션 생성
  createMission: async (data: { title: string; description: string }): Promise<MissionResponse> => {
    const response = await api.post<MissionResponse>('/missions/', data);
    return response.data;
  },

  // 미션 수정
  updateMission: async (id: number, data: { title: string; description: string; completed: boolean }): Promise<MissionResponse> => {
    const response = await api.put<MissionResponse>(`/missions/${id}`, data);
    return response.data;
  },

  // 미션 삭제
  deleteMission: async (id: number): Promise<void> => {
    await api.delete(`/missions/${id}`);
  },
};

// 사용자 관련 API
export const userApi = {
  // 로그인
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    
    const response = await api.post<LoginResponse>('/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    
    // 토큰 저장
    await AsyncStorage.setItem('token', response.data.access_token);
    return response.data;
  },
  
  // 회원가입
  signup: async (data: { email: string; username: string; password: string; full_name: string }): Promise<UserResponse> => {
    const response = await api.post<UserResponse>('/auth/signup', data);
    return response.data;
  },
  
  // 사용자 정보 조회
  getProfile: async (): Promise<UserResponse> => {
    const response = await api.get<UserResponse>('/users/me');
    return response.data;
  },
};

// 온보딩 관련 API
export const onboardingApi = {
  // 온보딩 1단계 데이터 저장
  saveStep1: async (data: OnboardingStep1Data): Promise<OnboardingResponse> => {
    const response = await api.post<OnboardingResponse>('/onboarding/step1', data);
    return response.data;
  },
  
  // 온보딩 2단계 데이터 저장
  saveStep2: async (data: OnboardingStep2Data): Promise<OnboardingResponse> => {
    const response = await api.post<OnboardingResponse>('/onboarding/step2', data);
    return response.data;
  },
  
  // 온보딩 3단계 데이터 저장
  saveStep3: async (data: OnboardingStep3Data): Promise<OnboardingResponse> => {
    const response = await api.post<OnboardingResponse>('/onboarding/step3', data);
    return response.data;
  },
  
  // 온보딩 데이터 조회
  getOnboarding: async (): Promise<OnboardingResponse> => {
    const response = await api.get<OnboardingResponse>('/onboarding/');
    return response.data;
  },
}; 