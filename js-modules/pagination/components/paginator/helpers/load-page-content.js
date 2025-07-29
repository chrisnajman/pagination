import { pageContent } from "../../../../globals.js"
import announceLiveRegion from "./announce-live-region.js"

const pageTitle = document.getElementById("page-title")
const mainHeading = document.createElement("h1")

export default function loadPageContent(allPages, pageNum) {
  const page = allPages.find((p) => p.id == pageNum.toString())

  if (page) {
    mainHeading.textContent = page.title
    pageTitle.innerHTML = "" // Clear any previous headings
    pageTitle.append(mainHeading)
    pageContent.innerHTML = page.content
    announceLiveRegion(
      page.title
        ? `Page ${pageNum} loaded: ${page.title}`
        : `Page ${pageNum} loaded`
    )
  }
}
