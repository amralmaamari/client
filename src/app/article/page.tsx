"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import useFetch from "@/hooks/useFetch";

export default function Page() {

    const {
      data: articles,        // مختصر وواضح
      error: articlesError,  // لتحديد نوع الخطأ
      loading: isLoadingArticles // أفضل توصيف للبوول
    } = useFetch({ url: `/Article/getArticles` });

  return (
    <>
      <main className="p-8 bg-gray-50 min-h-screen">
    {isLoadingArticles && <h2>Loading...</h2>}
    {!isLoadingArticles && articlesError && <h2>{articlesError}</h2>}
    {!articlesError && articles &&
    articles.map((article) => (
      <ArticleCard
            key={article.articleID}
            id={article.articleID}
            title={article.title}
            content={article.description}
          />
      
        ))
      }
        
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
