import { Button } from "@/components/ui/button";
import { Facebook } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export function FacebookLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFacebookLogin = async () => {
    try {
      setIsLoading(true);
      await signIn("facebook", { callbackUrl: "/" });
    } catch (error) {
      console.error("Facebook login error:", error);
      toast({
        title: "Authentication Error",
        description: "Failed to login with Facebook. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      type="button"
      disabled={isLoading}
      onClick={handleFacebookLogin}
      className="w-full flex items-center gap-2"
    >
      {isLoading ? (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      ) : (
        <Facebook className="h-4 w-4 text-blue-600" />
      )}
      Continue with Facebook
    </Button>
  );
}