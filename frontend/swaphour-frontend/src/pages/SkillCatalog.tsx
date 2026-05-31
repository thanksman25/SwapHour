import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { gsap } from "gsap";
import apiClient from "../lib/apiClient";
import type { Skill } from "../types";
import SkillCard from "../components/SkillCard";
import LoadingSkeleton from "../components/ui/LoadingSkeleton";
import "./SkillCatalog.css";

const CATEGORIES = [
  "Semua",
  "Teknologi",
  "Desain",
  "Bahasa",
  "Musik",
  "Memasak",
  "Olahraga",
  "Pendidikan",
  "Bisnis",
  "Kesehatan",
  "Lainnya",
];

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

function fetchSkills(search: string, category: string): Promise<Skill[]> {
  const params: Record<string, string> = {};
  if (category && category !== "Semua") params.category = category.toLowerCase();
  return apiClient
    .get<{ status: string; data: Skill[] }>("/skills", { params })
    .then((r) => {
      const skills = r.data.data ?? [];
      if (!search.trim()) return skills;
      const q = search.toLowerCase();
      return skills.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.description?.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q)
      );
    });
}

export default function SkillCatalog() {
  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState("Semua");
  const debouncedSearch = useDebounce(searchInput, 500);
  const gridRef = useRef<HTMLDivElement>(null);

  const { data: skills = [], isLoading, isError } = useQuery({
    queryKey: ["skills", debouncedSearch, category],
    queryFn: () => fetchSkills(debouncedSearch, category),
    staleTime: 5 * 60 * 1000,
  });

  // Animasi masuk kartu skill
  useEffect(() => {
    if (!gridRef.current || isLoading) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skill-card",
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.45,
          stagger: 0.05,
          ease: "power2.out",
          overwrite: "auto",
        }
      );
    }, gridRef);
    return () => ctx.revert();
  }, [skills, isLoading]);

  return (
    <div className="skill-catalog">
      {/* Header section (Title Left, Search Right) */}
      <div className="catalog-header">
        <div className="catalog-header__left">
          <h1 className="catalog-title">Katalog Skill</h1>
          <p className="catalog-subtitle text-muted">
            Temukan keahlian dan mulailah saling menukar waktu Anda.
          </p>
        </div>
        <div className="catalog-header__right">
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input
              id="skill-search"
              type="text"
              className="input search-input"
              placeholder="Cari keahlian, kategori..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            {searchInput && (
              <button className="search-clear" onClick={() => setSearchInput("")}>
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Categories Filter pills row */}
      <div className="catalog-controls">
        <div className="category-tabs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`cat-tab ${category === cat ? "cat-tab--active" : ""}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        {!isLoading && (
          <span className="catalog-count">
            {skills.length} keahlian ditemukan
          </span>
        )}
      </div>

      {/* Debounce indicator */}
      {searchInput !== debouncedSearch && (
        <div className="searching-indicator">
          <span className="searching-dot" />
          Mencari...
        </div>
      )}

      {/* Skills Grid */}
      {isError ? (
        <div className="card empty-state">
          <span className="empty-icon">⚠️</span>
          <h3>Gagal memuat data</h3>
          <p className="text-muted">Coba muat ulang halaman ini.</p>
        </div>
      ) : isLoading ? (
        <div className="skill-grid" ref={gridRef}>
          <LoadingSkeleton variant="card" count={8} />
        </div>
      ) : skills.length === 0 ? (
        <div className="card empty-state">
          <span className="empty-icon">🔍</span>
          <h3>Tidak ada keahlian ditemukan</h3>
          <p className="text-muted">
            {debouncedSearch
              ? `Tidak ada hasil pencarian untuk "${debouncedSearch}"`
              : "Belum ada keahlian di kategori ini."}
          </p>
          <button
            className="btn btn-outline"
            style={{ marginTop: 12 }}
            onClick={() => {
              setSearchInput("");
              setCategory("Semua");
            }}
          >
            Reset Filter
          </button>
        </div>
      ) : (
        <div className="skill-grid" ref={gridRef}>
          {skills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      )}
    </div>
  );
}
