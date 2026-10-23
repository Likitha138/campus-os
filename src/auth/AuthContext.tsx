import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type UserRole = "student" | "admin";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    email: string,
    password: string,
    role: UserRole
  ) => Promise<boolean>;
  registerStudent: (
    name: string,
    email: string,
    password: string,
    studentId: string
  ) => Promise<boolean>;
  logout: () => void;
}

interface AuthApiUser {
  id: string | number;
  name: string;
  email: string;
  role: UserRole;
  studentId?: string;
  student_id?: string;
}

interface AuthApiResponse {
  success?: boolean;
  message?: string;
  token?: string;
  user?: AuthApiUser;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const SESSION_KEY = "campus_os_user";
const TOKEN_KEY = "campus_os_token";
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function normalizeUser(apiUser: AuthApiUser): AuthUser {
  return {
    id: String(apiUser.id),
    name: apiUser.name,
    email: apiUser.email,
    role: apiUser.role,
  };
}

async function authRequest(
  endpoint: string,
  body: Record<string, string>
): Promise<AuthApiResponse> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = (await response.json().catch(() => ({}))) as AuthApiResponse;

  if (!response.ok || data.success === false) {
    throw new Error(
      data.message || `Authentication failed (${response.status}).`
    );
  }

  return data;
}

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore the saved session when the app opens.
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(SESSION_KEY);
      const savedToken = localStorage.getItem(TOKEN_KEY);

      if (savedUser && savedToken) {
        const parsedUser = JSON.parse(savedUser) as AuthUser;

        if (
          parsedUser.id &&
          parsedUser.name &&
          parsedUser.email &&
          (parsedUser.role === "student" ||
            parsedUser.role === "admin")
        ) {
          setUser(parsedUser);
        } else {
          localStorage.removeItem(SESSION_KEY);
          localStorage.removeItem(TOKEN_KEY);
        }
      } else {
        localStorage.removeItem(SESSION_KEY);
        localStorage.removeItem(TOKEN_KEY);
      }
    } catch (error) {
      console.error("Unable to restore Campus OS session:", error);
      localStorage.removeItem(SESSION_KEY);
      localStorage.removeItem(TOKEN_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Register a student in the backend database.
  // Registration does not automatically log the student in.
  const registerStudent = async (
    name: string,
    email: string,
    password: string,
    studentId: string
  ): Promise<boolean> => {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanStudentId = studentId.trim();

    if (
      !cleanName ||
      !cleanEmail ||
      !cleanStudentId ||
      !password
    ) {
      return false;
    }

    if (password.length < 8) {
      console.error("Password must contain at least 8 characters.");
      return false;
    }

    try {
      const response = await authRequest(
        "/auth/student/register",
        {
          name: cleanName,
          studentId: cleanStudentId,
          email: cleanEmail,
          password,
        }
      );

      return response.success !== false;
    } catch (error) {
      console.error(
        "Student registration failed:",
        error instanceof Error ? error.message : error
      );
      return false;
    }
  };

  // Authenticate students and admins against the backend.
  const login = async (
    email: string,
    password: string,
    role: UserRole
  ): Promise<boolean> => {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      return false;
    }

    try {
      const response = await authRequest("/auth/login", {
        email: cleanEmail,
        password,
        role,
      });

      if (!response.token || !response.user) {
        console.error(
          "Login response is missing a token or user."
        );
        return false;
      }

      if (response.user.role !== role) {
        console.error("The account role does not match the selected role.");
        return false;
      }

      const loggedInUser = normalizeUser(response.user);

      localStorage.setItem(TOKEN_KEY, response.token);
      localStorage.setItem(
        SESSION_KEY,
        JSON.stringify(loggedInUser)
      );

      setUser(loggedInUser);
      return true;
    } catch (error) {
      console.error(
        "Campus OS login failed:",
        error instanceof Error ? error.message : error
      );
      return false;
    }
  };

  // Clear the local session and token.
  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        login,
        registerStudent,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}