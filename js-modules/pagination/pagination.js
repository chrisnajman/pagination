const PAGES = "../../json/pages.json"
import pages from "./components/pages.js"
import paginator from "./components/paginator/paginator.js"

export default async function pagination() {
  try {
    const response = await fetch(PAGES)
    const allPages = await response.json()

    if (response.ok) {
      pages(allPages)
      paginator(allPages)
    } else {
      alert("Something went wrong. Please try again later...")
    }
  } catch (e) {
    console.log(e)
  }
}
