"use client"

import Alert from '@/components/Alert'
import { Button } from "@/components/ui/button"
import { useState } from "react"

//هنا تقدر عدد التنبيهات من خلال عدد المرات الذي تريدها في اليوم حطها فوق في البربروز
export default function Page() {
  // نبدأ بـ 7 تنبيهات فاضية
  const [alerts, setAlerts] = useState<string[]>(Array(7).fill(""))

  const handleChange = (index: number, newValue: string) => {
    const updated = [...alerts]
    updated[index] = newValue
    setAlerts(updated)
  }

  const handleSubmit = () => {
    // كل منبه يتم إرساله منفصل داخل نفس الوقت
    alerts.forEach((time, idx) => {
      if (time) {
        console.log(`⏰ Alert ${idx + 1}:`, time)
        // هنا ترسل للباكند:
        // fetch("/api/alerts", { method: "POST", body: JSON.stringify({ time }) })
      }
    })
  }

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold">Set 7 Alert Times</h1>

      {alerts.map((time, index) => (
        <Alert
          key={index}
          index={index}
          value={time}
          onChange={(val) => handleChange(index, val)}
        />
      ))}

      <Button className="w-full mt-4" onClick={handleSubmit}>
        Submit All Alerts
      </Button>
    </div>
  )
}
