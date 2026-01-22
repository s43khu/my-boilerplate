import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";
import type { LoginCredentials, RegisterData, User } from "@/types/user.types";

const authApi = {
  login: async (credentials: LoginCredentials) => {
    const { data } = await apiClient.post<{ user: User; token: string }>("/auth/login", credentials);
    return data;
  },

  register: async (userData: RegisterData) => {
    const { data } = await apiClient.post<{ user: User; token: string }>("/auth/register", userData);
    return data;
  },

  getCurrentUser: async () => {
    const { data } = await apiClient.get<User>("/auth/me");
    return data;
  },

  logout: async () => {
    await apiClient.post("/auth/logout");
  },
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      localStorage.setItem("auth_token", data.token);
      queryClient.setQueryData(["user"], data.user);
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      localStorage.setItem("auth_token", data.token);
      queryClient.setQueryData(["user"], data.user);
    },
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: authApi.getCurrentUser,
    enabled: !!localStorage.getItem("auth_token"),
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      localStorage.removeItem("auth_token");
      queryClient.clear();
    },
  });
};
