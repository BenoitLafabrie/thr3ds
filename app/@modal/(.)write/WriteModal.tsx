"use client";

import { WritePostForm, WritePostFormValues } from "@/app/write/WritePostForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { User } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";

export const WriteModal = ({
  user,
  createPost,
}: {
  user: User;
  createPost: (values: WritePostFormValues) => Promise<string>;
}) => {
  const router = useRouter();
  const pathName = usePathname();
  return (
    <Dialog
      open={pathName === "/write"}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent>
        <WritePostForm user={user} onSubmit={createPost} />
      </DialogContent>
    </Dialog>
  );
};
