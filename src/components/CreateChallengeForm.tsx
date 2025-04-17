"use client"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { Label } from "@radix-ui/react-label"
import useFetch from "@/hooks/useFetch"

interface Article {
  id: number
  title: string
}

 interface Measurement {
  measurementID: number;
  title: string;
}


export default function CreateChallengeForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const challengeId = searchParams.get("id")

  const today = new Date().toISOString().split("T")[0]
  const [startDate, setStartDate] = useState(today)
  const [endDate, setEndDate] = useState("")

  const [articles, setArticles] = useState<Article[]>([])
  const [selectedArticle, setSelectedArticle] = useState<string>("")
  const [selectedMeasurement, setSelectedMeasurement] = useState<string>("")

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [timesPerDay, setTimesPerDay] = useState(1)
  const [reminderTimes, setReminderTimes] = useState<string[]>([""]);

  const handleClick=()=>{
    console.log(timesPerDay);
    console.log(reminderTimes);
    
  }
    // جلب قائمة المقالات من API
    useEffect(() => {
      fetch("https://run.mocky.io/v3/0f3406b4-1b05-442d-8612-8c00e2629830")
        .then(res => res.json())
        .then((data: Article[]) => setArticles(data))
    }, [])

    const {
      data: measurements,        // مختصر وواضح
      error: measurementsError,  // لتحديد نوع الخطأ
      loading: isLoadingMeasurements // أفضل توصيف للبوول
    } = useFetch({ url: `/Measurement/getMeasurements` });
        
   
    useEffect(() => {
      setReminderTimes((prev) => {
        const newReminders = [...prev];
        while (newReminders.length < timesPerDay) newReminders.push("");
        return newReminders.slice(0, timesPerDay);
      });
    }, [timesPerDay]);
    
  useEffect(() => {
    if (challengeId) {
      fetch(`/api/challenges/${challengeId}`)
        .then((res) => res.json())
        .then((data) => {
          setTitle(data.title || "")
          setDescription(data.description || "")
          setStartDate(data.startDate?.split("T")[0] || today)
          setEndDate(data.endDate?.split("T")[0] || "")
          setHours(data.durationHours || 0)
          setMinutes(data.durationMinutes || 0)
          setTimesPerDay(data.timesPerDay || 1)
        })
    }
  }, [challengeId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      title,
      description,
      startDate,
      endDate,
      durationTimes: hours * 60 + minutes,
      timesPerDay,
    }

    if (challengeId) {
      await fetch(`/api/challenges/${challengeId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
    } else {
      await fetch("/api/challenges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
    }

    router.push("/create-challenge")
  }

  const getTomorrow = (date: string) => {
    const d = new Date(date)
    d.setDate(d.getDate() + 1)
    return d.toISOString().split("T")[0]
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 px-2">
      <h1 className="text-xl font-bold" dir="rtl">
        {challengeId ? "تعديل التحدي" : "إنشاء تحدي"}
      </h1>

  <Select value={selectedArticle} onValueChange={setSelectedArticle} dir="rtl">
  <SelectTrigger className="w-full">
    <SelectValue placeholder="اختر مقالة..." />
  </SelectTrigger>
  <SelectContent>
    {/* ✅ خيار لإلغاء التحديد */}
    <SelectItem value=" " className="text-gray-500 font-extrabold ">بدون اختيار</SelectItem>

    {articles.map((article) => (
      <SelectItem key={article.id} value={article.id.toString()}>
        {article.title}
      </SelectItem>
    ))}
  </SelectContent>
</Select>


      <Input
        dir="rtl"
        placeholder="عنوان التحدي"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Textarea
        dir="rtl"
        placeholder="وصف التحدي"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <div className="space-y-2">

        <Label >تاريخ البداية :</Label>
        <Input
          type="date"
          value={startDate}
          min={today}
          onChange={(e) => setStartDate(e.target.value)}
        />
  </div>
  <div className="space-y-2">

<Label >تاريخ النهاية: :</Label>
        <Input
          type="date"
          value={endDate}
          min={getTomorrow(startDate)}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <div className="space-y-2">

      <Label >ساعة :</Label>
        <Input
          type="number"
          min={0}
          value={hours}
          onChange={(e) => setHours(parseInt(e.target.value))}
          placeholder="Hours"
        />
          </div>
          <div className="space-y-2">

        <Label >دقائق :</Label>

        <Input
          type="number"
          min={0}
          max={59}
          value={minutes}
          onChange={(e) => setMinutes(parseInt(e.target.value))}
          placeholder="Minutes"
        />
          </div>

      </div>

  <Select value={selectedMeasurement} onValueChange={setSelectedMeasurement} dir="rtl">
  <SelectTrigger className="w-full">
    <SelectValue placeholder="اختر المقياس..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value=" " className="text-gray-500 font-extrabold ">بدون اختيار</SelectItem>
    {isLoadingMeasurements && <h2>Loading...</h2>}
    {!isLoadingMeasurements && measurementsError && <h2>{measurementsError}</h2>}
    {!measurementsError && measurements &&
    measurements.map((measure:Measurement) => (
      
      <SelectItem key={measure.measurementID} value={measure.measurementID.toString()}>
        
        {measure.title}
      </SelectItem>
    ))
  }
  </SelectContent>
</Select>

      <Label >عدد مرات التنفيذ باليوم :</Label>

      <Input
        type="number"
        min={1}
        max={10}
        value={timesPerDay}
        onChange={(e) => setTimesPerDay(parseInt(e.target.value))}
        placeholder="عدد التكرارات في اليوم"
      />

<div className="space-y-2">
  <Label>التنبيهات (أوقات المنبه):</Label>
  {reminderTimes.map((time, index) => (
    <Input
      key={index}
      type="time"
      value={time}
      onChange={(e) => {
        const newTimes = [...reminderTimes];
        newTimes[index] = e.target.value;
        setReminderTimes(newTimes);
      }}
    />
  ))}
</div>

      <Button type="button" onClick={handleClick}>{challengeId ? "تحديث" : "إنشاء"}</Button>
    </form>
  )
}
