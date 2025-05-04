import { signOut } from "next-auth/react";
import { Button } from "@/app/shared/ui/button/Button";
import { LogOut } from "@/public/images";

export const LogOutBtn = () => {
  return (
    <Button
      icon={<LogOut />}
      size="md"
      variant="primary"
      onClick={() => signOut()}
    >
      Вийти
    </Button>
  );
};
