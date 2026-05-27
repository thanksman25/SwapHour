import React from "react";

interface BadgeProps {
  status: "pending" | "active" | "completed" | "rejected" | "expired";
  label?: string;
}

const statusConfig = {
  pending: {
    label: "Menunggu",
    className: "ui-badge--pending",
  },
  active: {
    label: "Aktif",
    className: "ui-badge--active",
  },
  completed: {
    label: "Selesai",
    className: "ui-badge--completed",
  },
  rejected: {
    label: "Ditolak",
    className: "ui-badge--rejected",
  },
  expired: {
    label: "Kadaluarsa",
    className: "ui-badge--expired",
  },
};

const Badge = ({ status, label }: BadgeProps) => {
  const config = statusConfig[status];

  return (
    <span className={`ui-badge ${config.className}`}>
      <span className="ui-badge__dot" />
      {label || config.label}
    </span>
  );
};

export default Badge;
