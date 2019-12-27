import { app, BrowserWindow } from 'electron'
import { client } from 'electron-connect'

let win: BrowserWindow | null = null

app.once('ready', (): void => {
  win = new BrowserWindow({})
  win.loadFile('build/index.html')

  win.on('closed', (): void => {
    win = null
  })

  // 'ready' イベント内で BrowserWindow オブジェクトを渡す
  client.create(win)
})

app.once('window-all-closed', (): void => app.quit())
