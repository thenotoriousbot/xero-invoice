"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { z } from "zod";

const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required.",
    })
    .email("Please enter a valid email."),
  message: z
    .string()
    .min(1, "Message is required.")
    .max(2500, "Message can't be longer than 2500 characters."),
});

export default function AskQuestion() {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      message: "",
    },
  });

  const isPending = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    }).then(() => {
      closeModal();
      toast.success("Message sent successfully.");
    });
  }

  const closeModal = () => {
    setIsOpen(false);
    form.reset();
    form.clearErrors();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() =>
        isPending ? true : isOpen ? closeModal() : setIsOpen(true)
      }
    >
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="h-10 w-full border-xero-border font-semibold !text-xero-blue"
        >
          Ask a question
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ask a question</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>From</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} {...field} />
                  </FormControl>
                  <FormDescription>Your email address</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isPending}
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    To Britts Imperial University College
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  disabled={isPending}
                  variant={"outline"}
                  className="!text-xero-blue"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                disabled={isPending}
                type="submit"
                className="!bg-xero-blue"
              >
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
