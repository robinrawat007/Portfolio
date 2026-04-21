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
  SiN8N
} from 'react-icons/si';
import { TbBrandReactNative } from "react-icons/tb";

const SKILLS_DATA = [
  { name: "Angular", icon: FaAngular },
  { name: "React", icon: FaReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "React Native", icon: TbBrandReactNative },
  { name: "TypeScript", icon: SiTypescript },
  { name: "JavaScript", icon: SiJavascript },
  { name: "Tailwind", icon: SiTailwindcss },
  { name: "n8n", icon: SiN8N },
  { name: "GitHub", icon: FaGithub },
];

const COLORS = [
  { bg: "rgba(188, 169, 255, 0.2)", border: "#bca9ff", shadow: "#7e6fcc", text: "#bca9ff" },
  { bg: "rgba(217, 255, 0, 0.15)", border: "#d9ff00", shadow: "#8aad00", text: "#d9ff00" },
  { bg: "rgba(0, 255, 133, 0.15)", border: "#00ff85", shadow: "#008f4a", text: "#00ff85" },
  { bg: "rgba(0, 212, 255, 0.15)", border: "#00d4ff", shadow: "#007a99", text: "#00d4ff" },
];

export default function ArsenalPlayground() {
  const sceneRef = useRef(null);
  const engineRef = useRef(Matter.Engine.create());
  const [bodies, setBodies] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !sceneRef.current) return;

    const engine = engineRef.current;
    const world = engine.world;
    engine.world.gravity.y = 1;

    const width = sceneRef.current.clientWidth || 800;
    const height = sceneRef.current.clientHeight || 500;

    // Walls
    const wallOptions = { isStatic: true, render: { visible: false } };
    const ground = Matter.Bodies.rectangle(width / 2, height + 50, width, 100, wallOptions);
    const leftWall = Matter.Bodies.rectangle(-50, height / 2, 100, height, wallOptions);
    const rightWall = Matter.Bodies.rectangle(width + 50, height / 2, 100, height, wallOptions);
    const ceiling = Matter.Bodies.rectangle(width / 2, -50, width, 100, wallOptions);

    Matter.World.add(world, [ground, leftWall, rightWall, ceiling]);

    // Create skill bodies
    const skillBodies = SKILLS_DATA.map((skill, index) => {
      const x = (width * 0.2) + (width * 0.6 * (index / (SKILLS_DATA.length - 1 || 1)));
      const y = -100 - (index * 100);
      const bodyWidth = 110;
      const bodyHeight = 110;

      const body = Matter.Bodies.rectangle(x, y, bodyWidth, bodyHeight, {
        chamfer: { radius: 28 },
        restitution: 0.5,
        friction: 0.3,
        density: 0.005,
        render: { visible: false }
      });

      body.skillData = {
        name: skill.name,
        Icon: skill.icon,
        style: COLORS[index % COLORS.length]
      };

      return body;
    });

    Matter.World.add(world, skillBodies);

    // Mouse
    const mouse = Matter.Mouse.create(sceneRef.current);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: { stiffness: 0.2, render: { visible: false } }
    });

    Matter.World.add(world, mouseConstraint);

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    let animationFrame;
    const updateRender = () => {
      setBodies(skillBodies.map(body => ({
        id: body.id,
        x: body.position.x,
        y: body.position.y,
        angle: body.angle,
        data: body.skillData
      })));
      animationFrame = requestAnimationFrame(updateRender);
    };
    updateRender();

    return () => {
      cancelAnimationFrame(animationFrame);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      Matter.World.clear(world);
    };
  }, [mounted]);

  if (!mounted) return <div className="h-[70vh] min-h-[500px]" />;

  return (
    <div
      ref={sceneRef}
      className="relative w-full h-[70vh] min-h-[500px] mt-12 overflow-hidden border-[3px] rounded-[2.5rem] bg-[rgba(255,255,255,0.01)] cursor-crosshair px-8"
      style={{
        borderColor: 'var(--border)',
        backgroundImage: 'radial-gradient(circle, var(--border) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        backgroundPosition: 'center'
      }}
    >
      {bodies.map((body) => {
        const { Icon, style } = body.data;
        if (!Icon) return null; // Safe guard
        return (
          <div
            key={`skill-body-${body.id}`}
            className="absolute flex flex-col items-center justify-center p-4 border-[3px] rounded-3xl select-none"
            style={{
              width: '110px',
              height: '110px',
              left: body.x - 55,
              top: body.y - 55,
              transform: `rotate(${body.angle}rad)`,
              backgroundColor: style.bg,
              borderColor: style.border,
              color: style.text,
              boxShadow: `0px 8px 0px 0px ${style.shadow}`,
              zIndex: 10,
              pointerEvents: 'none',
            }}
          >
            <Icon size={44} />
          </div>
        );
      })}

    </div>
  );
}
