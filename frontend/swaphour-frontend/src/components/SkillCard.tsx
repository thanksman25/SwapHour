import { Link, useNavigate } from 'react-router-dom';
import type { Skill } from '../types';
import './SkillCard.css';

interface SkillCardProps {
  skill: Skill;
}

const CATEGORY_COLORS: Record<string, string> = {
  desain:     '#7C3AED',
  coding:     '#1A6B4A',
  musik:      '#DB2777',
  bahasa:     '#2563EB',
  memasak:    '#D97706',
  olahraga:   '#059669',
  bisnis:     '#7C3AED',
  fotografi:  '#DC2626',
  default:    '#6B7280',
};

function getCategoryColor(cat: string) {
  const key = cat.toLowerCase();
  return CATEGORY_COLORS[key] ?? CATEGORY_COLORS.default;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="stars">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ color: s <= Math.round(rating) ? 'var(--color-accent)' : 'var(--color-border)' }}>
          ★
        </span>
      ))}
      <span className="rating-num">{rating > 0 ? rating.toFixed(1) : 'Baru'}</span>
    </span>
  );
}

export default function SkillCard({ skill }: SkillCardProps) {
  const navigate = useNavigate();
  const catColor = getCategoryColor(skill.category);

  return (
    <div className="skill-card card">
      {/* Header: kategori + durasi */}
      <div className="skill-card__header">
        <span
          className="badge"
          style={{
            background: catColor + '18',
            color: catColor,
            border: `1px solid ${catColor}30`,
          }}
        >
          {skill.category}
        </span>
        <span className="skill-card__duration">
          <span className="duration-icon">⏱</span>
          {skill.duration_hours} jam
        </span>
      </div>

      {/* Title */}
      <h3 className="skill-card__title">
        <Link to={`/skills/${skill.id}`}>{skill.title}</Link>
      </h3>

      {/* Description */}
      {skill.description && (
        <p className="skill-card__desc text-muted">{skill.description}</p>
      )}

      {/* Provider info */}
      <div className="skill-card__provider">
        <div className="provider-avatar">
          {skill.user?.avatar_url ? (
            <img src={skill.user.avatar_url} alt={skill.user.name} />
          ) : (
            <span>{skill.user?.name?.[0]?.toUpperCase() ?? '?'}</span>
          )}
        </div>
        <div className="provider-info">
          <span className="provider-name">{skill.user?.name ?? 'Pengguna'}</span>
          {skill.user?.average_rating !== undefined && (
            <StarRating rating={skill.user.average_rating} />
          )}
        </div>
      </div>

      {/* CTA */}
      <button
        className="btn btn-primary btn-full skill-card__cta"
        onClick={() => navigate(`/skills/${skill.id}`)}
      >
        Request Swap →
      </button>
    </div>
  );
}
