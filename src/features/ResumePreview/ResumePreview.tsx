import { TFormState } from '@/shared/types'
import { Stage, Layer, Text, Group, Transformer } from 'react-konva'
import { useState, useEffect, useRef } from 'react'
// import * as Popover from '@radix-ui/react-popover'

type ElementStyle = {
  color: string
  fontSize: number
  fontWeight: string
}

type Position = {
  x: number
  y: number
}

type ResumePreviewProps = {
  state: TFormState | undefined
}

const DraggableText = ({ 
  text, 
  initialPosition, 
  style, 
  onDragEnd, 
  onClick,
  stageWidth,
  stageHeight,
  isSelected
}: { 
  text: string
  initialPosition: Position
  style: ElementStyle
  onDragEnd: (pos: Position) => void
  onClick: () => void
  stageWidth: number
  stageHeight: number
  isSelected: boolean
}) => {
  const groupRef = useRef<any>(null);
  const textRef = useRef<any>(null);
  const trRef = useRef<any>(null);

  useEffect(() => {
    if (isSelected && groupRef.current) {
      // Attach transformer to selected element
      trRef.current.nodes([groupRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const dragBoundFunc = (pos: Position) => {
    const node = textRef.current;
    if (!node) return pos;

    const textWidth = node.width();
    const textHeight = node.height();

    return {
      x: Math.max(0, Math.min(pos.x, stageWidth - textWidth)),
      y: Math.max(0, Math.min(pos.y, stageHeight - textHeight))
    };
  };

  return (
    <>
      <Group
        ref={groupRef}
        draggable
        x={initialPosition.x}
        y={initialPosition.y}
        onDragEnd={(e) => {
          onDragEnd({ x: e.target.x(), y: e.target.y() })
        }}
        onClick={onClick}
        dragBoundFunc={dragBoundFunc}
      >
        <Text
          ref={textRef}
          text={text}
          fill={style.color}
          fontSize={style.fontSize}
          fontStyle={style.fontWeight}
          perfectDrawEnabled={false}
        />
      </Group>
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // Limit minimum size
            const minWidth = 20;
            const minHeight = 20;
            if (newBox.width < minWidth || newBox.height < minHeight) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  )
}

const ResumePreview = ({ state }: ResumePreviewProps) => {
  const CANVAS_WIDTH = 794;
  const CANVAS_HEIGHT = 1123;

  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [positions, setPositions] = useState<Record<string, Position>>({
    name: { x: 50, y: 50 },
    title: { x: 50, y: 100 },
    surname: { x: 50, y: 150 }
  })
  const [styles, setStyles] = useState<Record<string, ElementStyle>>({
    name: { color: '#000000', fontSize: 24, fontWeight: 'bold' },
    title: { color: '#4B5563', fontSize: 18, fontWeight: 'normal' },
    surname: { color: '#000000', fontSize: 24, fontWeight: 'bold' },
  })

  const updatePosition = (id: string, newPosition: Position) => {
    setPositions(prev => ({
      ...prev,
      [id]: newPosition
    }))
  }

  const handleStageClick = (e: any) => {
    // Check if user clicked on empty space
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedElement(null);
    }
  };

  return (
    <div className="h-full w-full bg-white relative flex justify-center select-none">
      <div className="overflow-auto h-full">
        <div className="min-h-full p-4">
          <Stage 
            width={CANVAS_WIDTH} 
            height={CANVAS_HEIGHT} 
            style={{ 
              backgroundColor: 'white', 
              boxShadow: '0 0 10px rgba(0,0,0,0.1)',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none'
            }}
            onClick={handleStageClick}
          >
            <Layer>
              {['name', 'title', 'surname'].map((field) => (
                <DraggableText
                  key={field}
                  text={state?.[field as keyof TFormState] || ''}
                  initialPosition={positions[field]}
                  style={styles[field]}
                  onDragEnd={(pos) => updatePosition(field, pos)}
                  onClick={() => setSelectedElement(field)}
                  stageWidth={CANVAS_WIDTH}
                  stageHeight={CANVAS_HEIGHT}
                  isSelected={selectedElement === field}
                />
              ))}
            </Layer>
          </Stage>
        </div>
      </div>
    </div>
  )
}

export default ResumePreview
