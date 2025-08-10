import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
// Types available for future use

// TypeScript 5.9: Enhanced utility function with proper typing
export function cn(...inputs: readonly ClassValue[]): string {
  return twMerge(clsx(inputs))
}

// Modern TypeScript utility functions (2024 patterns)

/**
 * Type-safe object keys with proper typing
 */
export function getTypedObjectKeys<T extends Record<string, unknown>>(
  obj: T
): readonly (keyof T)[] {
  return Object.keys(obj) as readonly (keyof T)[]
}

/**
 * Type-safe object entries with proper typing
 */
export function getTypedObjectEntries<T extends Record<string, unknown>>(
  obj: T
): readonly [keyof T, T[keyof T]][] {
  return Object.entries(obj) as readonly [keyof T, T[keyof T]][]
}

/**
 * Enhanced array groupBy with type safety
 */
export function groupBy<T, K extends string | number | symbol>(
  array: readonly T[],
  keyFn: (item: T) => K
): Record<K, T[]> {
  return array.reduce<Record<K, T[]>>((groups, item) => {
    const key = keyFn(item)
    groups[key] = groups[key] ?? []
    groups[key]!.push(item)
    return groups
  }, {} as Record<K, T[]>)
}

/**
 * Type-safe localStorage utilities with error handling
 */
export const storage = {
  get<T>(key: string, defaultValue: T): T {
    try {
      if (typeof window === 'undefined') return defaultValue
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  },

  set<T>(key: string, value: T): boolean {
    try {
      if (typeof window === 'undefined') return false
      window.localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch {
      return false
    }
  },

  remove(key: string): boolean {
    try {
      if (typeof window === 'undefined') return false
      window.localStorage.removeItem(key)
      return true
    } catch {
      return false
    }
  },
} as const

/**
 * Debounce function with proper TypeScript typing
 */
export function debounce<T extends readonly unknown[]>(
  fn: (...args: T) => void | Promise<void>,
  delay: number
): (...args: T) => void {
  let timeoutId: NodeJS.Timeout | null = null
  
  return (...args: T): void => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }
    
    timeoutId = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

/**
 * Throttle function with TypeScript 5.9 patterns
 */
export function throttle<T extends readonly unknown[]>(
  fn: (...args: T) => void | Promise<void>,
  delay: number
): (...args: T) => void {
  let lastCall = 0
  
  return (...args: T): void => {
    const now = Date.now()
    if (now - lastCall >= delay) {
      lastCall = now
      fn(...args)
    }
  }
}

/**
 * Format currency with proper localization
 */
export function formatCurrency(
  amount: number,
  currency: 'KRW' | 'USD' = 'KRW',
  locale: 'ko-KR' | 'en-US' = 'ko-KR'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: currency === 'KRW' ? 0 : 2,
  }).format(amount)
}

/**
 * Format date with proper localization
 */
export function formatDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {},
  locale: 'ko-KR' | 'en-US' = 'ko-KR'
): string {
  const dateObj = new Date(date)
  if (isNaN(dateObj.getTime())) return ''
  
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  }).format(dateObj)
}

/**
 * Type-safe array shuffle with immutability
 */
export function shuffle<T>(array: readonly T[]): readonly T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!]
  }
  return shuffled
}

/**
 * Generate unique ID with proper typing
 */
export function generateId(prefix: string = ''): string {
  const timestamp = Date.now().toString(36)
  const randomStr = Math.random().toString(36).substring(2)
  return prefix ? `${prefix}-${timestamp}-${randomStr}` : `${timestamp}-${randomStr}`
}

/**
 * Deep clone with TypeScript safety
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime()) as T
  if (obj instanceof Array) return obj.map(deepClone) as T
  if (typeof obj === 'object') {
    const cloned = {} as T
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        cloned[key] = deepClone(obj[key])
      }
    }
    return cloned
  }
  return obj
}

/**
 * Async retry utility with exponential backoff
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: {
    readonly maxRetries?: number;
    readonly delay?: number;
    readonly backoffFactor?: number;
  } = {}
): Promise<T> {
  const { maxRetries = 3, delay = 1000, backoffFactor = 2 } = options
  
  let lastError: unknown
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error
      
      if (attempt === maxRetries) {
        throw lastError
      }
      
      const waitTime = delay * Math.pow(backoffFactor, attempt)
      await new Promise(resolve => setTimeout(resolve, waitTime))
    }
  }
  
  throw lastError
}