export const generateCsvLink = ({ data = [], header = [], name = '' }) => {
  generate({
    data: [header, ...data],
    name,
  })
}

export const generateXlsLink = ({ data = [], header = [], name = '' }) => {
  generate({
    data: [header, ...data],
    extension: 'xls',
    split_: ';',
    name,
  })
}

const generate = ({
  data = [],
  name = '',
  extension = 'csv',
  split_ = ',',
}) => {
  let csvContent =
    'data:text/csv;charset=utf-8,\uFEFF' +
    data.map((e) => e.join(split_)).join('\n')

  var encodedUri = encodeURI(csvContent)
  var link = document.createElement('a')
  link.setAttribute('hidden', true)
  link.setAttribute('href', encodedUri)
  link.setAttribute(
    'download',
    `${name}_${new Date().toLocaleDateString()}.${extension}`,
  )
  document.body.appendChild(link)
  link.click()
}
