const CODES = {
  A: 65,
  Z: 90
}

function toCell(_, colIndex) {
  return `
    <div class='cell' data-col='${colIndex}' contenteditable></div>
  `
}

function toColumn(colName, index) {
  return `
    <div class='column' data-type='resizable' data-col='${index}'>
      ${colName}
      <div class='col-resize' data-resize='col'></div>
    </div>
  `
}

function createRow(index, content = '') {
  const resize = index ? `<div class='row-resize' data-resize='row'></div>` : ''
  const rowNumber = index || ''
  return `
  <div class='row' data-type='resizable'>
    <div class='row-info'>
      ${rowNumber}
      ${resize}
    </div>
    <div class='row-data'>${content}</div>
  </div>
  `
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
      return toColumn(colName, i)
    })
    .join('')
  rows.push(createRow('', cols))

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount).fill('').map(toCell).join('')

    rows.push(createRow(i + 1, cells))
  }

  return rows.join('')
}
