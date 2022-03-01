const CODES = {
  A: 65,
  Z: 90
}

function toCell() {
  return `
    <div class='cell' contenteditable></div>
  `
}

function toColumn(colName) {
  return `
    <div class='column'>
      ${colName}
    </div>
  `
}

function createRow(index, content = '') {
  const rowNumber = index || ''
  return `
  <div class='row'>
    <div class='row-info'>${rowNumber}</div>
    <div class='row-data'>${content}</div>
  </div>`
}

function toChar(index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
    .fill('')
    .map((_, i) => {
      const colName = toChar(i)
      return toColumn(colName)
    })
    .join('')
  rows.push(createRow('', cols))

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount).fill('').map(toCell).join('')

    rows.push(createRow(i + 1, cells))
  }

  return rows.join('')
}
