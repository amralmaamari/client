import { FC } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ArticleCardProps {
  title: string
  description?: string
  content: string
  id?: number // لو عندك ID للمقال
}

const ArticleCard: FC<ArticleCardProps> = ({ title, description, content, id }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto mb-3 cursor-pointer hover:bg-gray-100">
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        {id && (
          <div className="space-x-2">
            <Link href={`/article/${id}`}>
              <Button variant="outline">View</Button>
            </Link>
            <Link href={`/article/edit?id=${id}`}>
            <Button>Edit</Button>
            </Link>
          </div>
        )}
      </div>

      {description && <p className="text-gray-600 mb-3">{description}</p>}

      <p className="text-gray-800 leading-relaxed whitespace-pre-line">
        {content}
      </p>
    </div>
  )
}

export default ArticleCard
