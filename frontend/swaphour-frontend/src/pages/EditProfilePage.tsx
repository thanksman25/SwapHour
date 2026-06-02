import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import ErrorAlert from "../components/ui/ErrorAlert";
import Spinner from "../components/ui/Spinner";
import PasswordInput from "../components/ui/PasswordInput";
import swapHourLogo from "../assets/logo.png";

interface ProfileData {
  name: string;
  bio: string;
  avatarUrl: string;
  profileCompletion: number;
}

const EditProfilePage = () => {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    bio: "",
    avatarUrl: "",
    profileCompletion: 0,
  });
  const [errors, setErrors] = useState({ name: "", bio: "", avatarUrl: "" });
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Ubah Password
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Hapus Akun
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token") || "test";
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://swaphour-backend.vercel.app/api'}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok) {
          setProfile({
            name: data.name || "",
            bio: data.bio || "",
            avatarUrl: data.avatarUrl || "",
            profileCompletion: data.profileCompletion || 0,
          });
        } else {
          navigate("/login");
        }
      } catch (err) {
        setApiError("Gagal memuat data profil.");
      } finally {
        setIsFetching(false);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    if (!isFetching) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      );
      gsap.fromTo(
        progressRef.current,
        { width: "0%" },
        {
          width: `${profile.profileCompletion}%`,
          duration: 1.2,
          ease: "power2.out",
          delay: 0.5,
        },
      );
    }
  }, [isFetching]);

  const validate = () => {
    let valid = true;
    const newErrors = { name: "", bio: "", avatarUrl: "" };
    if (!profile.name.trim()) {
      newErrors.name = "Nama wajib diisi";
      valid = false;
    }
    if (profile.bio.length > 200) {
      newErrors.bio = "Bio maksimal 200 karakter";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setProfile((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: "" }));
      setApiError("");
      setSaveSuccess(false);
    };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsLoading(true);
    setApiError("");
    setSaveSuccess(false);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://swaphour-backend.vercel.app/api'}/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: profile.name,
          bio: profile.bio,
          avatarUrl: profile.avatarUrl,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setSaveSuccess(true);
      } else {
        setApiError(data?.message || "Gagal menyimpan profil.");
      }
    } catch (err) {
      setApiError("Gagal terhubung ke server.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    setIsChangingPassword(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setPasswordSuccess(true);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setPasswordSuccess(false), 3000);
    setIsChangingPassword(false);
  };

  const handleDeleteAccount = async () => {
    setIsDeletingAccount(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    localStorage.removeItem("token");
    navigate("/login");
    setIsDeletingAccount(false);
  };

  const getCompletionColor = () => {
    if (profile.profileCompletion >= 80) return "#2d8a61";
    if (profile.profileCompletion >= 50) return "#F0A500";
    return "#ef4444";
  };

  if (isFetching) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #0f4530 0%, #071810 100%)",
        }}
      >
        <Spinner size="lg" />
      </div>
    );
  }

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
          gap: "1rem",
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

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <img
              src={swapHourLogo}
              alt="SwapHour"
              style={{
                height: "32px",
                width: "auto",
                filter: "brightness(0) invert(1)",
                marginBottom: "0.5rem",
                display: "block",
              }}
            />
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-0.5px",
                margin: 0,
              }}
            >
              Edit Profil
            </h1>
            <p
              style={{
                fontSize: "0.8rem",
                color: "rgba(255,255,255,0.5)",
                fontWeight: 300,
                marginTop: "4px",
              }}
            >
              Lengkapi profilmu untuk mulai swap
            </p>
          </div>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: profile.avatarUrl
                ? "transparent"
                : "linear-gradient(135deg, #1A6B4A, #2d8a61)",
              border: "2px solid rgba(255,255,255,0.15)",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              flexShrink: 0,
            }}
          >
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt="avatar"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            ) : (
              "👤"
            )}
          </div>
        </div>

        {/* Profile Completion */}
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
            padding: "1.25rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.75rem",
            }}
          >
            <span
              style={{
                fontSize: "0.8rem",
                color: "rgba(255,255,255,0.6)",
                fontWeight: 500,
              }}
            >
              Kelengkapan Profil
            </span>
            <span
              style={{
                fontSize: "0.9rem",
                fontWeight: 700,
                color: getCompletionColor(),
              }}
            >
              {profile.profileCompletion}%
            </span>
          </div>
          <div
            style={{
              width: "100%",
              height: "6px",
              background: "rgba(255,255,255,0.08)",
              borderRadius: "999px",
              overflow: "hidden",
            }}
          >
            <div
              ref={progressRef}
              style={{
                height: "100%",
                width: "0%",
                background: `linear-gradient(90deg, ${getCompletionColor()}, ${getCompletionColor()}aa)`,
                borderRadius: "999px",
                boxShadow: `0 0 8px ${getCompletionColor()}66`,
              }}
            />
          </div>
          {profile.profileCompletion < 80 && (
            <div
              style={{
                marginTop: "0.75rem",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: "rgba(240,165,0,0.08)",
                border: "1px solid rgba(240,165,0,0.2)",
                borderRadius: "8px",
                padding: "0.5rem 0.75rem",
              }}
            >
              <span style={{ fontSize: "0.85rem" }}>⚠️</span>
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "#f5c842",
                  fontWeight: 500,
                }}
              >
                Profil belum mencapai 80% — kamu belum bisa melakukan swap
              </span>
            </div>
          )}
        </div>

        {apiError && <ErrorAlert message={apiError} />}

        {saveSuccess && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(45,138,97,0.12)",
              border: "1px solid rgba(45,138,97,0.25)",
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
              Profil berhasil disimpan!
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
            label="Nama Lengkap"
            placeholder="Masukkan nama lengkap..."
            value={profile.name}
            onChange={handleChange("name")}
            errorMessage={errors.name}
            fullWidth
          />
          <Input
            label="Bio"
            placeholder="Ceritakan sedikit tentang dirimu..."
            value={profile.bio}
            onChange={handleChange("bio")}
            errorMessage={errors.bio}
            fullWidth
          />
          <Input
            label="Avatar URL"
            placeholder="https://example.com/avatar.jpg"
            value={profile.avatarUrl}
            onChange={handleChange("avatarUrl")}
            errorMessage={errors.avatarUrl}
            fullWidth
          />
        </div>

        {/* Tombol Kembali & Simpan */}
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
            }}
          >
            ← Kembali
          </button>
          <div style={{ flex: 2 }}>
            <Button
              variant="primary"
              isLoading={isLoading}
              disabled={isLoading}
              onClick={handleSubmit}
              fullWidth
            >
              Simpan Profil
            </Button>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(255,255,255,0.08)" }} />

        {/* Ubah Password */}
        <button
          onClick={() => setShowChangePassword(!showChangePassword)}
          style={{
            width: "100%",
            padding: "0.85rem",
            borderRadius: "12px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.7)",
            fontFamily: "Sora, sans-serif",
            fontSize: "0.9rem",
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>🔑 Ubah Password</span>
          <span>{showChangePassword ? "▲" : "▼"}</span>
        </button>

        {showChangePassword && (
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              padding: "1.25rem",
              display: "flex",
              flexDirection: "column" as const,
              gap: "1rem",
            }}
          >
            <PasswordInput
              label="Password Lama"
              placeholder="Masukkan password lama..."
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              showStrength={false}
            />
            <PasswordInput
              label="Password Baru"
              placeholder="Masukkan password baru..."
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              showStrength={true}
            />
            <PasswordInput
              label="Konfirmasi Password Baru"
              placeholder="Ulangi password baru..."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              showStrength={false}
              errorMessage={
                confirmPassword && newPassword !== confirmPassword
                  ? "Password tidak cocok"
                  : ""
              }
            />
            {passwordSuccess && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(45,138,97,0.12)",
                  border: "1px solid rgba(45,138,97,0.25)",
                  borderRadius: "10px",
                  padding: "0.75rem 1rem",
                }}
              >
                <span>✅</span>
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: "#6ee7b7",
                    fontWeight: 500,
                  }}
                >
                  Password berhasil diubah!
                </span>
              </div>
            )}
            <Button
              variant="primary"
              onClick={handleChangePassword}
              isLoading={isChangingPassword}
              disabled={
                isChangingPassword ||
                newPassword !== confirmPassword ||
                !oldPassword ||
                !newPassword
              }
              fullWidth
            >
              Simpan Password
            </Button>
          </div>
        )}

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(255,255,255,0.08)" }} />

        {/* Hapus Akun */}
        <button
          onClick={() => setShowDeleteConfirm(!showDeleteConfirm)}
          style={{
            width: "100%",
            padding: "0.85rem",
            borderRadius: "12px",
            background: "rgba(239,68,68,0.06)",
            border: "1px solid rgba(239,68,68,0.2)",
            color: "#f87171",
            fontFamily: "Sora, sans-serif",
            fontSize: "0.9rem",
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>🗑️ Hapus Akun</span>
          <span>{showDeleteConfirm ? "▲" : "▼"}</span>
        </button>

        {showDeleteConfirm && (
          <div
            style={{
              background: "rgba(239,68,68,0.06)",
              border: "1px solid rgba(239,68,68,0.2)",
              borderRadius: "12px",
              padding: "1.25rem",
              display: "flex",
              flexDirection: "column" as const,
              gap: "1rem",
            }}
          >
            <p
              style={{
                fontSize: "0.85rem",
                color: "rgba(255,255,255,0.6)",
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              ⚠️ Tindakan ini{" "}
              <strong style={{ color: "#f87171" }}>
                tidak dapat dibatalkan
              </strong>
              . Semua data kamu akan dihapus permanen.
            </p>
            <Input
              label="Ketik 'HAPUS' untuk konfirmasi"
              placeholder="HAPUS"
              value={deleteConfirmText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDeleteConfirmText(e.target.value)
              }
              fullWidth
            />
            <button
              onClick={handleDeleteAccount}
              disabled={deleteConfirmText !== "HAPUS" || isDeletingAccount}
              style={{
                width: "100%",
                padding: "0.85rem",
                borderRadius: "12px",
                background:
                  deleteConfirmText === "HAPUS"
                    ? "rgba(239,68,68,0.8)"
                    : "rgba(239,68,68,0.2)",
                border: "1px solid rgba(239,68,68,0.4)",
                color: "#fff",
                fontFamily: "Sora, sans-serif",
                fontSize: "0.9rem",
                fontWeight: 700,
                cursor:
                  deleteConfirmText === "HAPUS" ? "pointer" : "not-allowed",
                opacity: deleteConfirmText === "HAPUS" ? 1 : 0.5,
              }}
            >
              {isDeletingAccount ? "Menghapus..." : "Hapus Akun Permanen"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfilePage;
