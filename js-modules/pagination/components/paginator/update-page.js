import loadPageContent from "./helpers/load-page-content.js"
import renderPageButtons from "./render-page-buttons.js"
import updatePaginationState from "./helpers/update-pagination-state.js"
import focusCurrentPageButton from "./helpers/focus-current-page-button.js"

export default function updatePage({
  currentPage,
  allPages,
  totalPages,
  previousBtn,
  nextBtn,
  pageNumbersContainer,
  maxVisible,
  onPageChange,
}) {
  loadPageContent(allPages, currentPage)

  renderPageButtons(
    currentPage,
    totalPages,
    pageNumbersContainer,
    maxVisible,
    onPageChange
  )

  updatePaginationState(
    currentPage.toString(),
    totalPages,
    previousBtn,
    nextBtn
  )

  focusCurrentPageButton(pageNumbersContainer, currentPage)
}
