import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { gsap } from 'gsap';
import apiClient from '../lib/apiClient';
import type { Skill } from '../types';
import SkillCard from '../components/SkillCard';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import './SkillCatalog.css';

const CATEGORIES = [
  'Semua', 'Desain', 'Coding', 'Musik', 'Bahasa', 'Memasak',
  'Olahraga', 'Bisnis', 'Fotografi', 'Lainnya',
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
  if (category && category !== 'Semua') params.category = category.toLowerCase();
  return apiClient
    .get<{ status: string; data: Skill[] }>('/skills', { params })
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
  const [searchInput, setSearchInput] = useState('');
  const [category, setCategory] = useState('Semua');
  const debouncedSearch = useDebounce(searchInput, 500);
  const gridRef = useRef<HTMLDivElement>(null);

  const { data: skills = [], isLoading, isError } = useQuery({
    queryKey: ['skills', debouncedSearch, category],
    queryFn: () => fetchSkills(debouncedSearch, category),
    staleTime: 5 * 60 * 1000,
  });

  // GSAP scale-in stagger on load/filter change
  useEffect(() => {
    if (!gridRef.current || isLoading) return;
    const ctx = gsap.context(() => {
      gsap.from('.skill-card', {
        scale: 0.95,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power2.out',
      });
    }, gridRef);
    return () => ctx.revert();
  }, [skills, isLoading]);

  return (
    <div className="skill-catalog">
      {/* Header */}
      <div className="catalog-header">
        <div>
          <h1 className="catalog-title">Katalog Skill</h1>
          <p className="text-muted">
            Temukan keahlian yang kamu butuhkan dan mulai pertukaran.
          </p>
        </div>
        {!isLoading && (
          <span className="catalog-count">
            {skills.length} skill ditemukan
          </span>
        )}
      </div>

      {/* Search & filter */}
      <div className="catalog-controls">
        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input
            id="skill-search"
            type="text"
            className="input search-input"
            placeholder="Cari skill, kategori, atau provider..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {searchInput && (
            <button className="search-clear" onClick={() => setSearchInput('')}>✕</button>
          )}
        </div>

        <div className="category-tabs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`cat-tab ${category === cat ? 'cat-tab--active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Debounce indicator */}
      {searchInput !== debouncedSearch && (
        <div className="searching-indicator">
          <span className="searching-dot" />
          Mencari...
        </div>
      )}

      {/* Grid */}
      {isError ? (
        <div className="card empty-state">
          <span className="empty-icon">⚠️</span>
          <h3>Gagal memuat data</h3>
          <p className="text-muted">Coba refresh halaman ini.</p>
        </div>
      ) : isLoading ? (
        <div className="skill-grid" ref={gridRef}>
          <LoadingSkeleton variant="card" count={8} />
        </div>
      ) : skills.length === 0 ? (
        <div className="card empty-state">
          <span className="empty-icon">🔍</span>
          <h3>Tidak ada skill ditemukan</h3>
          <p className="text-muted">
            {debouncedSearch
              ? `Tidak ada hasil untuk "${debouncedSearch}"`
              : 'Belum ada skill di kategori ini.'}
          </p>
          <button
            className="btn btn-outline"
            style={{ marginTop: 12 }}
            onClick={() => { setSearchInput(''); setCategory('Semua'); }}
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
