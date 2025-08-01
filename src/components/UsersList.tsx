import { useState } from "react";
import { UserCard } from "./UserCard";
import { UserForm } from "./UserForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUsers } from "@/hooks/useUsers";
import { User, CreateUserRequest } from "@/types/user";
import { Plus, Search, Users, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const UsersList = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  const {
    users,
    isLoading,
    createUser,
    updateUser,
    deleteUser,
    isCreating,
    isUpdating,
    isDeleting,
  } = useUsers();

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (userData: CreateUserRequest) => {
    if (editingUser) {
      updateUser({ ...userData, id: editingUser.id });
    } else {
      createUser(userData);
    }
    setShowForm(false);
    setEditingUser(null);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setUserToDelete(id);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      deleteUser(userToDelete);
      setUserToDelete(null);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--gradient-bg)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Carregando usuários...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--gradient-bg)] p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-[var(--gradient-primary)] bg-clip-text text-transparent mb-2">
            Gerenciamento de Usuários
          </h1>
          <p className="text-muted-foreground text-lg">
            Gerencie usuários de forma simples e eficiente
          </p>
        </div>

        {/* Controles */}
        <div className="bg-card rounded-lg shadow-[var(--shadow-elegant)] p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar usuários..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-[var(--gradient-primary)] hover:shadow-[var(--shadow-hover)]"
            >
              <Plus className="w-4 h-4" />
              Novo Usuário
            </Button>
          </div>
        </div>

        {/* Lista de usuários ou formulário */}
        {showForm ? (
          <div className="flex justify-center">
            <UserForm
              user={editingUser}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isLoading={isCreating || isUpdating}
            />
          </div>
        ) : (
          <>
            {/* Estatísticas */}
            <div className="bg-card rounded-lg shadow-[var(--shadow-elegant)] p-6 mb-8">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {filteredUsers.length}
                  </p>
                  <p className="text-muted-foreground">
                    {filteredUsers.length === 1 ? "usuário encontrado" : "usuários encontrados"}
                  </p>
                </div>
              </div>
            </div>

            {/* Grid de usuários */}
            {filteredUsers.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  {searchTerm ? "Nenhum usuário encontrado" : "Nenhum usuário cadastrado"}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {searchTerm
                    ? "Tente ajustar os termos de busca"
                    : "Comece criando seu primeiro usuário"}
                </p>
                {!searchTerm && (
                  <Button
                    onClick={() => setShowForm(true)}
                    className="bg-[var(--gradient-primary)]"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Criar Primeiro Usuário
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map((user) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* Dialog de confirmação de exclusão */}
        <AlertDialog open={!!userToDelete} onOpenChange={() => setUserToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                disabled={isDeleting}
              >
                {isDeleting ? "Excluindo..." : "Excluir"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};