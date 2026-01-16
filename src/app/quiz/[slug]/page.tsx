import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { contents, getContentBySlug } from "@/data/contents";
import { QuizContainer } from "@/components/quiz/QuizContainer";

interface QuizPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return contents.map((content) => ({
    slug: content.slug,
  }));
}

export async function generateMetadata({ params }: QuizPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const content = getContentBySlug(resolvedParams.slug);

  if (!content) {
    return {
      title: "Not Found | V-STATION",
    };
  }

  return {
    title: `${content.title} | V-STATION`,
    description: content.description,
    openGraph: {
      title: `${content.title} | V-STATION`,
      description: content.description,
      type: "website",
    },
  };
}

export default async function QuizPage({ params }: QuizPageProps) {
  const resolvedParams = await params;
  const content = getContentBySlug(resolvedParams.slug);

  if (!content) {
    notFound();
  }

  return (
    <>
      {/* AdSense slot placeholder - before quiz */}
      <div className="ad-slot ad-slot-top" data-ad-slot="before-quiz">
        {/* AdSense code will be inserted here */}
      </div>

      <QuizContainer content={content} />

      {/* AdSense slot placeholder - after quiz */}
      <div className="ad-slot ad-slot-bottom" data-ad-slot="after-quiz">
        {/* AdSense code will be inserted here */}
      </div>
    </>
  );
}
