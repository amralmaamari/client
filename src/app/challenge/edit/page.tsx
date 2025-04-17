"use client"
import CreateChallengeForm from '@/components/CreateChallengeForm';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'

export default function Page() {
     const searchParams = useSearchParams();
      const articleId = searchParams.get("id");

        useEffect(() => {
          if (articleId) {
            fetch(`/api/articles/${articleId}`)
              .then((res) => res.json())
              .then((data) => {
                console.log("set data here" + data);
                
              });
          }
        }, [articleId]);
  return (
    <>
    <CreateChallengeForm />
    </>
  )
}
