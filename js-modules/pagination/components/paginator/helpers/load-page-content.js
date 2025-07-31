import { pageContent } from "../../../../globals.js"
import announceLiveRegion from "./announce-live-region.js"
import { showLoader, hideLoader } from "../../../../loader.js"
const pageTitle = document.getElementById("page-title")
const mainHeading = document.createElement("h1")

export default function loadPageContent(allPages, pageNum) {
  const page = allPages.find((p) => p.id == pageNum.toString())

  if (page) {
    // 🟡 Show loader before changing content
    showLoader()

    // 🟡 Slight delay to allow loader to visibly appear
    setTimeout(() => {
      pageTitle.innerHTML = "" // Clear previous heading
      mainHeading.textContent = page.title
      pageTitle.append(mainHeading)
      pageContent.innerHTML = page.content

      announceLiveRegion(
        page.title
          ? `Page ${pageNum} loaded: ${page.title}`
          : `Page ${pageNum} loaded`
      )

      // ✅ Hide loader after content has rendered
      hideLoader()
    }, 250) // 150ms delay is usually enough for visible feedback
  }
}
