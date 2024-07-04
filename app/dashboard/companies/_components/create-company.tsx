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
import { Textarea } from "@/components/ui/textarea";
import { insertCompanyParams, type NewCompanyParams } from "@/lib/db/schema";
import { trpc } from "@/lib/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function CreateCompany() {
  const [isOpen, setIsOpen] = useState(false);
  const utils = trpc.useUtils();
  const { mutate, isLoading: isPending } = trpc.companies.create.useMutation({
    onSuccess: async () => {
      toast.success("Company created!");
      await utils.companies.getAll.invalidate();
    },
    onError: () => {
      toast.error("An error has occured when creating company.");
    },
    onSettled: () => {
      closeModal();
    },
  });

  const form = useForm<NewCompanyParams>({
    resolver: zodResolver(insertCompanyParams),
    defaultValues: {
      name: "",
      uaeVat: "",
      registeredOffice: "",
      registrationNumber: "",
      contactEmail: "",
      logo: "",
      website: "",
    },
  });

  async function onSubmit(data: NewCompanyParams) {
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
          <DialogTitle>Create Company</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="registrationNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registration number</FormLabel>
                    <FormControl>
                      <Input disabled={isPending} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="uaeVat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>UAE VAT</FormLabel>
                    <FormControl>
                      <Input disabled={isPending} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="registeredOffice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Registered office</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isPending}
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo Url</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      value={form.getValues("logo") ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        {...field}
                        value={form.getValues("contactEmail") ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        {...field}
                        value={form.getValues("website") ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
