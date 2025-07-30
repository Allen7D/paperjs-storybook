import { useRef, useEffect } from 'react';
import paper from 'paper';
import './index.less';

interface MultiScopeProps {
  /**
   * Canvas 的宽度
   */
  width?: number;
  /**
   * Canvas 的高度
   */
  height?: number;
  /**
   * 是否启用动画
   */
  animated?: boolean;
}

/**
 * Paper.js 多 Scope 示例组件
 * 演示如何在同一个应用中使用多个独立的 Paper.js Scope
 */
export const MultiScope = ({
  width = 800,
  height = 400,
  animated = true
}: MultiScopeProps) => {
  const canvas1Ref = useRef<HTMLCanvasElement>(null);
  const canvas2Ref = useRef<HTMLCanvasElement>(null);
  const scope1Ref = useRef<paper.PaperScope | null>(null);
  const scope2Ref = useRef<paper.PaperScope | null>(null);

  useEffect(() => {
    if (!canvas1Ref.current || !canvas2Ref.current) return;

    // 创建第一个 Scope - 绘制几何图形
    scope1Ref.current = new paper.PaperScope();
    // 指定挂载 Canvas
    scope1Ref.current.setup(canvas1Ref.current);
    
    
    const scope1 = scope1Ref.current;
    scope1.activate();

    // 在第一个 Scope 中创建几何图形
    const circle = new scope1.Path.Circle({
      center: [width / 4, height / 2],
      radius: 50,
      fillColor: '#e74c3c'
    });

    const rectangle = new scope1.Path.Rectangle({
      point: [width / 2 - 50, height / 2 - 30],
      size: [100, 60],
      fillColor: '#3498db'
    });

    const triangle = new scope1.Path.RegularPolygon({
      center: [width * 3 / 4, height / 2],
      sides: 3,
      radius: 50,
      fillColor: '#2ecc71'
    });

    if (animated) {
      // 第一个 Scope 的动画 - 旋转
      scope1.view.onFrame = (event: any) => {
        rectangle.rotate(1);
        triangle.rotate(-1);
      };
    }
    // 可以执行 js 
    scope1.execute(`
      var circle = new Path.Circle(view.center, 10);
      circle.fillColor = 'yellow';
    `)

    // 创建第二个 Scope - 绘制文本和路径
    scope2Ref.current = new paper.PaperScope();
    scope2Ref.current.setup(canvas2Ref.current);
    
    const scope2 = scope2Ref.current;
    // scope1.activate();
    scope2.activate();

    // 在第二个 Scope 中创建文本和复杂路径
    const text = new scope2.PointText({
      point: [width / 2, 50],
      content: 'Paper.js 多 Scope 示例',
      fillColor: '#34495e',
      fontFamily: 'Arial, sans-serif',
      fontWeight: 'bold',
      fontSize: 24,
      justification: 'center'
    });

    // 创建波浪线路径
    const path = new scope2.Path({
      strokeColor: '#9b59b6',
      strokeWidth: 3
    });

    const waveHeight = 30;
    const waveLength = width / 8;
    
    for (let x = 0; x <= width; x += 10) {
      const y = height * 0.7 + Math.sin(x / waveLength) * waveHeight;
      if (x === 0) {
        path.moveTo([x, y]);
      } else {
        path.lineTo([x, y]);
      }
    }

    // 添加一些动态点
    const points: paper.Path.Circle[] = [];
    for (let i = 0; i < 5; i++) {
      const point = new scope2.Path.Circle({
        center: [100 + i * 150, height * 0.3],
        radius: 8,
        fillColor: `hsl(${i * 60}, 70%, 60%)`
      });
      points.push(point);
    }

    if (animated) {
      // 第二个 Scope 的动画 - 波动和颜色变化
      let time = 0;
      scope2.view.onFrame = (event: any) => {
        time += 0.05;
        
        // 更新波浪线
        for (let i = 0; i < path.segments.length; i++) {
          const segment = path.segments[i];
          const x = segment.point.x;
          const y = height * 0.7 + Math.sin(x / waveLength + time) * waveHeight;
          segment.point.y = y;
        }

        // 更新点的位置和颜色
        points.forEach((point, index) => {
          const baseY = height * 0.3;
          const offset = Math.sin(time + index * 0.5) * 20;
          point.position.y = baseY + offset;
          
          const hue = (time * 50 + index * 60) % 360;
          point.fillColor = new scope2.Color(`hsl(${hue}, 70%, 60%)`);
        });
      };
    }

    // 清理函数
    return () => {
      if (scope1Ref.current) {
        scope1Ref.current.remove();
        scope1Ref.current = null;
      }
      if (scope2Ref.current) {
        scope2Ref.current.remove();
        scope2Ref.current = null;
      }
    };
  }, [width, height, animated]);

  return (
    <div className="multi-scope-container">
      <div className="scope-section">
        <h3>Scope 1 - 几何图形</h3>
        <canvas 
          ref={canvas1Ref}
          width={width}
          height={height}
          className="paper-canvas"
        />
        <p className="scope-description">
          这个 Scope 包含基本的几何图形：圆形、矩形和三角形。
          {animated && '图形会自动旋转。'}
        </p>
      </div>
      
      <div className="scope-section">
        <h3>Scope 2 - 文本和路径</h3>
        <canvas 
          ref={canvas2Ref}
          width={width}
          height={height}
          className="paper-canvas"
        />
        <p className="scope-description">
          这个 Scope 包含文本、波浪线路径和动态彩色点。
          {animated && '波浪线会波动，彩色点会移动和变色。'}
        </p>
      </div>
    </div>
  );
};