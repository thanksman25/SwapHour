import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Skill } from "../types";
import "./SkillCard.css";

interface SkillCardProps {
  skill: Skill;
}

const CATEGORY_COLORS: Record<string, string> = {
  desain:     "#F0A500", // Gold accent
  coding:     "#4AB882", // Green
  musik:      "#DB2777",
  bahasa:     "#60A5FA", // Blue
  memasak:    "#D97706",
  olahraga:   "#10B981",
  bisnis:     "#A78BFA", // Purple
  fotografi:  "#EF4444",
  default:    "#9CA3AF",
};

function getCategoryColor(cat: string) {
  const key = cat.toLowerCase();
  return CATEGORY_COLORS[key] ?? CATEGORY_COLORS.default;
}

export default function SkillCard({ skill }: SkillCardProps) {
  const navigate = useNavigate();
  const [bookmarked, setBookmarked] = useState(false);
  
  const catColor = getCategoryColor(skill.category);
  const providerName = skill.user?.name ?? "Pengguna";
  const duration = Number(skill.duration_hours).toFixed(1);

  const handleCardClick = () => {
    navigate(`/skills/${skill.id}`);
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarked(!bookmarked);
  };

  return (
    <div className="skill-card card" onClick={handleCardClick} style={{ cursor: "pointer" }}>
      {/* Top row: Category badge + Bookmark button */}
      <div className="skill-card__top">
        <span
          className="badge skill-card__badge"
          style={{
            background: catColor + "18",
            color: catColor,
            border: `1px solid ${catColor}35`,
          }}
        >
          {skill.category}
        </span>
        
        <button
          className={`skill-card__bookmark ${bookmarked ? "skill-card__bookmark--active" : ""}`}
          onClick={handleBookmarkClick}
          title={bookmarked ? "Batal Simpan" : "Simpan Skill"}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5 5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21L12 17.5L5 21V5Z"
              stroke={bookmarked ? "var(--color-accent)" : "currentColor"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill={bookmarked ? "var(--color-accent)" : "none"}
            />
          </svg>
        </button>
      </div>

      {/* Body: Title + Description */}
      <div className="skill-card__body">
        <h3 className="skill-card__title">{skill.title}</h3>
        {skill.description ? (
          <p className="skill-card__desc text-muted">{skill.description}</p>
        ) : (
          <p className="skill-card__desc text-muted italic">Tidak ada deskripsi yang tersedia.</p>
        )}
      </div>

      {/* Bottom row: Provider + Duration price */}
      <div className="skill-card__bottom">
        <div className="skill-card__provider">
          <div className="provider-avatar-circle">
            {skill.user?.avatar_url ? (
              <img src={skill.user.avatar_url} alt={providerName} />
            ) : (
              <span>{providerName[0]?.toUpperCase() ?? "U"}</span>
            )}
          </div>
          <span className="provider-name-label">{providerName}</span>
        </div>

        <div className="skill-card__price">
          <span className="price-value">{duration}h</span>
        </div>
      </div>
    </div>
  );
}
