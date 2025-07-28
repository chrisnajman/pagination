import { pageContent } from "../globals.js"
export default function pages(allPages) {
  const initialPageLoad = allPages.find((page) => page.id === "1")
  pageContent.innerHTML = initialPageLoad.content
}
