"use client";

import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import useSWR from 'swr';
import { supabase } from '@/lib/supabaseClient';
import {
  FaAngular, FaReact, FaGithub, FaAws,
} from 'react-icons/fa';
import {
  SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss, SiN8N,
  SiSupabase, SiClaude, SiRedux, SiReactquery, SiReactivex, SiMui,
  SiJest, SiOpenai, SiLangchain, SiHuggingface, SiFigma, SiVercel,
  SiSentry,
} from 'react-icons/si';
import { TbBrandReactNative } from 'react-icons/tb';

const ICON_MAP = {
  FaAngular, FaReact, FaGithub, FaAws,
  SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss, SiN8N,
  SiSupabase, SiClaude, SiRedux, SiReactquery, SiReactivex, SiMui,
  SiJest, SiOpenai, SiLangchain, SiHuggingface, SiFigma, SiVercel,
  SiSentry, TbBrandReactNative,
};

const fetchShowcaseSkills = async () => {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .eq('showcase', true)
    .order('display_order');
  if (error) throw error;
  return data;
};

function PhysicsScene({ skills }) {
  const sceneRef = useRef(null);
  const [bodies, setBodies] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [engineError, setEngineError] = useState(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || !skills.length) return;

    let engine;
    let renderFrame;

    const setupPhysics = () => {
      try {
        const el = sceneRef.current;
        if (!el) { renderFrame = requestAnimationFrame(setupPhysics); return; }

        const width = el.clientWidth || window.innerWidth || 800;
        const height = el.clientHeight || window.innerHeight || 500;
        const s = width < 500 ? 0.6 : width < 768 ? 0.75 : 1;

        engine = Matter.Engine.create();
        engine.world.gravity.y = 1;

        const wallOptions = { isStatic: true, render: { visible: false } };
        const ground  = Matter.Bodies.rectangle(width / 2, height + 500, width * 5, 1000, wallOptions);
        const leftWall  = Matter.Bodies.rectangle(-500, height / 2, 1000, height * 4, wallOptions);
        const rightWall = Matter.Bodies.rectangle(width + 500, height / 2, 1000, height * 4, wallOptions);
        const ceiling   = Matter.Bodies.rectangle(width / 2, -500, width * 5, 1000, wallOptions);
        Matter.World.add(engine.world, [ground, leftWall, rightWall, ceiling]);

        const skillBodies = skills.map((skill, index) => {
          const x = 100 + ((width - 200) * (index / Math.max(skills.length - 1, 1)));
          const y = 80 + (index * 20);
          const shapeType = index % 4;
          let body, viewProps;

          if (shapeType === 0) {
            const r = Math.round(55 * s);
            body = Matter.Bodies.circle(x, y, r, { restitution: 0.6, friction: 0.1, density: 0.005 });
            viewProps = { w: r * 2, h: r * 2, radius: '50%' };
          } else if (shapeType === 1) {
            const sz = Math.round(110 * s);
            body = Matter.Bodies.rectangle(x, y, sz, sz, { chamfer: { radius: Math.round(32 * s) }, restitution: 0.4, friction: 0.3, density: 0.005 });
            viewProps = { w: sz, h: sz, radius: `${Math.round(32 * s)}px` };
          } else if (shapeType === 2) {
            const sz = Math.round(100 * s);
            body = Matter.Bodies.rectangle(x, y, sz, sz, { chamfer: { radius: Math.round(8 * s) }, restitution: 0.3, friction: 0.5, density: 0.006 });
            viewProps = { w: sz, h: sz, radius: `${Math.round(8 * s)}px` };
          } else {
            const w2 = Math.round(150 * s), h2 = Math.round(70 * s);
            body = Matter.Bodies.rectangle(x, y, w2, h2, { chamfer: { radius: Math.round(35 * s) }, restitution: 0.4, friction: 0.2, density: 0.004 });
            viewProps = { w: w2, h: h2, radius: `${Math.round(35 * s)}px` };
          }

          const Icon = ICON_MAP[skill.icon_name];
          body.skillData = {
            name: skill.name,
            Icon,
            iconSize: Math.round(44 * s),
            style: {
              bg: skill.rgba ? `rgba(${skill.rgba}, 0.15)` : 'rgba(255,255,255,0.05)',
              border: skill.color || '#ffffff',
              shadow: skill.shadow || '#333333',
              text: skill.color || '#ffffff',
            },
            viewProps,
          };
          return body;
        });

        Matter.World.add(engine.world, skillBodies);

        const mouse = Matter.Mouse.create(el);
        const mouseConstraint = Matter.MouseConstraint.create(engine, {
          mouse,
          constraint: { stiffness: 0.2, render: { visible: false } },
        });
        Matter.World.add(engine.world, mouseConstraint);

        const updateRender = () => {
          Matter.Engine.update(engine, 1000 / 60);
          setBodies(skillBodies.map((body) => ({
            id: body.id,
            x: body.position.x,
            y: body.position.y,
            angle: body.angle,
            data: body.skillData,
          })));
          renderFrame = requestAnimationFrame(updateRender);
        };
        updateRender();
      } catch (err) {
        if (process.env.NODE_ENV !== 'production') console.error('Physics initialization failed:', err);
        setEngineError(err.toString());
      }
    };

    renderFrame = requestAnimationFrame(setupPhysics);

    return () => {
      cancelAnimationFrame(renderFrame);
      if (engine) { Matter.Engine.clear(engine); Matter.World.clear(engine.world); }
    };
  }, [mounted, skills]);

  return (
    <div
      ref={sceneRef}
      className="relative w-full h-[55vh] min-h-[400px] mt-2 overflow-hidden border-[3px] rounded-[2.5rem] bg-[rgba(255,255,255,0.01)] cursor-crosshair"
      style={{
        borderColor: 'var(--border)',
        backgroundImage: 'radial-gradient(circle, var(--border) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        backgroundPosition: 'center',
      }}
    >
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
          </div>
        </div>
      )}

      {mounted && bodies.map((body) => {
        const { Icon, iconSize, style, viewProps } = body.data;
        if (!Icon || !viewProps) return null;
        return (
          <div
            key={`skill-body-${body.id}`}
            className="absolute flex flex-col items-center justify-center p-2 border-[3px] select-none"
            style={{
              width: `${viewProps.w}px`,
              height: `${viewProps.h}px`,
              left: body.x - viewProps.w / 2,
              top: body.y - viewProps.h / 2,
              borderRadius: viewProps.radius,
              transform: `rotate(${body.angle}rad)`,
              backgroundColor: style.bg,
              borderColor: style.border,
              color: style.text,
              boxShadow: `0px 8px 0px 0px ${style.shadow}`,
              zIndex: 10,
              pointerEvents: 'none',
            }}
          >
            <Icon size={iconSize ?? 44} />
          </div>
        );
      })}
    </div>
  );
}

export default function ArsenalPlayground() {
  const { data: skills = [], isLoading } = useSWR('showcase-skills', fetchShowcaseSkills, { revalidateOnFocus: false });

  if (isLoading) {
    return (
      <div className="relative w-full h-[55vh] min-h-[400px] mt-2 rounded-[2.5rem] border-[3px] flex items-center justify-center" style={{ borderColor: 'var(--border)' }}>
        <div className="h-8 w-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: 'var(--neon-yellow)', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  return <PhysicsScene skills={skills} />;
}
