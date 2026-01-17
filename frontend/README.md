# Navigate to the frontend directory (if not already there)
cd frontend

# Create the project using the React TypeScript template
# The -y flag skips interactive prompts for npx
npx -y create-vite@latest . --template react-ts

# Install the standard dependencies
npm install


# Install Tailwind CSS v3 and its peer dependencies
npm install -D tailwindcss@3.4.17 postcss autoprefixer

# Initialize Tailwind to generate config files
npx tailwindcss init -p

Note: I manually created the config files 
tailwind.config.js
 and 
postcss.config.js
 when the init command stalled, but the command above is the standard way to do it.

3. Configure Tailwind
I updated 
tailwind.config.js
 to support our custom theme colors and content paths.

Updated 
tailwind.config.js
:
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
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
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // ... (animations keyframes)
    },
  },
  plugins: [],
}

4. Setup Global CSS
I replaced the contents of 
src/index.css
 with the Tailwind directives and our CSS variables for the color system.

src/index.css
:
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    /* ... other variables ... */
    --radius: 0.5rem;
  }
 
  .dark {
    /* ... dark mode variables ... */
  }
}
 
@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

5. Install Additional Libraries
Finally, I installed the necessary packages for routing, styling utilities, icons, and form validation.

npm install react-router-dom axios lucide-react class-variance-authority clsx tailwind-merge react-hook-form zod @hookform/resolvers