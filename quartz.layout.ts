import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import * as DigitalGarden from "./quartz/components/digitalGarden"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer({
      mapFn: (node) => {
        // Add "Daily Briefings" folder at the top level
        if (node.name === "daily" && !node.file) {
          node.displayName = "📆 Daily Briefings"
        }
        return node
      },
      sortFn: (a, b) => {
        // Special sorting to prioritize Daily Briefings
        if (a.displayName === "📆 Daily Briefings") return -1
        if (b.displayName === "📆 Daily Briefings") return 1

        // Default sorting for other items
        return a.displayName.localeCompare(b.displayName)
      }
    })),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer({
      mapFn: (node) => {
        // Add "Daily Briefings" folder at the top level
        if (node.name === "daily" && !node.file) {
          node.displayName = "📆 Daily Briefings"
        }
        return node
      },
      sortFn: (a, b) => {
        // Special sorting to prioritize Daily Briefings
        if (a.displayName === "📆 Daily Briefings") return -1
        if (b.displayName === "📆 Daily Briefings") return 1

        // Default sorting for other items
        return a.displayName.localeCompare(b.displayName)
      }
    })),
  ],
  right: [],
}

// Special layout for the homepage
export const indexPageLayout: PageLayout = {
  beforeBody: [
    DigitalGarden.AsciiArtBanner(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
    DigitalGarden.TestComponent(),
    DigitalGarden.Highlights(),
    DigitalGarden.GardenGame(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer({
      mapFn: (node) => {
        // Add "Daily Briefings" folder at the top level
        if (node.name === "daily" && !node.file) {
          node.displayName = "📆 Daily Briefings"
        }
        return node
      },
      sortFn: (a, b) => {
        // Special sorting to prioritize Daily Briefings
        if (a.displayName === "📆 Daily Briefings") return -1
        if (b.displayName === "📆 Daily Briefings") return 1

        // Default sorting for other items
        return a.displayName.localeCompare(b.displayName)
      }
    })),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}