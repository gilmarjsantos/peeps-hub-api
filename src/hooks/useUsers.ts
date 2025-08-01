import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/userService";
import { CreateUserRequest, UpdateUserRequest } from "@/types/user";
import { useToast } from "@/hooks/use-toast";

export const useUsers = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: userService.getUsers,
  });

  const createUserMutation = useMutation({
    mutationFn: userService.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "Sucesso!",
        description: "Usuário criado com sucesso.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: error.message || "Erro ao criar usuário.",
        variant: "destructive",
      });
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: userService.updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "Sucesso!",
        description: "Usuário atualizado com sucesso.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: error.message || "Erro ao atualizar usuário.",
        variant: "destructive",
      });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: userService.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "Sucesso!",
        description: "Usuário excluído com sucesso.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: error.message || "Erro ao excluir usuário.",
        variant: "destructive",
      });
    },
  });

  const createUser = (userData: CreateUserRequest) => {
    createUserMutation.mutate(userData);
  };

  const updateUser = (userData: UpdateUserRequest) => {
    updateUserMutation.mutate(userData);
  };

  const deleteUser = (id: number) => {
    deleteUserMutation.mutate(id);
  };

  return {
    users: usersQuery.data || [],
    isLoading: usersQuery.isLoading,
    error: usersQuery.error,
    createUser,
    updateUser,
    deleteUser,
    isCreating: createUserMutation.isPending,
    isUpdating: updateUserMutation.isPending,
    isDeleting: deleteUserMutation.isPending,
  };
};