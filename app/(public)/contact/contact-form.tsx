"use client";
import { useState } from "react";
import Button from "components/ui/button";
import Label from "components/form-elements/label";
import Input from "components/form-elements/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "components/form-elements/select";
import Textarea from "components/form-elements/textarea";
import { useToast } from "components/toast";
import { RxReload } from "react-icons/rx";

const subjectOptions = ["Query", "Suggestion", "Report an error", "Others"];

export const ContactForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const req = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(formValues)
      });
      const res = await req.json();
      if (res.message === "Message sended") {
        toast({
          title: "Message sent",
          description: "Your message was sent successfully",
          duration: 5000
        });
        setFormValues({ name: "", email: "", subject: "", message: "" });
      } else {
        toast({
          title: "Error",
          description: res.message,
          variant: "destructive",
          duration: 5000
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error",
        description: "An error occurred, please try again later",
        variant: "destructive",
        duration: 5000
      });
      setFormValues({ name: "", email: "", subject: "", message: "" });
    }
  };

  const handleSelectChange = (value: string) => {
    setFormValues({ ...formValues, subject: value });
  };

  return (
    <form className="grid gap-4 py-4" onSubmit={handleFormSubmit}>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Name
        </Label>
        <Input
          id="name"
          value={formValues.name}
          required={true}
          placeholder="Steve"
          className="col-span-3"
          onChange={(e) => {
            setFormValues({ ...formValues, name: e.target.value });
          }}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="email" className="text-right">
          Mail
        </Label>
        <Input
          id="email"
          value={formValues.email}
          type="email"
          required={true}
          placeholder="steve@mail.com"
          className="col-span-3"
          onChange={(e) => {
            setFormValues({ ...formValues, email: e.target.value });
          }}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="subject" className="text-right">
          Subject
        </Label>
        <Select onValueChange={handleSelectChange} defaultValue={formValues.subject}>
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select a subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Subject</SelectLabel>
              {subjectOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        <Label htmlFor="message" className="text-left">
          Message
        </Label>
        <Textarea
          id="message"
          value={formValues.message}
          required={true}
          placeholder="Message"
          onChange={(e) => setFormValues({ ...formValues, message: e.target.value })}
        />
      </div>
      <Button type="submit" className="w-full md:w-auto justify-self-end" disabled={loading}>
        {loading ? (
          <>
            <RxReload className="mr-2 h-4 w-4 animate-spin" /> Sending...
          </>
        ) : (
          "Send message"
        )}
      </Button>
    </form>
  );
};
