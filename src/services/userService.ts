import { User, CreateUserRequest, UpdateUserRequest } from "@/types/user";

const API_BASE_URL = "https://your-php-api-url.com"; // Substitua pela URL real da sua API PHP

export const userService = {
  // Buscar todos os usuários
  async getUsers(): Promise<User[]> {
    const response = await fetch(`${API_BASE_URL}/users.php`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      throw new Error("Erro ao buscar usuários");
    }
    
    return response.json();
  },

  // Criar novo usuário
  async createUser(userData: CreateUserRequest): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/users.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      throw new Error("Erro ao criar usuário");
    }
  },

  // Atualizar usuário
  async updateUser(userData: UpdateUserRequest): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/users.php`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      throw new Error("Erro ao atualizar usuário");
    }
  },

  // Deletar usuário
  async deleteUser(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/users.php`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    
    if (!response.ok) {
      throw new Error("Erro ao deletar usuário");
    }
  },
};