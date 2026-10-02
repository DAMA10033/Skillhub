import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, X, AlertCircle, CheckCircle, AlertTriangle, Info } from "lucide-react";

// ─── Button ────────────────────────────────────────────────────────────────────
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: React.ReactNode;
}

export function Button({ variant = "primary", size = "md", loading, children, className = "", disabled, ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-[#3157D5] text-white hover:bg-[#2648bb] active:bg-[#1e3da0]",
    secondary: "bg-[#18B6A4] text-white hover:bg-[#13a090] active:bg-[#0f8a7c]",
    accent: "bg-[#7C5CFC] text-white hover:bg-[#6a4ae0] active:bg-[#5a3dc4]",
    ghost: "bg-transparent text-[#172033] hover:bg-[#F7F9FC] active:bg-[#E5E7EB]",
    danger: "bg-[#EF4444] text-white hover:bg-[#dc2626] active:bg-[#b91c1c]",
    outline: "bg-white border border-[#E5E7EB] text-[#172033] hover:bg-[#F7F9FC] active:bg-[#E5E7EB]",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-2.5 text-sm",
  };
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} disabled={disabled || loading} {...props}>
      {loading && (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      )}
      {children}
    </button>
  );
}

// ─── Input ─────────────────────────────────────────────────────────────────────
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Input({ label, error, leftIcon, rightIcon, className = "", ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs font-medium text-[#172033]">{label}</label>}
      <div className="relative">
        {leftIcon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#667085]">{leftIcon}</span>}
        <input
          className={`w-full h-10 px-3 py-2 text-sm bg-white border rounded-lg outline-none transition-all placeholder:text-[#667085] text-[#172033]
            ${leftIcon ? "pl-10" : ""} ${rightIcon ? "pr-10" : ""}
            ${error ? "border-[#EF4444] focus:ring-1 focus:ring-[#EF4444]" : "border-[#E5E7EB] focus:border-[#3157D5] focus:ring-1 focus:ring-[#3157D5]"}
            ${className}`}
          {...props}
        />
        {rightIcon && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#667085]">{rightIcon}</span>}
      </div>
      {error && <p className="text-xs text-[#EF4444]">{error}</p>}
    </div>
  );
}

// ─── Textarea ──────────────────────────────────────────────────────────────────
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className = "", ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs font-medium text-[#172033]">{label}</label>}
      <textarea
        className={`w-full px-3 py-2 text-sm bg-white border rounded-lg outline-none transition-all placeholder:text-[#667085] text-[#172033] resize-none
          ${error ? "border-[#EF4444] focus:ring-1 focus:ring-[#EF4444]" : "border-[#E5E7EB] focus:border-[#3157D5] focus:ring-1 focus:ring-[#3157D5]"}
          ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-[#EF4444]">{error}</p>}
    </div>
  );
}

// ─── Select ────────────────────────────────────────────────────────────────────
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, error, options, className = "", ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs font-medium text-[#172033]">{label}</label>}
      <select
        className={`w-full h-10 px-3 py-2 text-sm bg-white border rounded-lg outline-none transition-all text-[#172033] cursor-pointer
          ${error ? "border-[#EF4444] focus:ring-1 focus:ring-[#EF4444]" : "border-[#E5E7EB] focus:border-[#3157D5] focus:ring-1 focus:ring-[#3157D5]"}
          ${className}`}
        {...props}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {error && <p className="text-xs text-[#EF4444]">{error}</p>}
    </div>
  );
}

// ─── Badge ─────────────────────────────────────────────────────────────────────
interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "accent" | "success" | "warning" | "danger" | "muted";
  size?: "sm" | "md";
}

export function Badge({ children, variant = "muted", size = "md" }: BadgeProps) {
  const variants = {
    primary: "bg-[#EEF1FB] text-[#3157D5]",
    secondary: "bg-[#E6F8F7] text-[#18B6A4]",
    accent: "bg-[#F0EDFF] text-[#7C5CFC]",
    success: "bg-[#ECFDF5] text-[#10B981]",
    warning: "bg-[#FFFBEB] text-[#D97706]",
    danger: "bg-[#FEF2F2] text-[#EF4444]",
    muted: "bg-[#F3F4F6] text-[#667085]",
  };
  const sizes = { sm: "px-2 py-0.5 text-xs", md: "px-2.5 py-1 text-xs" };
  return <span className={`inline-flex items-center font-medium rounded-full ${variants[variant]} ${sizes[size]}`}>{children}</span>;
}

// ─── Card ──────────────────────────────────────────────────────────────────────
interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export function Card({ children, className = "", onClick, hoverable }: CardProps) {
  return (
    <div
      className={`bg-white rounded-xl border border-[#E5E7EB] shadow-sm ${hoverable ? "hover:shadow-md hover:-translate-y-0.5 cursor-pointer" : ""} transition-all duration-200 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

// ─── StatCard ──────────────────────────────────────────────────────────────────
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: "primary" | "secondary" | "accent" | "success" | "warning";
  change?: string;
  changePositive?: boolean;
}

export function StatCard({ title, value, icon, color, change, changePositive }: StatCardProps) {
  const colors = {
    primary: { bg: "bg-[#EEF1FB]", icon: "text-[#3157D5]", dot: "bg-[#3157D5]" },
    secondary: { bg: "bg-[#E6F8F7]", icon: "text-[#18B6A4]", dot: "bg-[#18B6A4]" },
    accent: { bg: "bg-[#F0EDFF]", icon: "text-[#7C5CFC]", dot: "bg-[#7C5CFC]" },
    success: { bg: "bg-[#ECFDF5]", icon: "text-[#10B981]", dot: "bg-[#10B981]" },
    warning: { bg: "bg-[#FFFBEB]", icon: "text-[#D97706]", dot: "bg-[#D97706]" },
  };
  const c = colors[color];
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-[#667085] uppercase tracking-wide">{title}</p>
          <p className="text-2xl font-700 text-[#172033] mt-1.5 font-bold">{value}</p>
          {change && (
            <p className={`text-xs mt-1 ${changePositive ? "text-[#10B981]" : "text-[#EF4444]"}`}>
              {changePositive ? "▲" : "▼"} {change}
            </p>
          )}
        </div>
        <div className={`p-2.5 rounded-lg ${c.bg} ${c.icon}`}>{icon}</div>
      </div>
    </Card>
  );
}

// ─── ProgressBar ───────────────────────────────────────────────────────────────
interface ProgressBarProps {
  value: number;
  color?: "primary" | "secondary" | "accent" | "success";
  size?: "sm" | "md";
  showLabel?: boolean;
}

export function ProgressBar({ value, color = "primary", size = "md", showLabel }: ProgressBarProps) {
  const colors = {
    primary: "bg-[#3157D5]",
    secondary: "bg-[#18B6A4]",
    accent: "bg-[#7C5CFC]",
    success: "bg-[#10B981]",
  };
  const heights = { sm: "h-1.5", md: "h-2" };
  return (
    <div className="flex items-center gap-2">
      <div className={`flex-1 bg-[#F3F4F6] rounded-full overflow-hidden ${heights[size]}`}>
        <div
          className={`h-full rounded-full transition-all duration-700 ${colors[color]}`}
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
      {showLabel && <span className="text-xs font-medium text-[#667085] w-8 text-right">{value}%</span>}
    </div>
  );
}

// ─── Avatar ────────────────────────────────────────────────────────────────────
interface AvatarProps {
  src?: string;
  name: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export function Avatar({ src, name, size = "md" }: AvatarProps) {
  const sizes = { xs: "w-6 h-6 text-xs", sm: "w-8 h-8 text-xs", md: "w-10 h-10 text-sm", lg: "w-12 h-12 text-base", xl: "w-16 h-16 text-xl" };
  const initials = name.split(" ").map((n) => n[0]).slice(0, 2).join("");
  return src ? (
    <img src={src} alt={name} className={`${sizes[size]} rounded-full object-cover ring-2 ring-white`} />
  ) : (
    <div className={`${sizes[size]} rounded-full bg-[#3157D5] text-white flex items-center justify-center font-semibold ring-2 ring-white`}>
      {initials}
    </div>
  );
}

// ─── Modal ─────────────────────────────────────────────────────────────────────
interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: string;
}

export function Modal({ open, onClose, title, children, width = "max-w-md" }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative bg-white rounded-2xl shadow-2xl w-full ${width} animate-in fade-in zoom-in-95 duration-200`}>
        <div className="flex items-center justify-between p-5 border-b border-[#E5E7EB]">
          <h3 className="text-base font-semibold text-[#172033]">{title}</h3>
          <button onClick={onClose} className="p-1.5 hover:bg-[#F7F9FC] rounded-lg transition-colors text-[#667085] hover:text-[#172033]">
            <X size={16} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

// ─── Tabs ──────────────────────────────────────────────────────────────────────
interface TabsProps {
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
}

export function Tabs({ tabs, active, onChange }: TabsProps) {
  return (
    <div className="flex gap-1 bg-[#F7F9FC] p-1 rounded-lg border border-[#E5E7EB]">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-150 ${
            active === tab ? "bg-white text-[#3157D5] shadow-sm" : "text-[#667085] hover:text-[#172033]"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

// ─── Accordion ─────────────────────────────────────────────────────────────────
interface AccordionItem {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className="border border-[#E5E7EB] rounded-xl overflow-hidden">
          <button
            className="w-full flex items-center justify-between p-4 text-left hover:bg-[#F7F9FC] transition-colors"
            onClick={() => setOpen(open === item.id ? null : item.id)}
          >
            <div>
              <p className="text-sm font-semibold text-[#172033]">{item.title}</p>
              {item.subtitle && <p className="text-xs text-[#667085] mt-0.5">{item.subtitle}</p>}
            </div>
            {open === item.id ? <ChevronUp size={16} className="text-[#667085]" /> : <ChevronDown size={16} className="text-[#667085]" />}
          </button>
          {open === item.id && <div className="border-t border-[#E5E7EB] bg-[#F7F9FC]">{item.children}</div>}
        </div>
      ))}
    </div>
  );
}

// ─── Alert ─────────────────────────────────────────────────────────────────────
interface AlertProps {
  type: "success" | "error" | "warning" | "info";
  message: string;
  onClose?: () => void;
}

export function Alert({ type, message, onClose }: AlertProps) {
  const configs = {
    success: { bg: "bg-[#ECFDF5] border-[#10B981]", text: "text-[#065F46]", icon: <CheckCircle size={16} className="text-[#10B981]" /> },
    error: { bg: "bg-[#FEF2F2] border-[#EF4444]", text: "text-[#991B1B]", icon: <AlertCircle size={16} className="text-[#EF4444]" /> },
    warning: { bg: "bg-[#FFFBEB] border-[#F59E0B]", text: "text-[#92400E]", icon: <AlertTriangle size={16} className="text-[#F59E0B]" /> },
    info: { bg: "bg-[#EEF1FB] border-[#3157D5]", text: "text-[#1E3A8A]", icon: <Info size={16} className="text-[#3157D5]" /> },
  };
  const c = configs[type];
  return (
    <div className={`flex items-start gap-3 p-4 rounded-xl border ${c.bg} ${c.text}`}>
      {c.icon}
      <p className="text-sm flex-1">{message}</p>
      {onClose && (
        <button onClick={onClose} className="text-current opacity-60 hover:opacity-100">
          <X size={14} />
        </button>
      )}
    </div>
  );
}

// ─── EmptyState ────────────────────────────────────────────────────────────────
interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="p-4 bg-[#F7F9FC] rounded-full text-[#667085] mb-4">{icon}</div>
      <h3 className="text-base font-semibold text-[#172033] mb-1">{title}</h3>
      <p className="text-sm text-[#667085] max-w-xs">{description}</p>
      {action && (
        <Button className="mt-5" onClick={action.onClick}>{action.label}</Button>
      )}
    </div>
  );
}

// ─── SearchBar ─────────────────────────────────────────────────────────────────
interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  size?: "sm" | "md" | "lg";
}

export function SearchBar({ placeholder = "Buscar...", value, onChange, size = "md" }: SearchBarProps) {
  const sizes = { sm: "h-8 text-xs", md: "h-10 text-sm", lg: "h-12 text-base" };
  return (
    <div className="relative">
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#667085]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
      </svg>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full pl-10 pr-4 bg-white border border-[#E5E7EB] rounded-lg outline-none focus:border-[#3157D5] focus:ring-1 focus:ring-[#3157D5] placeholder:text-[#667085] text-[#172033] transition-all ${sizes[size]}`}
      />
    </div>
  );
}

// ─── Table ─────────────────────────────────────────────────────────────────────
interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  width?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyField: string;
}

export function Table<T extends Record<string, unknown>>({ columns, data, keyField }: TableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#E5E7EB]">
            {columns.map((col) => (
              <th key={col.key} className={`px-4 py-3 text-left text-xs font-semibold text-[#667085] uppercase tracking-wide ${col.width ?? ""}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#F3F4F6]">
          {data.map((row) => (
            <tr key={String(row[keyField])} className="hover:bg-[#F7F9FC] transition-colors">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3">
                  {col.render ? col.render(row) : String(row[col.key] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Notification Dropdown ─────────────────────────────────────────────────────
interface Notification {
  id: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationDropdownProps {
  notifications: Notification[];
}

export function NotificationDropdown({ notifications }: NotificationDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const unread = notifications.filter((n) => !n.read).length;
  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-lg hover:bg-[#F7F9FC] transition-colors text-[#667085] hover:text-[#172033]"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        {unread > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-[#EF4444] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
            {unread}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl border border-[#E5E7EB] shadow-xl z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E7EB]">
            <p className="text-sm font-semibold text-[#172033]">Notificaciones</p>
            {unread > 0 && <Badge variant="danger">{unread} nuevas</Badge>}
          </div>
          <div className="max-h-72 overflow-y-auto divide-y divide-[#F3F4F6]">
            {notifications.map((n) => (
              <div key={n.id} className={`px-4 py-3 hover:bg-[#F7F9FC] transition-colors ${!n.read ? "border-l-2 border-[#3157D5]" : ""}`}>
                <p className={`text-xs ${!n.read ? "text-[#172033] font-medium" : "text-[#667085]"}`}>{n.message}</p>
                <p className="text-[10px] text-[#667085] mt-1">{n.time}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── SkillHub Logo ─────────────────────────────────────────────────────────────
export function SkillHubLogo({ collapsed }: { collapsed?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-lg bg-[#3157D5] flex items-center justify-center flex-shrink-0">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white" fillOpacity="0.9" />
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {!collapsed && (
        <span className="text-base font-bold text-white tracking-tight">SkillHub</span>
      )}
    </div>
  );
}

// ─── Skeleton ──────────────────────────────────────────────────────────────────
export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`bg-[#E5E7EB] rounded-lg animate-pulse ${className}`} />;
}

export function CourseCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="h-44 rounded-none rounded-t-xl" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </Card>
  );
}

// ─── Pagination ────────────────────────────────────────────────────────────────
interface PaginationProps {
  page: number;
  total: number;
  perPage: number;
  onChange: (p: number) => void;
}

export function Pagination({ page, total, perPage, onChange }: PaginationProps) {
  const pages = Math.ceil(total / perPage);
  if (pages <= 1) return null;
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-1.5 text-xs rounded-lg border border-[#E5E7EB] hover:bg-[#F7F9FC] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Anterior
      </button>
      {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`w-8 h-8 text-xs rounded-lg transition-colors ${p === page ? "bg-[#3157D5] text-white" : "border border-[#E5E7EB] hover:bg-[#F7F9FC] text-[#172033]"}`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onChange(page + 1)}
        disabled={page === pages}
        className="px-3 py-1.5 text-xs rounded-lg border border-[#E5E7EB] hover:bg-[#F7F9FC] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Siguiente
      </button>
    </div>
  );
}
