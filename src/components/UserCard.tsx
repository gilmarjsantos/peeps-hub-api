import { User } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Mail, User as UserIcon } from "lucide-react";

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

export const UserCard = ({ user, onEdit, onDelete }: UserCardProps) => {
  return (
    <Card className="group hover:shadow-[var(--shadow-hover)] transition-all duration-300 border border-border bg-card">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <UserIcon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-foreground">{user.name}</h3>
              <Badge variant="secondary" className="text-xs">
                ID: {user.id}
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-muted-foreground">
          <Mail className="w-4 h-4" />
          <span className="text-sm">{user.email}</span>
        </div>
      </CardContent>
      
      <CardFooter className="flex gap-2 p-6 pt-0">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(user)}
          className="flex items-center gap-2 flex-1"
        >
          <Edit className="w-4 h-4" />
          Editar
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(user.id)}
          className="flex items-center gap-2 text-destructive hover:text-destructive-foreground hover:bg-destructive"
        >
          <Trash2 className="w-4 h-4" />
          Excluir
        </Button>
      </CardFooter>
    </Card>
  );
};