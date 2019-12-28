import { app, BrowserWindow, screen, Size } from 'electron'
import { client } from 'electron-connect'
import path from 'path'
import url from 'url'

// warningの表示を消す
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1'

class Main {
  private win: BrowserWindow | null = null
  private window: Size | null

  constructor () {
    this.win = null
    this.window = null

    this.onReady = this.onReady.bind(this)
  }

  public init (): void {
    this.onListener()
  }

  private onListener (): void {
    if (app) {
      app.on('ready', this.onReady)
      app.on('window-all-closed', (): void => app.quit())
    }
  }

  private onReady (): void {
    this.window = screen.getPrimaryDisplay().size

    this.win = new BrowserWindow({
      width: this.window.width,
      height: this.window.height,
      frame: false,
      show: true,
      resizable: false,
      acceptFirstMouse: true,
      titleBarStyle: 'hidden',
      webPreferences: {
        nodeIntegration: true
      }
    })

    const startUrl: string =
      process.env.ELECTRON_START_URL ||
      url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
      })

    this.win.setMenu(null)
    this.win.loadURL(startUrl)

    this.win.on('closed', (): void => {
      this.win = null
    })

    this.win.webContents.openDevTools()

    // 'ready' イベント内で BrowserWindow オブジェクトを渡す
    client.create(this.win)
  }
}

const main = new Main()
main.init()
