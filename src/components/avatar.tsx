"use client";

interface AvatarProps {
  name: string;
  size?: number;
  className?: string;
}

const COLORS = [
  "bg-green-600",
  "bg-blue-600",
  "bg-purple-600",
  "bg-pink-600",
  "bg-orange-500",
  "bg-teal-600",
  "bg-indigo-600",
  "bg-rose-600",
];

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  const initials = parts.slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "");
  return initials.join("") || "?";
}

function getColor(name: string) {
  const hash = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return COLORS[hash % COLORS.length];
}

export default function Avatar({ name, size = 40, className = "" }: AvatarProps) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full font-semibold text-white ${getColor(
        name
      )} ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {getInitials(name)}
    </div>
  );
}