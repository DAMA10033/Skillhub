import React, { useState } from "react";
import {
  BookOpen, Users, Star, ClipboardList, PlusCircle, TrendingUp,
  Edit2, Trash2, Eye, CheckCircle, MoreVertical, Search, ChevronLeft,
  BookMarked, Award
} from "lucide-react";
import type { User as UserType, Page } from "../types";
import {
  Card, StatCard, Badge, Button, ProgressBar, Avatar, Tabs, Input,
  Select, Textarea, EmptyState, Modal, Alert, SearchBar
} from "../components/ui";
import { PageShell } from "../components/layout";
import { COURSES, TEACHER_STUDENTS, TEACHER_MONTHLY, STUDENT_ACTIVITIES } from "../data";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from "recharts";

interface TeacherProps {
  user: UserType;
  onNavigate: (page: Page, courseId?: string) => void;
  selectedCourseId?: string | null;
}

const teacherCourses = COURSES.filter((c) => c.teacherId === "u2");

// ─── Teacher Dashboard ─────────────────────────────────────────────────────────
export function TeacherDashboard({ user, onNavigate }: TeacherProps) {
  const publishedCount = teacherCourses.filter((c) => c.status === "published").length;

  const studentPerformance = [
    { label: "Excelente (4.5+)", value: 45, color: "#10B981" },
    { label: "Bueno (3.5–4.5)", value: 35, color: "#3157D5" },
    { label: "Regular (<3.5)", value: 20, color: "#F59E0B" },
  ];

  return (
    <PageShell
      title={`Buenos días, ${user.name.split(" ")[0]}`}
      subtitle="Aquí está el resumen de tus cursos y estudiantes."
      actions={<Button onClick={() => onNavigate("teacher-create-course")}><PlusCircle size={14} /> Crear curso</Button>}
    >
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Cursos creados" value={teacherCourses.length} icon={<BookMarked size={20} />} color="primary" />
        <StatCard title="Estudiantes" value="128" icon={<Users size={20} />} color="secondary" />
        <StatCard title="Actividades" value="32" icon={<ClipboardList size={20} />} color="accent" />
        <StatCard title="Valoración promedio" value="4.8★" icon={<Star size={20} />} color="success" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Students chart */}
        <Card className="lg:col-span-2 p-5">
          <h3 className="text-sm font-semibold text-[#172033] mb-4">Estudiantes inscritos por mes</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={TEACHER_MONTHLY}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#667085" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#667085" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12, border: "1px solid #E5E7EB" }} />
              <Line type="monotone" dataKey="estudiantes" stroke="#3157D5" strokeWidth={2.5} dot={{ fill: "#3157D5", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Performance */}
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-[#172033] mb-4">Rendimiento de estudiantes</h3>
          <div className="space-y-3">
            {studentPerformance.map((s) => (
              <div key={s.label}>
                <div className="flex justify-between mb-1">
                  <p className="text-xs text-[#667085]">{s.label}</p>
                  <p className="text-xs font-medium text-[#172033]">{s.value}%</p>
                </div>
                <div className="h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${s.value}%`, background: s.color }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
            <p className="text-xs text-[#667085]">Curso más popular</p>
            <p className="text-sm font-semibold text-[#172033]">Introducción a Python</p>
            <p className="text-xs text-[#667085] mt-0.5">1,240 estudiantes · 4.9★</p>
          </div>
        </Card>
      </div>

      {/* Courses table */}
      <Card>
        <div className="flex items-center justify-between p-4 border-b border-[#E5E7EB]">
          <h3 className="text-sm font-semibold text-[#172033]">Mis cursos</h3>
          <Button size="sm" onClick={() => onNavigate("teacher-create-course")}><PlusCircle size={12} /> Crear curso</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5E7EB]">
                {["Curso", "Estudiantes", "Prog. Promedio", "Estado", "Acciones"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#667085] uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3F4F6]">
              {teacherCourses.map((course) => (
                <tr key={course.id} className="hover:bg-[#F7F9FC] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={course.image} alt={course.title} className="w-10 h-7 rounded-md object-cover bg-[#F3F4F6]" />
                      <div>
                        <p className="text-xs font-medium text-[#172033]">{course.title}</p>
                        <p className="text-xs text-[#667085]">{course.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-[#172033]">{course.students.toLocaleString()}</td>
                  <td className="px-4 py-3 w-32">
                    <ProgressBar value={Math.floor(Math.random() * 30 + 50)} color="primary" size="sm" showLabel />
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={course.status === "published" ? "success" : "muted"}>
                      {course.status === "published" ? "Publicado" : "Borrador"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => onNavigate("teacher-edit-course", course.id)} className="p-1.5 hover:bg-[#EEF1FB] rounded-md text-[#3157D5] transition-colors">
                        <Edit2 size={13} />
                      </button>
                      <button className="p-1.5 hover:bg-[#F7F9FC] rounded-md text-[#667085] transition-colors">
                        <Eye size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageShell>
  );
}

// ─── My Courses (Teacher) ──────────────────────────────────────────────────────
export function TeacherMyCoursesPage({ onNavigate }: TeacherProps) {
  const [tab, setTab] = useState("Todos");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const filtered = teacherCourses.filter((c) => {
    if (tab === "Publicados") return c.status === "published";
    if (tab === "Borradores") return c.status === "draft";
    return true;
  });

  return (
    <PageShell title="Mis cursos" subtitle="Gestiona tus cursos y contenidos."
      actions={<Button onClick={() => onNavigate("teacher-create-course")}><PlusCircle size={14} /> Crear curso</Button>}>
      <Tabs tabs={["Todos", "Publicados", "Borradores"]} active={tab} onChange={setTab} />
      {filtered.length === 0 ? (
        <EmptyState icon={<BookOpen size={32} />} title="Sin cursos" description="Crea tu primer curso para comenzar."
          action={{ label: "Crear curso", onClick: () => onNavigate("teacher-create-course") }} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((course) => (
            <Card key={course.id} className="overflow-hidden flex flex-col hover:shadow-md transition-shadow">
              <div className="relative">
                <img src={course.image} alt={course.title} className="w-full h-36 object-cover bg-[#F3F4F6]" />
                <div className="absolute top-2 right-2">
                  <Badge variant={course.status === "published" ? "success" : "muted"}>
                    {course.status === "published" ? "Publicado" : "Borrador"}
                  </Badge>
                </div>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <p className="text-xs text-[#667085]">{course.category}</p>
                <h3 className="text-sm font-semibold text-[#172033] mt-0.5">{course.title}</h3>
                <div className="flex items-center gap-3 mt-2 text-xs text-[#667085]">
                  <span className="flex items-center gap-1"><Users size={11} /> {course.students.toLocaleString()}</span>
                  <span className="flex items-center gap-1"><Star size={11} /> {course.rating}</span>
                </div>
                <div className="flex gap-2 mt-auto pt-3">
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => onNavigate("teacher-edit-course", course.id)}>
                    <Edit2 size={12} /> Editar
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setShowDeleteModal(true)}>
                    <Trash2 size={12} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
      <Modal open={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="¿Eliminar curso?">
        <p className="text-sm text-[#667085] mb-5">Esta acción no se puede deshacer. El curso y todo su contenido serán eliminados permanentemente.</p>
        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={() => setShowDeleteModal(false)}>Cancelar</Button>
          <Button variant="danger" onClick={() => setShowDeleteModal(false)}>Eliminar</Button>
        </div>
      </Modal>
    </PageShell>
  );
}

// ─── Create Course ─────────────────────────────────────────────────────────────
export function CreateCoursePage({ onNavigate }: TeacherProps) {
  const [form, setForm] = useState({ title: "", description: "", category: "", level: "Principiante", status: "draft" });
  const [modules, setModules] = useState([{ id: "m1", title: "", description: "", order: 1 }]);
  const [saved, setSaved] = useState<"draft" | "published" | null>(null);

  function addModule() {
    setModules([...modules, { id: `m${Date.now()}`, title: "", description: "", order: modules.length + 1 }]);
  }
  function removeModule(id: string) {
    setModules(modules.filter((m) => m.id !== id));
  }

  function handleSave(publish: boolean) {
    setSaved(publish ? "published" : "draft");
    setTimeout(() => setSaved(null), 3000);
  }

  return (
    <PageShell title="Crear curso" subtitle="Completa la información para crear tu nuevo curso."
      actions={
        <button onClick={() => onNavigate("teacher-my-courses")} className="flex items-center gap-1 text-sm text-[#667085] hover:text-[#172033]">
          <ChevronLeft size={16} /> Volver
        </button>
      }>
      {saved && (
        <Alert type="success" message={saved === "published" ? "Curso publicado correctamente." : "Borrador guardado correctamente."} onClose={() => setSaved(null)} />
      )}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Form */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-5 space-y-4">
            <h3 className="text-sm font-semibold text-[#172033]">Información del curso</h3>
            <Input label="Título del curso" placeholder="Ej. Introducción a Python" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <Textarea label="Descripción" placeholder="Describe el contenido y objetivos del curso..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} />
            <div className="grid grid-cols-2 gap-3">
              <Select label="Categoría" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                options={[
                  { value: "", label: "Seleccionar categoría" },
                  { value: "Programación", label: "Programación" },
                  { value: "Matemáticas", label: "Matemáticas" },
                  { value: "Inteligencia Artificial", label: "Inteligencia Artificial" },
                  { value: "Ciencia de Datos", label: "Ciencia de Datos" },
                  { value: "Ciberseguridad", label: "Ciberseguridad" },
                  { value: "Desarrollo Web", label: "Desarrollo Web" },
                  { value: "Diseño", label: "Diseño" },
                  { value: "Bases de Datos", label: "Bases de Datos" },
                ]}
              />
              <Select label="Nivel" value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })}
                options={[
                  { value: "Principiante", label: "Principiante" },
                  { value: "Intermedio", label: "Intermedio" },
                  { value: "Avanzado", label: "Avanzado" },
                ]}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-[#172033] block mb-1">Imagen del curso</label>
              <div className="border-2 border-dashed border-[#E5E7EB] rounded-xl p-8 text-center hover:border-[#3157D5] transition-colors cursor-pointer">
                <BookOpen size={24} className="text-[#667085] mx-auto mb-2" />
                <p className="text-xs text-[#667085]">Arrastra una imagen o haz clic para subir</p>
                <p className="text-[10px] text-[#667085] mt-1">PNG, JPG hasta 5MB</p>
              </div>
            </div>
          </Card>

          {/* Modules */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[#172033]">Módulos</h3>
              <Button size="sm" variant="outline" onClick={addModule}><PlusCircle size={12} /> Agregar módulo</Button>
            </div>
            <div className="space-y-3">
              {modules.map((m, i) => (
                <div key={m.id} className="border border-[#E5E7EB] rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#667085]">Módulo {i + 1}</span>
                    {modules.length > 1 && (
                      <button onClick={() => removeModule(m.id)} className="p-1 hover:bg-[#FEF2F2] rounded text-[#EF4444]">
                        <Trash2 size={12} />
                      </button>
                    )}
                  </div>
                  <Input placeholder="Título del módulo" value={m.title}
                    onChange={(e) => setModules(modules.map((mod) => mod.id === m.id ? { ...mod, title: e.target.value } : mod))}
                  />
                  <Textarea placeholder="Descripción del módulo" rows={2} value={m.description}
                    onChange={(e) => setModules(modules.map((mod) => mod.id === m.id ? { ...mod, description: e.target.value } : mod))}
                  />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card className="p-5">
            <h3 className="text-sm font-semibold text-[#172033] mb-4">Estado del curso</h3>
            <Select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
              options={[
                { value: "draft", label: "Borrador" },
                { value: "published", label: "Publicado" },
              ]}
            />
            <div className="mt-4 space-y-2">
              <Button variant="outline" className="w-full" onClick={() => handleSave(false)}>Guardar borrador</Button>
              <Button className="w-full" onClick={() => handleSave(true)}>Publicar curso</Button>
            </div>
          </Card>
          <Card className="p-5">
            <h3 className="text-sm font-semibold text-[#172033] mb-2">Checklist</h3>
            <div className="space-y-2">
              {[
                { label: "Título completo", done: !!form.title },
                { label: "Descripción", done: !!form.description },
                { label: "Categoría", done: !!form.category },
                { label: "Al menos 1 módulo", done: modules.length > 0 && !!modules[0].title },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <CheckCircle size={14} className={item.done ? "text-[#10B981]" : "text-[#E5E7EB]"} />
                  <span className={`text-xs ${item.done ? "text-[#172033]" : "text-[#667085]"}`}>{item.label}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}

// ─── Edit Course ───────────────────────────────────────────────────────────────
export function EditCoursePage({ onNavigate, selectedCourseId }: TeacherProps) {
  const course = COURSES.find((c) => c.id === selectedCourseId) ?? COURSES[0];
  const [tab, setTab] = useState("Información");
  const [saved, setSaved] = useState(false);

  const contentTypeIcons: Record<string, string> = {
    video: "🎬", text: "📄", document: "📎", presentation: "📊", link: "🔗",
  };

  return (
    <PageShell title={course.title} subtitle="Administra el contenido de tu curso."
      actions={
        <div className="flex gap-2">
          <button onClick={() => onNavigate("teacher-my-courses")} className="flex items-center gap-1 text-sm text-[#667085] hover:text-[#172033]">
            <ChevronLeft size={16} /> Volver
          </button>
          <Button size="sm" onClick={() => setSaved(true)}>Guardar cambios</Button>
        </div>
      }>
      {saved && <Alert type="success" message="Cambios guardados correctamente." onClose={() => setSaved(false)} />}
      <Tabs tabs={["Información", "Módulos", "Contenidos", "Actividades", "Estudiantes"]} active={tab} onChange={setTab} />

      {tab === "Información" && (
        <div className="max-w-2xl space-y-4">
          <Card className="p-5 space-y-4">
            <Input label="Título" defaultValue={course.title} />
            <Textarea label="Descripción" defaultValue={course.description} rows={4} />
            <div className="grid grid-cols-2 gap-3">
              <Select label="Categoría" defaultValue={course.category}
                options={[{ value: course.category, label: course.category }]}
              />
              <Select label="Nivel" defaultValue={course.level}
                options={[{ value: course.level, label: course.level }]}
              />
            </div>
          </Card>
        </div>
      )}

      {tab === "Módulos" && (
        <div className="max-w-2xl space-y-3">
          {course.modules.map((m, i) => (
            <Card key={m.id} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-[#172033]">Módulo {i + 1}: {m.title}</span>
                <div className="flex gap-1">
                  <button className="p-1.5 hover:bg-[#EEF1FB] rounded text-[#3157D5]"><Edit2 size={12} /></button>
                  <button className="p-1.5 hover:bg-[#FEF2F2] rounded text-[#EF4444]"><Trash2 size={12} /></button>
                </div>
              </div>
              <p className="text-xs text-[#667085]">{m.description}</p>
              <p className="text-xs text-[#667085] mt-1">{m.contents.length} contenidos · {m.activities.length} actividades</p>
            </Card>
          ))}
          <Button variant="outline" size="sm"><PlusCircle size={12} /> Agregar módulo</Button>
        </div>
      )}

      {tab === "Contenidos" && (
        <div className="max-w-2xl space-y-3">
          {course.modules.map((m) => (
            <Card key={m.id} className="overflow-hidden">
              <div className="px-4 py-3 bg-[#F7F9FC] border-b border-[#E5E7EB]">
                <p className="text-xs font-semibold text-[#172033]">{m.title}</p>
              </div>
              <div className="divide-y divide-[#F3F4F6]">
                {m.contents.map((c) => (
                  <div key={c.id} className="flex items-center gap-3 px-4 py-3">
                    <span className="text-base">{contentTypeIcons[c.type]}</span>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-[#172033]">{c.title}</p>
                      <p className="text-xs text-[#667085]">{c.description}</p>
                    </div>
                    <Badge variant="muted" size="sm">{c.type}</Badge>
                    <Badge variant={c.status === "published" ? "success" : "muted"} size="sm">
                      {c.status === "published" ? "Publicado" : "Borrador"}
                    </Badge>
                    <div className="flex gap-1">
                      <button className="p-1.5 hover:bg-[#EEF1FB] rounded text-[#3157D5]"><Edit2 size={12} /></button>
                      <button className="p-1.5 hover:bg-[#FEF2F2] rounded text-[#EF4444]"><Trash2 size={12} /></button>
                    </div>
                  </div>
                ))}
                <div className="px-4 py-2">
                  <Button variant="ghost" size="sm"><PlusCircle size={12} /> Agregar contenido</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === "Actividades" && (
        <div className="max-w-2xl space-y-3">
          {course.modules.map((m) =>
            m.activities.length > 0 ? (
              <Card key={m.id} className="overflow-hidden">
                <div className="px-4 py-3 bg-[#F7F9FC] border-b border-[#E5E7EB]">
                  <p className="text-xs font-semibold text-[#172033]">{m.title}</p>
                </div>
                {m.activities.map((a) => (
                  <div key={a.id} className="flex items-center gap-3 px-4 py-3">
                    <div className="flex-1">
                      <p className="text-xs font-medium text-[#172033]">{a.title}</p>
                      <p className="text-xs text-[#667085]">Límite: {a.deadline} · {a.maxScore} pts</p>
                    </div>
                    <div className="flex gap-1">
                      <button className="p-1.5 hover:bg-[#EEF1FB] rounded text-[#3157D5]"><Edit2 size={12} /></button>
                    </div>
                  </div>
                ))}
              </Card>
            ) : null
          )}
          <Button variant="outline" size="sm" onClick={() => onNavigate("teacher-activities")}><PlusCircle size={12} /> Crear actividad</Button>
        </div>
      )}

      {tab === "Estudiantes" && (
        <div className="max-w-3xl">
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#E5E7EB]">
                    {["Estudiante", "Progreso", "Actividades", "Promedio", "Estado"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#667085] uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3F4F6]">
                  {TEACHER_STUDENTS.slice(0, 3).map((s) => (
                    <tr key={s.id} className="hover:bg-[#F7F9FC]">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Avatar src={s.avatar} name={s.name} size="sm" />
                          <span className="text-xs font-medium text-[#172033]">{s.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 w-32"><ProgressBar value={s.progress} size="sm" showLabel /></td>
                      <td className="px-4 py-3 text-xs text-[#667085]">{s.activities}</td>
                      <td className="px-4 py-3 text-xs font-medium text-[#172033]">{s.average}/5</td>
                      <td className="px-4 py-3">
                        <Badge variant={s.status === "active" ? "success" : "muted"}>{s.status === "active" ? "Activo" : "Inactivo"}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}
    </PageShell>
  );
}

// ─── Teacher Activities ────────────────────────────────────────────────────────
export function TeacherActivitiesPage() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", instructions: "", score: "100", deadline: "", status: "draft" });
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setShowForm(false);
    setTimeout(() => setSaved(false), 3000);
  }

  const activities = STUDENT_ACTIVITIES;

  return (
    <PageShell title="Actividades" subtitle="Gestiona las actividades de tus cursos."
      actions={<Button size="sm" onClick={() => setShowForm(!showForm)}><PlusCircle size={14} /> Crear actividad</Button>}>
      {saved && <Alert type="success" message="Actividad creada correctamente." onClose={() => setSaved(false)} />}

      {showForm && (
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-[#172033] mb-4">Nueva actividad</h3>
          <form onSubmit={handleSave} className="space-y-4">
            <Input label="Título" placeholder="Nombre de la actividad" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <Textarea label="Descripción" placeholder="Descripción breve..." rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <Textarea label="Instrucciones" placeholder="Instrucciones detalladas para los estudiantes..." rows={4} value={form.instructions} onChange={(e) => setForm({ ...form, instructions: e.target.value })} />
            <div className="grid grid-cols-2 gap-3">
              <Input label="Puntaje máximo" type="number" value={form.score} onChange={(e) => setForm({ ...form, score: e.target.value })} />
              <Input label="Fecha límite" type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} />
            </div>
            <Select label="Estado" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
              options={[{ value: "draft", label: "Borrador" }, { value: "published", label: "Publicar" }]}
            />
            <div className="flex gap-2">
              <Button type="submit">Guardar actividad</Button>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
            </div>
          </form>
        </Card>
      )}

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5E7EB]">
                {["Actividad", "Curso", "Módulo", "Fecha límite", "Puntaje", "Acciones"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#667085] uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3F4F6]">
              {activities.map((a) => (
                <tr key={a.id} className="hover:bg-[#F7F9FC] transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-xs font-medium text-[#172033]">{a.title}</p>
                    <p className="text-xs text-[#667085]">{a.description}</p>
                  </td>
                  <td className="px-4 py-3 text-xs text-[#667085]">{a.courseName}</td>
                  <td className="px-4 py-3 text-xs text-[#667085]">{a.moduleName}</td>
                  <td className="px-4 py-3 text-xs text-[#667085]">{a.deadline}</td>
                  <td className="px-4 py-3 text-xs font-medium text-[#172033]">{a.maxScore} pts</td>
                  <td className="px-4 py-3">
                    <button className="p-1.5 hover:bg-[#EEF1FB] rounded text-[#3157D5]"><Edit2 size={12} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageShell>
  );
}

// ─── Teacher Students ──────────────────────────────────────────────────────────
export function TeacherStudentsPage() {
  const [search, setSearch] = useState("");
  const filtered = TEACHER_STUDENTS.filter((s) =>
    !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.course.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageShell title="Mis estudiantes" subtitle="Supervisa el progreso de tus estudiantes.">
      <div className="flex gap-3 flex-wrap">
        <div className="flex-1 min-w-48"><SearchBar placeholder="Buscar estudiantes..." value={search} onChange={setSearch} /></div>
        <Select options={[{ value: "all", label: "Todos los cursos" }, ...teacherCourses.map((c) => ({ value: c.id, label: c.title }))]}
          className="w-52" onChange={() => {}} value="all" />
      </div>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5E7EB]">
                {["Estudiante", "Curso", "Progreso", "Actividades", "Promedio", "Estado", "Acción"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#667085] uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3F4F6]">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-[#F7F9FC] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Avatar src={s.avatar} name={s.name} size="sm" />
                      <span className="text-xs font-medium text-[#172033]">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-[#667085] max-w-32 truncate">{s.course}</td>
                  <td className="px-4 py-3 w-28"><ProgressBar value={s.progress} size="sm" showLabel /></td>
                  <td className="px-4 py-3 text-xs text-[#667085]">{s.activities}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-bold ${s.average >= 4.5 ? "text-[#10B981]" : s.average >= 3.5 ? "text-[#3157D5]" : "text-[#F59E0B]"}`}>
                      {s.average}/5
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={s.status === "active" ? "success" : "muted"}>{s.status === "active" ? "Activo" : "Inactivo"}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Button size="sm" variant="outline"><Eye size={11} /> Ver progreso</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageShell>
  );
}

// ─── Teacher Profile ───────────────────────────────────────────────────────────
export function TeacherProfilePage({ user }: TeacherProps) {
  const [form, setForm] = useState({ name: user.name.split(" ")[0], surname: user.name.split(" ")[1] ?? "", email: user.email });
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <PageShell title="Mi perfil" subtitle="Gestiona tu información como profesor.">
      <div className="max-w-lg space-y-5">
        <Card className="p-6 flex items-center gap-5">
          <Avatar src={user.avatar} name={user.name} size="xl" />
          <div>
            <h2 className="text-lg font-bold text-[#172033]">{user.name}</h2>
            <p className="text-sm text-[#667085]">{user.email}</p>
            <div className="flex gap-2 mt-2">
              <Badge variant="secondary">Profesor</Badge>
              <Badge variant="muted">Desde {user.joinDate}</Badge>
            </div>
          </div>
        </Card>
        <div className="grid grid-cols-3 gap-3">
          <StatCard title="Cursos" value={teacherCourses.length} icon={<BookMarked size={16} />} color="primary" />
          <StatCard title="Estudiantes" value="128" icon={<Users size={16} />} color="secondary" />
          <StatCard title="Valoración" value="4.8★" icon={<Award size={16} />} color="success" />
        </div>
        {saved && <Alert type="success" message="Perfil actualizado correctamente." />}
        <Card className="p-6">
          <h3 className="text-sm font-semibold text-[#172033] mb-4">Información personal</h3>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Input label="Nombre" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <Input label="Apellido" value={form.surname} onChange={(e) => setForm({ ...form, surname: e.target.value })} />
            </div>
            <Input label="Correo electrónico" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <Button type="submit">Guardar cambios</Button>
          </form>
        </Card>
      </div>
    </PageShell>
  );
}
