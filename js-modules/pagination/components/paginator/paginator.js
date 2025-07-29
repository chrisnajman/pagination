import updatePage from "./update-page.js"
import setMultipleAttributes from "../../../helpers/set-multiple-attributes.js"

export default function paginator(allPages) {
  const paginator = document.getElementById("paginator")
  const previousBtn = document.createElement("button")
  const nextBtn = document.createElement("button")
  const pageNumbersContainer = document.createElement("ul")
  pageNumbersContainer.classList.add("page-numbers-container")

  const totalPages = allPages.length
  const maxVisible = 5

  // Read initial page from URL
  const urlParams = new URLSearchParams(window.location.search)
  const pageFromURL = parseInt(urlParams.get("page"), 10)
  let currentPage =
    !isNaN(pageFromURL) && pageFromURL >= 1 && pageFromURL <= totalPages
      ? pageFromURL
      : 1

  // Helper to update the UI and push state
  function updatePageWrapper(page) {
    updatePage({
      currentPage: page,
      allPages,
      totalPages,
      previousBtn,
      nextBtn,
      pageNumbersContainer,
      maxVisible,
      onPageChange: (pageNum) => {
        currentPage = pageNum
        updatePageWrapper(currentPage)
        history.pushState({ page: currentPage }, "", `?page=${currentPage}`)
      },
    })
  }

  // Setup previous button
  setMultipleAttributes(previousBtn, {
    type: "button",
    id: "previous-button",
    class: "previous-next-btn previous-btn",
    disabled: true,
  })
  previousBtn.textContent = "Previous"
  previousBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--
      updatePageWrapper(currentPage)
      history.pushState({ page: currentPage }, "", `?page=${currentPage}`)
    }
  })

  // Setup next button
  setMultipleAttributes(nextBtn, {
    type: "button",
    id: "next-button",
    class: "previous-next-btn next-btn",
  })
  nextBtn.textContent = "Next"
  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++
      updatePageWrapper(currentPage)
      history.pushState({ page: currentPage }, "", `?page=${currentPage}`)
    }
  })

  // Initial render
  updatePageWrapper(currentPage)

  // Handle back/forward navigation
  window.addEventListener("popstate", (e) => {
    const newPage = e.state?.page || 1
    if (newPage !== currentPage) {
      currentPage = newPage
      updatePageWrapper(currentPage)
    }
  })

  paginator.append(previousBtn, pageNumbersContainer, nextBtn)
}
