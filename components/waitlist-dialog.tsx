import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogFooter
} from "components/ui/dialog";
import Button from "components/ui/button";
import { RxArrowRight, RxReload } from "react-icons/rx";
import { useToast } from "components/toast";
import Label from "./form-elements/label";
import Input from "./form-elements/input";

export const WaitListDialog = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const req = await fetch("/api/wait-list", {
        method: "POST",
        body: JSON.stringify({ email })
      });
      const res = await req.json();
      if (res.message === "Added to the wait list") {
        toast({
          title: "Success",
          description: "You have been added to the wait list. We will notify you when we are ready for you to sign up.",
          duration: 5000
        });
        setEmail("");
      } else {
        throw new Error(res.message);
      }
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error adding your email to the wait list",
        variant: "destructive",
        duration: 5000
      });
      setLoading(false);
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEmail("");
    }, 2000);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className="py-6">
          <span className="text-lg">Join the wait list</span>
          <RxArrowRight className="ml-2" size={24} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Wait List</DialogTitle>
            <DialogDescription>
              We are currently in private beta. Sign up to be notified when we are ready for you to sign up.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? (
                <>
                  <RxReload className="mr-2 h-4 w-4 animate-spin" /> Sending...
                </>
              ) : (
                "Add me to the wait list"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WaitListDialog;
