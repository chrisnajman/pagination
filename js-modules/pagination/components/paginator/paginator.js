import { pageContent } from "../../globals.js"
import setMultipleAttributes from "../../helpers/set-multiple-attributes.js"
import updatePaginationState from "./components/update-pagination-state.js"

export default function paginator(allPages) {
  const paginator = document.getElementById("paginator")
  const previousBtn = document.createElement("button")
  const nextBtn = document.createElement("button")
  const pageNumbersContainer = document.createElement("ul")
  pageNumbersContainer.classList.add("page-numbers-container")

  const totalPages = allPages.length
  const maxVisible = 5

  // Get page from URL or fallback to 1
  const urlParams = new URLSearchParams(window.location.search)
  const pageFromURL = parseInt(urlParams.get("page"), 10)
  let currentPage =
    !isNaN(pageFromURL) && pageFromURL >= 1 && pageFromURL <= totalPages
      ? pageFromURL
      : 1

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
      updatePage()
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
      updatePage()
      history.pushState({ page: currentPage }, "", `?page=${currentPage}`)
    }
  })

  // HELPER FUNCTION
  function loadPageContent(pageNum) {
    const page = allPages.find((p) => p.id == pageNum.toString())
    if (page) {
      pageContent.innerHTML = page.content
      // announceLiveRegion(`Page ${pageNum} loaded: ${page.title}`)
      announceLiveRegion(
        page.title
          ? `Page ${pageNum} loaded: ${page.title}`
          : `Page ${pageNum} loaded`
      )
    }
  }

  // HELPER FUNCTION
  function announceLiveRegion(message) {
    const liveRegion = document.getElementById("live-region")
    if (liveRegion) {
      // Clear the region first
      liveRegion.textContent = ""

      // Delay to ensure screen readers detect the DOM change
      setTimeout(() => {
        liveRegion.textContent = message
      }, 50)
    }
  }

  // HELPER FUNCTION
  function focusCurrentPageButton() {
    const currentBtn = pageNumbersContainer.querySelector(
      `button.page-number[data-page-number="${currentPage}"]`
    )
    if (currentBtn) {
      currentBtn.focus()
    }
  }

  // HELPER FUNCTION
  function updatePage() {
    loadPageContent(currentPage)
    renderPageButtons()
    updatePaginationState(
      currentPage.toString(),
      totalPages,
      previousBtn,
      nextBtn
    )
    focusCurrentPageButton()
  }

  // MODULE
  function renderPageButtons() {
    pageNumbersContainer.innerHTML = ""

    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    let endPage = startPage + maxVisible - 1
    if (endPage > totalPages) {
      endPage = totalPages
      startPage = Math.max(1, endPage - maxVisible + 1)
    }

    // HELPER FUNCTION
    function createPageButton(pageNum) {
      const li = document.createElement("li")
      const pageBtn = document.createElement("button")
      setMultipleAttributes(pageBtn, {
        type: "button",
        class: "page-number",
        tabindex: "0",
        "aria-current": pageNum === currentPage ? "page" : null,
      })
      pageBtn.dataset.pageNumber = pageNum
      pageBtn.textContent = pageNum

      if (pageNum === currentPage) {
        pageBtn.classList.add("current")
      } else {
        pageBtn.classList.remove("current")
      }

      pageBtn.addEventListener("click", () => {
        if (currentPage !== pageNum) {
          currentPage = pageNum
          updatePage()
          history.pushState({ page: currentPage }, "", `?page=${currentPage}`)
        }
      })

      li.appendChild(pageBtn)
      return li
    }

    if (startPage > 1) {
      pageNumbersContainer.appendChild(createPageButton(1))
      if (startPage > 2) {
        const ellipsisLi = document.createElement("li")
        ellipsisLi.textContent = "…"
        ellipsisLi.classList.add("ellipsis")
        pageNumbersContainer.appendChild(ellipsisLi)
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbersContainer.appendChild(createPageButton(i))
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        const ellipsisLi = document.createElement("li")
        ellipsisLi.textContent = "…"
        ellipsisLi.classList.add("ellipsis")
        pageNumbersContainer.appendChild(ellipsisLi)
      }
      pageNumbersContainer.appendChild(createPageButton(totalPages))
    }
  }

  // Initial load
  updatePage()

  // Handle browser back/forward
  window.addEventListener("popstate", (e) => {
    const newPage = e.state?.page || 1
    if (newPage !== currentPage) {
      currentPage = newPage
      updatePage()
    }
  })

  paginator.append(previousBtn, pageNumbersContainer, nextBtn)
}
