"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";

export default function page() {
  return (
    <>
      <main className="p-8 bg-gray-50 min-h-screen">
        {Array.from({ length: 10 }).map((_, i) => (
          <ArticleCard
            key={i}
            id={i}
            title={`The Art of Writing #${i + 1}`}
            content={`Writing is not just a skill; it’s an art form that allows individuals to express themselves...

Engaging in writing challenges encourages consistency, creativity, and reflection...

Join us on this journey of self-discovery...`}
          />
        ))}
      </main>

      <div className="fixed bottom-6 right-6 z-50 ">
        <Link href="article/edit">
          <Button
            variant="default"
            size="icon"
            className="rounded-full w-14 h-14 shadow-lg  text-white"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </Link>
      </div>
    </>
  );
}
