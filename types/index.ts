// Modern TypeScript 5.9 Types for Next.js 14 Project

// ===== Global API Response Types =====
export type ApiResponse<T> = {
  readonly data: T;
  readonly status: 'success' | 'error' | 'loading';
  readonly message?: string;
  readonly timestamp: number;
};

export type PaginatedResponse<T> = ApiResponse<{
  readonly items: readonly T[];
  readonly pagination: {
    readonly page: number;
    readonly limit: number;
    readonly total: number;
    readonly hasMore: boolean;
  };
}>;

// ===== Enhanced Component Props Types =====
export type PropsWithClassName<T = {}> = T & {
  readonly className?: string;
};

export type PropsWithChildren<T = {}> = T & {
  readonly children: React.ReactNode;
};

export type ComponentVariants = 'primary' | 'secondary' | 'danger' | 'ghost';

// ===== Modern Form Types =====
export type FormFieldError = {
  readonly message: string;
  readonly type: 'required' | 'pattern' | 'minLength' | 'maxLength' | 'custom';
};

export type FormState<T = Record<string, unknown>> = {
  readonly data: T;
  readonly errors: Partial<Record<keyof T, FormFieldError>>;
  readonly isSubmitting: boolean;
  readonly isValid: boolean;
};

// ===== Service Types =====
export type ServiceType = 'moving' | 'cleaning' | 'delivery' | 'transportation';

export interface ServiceBase {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly type: ServiceType;
  readonly price: {
    readonly min: number;
    readonly max?: number;
    readonly currency: 'KRW';
  };
  readonly rating: {
    readonly average: number;
    readonly count: number;
  };
  readonly availability: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface CleaningService extends ServiceBase {
  readonly type: 'cleaning';
  readonly features: readonly string[];
  readonly serviceTypes: readonly ('move-in' | 'move-out' | 'office' | 'regular')[];
  readonly coverage: readonly string[];
}

export interface MovingService extends ServiceBase {
  readonly type: 'moving';
  readonly vehicleTypes: readonly string[];
  readonly distance: {
    readonly min: number;
    readonly max: number;
  };
  readonly movers: number;
}

export type Service = CleaningService | MovingService;

// ===== User & Authentication Types =====
export interface User {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly phone?: string;
  readonly avatar?: string;
  readonly role: 'user' | 'partner' | 'admin';
  readonly preferences: {
    readonly notifications: boolean;
    readonly language: 'ko' | 'en';
    readonly theme: 'light' | 'dark' | 'system';
  };
  readonly createdAt: string;
  readonly lastLoginAt?: string;
}

export type AuthState = {
  readonly user: User | null;
  readonly isAuthenticated: boolean;
  readonly isLoading: boolean;
  readonly error: string | null;
};

// ===== Modern Event Handler Types =====
export type InputChangeHandler<T = HTMLInputElement> = (
  event: React.ChangeEvent<T>
) => void;

export type FormSubmitHandler<T = HTMLFormElement> = (
  event: React.FormEvent<T>
) => void | Promise<void>;

export type ButtonClickHandler = (
  event: React.MouseEvent<HTMLButtonElement>
) => void | Promise<void>;

// ===== Utility Types (TypeScript 5.9 patterns) =====
export type NonNullable<T> = T extends null | undefined ? never : T;

export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export type Awaited<T> = T extends Promise<infer U> ? U : T;

// ===== Component Ref Types =====
export type ComponentRef<T> = React.RefObject<T> | ((instance: T | null) => void);

// ===== Next.js Specific Types =====
export interface PageProps<T extends Record<string, string> = {}> {
  readonly params: T;
  readonly searchParams: { readonly [key: string]: string | string[] | undefined };
}

export interface LayoutProps<T extends Record<string, string> = {}> {
  readonly children: React.ReactNode;
  readonly params: T;
}

// ===== Error Types =====
export interface AppError extends Error {
  readonly code: string;
  readonly statusCode?: number;
  readonly context?: Record<string, unknown>;
}

export type ErrorBoundaryState = {
  readonly hasError: boolean;
  readonly error: AppError | null;
  readonly errorId: string | null;
};

// ===== Animation & UI Types =====
export type AnimationVariant = {
  readonly initial: object;
  readonly animate: object;
  readonly exit?: object;
  readonly transition?: object;
};

export type BreakpointSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type ColorScheme = {
  readonly primary: string;
  readonly secondary: string;
  readonly accent: string;
  readonly neutral: string;
  readonly success: string;
  readonly warning: string;
  readonly error: string;
};

// ===== Hook Return Types =====
export type UseAsyncState<T> = {
  readonly data: T | null;
  readonly loading: boolean;
  readonly error: Error | null;
  readonly execute: (...args: unknown[]) => Promise<void>;
  readonly reset: () => void;
};

export type UseLocalStorageReturn<T> = readonly [
  T,
  (value: T | ((val: T) => T)) => void,
  () => void
];

// ===== Constants Types =====
export const SERVICE_TYPES = ['moving', 'cleaning', 'delivery', 'transportation'] as const;
export const USER_ROLES = ['user', 'partner', 'admin'] as const;
export const LANGUAGES = ['ko', 'en'] as const;
export const THEMES = ['light', 'dark', 'system'] as const;

// Type assertions for constants
export type ServiceTypeConstant = typeof SERVICE_TYPES[number];
export type UserRoleConstant = typeof USER_ROLES[number];
export type LanguageConstant = typeof LANGUAGES[number];
export type ThemeConstant = typeof THEMES[number];