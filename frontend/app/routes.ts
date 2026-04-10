import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("components/layout/RootLayout.tsx", [
    index("routes/home.tsx"),

    // Racquets
    route("racquets", "routes/racquets/index.tsx"),
    route("racquets/:slug", "routes/racquets/$slug.tsx"),

    // Strings
    route("strings", "routes/strings/index.tsx"),
    route("strings/:slug", "routes/strings/$slug.tsx"),

    // Other gear
    route("other", "routes/other/index.tsx"),
    route("other/:slug", "routes/other/$slug.tsx"),

    // Blog
    route("blog", "routes/blog/index.tsx"),
    route("blog/:slug", "routes/blog/$slug.tsx"),

    // Racquet picker tool
    route("tools/racquet-picker", "routes/tools/racquet-picker/index.tsx"),
    route("tools/racquet-picker/guided", "routes/tools/racquet-picker/guided.tsx"),
    route("tools/racquet-picker/filter", "routes/tools/racquet-picker/filter.tsx"),
  ]),
] satisfies RouteConfig;
