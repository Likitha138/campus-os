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

interface RegisteredStudent {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "student";
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

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const SESSION_KEY = "campus_os_user";
const STUDENT_KEY = "campus_os_registered_student";

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /*
   * Restore existing login session.
   */
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(SESSION_KEY);

      if (savedUser) {
        const parsedUser: AuthUser = JSON.parse(savedUser);

        if (
          parsedUser &&
          parsedUser.email &&
          parsedUser.role
        ) {
          setUser(parsedUser);
        }
      }
    } catch (error) {
      console.error(
        "Unable to restore Campus OS session:",
        error
      );

      localStorage.removeItem(SESSION_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /*
   * STUDENT REGISTRATION
   *
   * Registration creates the account only.
   *
   * It DOES NOT automatically log the student in.
   *
   * Later this function will call:
   *
   * POST /api/auth/student/register
   */
  const registerStudent = async (
    name: string,
    email: string,
    password: string,
    studentId: string
  ): Promise<boolean> => {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();
    const cleanStudentId = studentId.trim();

    if (
      !cleanName ||
      !cleanEmail ||
      !cleanPassword ||
      !cleanStudentId
    ) {
      return false;
    }

    if (cleanPassword.length < 6) {
      return false;
    }

    /*
     * Temporary frontend storage.
     *
     * IMPORTANT:
     * This is only for testing the frontend.
     * Passwords must NOT be stored this way in the
     * real production system.
     *
     * Your friend's backend will replace this with
     * proper password hashing and database storage.
     */

    const existingStudentRaw = localStorage.getItem(
      STUDENT_KEY
    );

    if (existingStudentRaw) {
      try {
        const existingStudent: RegisteredStudent =
          JSON.parse(existingStudentRaw);

        if (
          existingStudent.email === cleanEmail
        ) {
          return false;
        }

        if (
          existingStudent.id === cleanStudentId
        ) {
          return false;
        }
      } catch {
        localStorage.removeItem(STUDENT_KEY);
      }
    }

    const registeredStudent: RegisteredStudent = {
      id: cleanStudentId,
      name: cleanName,
      email: cleanEmail,
      password: cleanPassword,
      role: "student",
    };

    localStorage.setItem(
      STUDENT_KEY,
      JSON.stringify(registeredStudent)
    );

    /*
     * IMPORTANT:
     * We intentionally DO NOT call setUser().
     *
     * The student must now go to the Login page
     * and authenticate using the registered credentials.
     */

    return true;
  };

  /*
   * LOGIN
   *
   * Student:
   * - Must have registered first.
   * - Email/password must match registration.
   *
   * Admin:
   * - Cannot register.
   * - Uses the temporary predefined credentials.
   *
   * Later this will become:
   *
   * POST /api/auth/student/login
   * POST /api/auth/admin/login
   */
  const login = async (
    email: string,
    password: string,
    role: UserRole
  ): Promise<boolean> => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      return false;
    }

    /*
     * ========================================================
     * STUDENT LOGIN
     * ========================================================
     */

    if (role === "student") {
      const savedStudentRaw =
        localStorage.getItem(STUDENT_KEY);

      /*
       * Student hasn't registered yet.
       */
      if (!savedStudentRaw) {
        return false;
      }

      try {
        const student: RegisteredStudent =
          JSON.parse(savedStudentRaw);

        /*
         * Verify email and password.
         */
        if (
          student.email !== cleanEmail ||
          student.password !== cleanPassword
        ) {
          return false;
        }

        const loggedInStudent: AuthUser = {
          id: student.id,
          name: student.name,
          email: student.email,
          role: "student",
        };

        setUser(loggedInStudent);

        localStorage.setItem(
          SESSION_KEY,
          JSON.stringify(loggedInStudent)
        );

        return true;
      } catch (error) {
        console.error(
          "Student login error:",
          error
        );

        return false;
      }
    }

    /*
     * ========================================================
     * ADMIN LOGIN
     * ========================================================
     *
     * TEMPORARY FRONTEND ADMIN ACCOUNT
     *
     * Email:
     * admin@campus.edu
     *
     * Password:
     * admin123
     *
     * There is NO admin registration.
     *
     * Your friend's backend will replace this with
     * database authentication.
     */

    const ADMIN_EMAIL = "admin@campus.edu";
    const ADMIN_PASSWORD = "admin123";

    if (
      cleanEmail !== ADMIN_EMAIL ||
      cleanPassword !== ADMIN_PASSWORD
    ) {
      return false;
    }

    const loggedInAdmin: AuthUser = {
      id: "ADMIN-001",
      name: "Campus Administrator",
      email: ADMIN_EMAIL,
      role: "admin",
    };

    setUser(loggedInAdmin);

    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify(loggedInAdmin)
    );

    return true;
  };

  /*
   * LOGOUT
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
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
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}