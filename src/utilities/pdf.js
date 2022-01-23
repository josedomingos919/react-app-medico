export function printPdf(url) {
  var iframe = document.createElement('iframe')
  iframe.className = 'pdfIframe'
  iframe.style.display = 'none'
  document.body.appendChild(iframe)
  iframe.onload = function () {
    setTimeout(function () {
      iframe.focus()
      // iframe.contentWindow.print()
      URL.revokeObjectURL(url)
    }, 1000)
  }
  iframe.src = url
}
