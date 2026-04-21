"use client";

import React, { useEffect, useRef, useState, useMemo } from 'react';
import Matter from 'matter-js';
import {
  FaAngular,
  FaReact,
  FaGithub
} from 'react-icons/fa';
import {
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiN8N,
  SiSupabase,
  SiClaude
} from 'react-icons/si';
import { TbBrandReactNative } from "react-icons/tb";

const SKILLS_DATA = [
  { name: "Angular", icon: FaAngular, color: "#f40e5e", shadow: "#ac0a42", rgba: "244, 14, 94" },
  { name: "React", icon: FaReact, color: "#58c4dc", shadow: "#3e8a9c", rgba: "88, 196, 220" },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff", shadow: "#a3a3a3", rgba: "255, 255, 255" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178c6", shadow: "#23558c", rgba: "49, 120, 198" },
  { name: "JavaScript", icon: SiJavascript, color: "#f7e024", shadow: "#ab9a18", rgba: "247, 224, 36" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#00bcff", shadow: "#0085b3", rgba: "0, 188, 255" },
  { name: "n8n", icon: SiN8N, color: "#e94b70", shadow: "#a3354f", rgba: "233, 75, 112" },
  { name: "GitHub", icon: FaGithub, color: "#ffffff", shadow: "#a3a3a3", rgba: "255, 255, 255" },
  { name: "Supabase", icon: SiSupabase, color: "#3bc688", shadow: "#298c5f", rgba: "59, 198, 136" },
  { name: "Claude", icon: SiClaude, color: "#d97757", shadow: "#99543d", rgba: "217, 119, 87" },
];

export default function ArsenalPlayground() {
  const sceneRef = useRef(null);
  const [bodies, setBodies] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [engineError, setEngineError] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let engine;
    let renderFrame;

    const setupPhysics = () => {
      try {
        const el = sceneRef.current;
        if (!el) {
          renderFrame = requestAnimationFrame(setupPhysics);
          return;
        }

        const width = el.clientWidth || window.innerWidth || 800;
        const height = el.clientHeight || window.innerHeight || 500;

        engine = Matter.Engine.create();
        engine.world.gravity.y = 1;

        // Indestructible thick walls to perfectly map the CSS container
        const wallOptions = { isStatic: true, render: { visible: false } };

        // Ground top edge matches exactly at `height`
        const ground = Matter.Bodies.rectangle(width / 2, height + 500, width * 5, 1000, wallOptions);

        // Left wall right edge matches exactly at `0`
        const leftWall = Matter.Bodies.rectangle(-500, height / 2, 1000, height * 4, wallOptions);

        // Right wall left edge matches exactly at `width`
        const rightWall = Matter.Bodies.rectangle(width + 500, height / 2, 1000, height * 4, wallOptions);

        // Ceiling bottom edge matches exactly at `0` (Traps them perfectly from going UP)
        const ceiling = Matter.Bodies.rectangle(width / 2, -500, width * 5, 1000, wallOptions);

        Matter.World.add(engine.world, [ground, leftWall, rightWall, ceiling]);

        // Create skill bodies with 4 distinctive shapes to add variety
        const skillBodies = SKILLS_DATA.map((skill, index) => {
          // Spread safely inside the box width
          const x = 100 + ((width - 200) * (index / Math.max(SKILLS_DATA.length - 1, 1)));
          // Spawn INSIDE the container so they don't get trapped by the zero-ceiling
          const y = 80 + (index * 20);

          const shapeType = index % 4; // 0: circle, 1: rounded-box, 2: sharp-box, 3: pill
          let body;
          let viewProps = {};

          if (shapeType === 0) {
            // Perfect Circle
            body = Matter.Bodies.circle(x, y, 55, {
              restitution: 0.6,
              friction: 0.1,
              density: 0.005,
            });
            viewProps = { w: 110, h: 110, radius: '50%' };
          } else if (shapeType === 1) {
            // Squircle / Soft Box
            body = Matter.Bodies.rectangle(x, y, 110, 110, {
              chamfer: { radius: 32 },
              restitution: 0.4,
              friction: 0.3,
              density: 0.005,
            });
            viewProps = { w: 110, h: 110, radius: '32px' };
          } else if (shapeType === 2) {
            // Sharp Box
            body = Matter.Bodies.rectangle(x, y, 100, 100, {
              chamfer: { radius: 8 },
              restitution: 0.3,
              friction: 0.5,
              density: 0.006,
            });
            viewProps = { w: 100, h: 100, radius: '8px' };
          } else {
            // Wide Pill
            body = Matter.Bodies.rectangle(x, y, 150, 70, {
              chamfer: { radius: 35 },
              restitution: 0.4,
              friction: 0.2,
              density: 0.004,
            });
            viewProps = { w: 150, h: 70, radius: '35px' };
          }

          body.skillData = {
            name: skill.name,
            Icon: skill.icon,
            style: {
              bg: `rgba(${skill.rgba}, 0.15)`,
              border: skill.color,
              shadow: skill.shadow,
              text: skill.color
            },
            viewProps: viewProps
          };

          return body;
        });

        Matter.World.add(engine.world, skillBodies);

        // Mouse Interaction
        const mouse = Matter.Mouse.create(el);
        const mouseConstraint = Matter.MouseConstraint.create(engine, {
          mouse: mouse,
          constraint: { stiffness: 0.2, render: { visible: false } }
        });
        Matter.World.add(engine.world, mouseConstraint);

        let tickCount = 0;

        // Manual Sync Loop: Update React state and tick engine manually to bypass Runner bugs
        const updateRender = () => {
          Matter.Engine.update(engine, 1000 / 60);
          tickCount++;

          setBodies(skillBodies.map(body => ({
            id: body.id,
            x: body.position.x,
            y: body.position.y,
            angle: body.angle,
            data: body.skillData
          })));

          renderFrame = requestAnimationFrame(updateRender);
        };

        updateRender();
      } catch (err) {
        console.error("Physics initialization failed:", err);
        setEngineError(err.toString());
      }
    };

    renderFrame = requestAnimationFrame(setupPhysics);

    // Guaranteed Cleanup for Strict Mode & Unmounting
    return () => {
      cancelAnimationFrame(renderFrame);
      if (engine) {
        Matter.Engine.clear(engine);
        Matter.World.clear(engine.world);
      }
    };
  }, [mounted]);

  return (
    <div
      ref={sceneRef}
      className="relative w-full h-[55vh] min-h-[400px] mt-2 overflow-hidden border-[3px] rounded-[2.5rem] bg-[rgba(255,255,255,0.01)] cursor-crosshair"
      style={{
        borderColor: 'var(--border)',
        backgroundImage: 'radial-gradient(circle, var(--border) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        backgroundPosition: 'center'
      }}
    >
      {/* Minimal Background Instruction */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <span className="text-[6rem] md:text-[4rem] font-black tracking-[-0.05em] text-white/[0.02] uppercase mix-blend-overlay">
          Drag
        </span>
      </div>

      {!mounted && !engineError && (
        <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
          <p className="text-xs font-bold tracking-[0.4em] uppercase">Initializing Physics...</p>
        </div>
      )}

      {engineError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-50 p-6">
          <div className="bg-red-950/80 border border-red-500/50 rounded-xl p-6 max-w-lg backdrop-blur-md">
            <h3 className="text-xl font-bold mb-2 text-red-400">Physics Engine Failed to Boot</h3>
            <p className="font-mono text-sm text-red-200/80 whitespace-pre-wrap">{engineError}</p>
            <p className="text-xs mt-4 text-red-400/60 font-semibold uppercase tracking-wider">Please provide this exact text so I can resolve it.</p>
          </div>
        </div>
      )}

      {mounted && bodies.map((body) => {
        const { Icon, style, viewProps } = body.data;
        if (!Icon || !viewProps) return null;
        return (
          <div
            key={`skill-body-${body.id}`}
            className="absolute flex flex-col items-center justify-center p-4 border-[3px] select-none"
            style={{
              width: `${viewProps.w}px`,
              height: `${viewProps.h}px`,
              left: body.x - (viewProps.w / 2),
              top: body.y - (viewProps.h / 2),
              borderRadius: viewProps.radius,
              transform: `rotate(${body.angle}rad)`,
              backgroundColor: style.bg,
              borderColor: style.border,
              color: style.text,
              boxShadow: `0px 8px 0px 0px ${style.shadow}`,
              zIndex: 10,
              pointerEvents: 'none', // Letting Matter.js MouseConstraint handle interactions
            }}
          >
            <Icon size={44} />
          </div>
        );
      })}
    </div>
  );
}
