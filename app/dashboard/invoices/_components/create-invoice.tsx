"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { insertInvoiceParams, type NewInvoiceParams } from "@/lib/db/schema";
import { trpc } from "@/lib/trpc/client";
import { cn, generateInvoiceNumber } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarBlank } from "@phosphor-icons/react";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function CreateInvoice() {
  const [isOpen, setIsOpen] = useState(false);
  const utils = trpc.useUtils();
  const { data: students, isLoading: loadingStudents } =
    trpc.students.getAll.useQuery();
  const { data: companies, isLoading: loadingCompanies } =
    trpc.companies.getAll.useQuery();
  const { mutate, isLoading: isPending } = trpc.invoices.create.useMutation({
    onSuccess: async () => {
      toast.success("Invoice created!");
      await utils.invoices.getAll.invalidate();
    },
    onError: () => {
      toast.error("An error has occured when creating invoice.");
    },
    onSettled: () => {
      closeModal();
    },
  });

  const form = useForm<NewInvoiceParams>({
    resolver: zodResolver(insertInvoiceParams),
    defaultValues: {
      invoiceNumber: generateInvoiceNumber(),
      companyId: "",
      studentId: "",
      IssueDate: undefined,
      paid: false,
    },
  });

  async function onSubmit(data: NewInvoiceParams) {
    mutate(data);
  }

  const closeModal = () => {
    setIsOpen(false);
    form.reset();
    form.clearErrors();
    void generateInvoiceNumber();
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
          <DialogTitle>Create Invoice</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="invoiceNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Invoice number</FormLabel>
                  <FormControl>
                    <Input disabled={true} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <Select
                    disabled={isPending || loadingCompanies}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a company" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {companies?.map((company) => (
                        <SelectItem key={company.id} value={company.id}>
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student</FormLabel>
                  <Select
                    disabled={isPending || loadingStudents}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a student" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {students?.map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.firstName} {student.lastName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="IssueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Issue date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarBlank className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paid</FormLabel>
                  <Select
                    disabled={isPending}
                    onValueChange={(value) =>
                      form.setValue("paid", Boolean(value))
                    }
                    defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={"true"}>Yes</SelectItem>
                      <SelectItem value={"false"}>No</SelectItem>
                    </SelectContent>
                  </Select>

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
