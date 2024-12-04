import { useEffect, useRef } from 'react'
import * as fabric from 'fabric'
import { useFabricJSEditor, FabricJSEditor, FabricJSEditorHook } from './editor'

export interface Props {
  className?: string
  onReady?: (canvas: fabric.Canvas) => void
}

/**
 * Fabric canvas as component with 16:9 aspect ratio
 */
const FabricJSCanvas = ({ className, onReady }: Props) => {
  const canvasEl = useRef<HTMLCanvasElement>(null)
  const canvasElParent = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasEl.current ?? undefined)
    
    const setCurrentDimensions = () => {
      const parentWidth = canvasElParent.current?.clientWidth || 0
      const aspectRatio = 16 / 9
      const newHeight = parentWidth / aspectRatio
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
    <div ref={canvasElParent} className={className}>
      <canvas ref={canvasEl} />
    </div>
  )
}

export { FabricJSCanvas, useFabricJSEditor }
export type { FabricJSEditor, FabricJSEditorHook }
