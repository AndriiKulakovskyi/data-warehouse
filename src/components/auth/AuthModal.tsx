import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

type AuthMode = "login" | "signup";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: AuthMode;
}

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = "login",
}) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);

  const handleSuccess = () => {
    onClose();
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {mode === "login" ? "Welcome Back" : "Join Clinical Dataset Hub"}
          </DialogTitle>
        </DialogHeader>
        {mode === "login" ? (
          <LoginForm onSuccess={handleSuccess} onSignUpClick={toggleMode} />
        ) : (
          <SignUpForm onSuccess={handleSuccess} onLoginClick={toggleMode} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
