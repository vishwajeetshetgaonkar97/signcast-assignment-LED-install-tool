import { useEffect, useRef } from 'react'
import * as fabric from 'fabric'

export interface Props {
  className?: string
  onReady?: (canvas: fabric.Canvas) => void
}

/**
 * Fabric canvas as component with 16:9 aspect ratio based on parent container size
 */
const FabricJSCanvas = ({ className, onReady }: Props) => {
  const canvasEl = useRef<HTMLCanvasElement>(null)
  const canvasElParent = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasEl.current ?? undefined)

    const setCurrentDimensions = () => {
      const parentWidth = canvasElParent.current?.clientWidth || 0
      const aspectRatio = 16 / 9
      const newHeight = parentWidth / aspectRatio // Calculate height based on width

      canvas.setWidth(parentWidth)
      canvas.setHeight(newHeight)
      canvas.renderAll()
    }

    const resizeCanvas = () => {
      setCurrentDimensions()
    }

    setCurrentDimensions()

    window.addEventListener('resize', resizeCanvas, false)

    if (onReady) {
      onReady(canvas)
    }

    return () => {
      canvas.dispose()
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <div ref={canvasElParent} className={className} style={{ width: '100%', height: '100%' }}>
      <canvas ref={canvasEl} />
    </div>
  )
}

export { FabricJSCanvas }
export type { FabricJSCanvas }