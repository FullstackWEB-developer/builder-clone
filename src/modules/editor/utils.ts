import { CONTENT_SERVER_URL } from 'lib/api'
import { EditorScene } from 'modules/editor/types'
import { Project } from 'modules/project/types'
const script = require('raw-loader!../../ecsScene/scene.js')

export const THUMBNAIL_WIDTH = 246
export const THUMBNAIL_HEIGHT = 182

export function getNewScene(project: Project): EditorScene {
  const mappings = {
    'game.js': `data:application/javascript;base64,${btoa(script)}`,
    'scene.json': 'Qm' // stub required by the client
  }

  return {
    baseUrl: `${CONTENT_SERVER_URL}/contents/` as string,
    display: {
      title: project.title
    },
    owner: 'Decentraland',
    contact: {
      name: 'Decentraland',
      email: 'support@decentraland.org'
    },
    scene: {
      // TODO: This should be received as param
      parcels: project.parcels ? project.parcels.map(({ x, y }) => `${x},${y}`) : ['0,0'],
      base: project.parcels ? `${project.parcels[0].x}, ${project.parcels[0].y}` : '0,0'
    },
    communications: {
      type: 'webrtc',
      signalling: 'https://rendezvous.decentraland.org'
    },
    policy: {
      fly: true,
      voiceEnabled: true,
      blacklist: [],
      teleportPosition: '0,0,0'
    },
    tracking: {
      origin: 'builder'
    },
    main: 'game.js',
    _mappings: mappings
  }
}

// Screenshots

export function imageToDataUri(img: HTMLImageElement, width: number, height: number) {
  // create an off-screen canvas
  const canvas: HTMLCanvasElement = document.createElement('canvas')
  const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d')

  if (!ctx) return null

  // set its dimension to target size
  canvas.width = width
  canvas.height = height

  // draw source image into the off-screen canvas:
  ctx.drawImage(img, 0, 0, width, height)

  // encode image to data-uri with base64 version of compressed image
  return canvas.toDataURL()
}

export function resizeScreenshot(screenshot: string, maxWidth: number, maxHeight: number) {
  return new Promise<string | null>(resolve => {
    const img = new Image()
    img.onload = () => {
      let { width, height } = img
      let ratio = 0
      if (width > maxWidth) {
        ratio = maxWidth / width
        width = maxWidth
        height *= ratio
      } else if (height > maxHeight) {
        ratio = maxHeight / height
        width *= ratio
        height = maxHeight
      }
      const newDataUri = imageToDataUri(img, width, height)
      resolve(newDataUri)
    }
    img.src = screenshot
  })
}

export function dataURLtoBlob(dataUrl: string): Blob | null {
  const arr = dataUrl.split(',')
  const boxedMime = arr[0].match(/:(.*?);/)
  if (boxedMime) {
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }

    return new Blob([u8arr], { type: boxedMime[1] })
  }
  return null
}
