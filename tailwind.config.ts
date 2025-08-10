import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  // Tailwind CSS 3.4+ 성능 최적화 - 더 구체적인 경로 설정
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    // node_modules 제외로 스캔 성능 향상
    "!./node_modules/**/*",
    "!./.next/**/*",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#3D51FF", // Zimssa blue
          50: "#f2f3ff",
          100: "#e6e8ff",
          200: "#bfc5ff",
          300: "#99a3ff",
          400: "#7380ff",
          500: "#3D51FF",
          600: "#2e3ed9",
          700: "#1f2bb3",
          800: "#10188c",
          900: "#010566",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#FFE200", // Zimssa yellow
          50: "#fffef5",
          100: "#fffce6",
          200: "#fff8b3",
          300: "#fff480",
          400: "#ffee4d",
          500: "#FFE200",
          600: "#d9c000",
          700: "#b39e00",
          800: "#8c7c00",
          900: "#665a00",
          foreground: "#222222",
        },
        success: {
          DEFAULT: "#00c362",
          light: "#4ddba2",
          dark: "#008342",
        },
        warning: {
          DEFAULT: "#ffb020",
          light: "#ffc654",
          dark: "#d98f00",
        },
        error: {
          DEFAULT: "#ff4757",
          light: "#ff6b7a",
          dark: "#d93847",
        },
        info: {
          DEFAULT: "#00c362",
          light: "#4ddba2",
          dark: "#008342",
        },
        neutral: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#eeeeee",
          300: "#e0e0e0",
          400: "#bdbdbd",
          500: "#9e9e9e",
          600: "#757575",
          700: "#616161",
          800: "#424242",
          900: "#212121",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-pretendard)",
          "var(--font-inter)",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "sans-serif"
        ],
      },
      // 한국어 최적화된 타이포그래피 (Context7 최신 권장사항)
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        sm: ["0.875rem", { lineHeight: "1.4", letterSpacing: "-0.01em" }],
        base: ["1rem", { lineHeight: "1.6", letterSpacing: "-0.01em" }],
        lg: ["1.125rem", { lineHeight: "1.6", letterSpacing: "-0.02em" }],
        xl: ["1.25rem", { lineHeight: "1.5", letterSpacing: "-0.02em" }],
        "2xl": ["1.5rem", { lineHeight: "1.4", letterSpacing: "-0.02em" }],
        "3xl": ["2rem", { lineHeight: "1.3", letterSpacing: "-0.03em" }],
        "4xl": ["2.5rem", { lineHeight: "1.2", letterSpacing: "-0.03em" }],
        "5xl": ["3rem", { lineHeight: "1.1", letterSpacing: "-0.04em" }],
        "6xl": ["3.75rem", { lineHeight: "1.05", letterSpacing: "-0.04em" }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        "bubble-float": {
          "0%, 100%": { transform: "translateY(0px) scale(1)" },
          "50%": { transform: "translateY(-20px) scale(1.1)" },
        },
        // Tailwind 4.0 호환 새로운 애니메이션
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeIn: "fadeIn 0.6s ease-out",
        slideIn: "slideIn 0.3s ease-out",
        bounce: "bounce 2s infinite",
        float: "float 3s ease-in-out infinite",
        "pulse-slow": "pulse-slow 4s ease-in-out infinite",
        shimmer: "shimmer 2s ease-in-out infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
        "bubble-float": "bubble-float 3s ease-in-out infinite",
        // 새로운 애니메이션
        "fade-in-up": "fade-in-up 0.5s ease-out",
        "slide-in-right": "slide-in-right 0.4s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
      },
      // 한국어 텍스트 최적화 (Context7 권장)
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      // 모바일 퍼스트 한국 시장 브레이크포인트
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;