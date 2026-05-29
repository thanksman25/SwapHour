import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import ErrorAlert from "../components/ui/ErrorAlert";
import swapHourLogo from "../assets/logo.png";

const CATEGORIES = [
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

const AddSkillPage = () => {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    duration: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    category: "",
    duration: "",
  });

  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.5)" },
    );
  }, []);

  const validate = () => {
    let valid = true;
    const newErrors = {
      title: "",
      description: "",
      category: "",
      duration: "",
    };

    if (!form.title.trim()) {
      newErrors.title = "Judul skill wajib diisi";
      valid = false;
    }

    if (!form.description.trim()) {
      newErrors.description = "Deskripsi wajib diisi";
      valid = false;
    }

    if (!form.category) {
      newErrors.category = "Kategori wajib dipilih";
      valid = false;
    }

    const dur = parseFloat(form.duration);
    if (!form.duration) {
      newErrors.duration = "Durasi wajib diisi";
      valid = false;
    } else if (isNaN(dur) || dur < 0.5 || dur > 24) {
      newErrors.duration = "Durasi harus antara 0.5 - 24 jam";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: "" }));
      setApiError("");
    };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsLoading(true);
    setApiError("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          category: form.category,
          duration: parseFloat(form.duration),
        }),
      });

      const data = await response.json();

      if (response.ok || response.status === 201) {
        setShowSuccess(true);
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        setApiError(data?.message || "Gagal menambahkan skill.");
      }
    } catch (err) {
      setApiError("Gagal terhubung ke server. Coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        background:
          "radial-gradient(ellipse at 15% 50%, rgba(45,138,97,0.2) 0%, transparent 55%), radial-gradient(ellipse at 85% 15%, rgba(26,107,74,0.15) 0%, transparent 50%), linear-gradient(160deg, #0f4530 0%, #071810 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dot grid */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "35px 35px",
          pointerEvents: "none",
        }}
      />

      {/* Glow orbs */}
      <div
        style={{
          position: "fixed",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(45,138,97,0.15) 0%, transparent 70%)",
          top: "-150px",
          left: "-150px",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(240,165,0,0.07) 0%, transparent 70%)",
          bottom: "-100px",
          right: "-100px",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      <div
        ref={cardRef}
        style={{
          width: "100%",
          maxWidth: "560px",
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "28px",
          padding: "2.75rem 2.5rem",
          boxShadow:
            "0 20px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column" as const,
          gap: "1.4rem",
        }}
      >
        {/* Top shimmer */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "15%",
            right: "15%",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
          }}
        />

        {/* Header */}
        <div>
          <img
            src={swapHourLogo}
            alt="SwapHour"
            style={{
              height: "42px",
              width: "auto",
              filter: "brightness(0) invert(1)",
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "0.5rem",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                background: "linear-gradient(135deg, #1A6B4A, #2d8a61)",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
                flexShrink: 0,
              }}
            >
              ◈
            </div>
            <div>
              <h1
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: "-0.5px",
                  margin: 0,
                }}
              >
                Tambah Skill
              </h1>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.5)",
                  fontWeight: 300,
                  margin: 0,
                }}
              >
                Tawarkan keahlianmu ke komunitas SwapHour
              </p>
            </div>
          </div>
        </div>

        {apiError && <ErrorAlert message={apiError} />}

        {/* Success toast */}
        {showSuccess && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(45,138,97,0.15)",
              border: "1px solid rgba(45,138,97,0.3)",
              borderRadius: "12px",
              padding: "0.85rem 1.1rem",
            }}
          >
            <span>✅</span>
            <span
              style={{
                fontSize: "0.875rem",
                color: "#6ee7b7",
                fontWeight: 500,
              }}
            >
              Skill berhasil ditambahkan! Mengarahkan ke dashboard...
            </span>
          </div>
        )}

        {/* Form fields */}
        <div
          style={{
            display: "flex",
            flexDirection: "column" as const,
            gap: "1rem",
          }}
        >
          <Input
            label="Judul Skill"
            placeholder="Contoh: Web Development, Desain Logo..."
            value={form.title}
            onChange={handleChange("title")}
            errorMessage={errors.title}
            fullWidth
          />

          <Input
            label="Deskripsi"
            placeholder="Jelaskan skill yang kamu tawarkan..."
            value={form.description}
            onChange={handleChange("description")}
            errorMessage={errors.description}
            fullWidth
          />

          {/* Kategori Dropdown */}
          <div
            style={{
              display: "flex",
              flexDirection: "column" as const,
              gap: "0.5rem",
            }}
          >
            <label
              style={{
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "rgba(255,255,255,0.65)",
              }}
            >
              Kategori
            </label>
            <select
              value={form.category}
              onChange={(e) => {
                setForm((prev) => ({ ...prev, category: e.target.value }));
                setErrors((prev) => ({ ...prev, category: "" }));
              }}
              style={{
                background: "rgba(255,255,255,0.09)",
                backdropFilter: "blur(20px)",
                border: errors.category
                  ? "1px solid rgba(239,68,68,0.6)"
                  : "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                padding: "0.85rem 1.1rem",
                fontFamily: "Sora, sans-serif",
                fontSize: "0.9rem",
                color: form.category ? "#fff" : "rgba(255,255,255,0.35)",
                outline: "none",
                cursor: "pointer",
                width: "100%",
                transition: "all 0.25s ease",
              }}
            >
              <option value="" disabled style={{ background: "#0f4530" }}>
                Pilih kategori...
              </option>
              {CATEGORIES.map((cat) => (
                <option
                  key={cat}
                  value={cat}
                  style={{ background: "#0f4530", color: "#fff" }}
                >
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <span
                style={{
                  fontSize: "0.78rem",
                  color: "#f87171",
                  fontWeight: 500,
                }}
              >
                {errors.category}
              </span>
            )}
          </div>

          <Input
            label="Durasi (jam)"
            placeholder="Contoh: 1, 1.5, 2 (antara 0.5 - 24 jam)"
            value={form.duration}
            onChange={handleChange("duration")}
            type="number"
            errorMessage={errors.duration}
            fullWidth
          />
        </div>

        {/* Info box */}
        <div
          style={{
            background: "rgba(240,165,0,0.08)",
            border: "1px solid rgba(240,165,0,0.18)",
            borderRadius: "12px",
            padding: "0.85rem 1.1rem",
            display: "flex",
            gap: "8px",
            alignItems: "flex-start",
          }}
        >
          <span style={{ fontSize: "0.9rem", flexShrink: 0 }}>💡</span>
          <p
            style={{
              fontSize: "0.78rem",
              color: "rgba(255,255,255,0.55)",
              fontWeight: 300,
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            Durasi adalah estimasi waktu yang kamu butuhkan untuk menyelesaikan
            skill ini. 1 jam skill kamu = 1 jam kredit yang bisa kamu tukar.
          </p>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              flex: 1,
              padding: "0.85rem",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.6)",
              fontFamily: "Sora, sans-serif",
              fontSize: "0.9rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            ← Kembali
          </button>
          <div style={{ flex: 2 }}>
            <Button
              variant="primary"
              isLoading={isLoading}
              disabled={isLoading || showSuccess}
              onClick={handleSubmit}
              fullWidth
            >
              Tambah Skill →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSkillPage;
