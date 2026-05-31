import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import ErrorAlert from "../components/ui/ErrorAlert";
import Logo from "../components/ui/Logo";

const RegisterPage = () => {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (!pass) return { score: 0, label: "", color: "transparent" };
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { score, label: "Lemah", color: "#ef4444" };
    if (score === 2 || score === 3) return { score, label: "Sedang", color: "#f59e0b" };
    return { score, label: "Kuat", color: "#10b981" };
  };

  const strength = getPasswordStrength(form.password);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.5)" },
    );
  }, []);

  const validate = () => {
    let valid = true;
    const newErrors = { name: "", email: "", password: "" };
    if (!form.name.trim()) {
      newErrors.name = "Nama wajib diisi";
      valid = false;
    }
    if (!form.email.trim()) {
      newErrors.email = "Email wajib diisi";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Format email tidak valid";
      valid = false;
    }
    if (!form.password) {
      newErrors.password = "Password wajib diisi";
      valid = false;
    } else if (form.password.length < 8) {
      newErrors.password = "Password minimal 8 karakter";
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
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.status === 201) {
        navigate("/login");
      } else {
        setApiError(data?.message || "Pendaftaran gagal, coba lagi.");
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
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      {/* Kolom Kiri - Panel Hijau */}
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "4rem",
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(45,138,97,0.35) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(26,107,74,0.2) 0%, transparent 50%), linear-gradient(160deg, #0f4530 0%, #071810 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "400px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(240,165,0,0.1)",
              border: "1px solid rgba(240,165,0,0.2)",
              color: "#f5c842",
              fontSize: "0.68rem",
              fontWeight: 700,
              padding: "0.35rem 0.9rem",
              borderRadius: "999px",
              letterSpacing: "1px",
              textTransform: "uppercase" as const,
              marginBottom: "1.5rem",
            }}
          >
            ✦ Time Banking Platform
          </div>

          <h2
            style={{
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
              marginBottom: "1.25rem",
            }}
          >
            Mulai Tukar
            <br />
            Keahlianmu
            <br />
            Hari Ini
          </h2>

          <p
            style={{
              fontSize: "1rem",
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.75,
              fontWeight: 300,
              marginBottom: "2.5rem",
            }}
          >
            Bergabung dengan ribuan orang yang sudah saling membantu tanpa uang
            tunai.
          </p>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "16px",
              padding: "1.5rem",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            {[
              { number: "10K+", label: "Pengguna Aktif" },
              { number: "50K+", label: "Jam Ditukar" },
              { number: "200+", label: "Keahlian" },
            ].map((stat, i, arr) => (
              <div
                key={stat.label}
                style={{
                  flex: 1,
                  textAlign: "center" as const,
                  borderRight:
                    i < arr.length - 1
                      ? "1px solid rgba(255,255,255,0.08)"
                      : "none",
                }}
              >
                <div
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: 800,
                    color: "#fff",
                    letterSpacing: "-1px",
                  }}
                >
                  {stat.number}
                </div>
                <div
                  style={{
                    fontSize: "0.72rem",
                    color: "rgba(255,255,255,0.5)",
                    marginTop: "4px",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Kolom Kanan - Form */}
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "3rem",
          background:
            "radial-gradient(ellipse at 30% 30%, rgba(45,138,97,0.15) 0%, transparent 55%), linear-gradient(160deg, #0f4530 0%, #071810 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "35px 35px",
            pointerEvents: "none",
          }}
        />

        <div
          ref={cardRef}
          style={{
            width: "100%",
            maxWidth: "420px",
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "28px",
            padding: "2.75rem 2.5rem",
            boxShadow:
              "0 20px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
            display: "flex",
            flexDirection: "column" as const,
            gap: "1.4rem",
            position: "relative",
            zIndex: 1,
          }}
        >
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

          <div style={{ textAlign: "center" as const }}>
            <Logo size={42} />
            <h1
              style={{
                fontSize: "1.75rem",
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-0.5px",
                marginBottom: "0.4rem",
              }}
            >
              Buat Akun Baru
            </h1>
            <p
              style={{
                fontSize: "0.85rem",
                color: "rgba(255,255,255,0.5)",
                fontWeight: 300,
              }}
            >
              Daftar gratis dan mulai bertukar keahlian
            </p>
          </div>

          {apiError && <ErrorAlert message={apiError} />}

          <div
            style={{
              display: "flex",
              flexDirection: "column" as const,
              gap: "1rem",
            }}
          >
            <Input
              label="Nama Lengkap"
              placeholder="Masukkan nama lengkap..."
              value={form.name}
              onChange={handleChange("name")}
              errorMessage={errors.name}
              fullWidth
            />
            <Input
              label="Alamat Email"
              placeholder="nama@email.com"
              value={form.email}
              onChange={handleChange("email")}
              type="email"
              errorMessage={errors.email}
              fullWidth
            />
            <div>
              <Input
                label="Password"
                placeholder="Minimal 8 karakter"
                value={form.password}
                onChange={handleChange("password")}
                type="password"
                errorMessage={errors.password}
                fullWidth
              />
              {form.password && (
                <div style={{ marginTop: "0.5rem", paddingLeft: "4px" }}>
                  <div style={{ display: "flex", gap: "4px", height: "4px", marginBottom: "6px" }}>
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        style={{
                          flex: 1,
                          borderRadius: "2px",
                          background: level <= strength.score ? strength.color : "rgba(255,255,255,0.1)",
                          transition: "all 0.3s"
                        }}
                      />
                    ))}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem" }}>
                    <span style={{ color: strength.color, fontWeight: 600 }}>{strength.label}</span>
                    <span style={{ color: "rgba(255,255,255,0.4)" }}>Min. 8 char, A-Z, 0-9, Simbol</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Button
            variant="primary"
            isLoading={isLoading}
            disabled={isLoading}
            onClick={handleSubmit}
            fullWidth
          >
            Daftar Sekarang →
          </Button>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                flex: 1,
                height: "1px",
                background: "rgba(255,255,255,0.08)",
              }}
            />
            <span
              style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}
            >
              atau
            </span>
            <div
              style={{
                flex: 1,
                height: "1px",
                background: "rgba(255,255,255,0.08)",
              }}
            />
          </div>

          <p
            style={{
              textAlign: "center" as const,
              fontSize: "0.875rem",
              color: "rgba(255,255,255,0.45)",
              margin: 0,
            }}
          >
            Sudah punya akun?{" "}
            <a
              href="/login"
              style={{
                color: "#F0A500",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Masuk di sini →
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
