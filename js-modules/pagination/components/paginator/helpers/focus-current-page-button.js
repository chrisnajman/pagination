export default function focusCurrentPageButton(container, currentPage) {
  const currentBtn = container.querySelector(
    `button.page-number[data-page-number="${currentPage}"]`
  )
  if (currentBtn) {
    currentBtn.focus()
  }
}
