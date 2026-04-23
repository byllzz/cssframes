import React from "react";
import {
  ChevronRight,
} from 'lucide-react';

export default function Elements({ animations = [], onNavigate, categories = [] }) {
  const totalAnimations = animations.length;
  const totalCommunityAnimations = animations.filter(item => item.isCommunity).length;
  const getCategoryCount = name =>
    name === 'All' ? totalAnimations : animations.filter(a => a.category === name).length;

  return (
    <div
      style={{
        width: '700px',
        maxWidth: "100%",
        background: '#161616',
        borderRadius: 8,
        border: '1px solid rgba(255,255,255,0.06)',
        padding: 10,

      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: 5, height: 278 }}>
        {/*LEFT: category grid  */}
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, alignContent: 'start' }}
        >
          {categories.map(item => {
            const count = getCategoryCount(item.name);

            const Icon = item.icon;
            return (
              <button
                className="group"
                key={item.name}
                onClick={() => onNavigate(item.name)}
                style={{
                  background: '#050505',
                  borderRadius: 8,
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  color: '#fff',
                  position: 'relative',
                }}
              >
                {/* subtle top accent */}
                <div
                  style={{
                    position: 'absolute',
                    inset: '0 0 auto 0',
                    height: 1,
                    background: 'linear-gradient(90deg,transparent,#a78bfa66,transparent)',
                  }}
                  className="hidden group-hover:block"
                />

                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 8,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon
                      size={15}
                      strokeWidth={2}
                      className={item.animate ? 'animate-spin' : ''}
                    />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 500, color: '#e2e0f0' }}>
                    {item.name}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 500,
                      color: '#fff',
                      background: 'rgba(255,255,255,0.04)',
                      padding: '2px 7px',
                      borderRadius: 20,
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    {count}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* RIGHT: card */}
        <div
          style={{
            borderRadius: 8,
            background: '#050505',
            border: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '10px 16px',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* subtle top accent */}
          <div
            style={{
              position: 'absolute',
              inset: '0 0 auto 0',
              height: 1,
              background: 'linear-gradient(90deg,transparent,#a78bfa66,transparent)',
            }}
          />

          <div>


            <p style={{ fontSize: 15, fontWeight: 600, color: '#f0eeff', margin: '0 0 6px' }}>
              180+ Animations
            </p>
            <p style={{ fontSize: 12, color: '#6b6880', lineHeight: 1.5, margin: 0 }}>
              Production-ready CSS keyframes. Zero dependencies.
            </p>
          </div>

          {/* stats row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 6,
              margin: '16px 0',
            }}
          >
            {[
              { num: totalAnimations , label: 'Animations' },
              { num: totalCommunityAnimations, label: 'Community' },
              { num: '28k', label: 'GitHub Stars' },
              { num: '0', label: 'Dependencies' },
            ].map(s => (
              <div
                key={s.label}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: 5,
                  padding: '8px 10px',
                }}
              >
                <div style={{ fontSize: 16, fontWeight: 700, color: '#f0eeff' }}>{s.num}</div>
                <div style={{ fontSize: 10, color: '#6b6880', marginTop: 1 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => onNavigate?.('All')}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg,#a78bfa,#f472b6)',
              border: 'none',
              borderRadius: 7,
              padding: '9px 0',
              color: '#fff',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}
          >
            Browse all Animations
            <ChevronRight size={14} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
