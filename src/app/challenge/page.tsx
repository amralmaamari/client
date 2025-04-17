"use client";
import ChallengeCard from "@/components/ChallengeCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Challenge {
  id: number;
  title: string;
  description: string;
  measurementName: string;
  reminderTimes: string[];
  startDate: string;
  endDate: string;
}

export default function Page() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);



  useEffect(() => {
    fetch("https://run.mocky.io/v3/89509a94-d041-4634-8248-77f6a2474d91")
      .then(res => res.json())
      .then((data: Challenge[]) => setChallenges(data));
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-right rtl">قائمة التحديات</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {challenges.map((challenge) => (
          <ChallengeCard key={challenge.id} {...challenge} />
        ))}
      </div>

      <div className="fixed bottom-6 right-6 z-50 ">
        <Link href="challenge/edit">
          <Button
            variant="default"
            size="icon"
            className="rounded-full w-14 h-14 shadow-lg  text-white"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
