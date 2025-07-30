import setMultipleAttributes from "../../../helpers/set-multiple-attributes.js"

export default function renderPageButtons(
  currentPage,
  totalPages,
  pageNumbersContainer,
  maxButtonsVisible,
  onPageClick
) {
  pageNumbersContainer.innerHTML = ""

  let startPage = Math.max(1, currentPage - Math.floor(maxButtonsVisible / 2))
  let endPage = startPage + maxButtonsVisible - 1
  if (endPage > totalPages) {
    endPage = totalPages
    startPage = Math.max(1, endPage - maxButtonsVisible + 1)
  }

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
      if (pageNum !== currentPage && typeof onPageClick === "function") {
        onPageClick(pageNum)
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
