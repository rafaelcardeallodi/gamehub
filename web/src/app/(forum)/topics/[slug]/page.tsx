interface TopicsProps {
  params: {
    slug: string
  }
}

export default function Topics({ params }: TopicsProps) {
  return (
    <div>
      <h1>{params.slug}</h1>
    </div>
  )
}
