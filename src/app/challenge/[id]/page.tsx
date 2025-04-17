import ChallengeCard from "@/components/ChallengeCard";

export default function Page() {
  const challenges = [
    {
      id: 1,
      articleid: 1,
      title: "30 Day Fitness",
      description: "Workout 30 minutes every day",
      durationTimes: 30,
      timesPerDay: 1,
      startDate: "2025-04-20",
      endDate: "2025-05-20",
      measurementName: "Time",
      reminderTimes: ["06:00", "12:00", "18:00", "21:00"]
    }
  ]
  const task = {
    id: 1,
    title: "شرب 2 لتر ماء",
    description: "اشرب كمية كافية من الماء يوميًا للحفاظ على نشاطك وصحتك.",
    challenge: { id: 5, title: "الصحة اليومية" },
    measurementType: "number",
    reminders: ["09:00 صباحًا", "01:00 ظهرًا", "07:00 مساءً"],
  };

  return (
    <div className="p-6 bg-white rounded-lg border border-gray-300 space-y-6 max-w-2xl mx-auto rtl text-right">
      <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-2">عرض المهمة</h2>

      <div className="space-y-4" dir="rtl">

      {challenges.map((ch) => (
        <ChallengeCard key={ch.id} {...ch} />
      ))}
        {/* العنوان */}
        <div>
          <label className="block text-sm text-gray-500 mb-1">عنوان المهمة:</label>
          <h1 className="text-2xl font-bold text-gray-800">{task.title}</h1>
        </div>

        {/* الوصف */}
        <div>
          <label className="block text-sm text-gray-500 mb-1">الوصف:</label>
          <p className="text-gray-700">{task.description}</p>
        </div>

        {/* التحدي المرتبط */}
        <div>
          <label className="block text-sm text-gray-500 mb-1">التحدي المرتبط:</label>
          <p className="text-blue-600 font-medium hover:underline cursor-pointer">
            {task.challenge.title}
          </p>
        </div>

        {/* نوع القياس */}
        <div>
          <label className="block text-sm text-gray-500 mb-1">نوع القياس:</label>
          <p
            className={`font-medium ${
              task.measurementType === "number"
                ? "text-green-600"
                : task.measurementType === "time"
                ? "text-yellow-600"
                : "text-purple-600"
            }`}
          >
            {task.measurementType === "number"
              ? "عدد"
              : task.measurementType === "time"
              ? "مدة"
              : "نص"}
          </p>
        </div>

        {/* التنبيهات */}
        <div>
          <label className="block text-sm text-gray-500 mb-1">التنبيهات:</label>
          <ul className="list-disc pr-4 text-gray-800 space-y-1">
            {task.reminders.map((r, idx) => (
              <li key={idx}>{r}</li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
