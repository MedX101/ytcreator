import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("sign-in/*", "routes/sign-in.tsx"),
  route("sign-up/*", "routes/sign-up.tsx"),
  route("pricing", "routes/pricing.tsx"),
  route("success", "routes/success.tsx"),
  route("subscription-required", "routes/subscription-required.tsx"),  layout("routes/dashboard/layout.tsx", [
    route("dashboard", "routes/dashboard/index.tsx"),
    route("dashboard/chat", "routes/dashboard/chat.tsx"),
    route("dashboard/settings", "routes/dashboard/settings.tsx"),
    route("dashboard/youtube", "routes/dashboard/youtube.tsx"),
    route("dashboard/youtube/transcribe", "routes/dashboard/youtube/transcribe.tsx"),
    route("dashboard/youtube/generate", "routes/dashboard/youtube/generate.tsx"),
    route("dashboard/youtube/refine", "routes/dashboard/youtube/refine.tsx"),
    route("dashboard/youtube/library", "routes/dashboard/youtube/library.tsx"),
  ]),
] satisfies RouteConfig;
