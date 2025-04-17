"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Tiptap from "./Tiptap";

export default function CreateArticleForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const articleId = searchParams.get("id");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // جلب بيانات المقال لو بنعدل
  useEffect(() => {
    if (articleId) {
      fetch(`/api/articles/${articleId}`)
        .then((res) => res.json())
        .then((data) => {
          setTitle(data.title || "Update");
          setContent(data.content);
        });
    }
  }, [articleId]);

  const handleSubmit = async () => {
    const payload = { title, content };

    if (articleId) {
      await fetch(`/api/articles/${articleId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    router.push("/article");
  };

  return (
    <form className="space-y-4 bg-white p-6 rounded-xl shadow ">
      <h1 className="text-xl font-bold" dir="rtl">
        {articleId ? "تعديل المقالة" : "إنشاء مقالة جديدة"}
      </h1>

      <Input
        dir="rtl"
        placeholder="عنوان المقالة"
        className="my-3"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      

      <Tiptap value={content} onChange={setContent} />

      <Button type="button" onClick={handleSubmit}>
        {articleId ? "تحديث" : "إنشاء"}
      </Button>
    </form>
  );
}
