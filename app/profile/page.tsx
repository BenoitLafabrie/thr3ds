//localhost:3000/profile

import { getAuthSession } from "@/lib/auth";
import { Post } from "@/src/features/post/Post";
import { getUserProfile } from "@/src/query/user.query";
import React from "react";
import { Profile } from "../users/[userId]/Profile";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function ProfilePage({
  params,
}: {
  params: {
    userId: string;
  };
}) {
  const session = await getAuthSession();

  if (!session?.user.id) {
    notFound();
  }

  const user = await getUserProfile(session.user.id);

  if (!user) {
    notFound();
  }

  return (
    <div>
      <Profile user={user}>
        <form className="mt-4">
          <Link
            className={buttonVariants({
              variant: "outline",
            })}
            href="/profile/edit"
          >
            Edit profile
          </Link>
        </form>
      </Profile>
      <div className="divide-y divide-accent border-t border-accent mt-4">
        {user.posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
