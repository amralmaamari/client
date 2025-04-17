import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ChallengeCardProps {
  id: number;
  title: string;
  description: string;
  measurementName: string;
  reminderTimes: string[];
  startDate: string;
  endDate: string;
}

export default function ChallengeCard({
  id,
  title,
  description,
  measurementName,
  reminderTimes,
  startDate,
  endDate,
}: ChallengeCardProps) {
  return (
    <Card dir="rtl" className="p-5 space-y-3 shadow-md hover:shadow-lg border rounded-lg text-right bg-white">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      <p className="text-gray-600">{description}</p>

      <div className="text-sm space-y-1 text-gray-700">
        <p><span className="font-semibold text-gray-500">نوع القياس:</span> {measurementName}</p>
        <p><span className="font-semibold text-gray-500">تاريخ البدء:</span> {startDate}</p>
        <p><span className="font-semibold text-gray-500">تاريخ الانتهاء:</span> {endDate}</p>
      </div>

      <div className="text-sm">
        <p className="font-semibold text-gray-500">أوقات التذكير:</p>
        <ul className="pr-4 mt-1 list-disc text-gray-800">
          {reminderTimes.map((time, idx) => (
            <li key={idx}>{time}</li>
          ))}
        </ul>
      </div>

      <div className="flex gap-2 justify-end pt-2">
        <Link href={`/challenge/${id}`}>
          <Button type="button" variant="outline">عرض المهام</Button>
        </Link>
        <Link href={`/challenge/edit?id=${id}`}>
          <Button type="button">تعديل</Button>
        </Link>
      </div>
    </Card>
  );
}
