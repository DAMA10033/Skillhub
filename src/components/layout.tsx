import React, { useState } from "react";
import {
  LayoutDashboard, BookOpen, BookMarked, ClipboardList, TrendingUp, User,
  PlusCircle, Users, BarChart3, Settings, Tag, FileText, GraduationCap,
  Menu, X, ChevronRight, LogOut, Bell
} from "lucide-react";
import type { User as UserType, Page, Role } from "../types";
import { SkillHubLogo, Avatar, NotificationDropdown } from "./ui";

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  page: Page;
}

const studentNav: SidebarItem[] = [
  { icon: <LayoutDashboard size={18} />, label: "Dashboard", page: "student-dashboard" },
  { icon: <BookOpen size={18} />, label: "Explorar cursos", page: "student-explore" },
  { icon: <BookMarked size={18} />, label: "Mis cursos", page: "student-my-courses" },
  { icon: <ClipboardList size={18} />, label: "Actividades", page: "student-activities" },
  { icon: <TrendingUp size={18} />, label: "Progreso", page: "student-progress" },
  { icon: <User size={18} />, label: "Perfil", page: "student-profile" },
];

const teacherNav: SidebarItem[] = [
  { icon: <LayoutDashboard size={18} />, label: "Dashboard", page: "teacher-dashboard" },
  { icon: <BookMarked size={18} />, label: "Mis cursos", page: "teacher-my-courses" },
  { icon: <PlusCircle size={18} />, label: "Crear curso", page: "teacher-create-course" },
  { icon: <ClipboardList size={18} />, label: "Actividades", page: "teacher-activities" },
  { icon: <Users size={18} />, label: "Estudiantes", page: "teacher-students" },
  { icon: <User size={18} />, label: "Perfil", page: "teacher-profile" },
];

const adminNav: SidebarItem[] = [
  { icon: <LayoutDashboard size={18} />, label: "Dashboard", page: "admin-dashboard" },
  { icon: <Users size={18} />, label: "Usuarios", page: "admin-users" },
  { icon: <BookOpen size={18} />, label: "Cursos", page: "admin-courses" },
  { icon: <Tag size={18} />, label: "Categorías", page: "admin-categories" },
  { icon: <BarChart3 size={18} />, label: "Reportes", page: "admin-reports" },
  { icon: <Settings size={18} />, label: "Configuración", page: "admin-settings" },
];

const navByRole: Record<Role, SidebarItem[]> = {
  student: studentNav,
  teacher: teacherNav,
  admin: adminNav,
};

const roleLabels: Record<Role, string> = {
  student: "Estudiante",
  teacher: "Profesor",
  admin: "Administrador",
};

const studentNotifs = [
  { id: "n1", message: "Tu actividad de Python vence mañana.", time: "Hace 1 hora", read: false },
  { id: "n2", message: "Has completado el 80% del curso de Python.", time: "Hace 3 horas", read: false },
  { id: "n3", message: "Nuevo contenido disponible en Desarrollo Web.", time: "Hace 1 día", read: true },
];
const teacherNotifs = [
  { id: "n1", message: "Nuevo estudiante inscrito en Introducción a Python.", time: "Hace 30 min", read: false },
  { id: "n2", message: "Tu curso ha alcanzado 100 estudiantes.", time: "Hace 2 horas", read: false },
  { id: "n3", message: "María González entregó su actividad.", time: "Hace 1 día", read: true },
];
const adminNotifs = [
  { id: "n1", message: "Nuevo profesor registrado: Sofía Herrera.", time: "Hace 1 hora", read: false },
  { id: "n2", message: "El curso Intro a Python recibió 50 nuevas inscripciones.", time: "Hace 2 horas", read: false },
  { id: "n3", message: "Reporte mensual disponible para descarga.", time: "Hace 1 día", read: true },
];

const notifsByRole: Record<Role, typeof studentNotifs> = {
  student: studentNotifs,
  teacher: teacherNotifs,
  admin: adminNotifs,
};

interface AppLayoutProps {
  user: UserType;
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export function AppLayout({ user, currentPage, onNavigate, onLogout, children }: AppLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const nav = navByRole[user.role];
  const notifs = notifsByRole[user.role];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
        <SkillHubLogo collapsed={collapsed} />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex p-1.5 rounded-md hover:bg-white/10 text-white/60 hover:text-white transition-colors"
        >
          {collapsed ? <ChevronRight size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {nav.map((item) => {
          const active = currentPage === item.page;
          return (
            <button
              key={item.page}
              onClick={() => { onNavigate(item.page); setMobileOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
                ${active ? "bg-white/15 text-white" : "text-white/60 hover:bg-white/10 hover:text-white"}`}
            >
              <span className={active ? "text-white" : ""}>{item.icon}</span>
              {!collapsed && <span className="truncate">{item.label}</span>}
              {!collapsed && active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#18B6A4]" />}
            </button>
          );
        })}
      </nav>

      {/* User */}
      <div className="px-3 py-4 border-t border-white/10">
        <div className={`flex items-center gap-3 px-3 py-2 rounded-lg ${collapsed ? "justify-center" : ""}`}>
          <Avatar src={user.avatar} name={user.name} size="sm" />
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{user.name}</p>
              <p className="text-[10px] text-white/50">{roleLabels[user.role]}</p>
            </div>
          )}
          {!collapsed && (
            <button onClick={onLogout} className="p-1.5 hover:bg-white/10 rounded-md text-white/50 hover:text-white transition-colors">
              <LogOut size={14} />
            </button>
          )}
        </div>
        {collapsed && (
          <button onClick={onLogout} className="w-full flex justify-center mt-2 p-2 hover:bg-white/10 rounded-lg text-white/50 hover:text-white transition-colors">
            <LogOut size={14} />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-full bg-[#F7F9FC]">
      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex flex-col flex-shrink-0 bg-[#172033] transition-all duration-300 ${collapsed ? "w-16" : "w-56"}`}
        style={{ minHeight: "100vh" }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-[#172033] flex flex-col">
            <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
              <SkillHubLogo />
              <button onClick={() => setMobileOpen(false)} className="p-1.5 text-white/60 hover:text-white">
                <X size={18} />
              </button>
            </div>
            <nav className="flex-1 px-3 py-4 space-y-1">
              {nav.map((item) => {
                const active = currentPage === item.page;
                return (
                  <button
                    key={item.page}
                    onClick={() => { onNavigate(item.page); setMobileOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${active ? "bg-white/15 text-white" : "text-white/60 hover:bg-white/10 hover:text-white"}`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
            <div className="px-3 py-4 border-t border-white/10">
              <div className="flex items-center gap-3 px-3 py-2">
                <Avatar src={user.avatar} name={user.name} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white truncate">{user.name}</p>
                  <p className="text-[10px] text-white/50">{roleLabels[user.role]}</p>
                </div>
                <button onClick={onLogout} className="p-1.5 text-white/50 hover:text-white">
                  <LogOut size={14} />
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white border-b border-[#E5E7EB] px-4 lg:px-6 h-14 flex items-center gap-4">
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-[#F7F9FC] text-[#667085]"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={20} />
          </button>
          <div className="flex-1">
            <div className="relative max-w-xs">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#667085]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full pl-9 pr-4 h-8 bg-[#F7F9FC] border border-[#E5E7EB] rounded-lg text-xs outline-none focus:border-[#3157D5] placeholder:text-[#667085] text-[#172033]"
              />
            </div>
          </div>
          <NotificationDropdown notifications={notifs} />
          <div className="flex items-center gap-2.5">
            <Avatar src={user.avatar} name={user.name} size="sm" />
            <div className="hidden sm:block">
              <p className="text-xs font-semibold text-[#172033] leading-tight">{user.name}</p>
              <p className="text-[10px] text-[#667085]">{roleLabels[user.role]}</p>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

// ─── Page Shell ────────────────────────────────────────────────────────────────
interface PageShellProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export function PageShell({ title, subtitle, actions, children }: PageShellProps) {
  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-[#172033]">{title}</h1>
          {subtitle && <p className="text-sm text-[#667085] mt-0.5">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
      </div>
      {children}
    </div>
  );
}
