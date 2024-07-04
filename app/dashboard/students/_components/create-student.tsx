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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { insertStudentParams, type NewStudentParams } from "@/lib/db/schema";
import { trpc } from "@/lib/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function CreateStudent() {
  const [isOpen, setIsOpen] = useState(false);
  const utils = trpc.useUtils();
  const { mutate, isLoading: isPending } = trpc.students.create.useMutation({
    onSuccess: async () => {
      toast.success("Student created!");
      await utils.students.getAll.invalidate();
    },
    onError: () => {
      toast.error("An error has occured when creating student.");
    },
    onSettled: () => {
      closeModal();
    },
  });

  const form = useForm<NewStudentParams>({
    resolver: zodResolver(insertStudentParams),
    defaultValues: {
      firstName: "",
      lastName: "",
      middleName: "",
    },
  });

  async function onSubmit(data: NewStudentParams) {
    mutate(data);
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
        <Button>Create</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Student</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="middleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Middle name</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button disabled={isPending} variant={"outline"}>
                  Cancel
                </Button>
              </DialogClose>
              <Button disabled={isPending} type="submit">
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
