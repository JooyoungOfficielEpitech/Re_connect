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
api.interceptors.request.use(
  async (config) => {
    // 인증이 필요하지 않은 엔드포인트 목록
    const publicEndpoints = [
      '/auth/login',
      '/auth/signup'
      
    ];

    // 현재 요청의 URL이 공개 엔드포인트인지 확인
    const isPublicEndpoint = publicEndpoints.some(endpoint => 
      config.url?.includes(endpoint)
    );

    // 공개 엔드포인트가 아닌 경우에만 토큰 확인
    if (!isPublicEndpoint) {
      const token = await getToken();
      if (!token) {
        return Promise.reject('인증이 필요합니다.');
      }
      if (config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
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

// 목표 목록 타입 정의
export interface Goal {
  id: number;
  name: string;
  description: string;
}

// 목표 목록 API 함수
export const getGoals = async (): Promise<Goal[]> => {
  try {
    // 실제 API 구현 전까지는 목업 데이터 반환
    return mockGoals;
  } catch (error) {
    console.error('목표 목록을 가져오는 중 오류 발생:', error);
    throw error;
  }
};

// 목업 데이터
const mockGoals: Goal[] = [
  { id: 1, name: '재회', description: '전 연인과 다시 관계를 맺고 싶어요' },
  { id: 2, name: '마음 정리', description: '이전 관계에서 완전히 벗어나고 싶어요' },
  { id: 3, name: '친구 관계 유지', description: '연인 관계는 끝났지만 친구로 지내고 싶어요' },
  { id: 4, name: '자기 이해', description: '이전 관계를 통해 나 자신을 더 잘 이해하고 싶어요' },
  { id: 5, name: '성장', description: '이 경험을 통해 정서적으로 성장하고 싶어요' },
];

// 사용자 관련 API
export const userApi = {
  // 로그인
  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>('/auth/login', 
        new URLSearchParams({
          username: email,
          password: password,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      if (response.data.access_token) {
        await AsyncStorage.setItem('token', response.data.access_token);
      }
      return response.data;
    } catch (error) {
      console.error('로그인 실패:', error);
      throw error;
    }
  },

  // 회원가입
  signup: async (data: { email: string; password: string; username: string; full_name: string }): Promise<UserResponse> => {
    try {
      const response = await api.post<UserResponse>('/auth/signup', data);
      
      // 회원가입 성공 후 자동 로그인
      try {
        const loginResponse = await userApi.login(data.email, data.password);
        if (loginResponse.access_token) {
          await AsyncStorage.setItem('token', loginResponse.access_token);
        }
      } catch (loginError) {
        console.error('자동 로그인 실패:', loginError);
      }
      
      return response.data;
    } catch (error) {
      console.error('회원가입 실패:', error);
      throw error;
    }
  },

  // 내 정보 조회
  getMe: async (): Promise<UserResponse> => {
    try {
      const response = await api.get<UserResponse>('/users/me');
      return response.data;
    } catch (error) {
      console.error('사용자 정보 조회 실패:', error);
      throw error;
    }
  },

  // 내 정보 수정
  updateMe: async (data: { full_name: string }): Promise<UserResponse> => {
    try {
      const response = await api.put<UserResponse>('/users/me', data);
      return response.data;
    } catch (error) {
      console.error('사용자 정보 수정 실패:', error);
      throw error;
    }
  },
};

// 온보딩 관련 API
export const onboardingApi = {
  // 온보딩 1단계 데이터 저장
  saveStep1: async (data: OnboardingStep1Data): Promise<OnboardingResponse> => {
    try {
      const response = await api.post<OnboardingResponse>('/onboarding/step1', data);
      return response.data;
    } catch (error) {
      console.error('온보딩 1단계 저장 실패:', error);
      throw error;
    }
  },
  
  // 온보딩 2단계 데이터 저장
  saveStep2: async (data: OnboardingStep2Data): Promise<OnboardingResponse> => {
    try {
      const response = await api.post<OnboardingResponse>('/onboarding/step2', data);
      return response.data;
    } catch (error) {
      console.error('온보딩 2단계 저장 실패:', error);
      throw error;
    }
  },
  
  // 온보딩 3단계 데이터 저장
  saveStep3: async (data: OnboardingStep3Data): Promise<OnboardingResponse> => {
    try {
      const response = await api.post<OnboardingResponse>('/onboarding/step3', data);
      return response.data;
    } catch (error) {
      console.error('온보딩 3단계 저장 실패:', error);
      throw error;
    }
  },
  
  // 온보딩 데이터 조회
  getOnboarding: async (): Promise<OnboardingResponse> => {
    try {
      const response = await api.get<OnboardingResponse>('/onboarding/');
      return response.data;
    } catch (error) {
      console.error('온보딩 데이터 조회 실패:', error);
      throw error;
    }
  },
};

// 메시지 관련 타입 정의
export interface RecommendedGoal {
  id: number;
  name: string;
  description: string;
  reason: string;
  confidence: number;
}

export interface GeneratedMessage {
  message: string;
  positive_reaction: number;
  warning: string | null;
}

// 메시지 API
export const messageApi = {
  // 추천 목표 목록 가져오기
  getRecommendedGoals: async (): Promise<RecommendedGoal[]> => {
    try {
      const response = await api.get('/messages/recommended-goals');
      return response.data;
    } catch (error) {
      console.error('Error fetching recommended goals:', error);
      throw error;
    }
  },

  // 메시지 생성
  generateMessage: async (data: {
    purpose: string;
    tone_style: string;
  }): Promise<GeneratedMessage> => {
    try {
      const response = await api.post('/messages/generate', data);
      return response.data;
    } catch (error) {
      console.error('Error generating message:', error);
      throw error;
    }
  }
}; 