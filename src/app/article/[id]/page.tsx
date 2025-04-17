"use client"
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function Page() {
  const { id } = useParams();
  return (
    <div className="max-w-3xl mx-auto p-6" dir='rtl'>
      <div className="flex justify-between">

      <h1 className="text-2xl font-bold mb-4">عرض المقال رقم {id}</h1>
      <Link href={`/challenge/edit?id=${id}`}>
            <Button>انشاء مهام</Button>
            </Link>
      </div>
      <p className="text-gray-600">
        هنا يتم عرض محتوى المقال الحقيقي باستخدام `id` من قاعدة البيانات أو API
      </p>
    </div>
  )
}
