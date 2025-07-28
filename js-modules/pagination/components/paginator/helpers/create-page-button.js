export default function createPageButton(pageNum) {
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
