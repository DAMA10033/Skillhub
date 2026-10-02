import React, { useState } from "react";
import {
  Users, BookOpen, TrendingUp, Activity, PlusCircle, Edit2, Trash2,
  Eye, Tag, BarChart3, Download, CheckCircle, XCircle, ToggleLeft,
  Settings, Bell, Shield, Globe, ChevronLeft
} from "lucide-react";
import type { User as UserType, Page } from "../types";
import {
  Card, StatCard, Badge, Button, Avatar, Modal, Alert, Input,
  Select, SearchBar, Tabs, ProgressBar
} from "../components/ui";
import { PageShell } from "../components/layout";
import {
  ADMIN_USERS, CATEGORIES, COURSES, GROWTH_DATA, ENROLLMENT_DATA,
  COURSES_BY_CATEGORY, USER_DISTRIBUTION, POPULAR_COURSES
} from "../data";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend, AreaChart, Area
} from "recharts";

interface AdminProps {
  user: UserType;
  onNavigate: (page: Page) => void;
}

// ─── Admin Dashboard ───────────────────────────────────────────────────────────
export function AdminDashboard({ onNavigate }: AdminProps) {
  return (
    <PageShell title="Panel de administración" subtitle="Resumen general de SkillHub">
      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {[
          { title: "Usuarios totales", value: "1,248", icon: <Users size={18} />, color: "primary" as const },
          { title: "Estudiantes", value: "1,050", icon: <Users size={18} />, color: "secondary" as const },
          { title: "Profesores", value: "180", icon: <Users size={18} />, color: "accent" as const },
          { title: "Cursos", value: "86", icon: <BookOpen size={18} />, color: "success" as const },
          { title: "Inscripciones", value: "4,835", icon: <TrendingUp size={18} />, color: "warning" as const },
          { title: "Actividades", value: "624", icon: <Activity size={18} />, color: "primary" as const },
        ].map((s) => (
          <StatCard key={s.title} {...s} />
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* User growth */}
        <Card className="lg:col-span-2 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[#172033]">Crecimiento de usuarios</h3>
            <Badge variant="success">+12.4% este mes</Badge>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={GROWTH_DATA}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3157D5" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3157D5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#667085" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#667085" }} axisLine={false} tickLine={false} domain={[800, 1300]} />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12, border: "1px solid #E5E7EB" }} />
              <Area type="monotone" dataKey="usuarios" stroke="#3157D5" strokeWidth={2.5} fill="url(#colorUsers)" dot={{ fill: "#3157D5", r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* User distribution donut */}
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-[#172033] mb-4">Distribución de usuarios</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={USER_DISTRIBUTION} cx="50%" cy="50%" innerRadius={45} outerRadius={65} paddingAngle={3} dataKey="value">
                {USER_DISTRIBUTION.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12, border: "1px solid #E5E7EB" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {USER_DISTRIBUTION.map((d) => (
              <div key={d.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                  <span className="text-xs text-[#667085]">{d.name}</span>
                </div>
                <span className="text-xs font-medium text-[#172033]">{d.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Charts row 2 */}
      <div className="grid lg:grid-cols-2 gap-5">
        {/* Courses by category */}
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-[#172033] mb-4">Cursos por categoría</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={COURSES_BY_CATEGORY} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="name" tick={{ fontSize: 9, fill: "#667085" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#667085" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12, border: "1px solid #E5E7EB" }} />
              <Bar dataKey="cursos" fill="#18B6A4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Monthly enrollments */}
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-[#172033] mb-4">Inscripciones mensuales</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={ENROLLMENT_DATA} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#667085" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#667085" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12, border: "1px solid #E5E7EB" }} />
              <Bar dataKey="inscripciones" fill="#7C5CFC" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Popular courses ranking */}
      <Card className="p-5">
        <h3 className="text-sm font-semibold text-[#172033] mb-4">Cursos más populares</h3>
        <div className="space-y-3">
          {POPULAR_COURSES.map((c, i) => (
            <div key={c.name} className="flex items-center gap-4">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${i === 0 ? "bg-[#F59E0B] text-white" : i === 1 ? "bg-[#667085] text-white" : i === 2 ? "bg-[#D97706] text-white" : "bg-[#F3F4F6] text-[#667085]"}`}>
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-[#172033] truncate">{c.name}</p>
                <p className="text-xs text-[#667085]">{c.students.toLocaleString()} estudiantes · {c.rating}★</p>
              </div>
              <div className="w-32">
                <ProgressBar value={Math.round((c.students / 2500) * 100)} color="primary" size="sm" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </PageShell>
  );
}

// ─── Admin Users ───────────────────────────────────────────────────────────────
export function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("Todos");
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [saved, setSaved] = useState(false);

  const filtered = ADMIN_USERS.filter((u) => {
    const matchSearch = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "Todos" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const roleVariants: Record<string, "primary" | "secondary" | "accent"> = {
    Estudiante: "primary",
    Profesor: "secondary",
    Administrador: "accent",
  };

  function handleSaveUser() {
    setShowModal(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <PageShell title="Usuarios" subtitle="Gestiona todos los usuarios de la plataforma."
      actions={<Button size="sm" onClick={() => setShowModal(true)}><PlusCircle size={14} /> Nuevo usuario</Button>}>
      {saved && <Alert type="success" message="Usuario creado correctamente." onClose={() => setSaved(false)} />}

      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-48"><SearchBar placeholder="Buscar usuarios..." value={search} onChange={setSearch} /></div>
        <div className="flex gap-1 bg-[#F7F9FC] p-1 rounded-lg border border-[#E5E7EB]">
          {["Todos", "Estudiantes", "Profesores", "Administradores"].map((r) => (
            <button key={r}
              onClick={() => setRoleFilter(r === "Estudiantes" ? "Estudiante" : r === "Profesores" ? "Profesor" : r === "Administradores" ? "Administrador" : "Todos")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${(roleFilter === "Todos" && r === "Todos") || (roleFilter === "Estudiante" && r === "Estudiantes") || (roleFilter === "Profesor" && r === "Profesores") || (roleFilter === "Administrador" && r === "Administradores") ? "bg-white text-[#3157D5] shadow-sm" : "text-[#667085] hover:text-[#172033]"}`}>
              {r}
            </button>
          ))}
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5E7EB]">
                {["Usuario", "Correo", "Rol", "Estado", "Registro", "Acciones"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#667085] uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3F4F6]">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-[#F7F9FC] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar src={u.avatar} name={u.name} size="sm" />
                      <span className="text-xs font-medium text-[#172033]">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-[#667085]">{u.email}</td>
                  <td className="px-4 py-3"><Badge variant={roleVariants[u.role] ?? "muted"}>{u.role}</Badge></td>
                  <td className="px-4 py-3">
                    <Badge variant={u.status === "active" ? "success" : "danger"}>{u.status === "active" ? "Activo" : "Inactivo"}</Badge>
                  </td>
                  <td className="px-4 py-3 text-xs text-[#667085]">{u.joinDate}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button className="p-1.5 hover:bg-[#F7F9FC] rounded text-[#667085]"><Eye size={12} /></button>
                      <button className="p-1.5 hover:bg-[#EEF1FB] rounded text-[#3157D5]"><Edit2 size={12} /></button>
                      <button className="p-1.5 hover:bg-[#F7F9FC] rounded text-[#667085]"><ToggleLeft size={12} /></button>
                      <button onClick={() => setDeleteModal(true)} className="p-1.5 hover:bg-[#FEF2F2] rounded text-[#EF4444]"><Trash2 size={12} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-t border-[#E5E7EB]">
          <p className="text-xs text-[#667085]">Mostrando {filtered.length} de {ADMIN_USERS.length} usuarios</p>
        </div>
      </Card>

      {/* New user modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Nuevo usuario">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Input label="Nombre" placeholder="María" />
            <Input label="Apellido" placeholder="González" />
          </div>
          <Input label="Correo electrónico" type="email" placeholder="correo@skillhub.com" />
          <Input label="Contraseña" type="password" placeholder="Mínimo 6 caracteres" />
          <Select label="Rol" options={[{ value: "student", label: "Estudiante" }, { value: "teacher", label: "Profesor" }, { value: "admin", label: "Administrador" }]} onChange={() => {}} value="student" />
          <div className="flex gap-2 pt-2">
            <Button className="flex-1" onClick={handleSaveUser}>Crear usuario</Button>
            <Button variant="outline" onClick={() => setShowModal(false)}>Cancelar</Button>
          </div>
        </div>
      </Modal>

      {/* Delete modal */}
      <Modal open={deleteModal} onClose={() => setDeleteModal(false)} title="¿Eliminar usuario?">
        <p className="text-sm text-[#667085] mb-5">Esta acción no se puede deshacer. El usuario perderá acceso a la plataforma.</p>
        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={() => setDeleteModal(false)}>Cancelar</Button>
          <Button variant="danger" onClick={() => setDeleteModal(false)}>Eliminar</Button>
        </div>
      </Modal>
    </PageShell>
  );
}

// ─── Admin Courses ─────────────────────────────────────────────────────────────
export function AdminCoursesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteModal, setDeleteModal] = useState(false);

  const filtered = COURSES.filter((c) => {
    const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const statusVariants: Record<string, "success" | "muted" | "danger"> = {
    published: "success",
    draft: "muted",
    inactive: "danger",
  };
  const statusLabels: Record<string, string> = {
    published: "Publicado",
    draft: "Borrador",
    inactive: "Inactivo",
  };

  return (
    <PageShell title="Cursos" subtitle="Gestiona todos los cursos de la plataforma.">
      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-48"><SearchBar placeholder="Buscar cursos..." value={search} onChange={setSearch} /></div>
        <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          options={[{ value: "all", label: "Todos los estados" }, { value: "published", label: "Publicados" }, { value: "draft", label: "Borradores" }, { value: "inactive", label: "Inactivos" }]}
          className="w-44"
        />
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5E7EB]">
                {["Curso", "Profesor", "Categoría", "Estudiantes", "Estado", "Actualización", "Acciones"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#667085] uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3F4F6]">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-[#F7F9FC] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={c.image} alt={c.title} className="w-10 h-7 rounded object-cover bg-[#F3F4F6]" />
                      <p className="text-xs font-medium text-[#172033] max-w-44 truncate">{c.title}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-[#667085]">{c.teacher}</td>
                  <td className="px-4 py-3"><Badge variant="muted" size="sm">{c.category}</Badge></td>
                  <td className="px-4 py-3 text-xs text-[#172033]">{c.students.toLocaleString()}</td>
                  <td className="px-4 py-3"><Badge variant={statusVariants[c.status]}>{statusLabels[c.status]}</Badge></td>
                  <td className="px-4 py-3 text-xs text-[#667085]">{c.updatedAt}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button className="p-1.5 hover:bg-[#F7F9FC] rounded text-[#667085]"><Eye size={12} /></button>
                      <button className="p-1.5 hover:bg-[#EEF1FB] rounded text-[#3157D5]"><Edit2 size={12} /></button>
                      <button onClick={() => setDeleteModal(true)} className="p-1.5 hover:bg-[#FEF2F2] rounded text-[#EF4444]"><Trash2 size={12} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-[#E5E7EB]">
          <p className="text-xs text-[#667085]">Mostrando {filtered.length} de {COURSES.length} cursos</p>
        </div>
      </Card>

      <Modal open={deleteModal} onClose={() => setDeleteModal(false)} title="¿Eliminar curso?">
        <p className="text-sm text-[#667085] mb-5">Esta acción eliminará el curso y todo su contenido de forma permanente.</p>
        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={() => setDeleteModal(false)}>Cancelar</Button>
          <Button variant="danger" onClick={() => setDeleteModal(false)}>Eliminar</Button>
        </div>
      </Modal>
    </PageShell>
  );
}

// ─── Admin Categories ──────────────────────────────────────────────────────────
export function AdminCategoriesPage() {
  const [categories, setCategories] = useState(CATEGORIES);
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [saved, setSaved] = useState(false);
  const [deleteModal, setDeleteModal] = useState<string | null>(null);

  function handleCreate() {
    if (!newName.trim()) return;
    setCategories([...categories, { id: `cat${Date.now()}`, name: newName, courses: 0, color: "#3157D5", active: true }]);
    setNewName("");
    setShowModal(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function toggleActive(id: string) {
    setCategories(categories.map((c) => c.id === id ? { ...c, active: !c.active } : c));
  }

  return (
    <PageShell title="Categorías" subtitle="Organiza los cursos por categorías."
      actions={<Button size="sm" onClick={() => setShowModal(true)}><PlusCircle size={14} /> Nueva categoría</Button>}>
      {saved && <Alert type="success" message="Categoría creada correctamente." onClose={() => setSaved(false)} />}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <Card key={cat.id} className={`p-5 transition-opacity ${cat.active ? "" : "opacity-60"}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${cat.color}20` }}>
                <Tag size={18} style={{ color: cat.color }} />
              </div>
              <Badge variant={cat.active ? "success" : "muted"}>{cat.active ? "Activa" : "Inactiva"}</Badge>
            </div>
            <h3 className="text-sm font-semibold text-[#172033]">{cat.name}</h3>
            <p className="text-xs text-[#667085] mt-0.5">{cat.courses} cursos</p>
            <div className="flex gap-1 mt-4">
              <button className="p-1.5 hover:bg-[#EEF1FB] rounded text-[#3157D5] transition-colors"><Edit2 size={12} /></button>
              <button onClick={() => toggleActive(cat.id)} className="p-1.5 hover:bg-[#F7F9FC] rounded text-[#667085] transition-colors">
                <ToggleLeft size={12} />
              </button>
              <button onClick={() => setDeleteModal(cat.id)} className="p-1.5 hover:bg-[#FEF2F2] rounded text-[#EF4444] transition-colors"><Trash2 size={12} /></button>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Nueva categoría">
        <div className="space-y-3">
          <Input label="Nombre de la categoría" placeholder="Ej. Machine Learning" value={newName} onChange={(e) => setNewName(e.target.value)} />
          <div className="flex gap-2 pt-2">
            <Button className="flex-1" onClick={handleCreate}>Crear categoría</Button>
            <Button variant="outline" onClick={() => setShowModal(false)}>Cancelar</Button>
          </div>
        </div>
      </Modal>

      <Modal open={!!deleteModal} onClose={() => setDeleteModal(null)} title="¿Eliminar categoría?">
        <p className="text-sm text-[#667085] mb-5">Esta acción eliminará la categoría. Los cursos asociados no serán eliminados.</p>
        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={() => setDeleteModal(null)}>Cancelar</Button>
          <Button variant="danger" onClick={() => { setCategories(categories.filter((c) => c.id !== deleteModal)); setDeleteModal(null); }}>Eliminar</Button>
        </div>
      </Modal>
    </PageShell>
  );
}

// ─── Admin Reports ─────────────────────────────────────────────────────────────
export function AdminReportsPage() {
  const [period, setPeriod] = useState("Mes");

  const summaryStats = [
    { label: "Usuarios registrados", value: "1,248", change: "+48", positive: true },
    { label: "Cursos creados", value: "86", change: "+6", positive: true },
    { label: "Inscripciones", value: "4,835", change: "+475", positive: true },
    { label: "Cursos completados", value: "1,204", change: "+120", positive: true },
    { label: "Actividades realizadas", value: "3,891", change: "+380", positive: true },
  ];

  return (
    <PageShell title="Reportes y estadísticas" subtitle="Analiza el rendimiento general de la plataforma."
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Download size={14} /> Exportar PDF</Button>
          <Button variant="outline" size="sm"><Download size={14} /> Exportar Excel</Button>
        </div>
      }>
      {/* Period filter */}
      <div className="flex gap-1 bg-[#F7F9FC] p-1 rounded-lg border border-[#E5E7EB] w-fit">
        {["Día", "Semana", "Mes", "Año"].map((p) => (
          <button key={p} onClick={() => setPeriod(p)}
            className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${period === p ? "bg-white text-[#3157D5] shadow-sm" : "text-[#667085] hover:text-[#172033]"}`}>
            {p}
          </button>
        ))}
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {summaryStats.map((s) => (
          <Card key={s.label} className="p-4">
            <p className="text-xs text-[#667085] mb-1">{s.label}</p>
            <p className="text-xl font-bold text-[#172033]">{s.value}</p>
            <p className={`text-xs mt-1 ${s.positive ? "text-[#10B981]" : "text-[#EF4444]"}`}>
              {s.positive ? "▲" : "▼"} {s.change} este {period.toLowerCase()}
            </p>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-5">
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-[#172033] mb-4">Crecimiento de usuarios — 12 meses</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={GROWTH_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#667085" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#667085" }} axisLine={false} tickLine={false} domain={[800, 1300]} />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12, border: "1px solid #E5E7EB" }} />
              <Line type="monotone" dataKey="usuarios" stroke="#3157D5" strokeWidth={2.5} dot={{ fill: "#3157D5", r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-[#172033] mb-4">Inscripciones mensuales</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={ENROLLMENT_DATA} barSize={18}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#667085" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#667085" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12, border: "1px solid #E5E7EB" }} />
              <Bar dataKey="inscripciones" fill="#18B6A4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </PageShell>
  );
}

// ─── Admin Settings ────────────────────────────────────────────────────────────
export function AdminSettingsPage({ user }: AdminProps) {
  const [tab, setTab] = useState("Perfil");
  const [saved, setSaved] = useState(false);
  const [notifs, setNotifs] = useState({ email: true, activities: true, courses: false, system: true });

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <PageShell title="Configuración" subtitle="Gestiona la configuración de la plataforma.">
      <div className="flex gap-1 bg-[#F7F9FC] p-1 rounded-lg border border-[#E5E7EB] w-fit">
        {["Perfil", "Plataforma", "Seguridad", "Notificaciones"].map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${tab === t ? "bg-white text-[#3157D5] shadow-sm" : "text-[#667085] hover:text-[#172033]"}`}>
            {t}
          </button>
        ))}
      </div>

      {saved && <Alert type="success" message="Cambios guardados correctamente." onClose={() => setSaved(false)} />}

      <div className="max-w-lg">
        {tab === "Perfil" && (
          <Card className="p-6 space-y-5">
            <div className="flex items-center gap-4">
              <Avatar src={user.avatar} name={user.name} size="xl" />
              <div>
                <p className="text-sm font-semibold text-[#172033]">{user.name}</p>
                <p className="text-xs text-[#667085]">{user.email}</p>
                <span className="mt-1 inline-block"><Badge variant="accent">Administradora</Badge></span>
              </div>
            </div>
            <form onSubmit={handleSave} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Input label="Nombre" defaultValue="Laura" />
                <Input label="Apellido" defaultValue="Rodríguez" />
              </div>
              <Input label="Correo electrónico" type="email" defaultValue={user.email} />
              <Button type="submit">Guardar cambios</Button>
            </form>
          </Card>
        )}

        {tab === "Plataforma" && (
          <Card className="p-6 space-y-4">
            <h3 className="text-sm font-semibold text-[#172033]">Configuración de plataforma</h3>
            <Input label="Nombre de la plataforma" defaultValue="SkillHub" />
            <Input label="Descripción" defaultValue="Plataforma educativa moderna" />
            <div>
              <label className="text-xs font-medium text-[#172033] block mb-1">Logo</label>
              <div className="border-2 border-dashed border-[#E5E7EB] rounded-xl p-6 text-center cursor-pointer hover:border-[#3157D5] transition-colors">
                <Globe size={24} className="text-[#667085] mx-auto mb-1" />
                <p className="text-xs text-[#667085]">Subir nuevo logo</p>
              </div>
            </div>
            <Button onClick={() => setSaved(true)}>Guardar cambios</Button>
          </Card>
        )}

        {tab === "Seguridad" && (
          <Card className="p-6 space-y-4">
            <h3 className="text-sm font-semibold text-[#172033]">Cambiar contraseña</h3>
            <Input label="Contraseña actual" type="password" placeholder="••••••••" />
            <Input label="Nueva contraseña" type="password" placeholder="Mínimo 6 caracteres" />
            <Input label="Confirmar nueva contraseña" type="password" placeholder="Repite la contraseña" />
            <Button onClick={() => setSaved(true)}>Actualizar contraseña</Button>
            <div className="pt-4 border-t border-[#E5E7EB]">
              <h3 className="text-sm font-semibold text-[#172033] mb-3">Sesiones activas</h3>
              <div className="space-y-2">
                {[
                  { device: "Chrome — Windows", ip: "192.168.1.1", time: "Activa ahora", current: true },
                  { device: "Safari — iPhone", ip: "192.168.1.2", time: "Hace 2 horas", current: false },
                ].map((session) => (
                  <div key={session.device} className="flex items-center justify-between p-3 rounded-lg bg-[#F7F9FC]">
                    <div>
                      <p className="text-xs font-medium text-[#172033]">{session.device}</p>
                      <p className="text-xs text-[#667085]">{session.ip} · {session.time}</p>
                    </div>
                    {session.current ? (
                      <Badge variant="success">Actual</Badge>
                    ) : (
                      <button className="text-xs text-[#EF4444] hover:underline">Cerrar</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        {tab === "Notificaciones" && (
          <Card className="p-6 space-y-4">
            <h3 className="text-sm font-semibold text-[#172033]">Preferencias de notificaciones</h3>
            <div className="space-y-3">
              {[
                { key: "email" as const, label: "Notificaciones por email", desc: "Recibe actualizaciones en tu correo" },
                { key: "activities" as const, label: "Actividades", desc: "Alertas sobre actividades nuevas" },
                { key: "courses" as const, label: "Cursos", desc: "Novedades sobre cursos disponibles" },
                { key: "system" as const, label: "Sistema", desc: "Alertas de mantenimiento y actualizaciones" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-xs font-medium text-[#172033]">{item.label}</p>
                    <p className="text-xs text-[#667085]">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => setNotifs({ ...notifs, [item.key]: !notifs[item.key] })}
                    className={`relative w-10 h-5 rounded-full transition-colors ${notifs[item.key] ? "bg-[#3157D5]" : "bg-[#E5E7EB]"}`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${notifs[item.key] ? "translate-x-5" : "translate-x-0.5"}`} />
                  </button>
                </div>
              ))}
            </div>
            <Button onClick={() => setSaved(true)}>Guardar preferencias</Button>
          </Card>
        )}
      </div>
    </PageShell>
  );
}
