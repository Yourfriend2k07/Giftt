import { useEffect, useRef, useState } from 'react';
import { Wind, Sparkles, Eye, EyeOff } from 'lucide-react';
import { ThemeMode } from '../types';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  hueShift: number;
  shapeType?: 'sunflower' | 'bee' | 'blossom' | 'heart';
}

interface SparkleParticle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  life: number;
  maxLife: number;
}

interface PetalCanvasProps {
  theme?: ThemeMode;
}

export function PetalCanvas({ theme = 'sunflower' }: PetalCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isEnabled, setIsEnabled] = useState(true);
  const [intensity, setIntensity] = useState<'gentle' | 'breeze' | 'shower'>('gentle');
  const [isSparkleOn, setIsSparkleOn] = useState(true);

  const petalsRef = useRef<Petal[]>([]);
  const sparklesRef = useRef<SparkleParticle[]>([]);
  const mousePosRef = useRef<{ x: number; y: number; moved: boolean }>({ x: 0, y: 0, moved: false });

  // Density based on intensity
  const targetCount = intensity === 'gentle' ? 24 : intensity === 'breeze' ? 44 : 75;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY, moved: true };
      if (!isSparkleOn || !isEnabled) return;

      // Add 2 sparkle particles on movement
      for (let i = 0; i < 2; i++) {
        sparklesRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 16,
          y: e.clientY + (Math.random() - 0.5) * 16,
          size: 1.5 + Math.random() * 2.5,
          speedX: (Math.random() - 0.5) * 1.2,
          speedY: (Math.random() - 0.5) * 1.2 - 0.5,
          life: 0,
          maxLife: 35 + Math.random() * 25,
        });
      }
      if (sparklesRef.current.length > 60) {
        sparklesRef.current.splice(0, sparklesRef.current.length - 60);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const createPetal = (startY?: number): Petal => ({
      x: Math.random() * width,
      y: startY !== undefined ? startY : Math.random() * height,
      size: 10 + Math.random() * 15,
      speedY: 0.6 + Math.random() * 1.3,
      speedX: (Math.random() - 0.3) * 1.2,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.03,
      opacity: 0.5 + Math.random() * 0.45,
      hueShift: (Math.random() - 0.5) * 10,
    });

    petalsRef.current = Array.from({ length: targetCount }, () => createPetal());

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (isEnabled) {
        while (petalsRef.current.length < targetCount) {
          petalsRef.current.push(createPetal(-20));
        }
        if (petalsRef.current.length > targetCount) {
          petalsRef.current.pop();
        }

        for (let i = 0; i < petalsRef.current.length; i++) {
          const p = petalsRef.current[i];
          p.y += p.speedY;
          p.x += Math.sin(p.y * 0.008) * 0.8 + p.speedX;
          p.rotation += p.rotationSpeed;

          if (p.y > height + 30) {
            petalsRef.current[i] = createPetal(-20);
            continue;
          }
          if (p.x > width + 30) p.x = -20;
          if (p.x < -30) p.x = width + 20;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);

          if (theme === 'blossom') {
            // Cute Cherry Blossom Petal (soft pinks & rose)
            const grad = ctx.createLinearGradient(0, -p.size, 0, p.size);
            grad.addColorStop(0, `hsla(340, 85%, 85%, ${p.opacity})`);
            grad.addColorStop(0.6, `hsla(345, 90%, 75%, ${p.opacity * 0.9})`);
            grad.addColorStop(1, `hsla(330, 80%, 65%, ${p.opacity * 0.75})`);
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.moveTo(0, -p.size);
            ctx.bezierCurveTo(p.size * 0.6, -p.size * 0.4, p.size * 0.5, p.size * 0.5, 0, p.size);
            ctx.bezierCurveTo(-p.size * 0.5, p.size * 0.5, -p.size * 0.6, -p.size * 0.4, 0, -p.size);
            ctx.fill();
          } else if (theme === 'honeybee') {
            // Cute little Honey Bee / Golden Honey Drop
            const isBee = i % 3 === 0;
            if (isBee) {
              // Cute striped bee body
              ctx.fillStyle = `rgba(250, 204, 21, ${p.opacity})`;
              ctx.beginPath();
              ctx.ellipse(0, 0, 7, 5, 0, 0, Math.PI * 2);
              ctx.fill();
              // Stripes
              ctx.fillStyle = '#1c1917';
              ctx.fillRect(-2, -5, 2, 10);
              ctx.fillRect(2, -4, 2, 8);
              // Wings
              ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
              ctx.beginPath();
              ctx.ellipse(-1, -6, 3, 5, Math.PI / 4, 0, Math.PI * 2);
              ctx.ellipse(1, -6, 3, 5, -Math.PI / 4, 0, Math.PI * 2);
              ctx.fill();
            } else {
              // Honey teardrop
              ctx.fillStyle = `hsla(38, 95%, 52%, ${p.opacity})`;
              ctx.beginPath();
              ctx.moveTo(0, -p.size * 0.7);
              ctx.bezierCurveTo(p.size * 0.4, -p.size * 0.2, p.size * 0.4, p.size * 0.4, 0, p.size * 0.5);
              ctx.bezierCurveTo(-p.size * 0.4, p.size * 0.4, -p.size * 0.4, -p.size * 0.2, 0, -p.size * 0.7);
              ctx.fill();
            }
          } else if (theme === 'cool_aunt') {
            // Cute floating heart or sparkle
            const isHeart = i % 2 === 0;
            if (isHeart) {
              ctx.fillStyle = `hsla(348, 85%, 68%, ${p.opacity})`;
              const hSize = p.size * 0.45;
              ctx.beginPath();
              ctx.moveTo(0, hSize * 0.3);
              ctx.bezierCurveTo(-hSize, -hSize * 0.6, -hSize * 0.6, -hSize * 1.2, 0, -hSize * 0.4);
              ctx.bezierCurveTo(hSize * 0.6, -hSize * 1.2, hSize, -hSize * 0.6, 0, hSize * 0.3);
              ctx.fill();
            } else {
              // Golden Sparkle
              ctx.fillStyle = `hsla(45, 95%, 55%, ${p.opacity})`;
              ctx.beginPath();
              ctx.arc(0, 0, p.size * 0.3, 0, Math.PI * 2);
              ctx.fill();
            }
          } else {
            // Classic Golden Sunflower Petal
            const grad = ctx.createLinearGradient(0, -p.size, 0, p.size);
            grad.addColorStop(0, `hsla(${46 + p.hueShift}, 95%, 58%, ${p.opacity})`);
            grad.addColorStop(0.7, `hsla(${40 + p.hueShift}, 98%, 50%, ${p.opacity * 0.95})`);
            grad.addColorStop(1, `hsla(${34 + p.hueShift}, 90%, 42%, ${p.opacity * 0.8})`);
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.moveTo(0, -p.size);
            ctx.bezierCurveTo(p.size * 0.55, -p.size * 0.4, p.size * 0.45, p.size * 0.6, 0, p.size);
            ctx.bezierCurveTo(-p.size * 0.45, p.size * 0.6, -p.size * 0.55, -p.size * 0.4, 0, -p.size);
            ctx.fill();

            // Petal vein
            ctx.strokeStyle = `rgba(180, 83, 9, ${p.opacity * 0.3})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(0, -p.size * 0.7);
            ctx.lineTo(0, p.size * 0.7);
            ctx.stroke();
          }

          ctx.restore();
        }

        // Draw sparkles
        for (let i = sparklesRef.current.length - 1; i >= 0; i--) {
          const s = sparklesRef.current[i];
          s.x += s.speedX;
          s.y += s.speedY;
          s.life++;

          const progress = s.life / s.maxLife;
          const alpha = (1 - progress) * 0.8;

          if (s.life >= s.maxLife) {
            sparklesRef.current.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.translate(s.x, s.y);
          ctx.fillStyle = theme === 'blossom' ? `rgba(244, 114, 182, ${alpha})` : `rgba(245, 180, 20, ${alpha})`;
          ctx.beginPath();
          ctx.arc(0, 0, s.size * (1 - progress * 0.5), 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isEnabled, intensity, isSparkleOn, targetCount, theme]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-20 h-full w-full"
        aria-hidden="true"
      />

      {/* Floating Effect Control Pill */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full border border-amber-200/80 bg-white/90 px-3 py-1.5 shadow-lg shadow-amber-900/5 backdrop-blur-md transition-all hover:bg-white text-xs text-stone-700">
        <button
          onClick={() => setIsEnabled(!isEnabled)}
          className="flex items-center gap-1.5 font-medium hover:text-amber-800 transition-colors"
          title={isEnabled ? 'Pause floating effects' : 'Resume floating effects'}
        >
          {isEnabled ? <Eye className="h-3.5 w-3.5 text-amber-600" /> : <EyeOff className="h-3.5 w-3.5 text-stone-400" />}
          <span>{isEnabled ? 'Effects On' : 'Effects Paused'}</span>
        </button>

        {isEnabled && (
          <>
            <span className="text-amber-200">|</span>
            <button
              onClick={() => {
                const next = intensity === 'gentle' ? 'breeze' : intensity === 'breeze' ? 'shower' : 'gentle';
                setIntensity(next);
              }}
              className="flex items-center gap-1 hover:text-amber-800 capitalize transition-colors"
              title="Change effect level"
            >
              <Wind className="h-3.5 w-3.5 text-amber-500" />
              <span>{intensity}</span>
            </button>
            <span className="text-amber-200">|</span>
            <button
              onClick={() => setIsSparkleOn(!isSparkleOn)}
              className={`p-0.5 rounded transition-colors ${isSparkleOn ? 'text-amber-600' : 'text-stone-300'}`}
              title="Toggle cursor sparkle trail"
            >
              <Sparkles className="h-3.5 w-3.5" />
            </button>
          </>
        )}
      </div>
    </>
  );
}
