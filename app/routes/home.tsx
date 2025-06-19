import { getAuth } from "@clerk/react-router/ssr.server";
import { fetchAction, fetchQuery } from "convex/nextjs";
import ContentSection from "~/components/homepage/content";
import Footer from "~/components/homepage/footer";
import Integrations from "~/components/homepage/integrations";
import Pricing from "~/components/homepage/pricing";
import DemoSection from "~/components/homepage/demo";
import { api } from "../../convex/_generated/api";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  const title = "YTCreator - AI-Powered YouTube Script Generator | Clone Your Writing Style";
  const description =
    "Stop spending hours writing scripts that sound like boring robots. Copy the exact writing style of any viral creator and watch your views explode.";
  const keywords = "YouTube, AI Script Generator, Content Creation, Video Transcription, AI Writing, YouTube Creator Tools, Script Writing, Content Marketing";
  const siteUrl = "https://ytcreator.me/";
  const imageUrl =
    "https://ytcreator.me/og-image.png";

  return [
    { title },
    {
      name: "description",
      content: description,
    },

    // Open Graph / Facebook
    { property: "og:type", content: "website" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: imageUrl },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:url", content: siteUrl },
    { property: "og:site_name", content: "YTCreator" },
    { property: "og:image", content: imageUrl },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    {
      name: "twitter:description",
      content: description,
    },
    { name: "twitter:image", content: imageUrl },
    {
      name: "keywords",
      content: keywords,
    },    { name: "author", content: "YTCreator Team" },
    { name: "favicon", content: "https://ytcreator.me/favicon.png" },
  ];
}

export async function loader(args: Route.LoaderArgs) {
  const { userId } = await getAuth(args);

  // Parallel data fetching to reduce waterfall
  const [subscriptionData, plans] = await Promise.all([
    userId
      ? fetchQuery(api.subscriptions.checkUserSubscriptionStatus, {
          userId,
        }).catch((error) => {
          console.error("Failed to fetch subscription data:", error);
          return null;
        })
      : Promise.resolve(null),
    fetchAction(api.subscriptions.getAvailablePlans),
  ]);

  return {
    isSignedIn: !!userId,
    hasActiveSubscription: subscriptionData?.hasActiveSubscription || false,
    plans,
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <Integrations loaderData={loaderData} />
      <ContentSection />
      <DemoSection />
      <Pricing loaderData={loaderData} />
      <Footer />
    </>
  );
}
