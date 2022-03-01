import 'regenerator-runtime/runtime'
import './scss/index.scss'
import {Excel} from './components/excel/Excel'
import {Header} from './components/header/Header'
import {Table} from './components/table/Table'
import {Formula} from './components/formula/Formula'
import {Toolbar} from './components/toolbar/Toolbar'

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table]
})

excel.render()
