import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import * as z from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import productService, { Product } from "@/services/product-service";
import { useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";

interface IEditModalProps {
  id: number
  title: string
  refetch: () => void
}

interface IMutationData {
  id: number
  values: {
    title: string
  }
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required"
  })
});

export const EditFormModal: React.FC<IEditModalProps> = ({ title, id, refetch }) => {
  const [isOpen, setOpenModal] = useState(false)
  const mutation = useMutation({
    mutationFn: (data: IMutationData) => {
      return productService.updateProduct(data.id, data.values)
    }
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title,
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    mutation.mutate({ id: id, values }, {
      onSuccess: () => {
        setOpenModal(false)
        refetch()
      }
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={(value) => setOpenModal(value)}>
        <Button variant="outline" onClick={() => setOpenModal(true)}>Edit</Button>
      <DialogContent className="sm:max-w-[425px]">

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4 w-full">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="w-[375px]">
                      <FormLabel
                        className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                      >
                        Title
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="title"
                          disabled={false}
                          autoCapitalize="none"
                          autoComplete="off"
                          autoCorrect="off"
                          type="text"
                          className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 w-full"
                          placeholder="Title"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
