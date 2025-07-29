import { pageContent } from "../../../../globals.js"
import announceLiveRegion from "./announce-live-region.js"

export default function loadPageContent(allPages, pageNum) {
  const page = allPages.find((p) => p.id == pageNum.toString())
  if (page) {
    pageContent.innerHTML = page.content
    announceLiveRegion(
      page.title
        ? `Page ${pageNum} loaded: ${page.title}`
        : `Page ${pageNum} loaded`
    )
  }
}
