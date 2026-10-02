import React, { useState } from "react";
import {
  BookOpen, Clock, Star, Users, ArrowRight, Play, CheckCircle,
  TrendingUp, Award, ClipboardList, BookMarked, ChevronRight, User,
  FileText, Video, Link as LinkIcon, Presentation, File, Send,
  ChevronLeft, AlertTriangle
} from "lucide-react";
import type { User as UserType, Page } from "../types";
import {
  Card, StatCard, Badge, Button, ProgressBar, Avatar, Tabs,
  EmptyState, Alert, Accordion, SearchBar, Input, Select, Textarea
} from "../components/ui";
import { PageShell } from "../components/layout";
import {
  COURSES, STUDENT_ENROLLMENTS, STUDENT_ACTIVITIES, WEEKLY_PROGRESS
} from "../data";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from "recharts";

interface StudentProps {
  user: UserType;
  onNavigate: (page: Page, courseId?: string, activityId?: string) => void;
  selectedCourseId?: string | null;
  selectedActivityId?: string | null;
}

// ─── Student Dashboard ─────────────────────────────────────────────────────────
export function StudentDashboard({ user, onNavigate }: StudentProps) {
  const enrolledCourses = STUDENT_ENROLLMENTS.map((e) => ({
    ...e,
    course: COURSES.find((c) => c.id === e.courseId)!,
  })).filter((e) => e.course);

  const inProgress = enrolledCourses.filter((e) => !e.completed);
  const completed = enrolledCourses.filter((e) => e.completed);
  const avgProgress = Math.round(enrolledCourses.reduce((acc, e) => acc + e.progress, 0) / enrolledCourses.length);

  const recommended = COURSES.filter((c) => !STUDENT_ENROLLMENTS.find((e) => e.courseId === c.id)).slice(0, 4);

  return (
    <PageShell title={`¡Hola, ${user.name.split(" ")[0]}! 👋`} subtitle="Continúa aprendiendo y alcanza tus objetivos.">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Cursos inscritos" value={enrolledCourses.length} icon={<BookMarked size={20} />} color="primary" />
        <StatCard title="Completados" value={completed.length} icon={<CheckCircle size={20} />} color="success" />
        <StatCard title="Progreso promedio" value={`${avgProgress}%`} icon={<TrendingUp size={20} />} color="secondary" />
        <StatCard title="Actividades pendientes" value={STUDENT_ACTIVITIES.filter((a) => a.status === "pending").length} icon={<ClipboardList size={20} />} color="warning" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Continue learning */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-[#172033]">Continuar aprendiendo</h2>
            <button onClick={() => onNavigate("student-my-courses")} className="text-xs text-[#3157D5] hover:underline flex items-center gap-1">
              Ver todos <ArrowRight size={12} />
            </button>
          </div>
          <div className="space-y-3">
            {inProgress.map((e) => (
              <Card key={e.courseId} className="p-4 flex gap-4 items-center hover:shadow-md transition-shadow">
                <img
                  src={e.course.image}
                  alt={e.course.title}
                  className="w-20 h-14 object-cover rounded-lg flex-shrink-0 bg-[#F3F4F6]"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#667085]">{e.course.category}</p>
                  <p className="text-sm font-semibold text-[#172033] truncate">{e.course.title}</p>
                  <p className="text-xs text-[#667085]">{e.course.teacher}</p>
                  <div className="mt-2">
                    <ProgressBar value={e.progress} color="primary" size="sm" showLabel />
                  </div>
                </div>
                <Button size="sm" onClick={() => onNavigate("student-classroom", e.courseId)}>
                  <Play size={12} /> Continuar
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Weekly progress chart */}
        <div className="space-y-3">
          <h2 className="text-base font-semibold text-[#172033]">Progreso semanal</h2>
          <Card className="p-4">
            <p className="text-xs text-[#667085] mb-3">Horas estudiadas esta semana</p>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={WEEKLY_PROGRESS} barSize={14}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#667085" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#667085" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12, border: "1px solid #E5E7EB" }} />
                <Bar dataKey="horas" fill="#3157D5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          {/* Avg score */}
          <Card className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-[#F0EDFF] rounded-lg flex items-center justify-center text-[#7C5CFC]">
              <Award size={20} />
            </div>
            <div>
              <p className="text-xs text-[#667085]">Promedio académico</p>
              <p className="text-xl font-bold text-[#172033]">4.5<span className="text-sm text-[#667085] font-normal">/5</span></p>
            </div>
          </Card>
        </div>
      </div>

      {/* Recommended courses */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-[#172033]">Cursos recomendados</h2>
          <button onClick={() => onNavigate("student-explore")} className="text-xs text-[#3157D5] hover:underline flex items-center gap-1">
            Explorar más <ArrowRight size={12} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recommended.map((course) => (
            <CourseCard key={course.id} course={course} onView={() => onNavigate("student-course-detail", course.id)} />
          ))}
        </div>
      </div>
    </PageShell>
  );
}

// ─── Course Card ───────────────────────────────────────────────────────────────
function CourseCard({ course, onView, progress }: {
  course: (typeof COURSES)[0];
  onView: () => void;
  progress?: number;
}) {
  return (
    <Card hoverable onClick={onView} className="overflow-hidden flex flex-col">
      <div className="relative">
        <img src={course.image} alt={course.title} className="w-full h-36 object-cover bg-[#F3F4F6]" />
        <div className="absolute top-2 left-2">
          <Badge variant="primary">{course.category}</Badge>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-semibold text-[#172033] leading-snug mb-1">{course.title}</h3>
        <p className="text-xs text-[#667085] mb-2">{course.teacher}</p>
        <div className="flex items-center gap-1 mb-2">
          <Star size={11} className="fill-[#F59E0B] text-[#F59E0B]" />
          <span className="text-xs font-medium text-[#172033]">{course.rating}</span>
          <span className="text-xs text-[#667085]">({course.students.toLocaleString()})</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#667085] mt-auto mb-3">
          <Clock size={11} />
          <span>{course.duration}</span>
          <span>·</span>
          <span>{course.level}</span>
        </div>
        {progress !== undefined && (
          <div className="mb-2">
            <ProgressBar value={progress} color="primary" size="sm" showLabel />
          </div>
        )}
        <Button size="sm" variant="outline" className="w-full">Ver curso</Button>
      </div>
    </Card>
  );
}

// ─── Explore Courses ───────────────────────────────────────────────────────────
export function ExploreCoursesPage({ onNavigate }: StudentProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [level, setLevel] = useState("all");

  const categories = ["all", "Programación", "Matemáticas", "Ciencia de Datos", "Inteligencia Artificial", "Ciberseguridad", "Diseño", "Desarrollo Web", "Bases de Datos"];

  const filtered = COURSES.filter((c) => {
    const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "all" || c.category === category;
    const matchLevel = level === "all" || c.level === level;
    return matchSearch && matchCat && matchLevel;
  });

  return (
    <PageShell title="Explora nuevos conocimientos" subtitle="Descubre cursos diseñados por expertos en tu área.">
      {/* Search */}
      <Card className="p-6">
        <SearchBar placeholder="¿Qué quieres aprender?" value={search} onChange={setSearch} size="lg" />
        <div className="flex flex-wrap gap-3 mt-4">
          <Select
            options={[
              { value: "all", label: "Todas las categorías" },
              ...categories.slice(1).map((c) => ({ value: c, label: c })),
            ]}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-auto flex-1 min-w-36"
          />
          <Select
            options={[
              { value: "all", label: "Todos los niveles" },
              { value: "Principiante", label: "Principiante" },
              { value: "Intermedio", label: "Intermedio" },
              { value: "Avanzado", label: "Avanzado" },
            ]}
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-auto flex-1 min-w-36"
          />
        </div>
      </Card>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all border ${category === c ? "bg-[#3157D5] text-white border-[#3157D5]" : "bg-white text-[#667085] border-[#E5E7EB] hover:border-[#3157D5] hover:text-[#3157D5]"}`}
          >
            {c === "all" ? "Todos" : c}
          </button>
        ))}
      </div>

      {/* Results */}
      <div>
        <p className="text-sm text-[#667085] mb-3">{filtered.length} cursos encontrados</p>
        {filtered.length === 0 ? (
          <EmptyState
            icon={<BookOpen size={32} />}
            title="No se encontraron cursos"
            description="Intenta con otros términos de búsqueda o categorías."
            action={{ label: "Ver todos los cursos", onClick: () => { setSearch(""); setCategory("all"); } }}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((course) => (
              <CourseCard key={course.id} course={course} onView={() => onNavigate("student-course-detail", course.id)} />
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}

// ─── Course Detail ─────────────────────────────────────────────────────────────
export function CourseDetailPage({ onNavigate, selectedCourseId }: StudentProps) {
  const course = COURSES.find((c) => c.id === selectedCourseId) ?? COURSES[0];
  const [enrolled, setEnrolled] = useState(!!STUDENT_ENROLLMENTS.find((e) => e.courseId === course.id));

  const accordionItems = course.modules.map((m) => ({
    id: m.id,
    title: m.title,
    subtitle: `${m.contents.length} contenidos · ${m.activities.length} actividades`,
    children: (
      <div className="divide-y divide-[#E5E7EB]">
        {m.contents.map((c) => (
          <div key={c.id} className="flex items-center gap-3 px-4 py-2.5">
            <ContentIcon type={c.type} />
            <span className="text-xs text-[#172033]">{c.title}</span>
          </div>
        ))}
        {m.activities.map((a) => (
          <div key={a.id} className="flex items-center gap-3 px-4 py-2.5">
            <ClipboardList size={14} className="text-[#7C5CFC] flex-shrink-0" />
            <span className="text-xs text-[#172033]">{a.title}</span>
            <Badge variant="accent" size="sm">Actividad</Badge>
          </div>
        ))}
      </div>
    ),
  }));

  return (
    <PageShell title="" actions={
      <button onClick={() => onNavigate("student-explore")} className="flex items-center gap-1 text-sm text-[#667085] hover:text-[#172033]">
        <ChevronLeft size={16} /> Volver
      </button>
    }>
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-5">
          <img src={course.image} alt={course.title} className="w-full h-52 object-cover rounded-xl bg-[#F3F4F6]" />
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="primary">{course.category}</Badge>
              <Badge variant="muted">{course.level}</Badge>
            </div>
            <h1 className="text-2xl font-bold text-[#172033] mb-2">{course.title}</h1>
            <p className="text-sm text-[#667085] leading-relaxed">{course.description}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs text-[#667085] py-3 border-y border-[#E5E7EB]">
            <span className="flex items-center gap-1"><Star size={12} className="fill-[#F59E0B] text-[#F59E0B]" /> {course.rating} valoración</span>
            <span className="flex items-center gap-1"><Users size={12} /> {course.students.toLocaleString()} estudiantes</span>
            <span className="flex items-center gap-1"><Clock size={12} /> {course.duration}</span>
            <span>Actualizado: {course.updatedAt}</span>
          </div>

          {/* Objectives */}
          <div>
            <h2 className="text-base font-semibold text-[#172033] mb-3">Lo que aprenderás</h2>
            <Card className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {course.objectives.map((obj, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-[#10B981] flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-[#172033]">{obj}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Modules accordion */}
          {course.modules.length > 0 && (
            <div>
              <h2 className="text-base font-semibold text-[#172033] mb-3">Contenido del curso</h2>
              <Accordion items={accordionItems} />
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card className="p-5 sticky top-20">
            <div className="flex items-center gap-2 mb-1">
              <Avatar src={undefined} name={course.teacher} size="md" />
              <div>
                <p className="text-xs text-[#667085]">Instructor</p>
                <p className="text-sm font-semibold text-[#172033]">{course.teacher}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 my-4">
              {[
                { label: "Módulos", value: course.modules.length },
                { label: "Duración", value: course.duration },
                { label: "Nivel", value: course.level },
                { label: "Rating", value: `${course.rating}★` },
              ].map((s) => (
                <div key={s.label} className="bg-[#F7F9FC] rounded-lg p-2.5">
                  <p className="text-xs text-[#667085]">{s.label}</p>
                  <p className="text-sm font-semibold text-[#172033]">{s.value}</p>
                </div>
              ))}
            </div>
            {enrolled ? (
              <Button variant="secondary" className="w-full" onClick={() => onNavigate("student-classroom", course.id)}>
                <Play size={14} /> Continuar curso
              </Button>
            ) : (
              <Button className="w-full" onClick={() => setEnrolled(true)}>
                Inscribirme al curso
              </Button>
            )}
            {enrolled && (
              <p className="text-center text-xs text-[#10B981] mt-2 flex items-center justify-center gap-1">
                <CheckCircle size={12} /> Inscrito
              </p>
            )}
          </Card>
        </div>
      </div>
    </PageShell>
  );
}

function ContentIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    video: <Video size={14} className="text-[#3157D5] flex-shrink-0" />,
    text: <FileText size={14} className="text-[#18B6A4] flex-shrink-0" />,
    document: <File size={14} className="text-[#667085] flex-shrink-0" />,
    presentation: <Presentation size={14} className="text-[#7C5CFC] flex-shrink-0" />,
    link: <LinkIcon size={14} className="text-[#F59E0B] flex-shrink-0" />,
  };
  return <>{icons[type] ?? <File size={14} className="text-[#667085]" />}</>;
}

// ─── My Courses ────────────────────────────────────────────────────────────────
export function MyCoursesPage({ onNavigate }: StudentProps) {
  const [tab, setTab] = useState("Todos");
  const enrolledCourses = STUDENT_ENROLLMENTS.map((e) => ({
    ...e,
    course: COURSES.find((c) => c.id === e.courseId)!,
  })).filter((e) => e.course);

  const filtered = enrolledCourses.filter((e) => {
    if (tab === "En progreso") return !e.completed;
    if (tab === "Completados") return e.completed;
    return true;
  });

  return (
    <PageShell title="Mis cursos" subtitle="Continúa donde lo dejaste.">
      <Tabs tabs={["Todos", "En progreso", "Completados"]} active={tab} onChange={setTab} />
      {filtered.length === 0 ? (
        <EmptyState
          icon={<BookMarked size={32} />}
          title="No tienes cursos aquí"
          description="Explora nuestro catálogo y encuentra tu próximo aprendizaje."
          action={{ label: "Explorar cursos", onClick: () => onNavigate("student-explore") }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((e) => (
            <Card key={e.courseId} className="overflow-hidden flex flex-col hover:shadow-md transition-shadow">
              <img src={e.course.image} alt={e.course.title} className="w-full h-36 object-cover bg-[#F3F4F6]" />
              <div className="p-4 flex flex-col flex-1">
                <Badge variant={e.completed ? "success" : "primary"} size="sm">{e.completed ? "Completado" : "En progreso"}</Badge>
                <h3 className="text-sm font-semibold text-[#172033] mt-2">{e.course.title}</h3>
                <p className="text-xs text-[#667085]">{e.course.teacher}</p>
                <div className="mt-3 mb-1">
                  <ProgressBar value={e.progress} color={e.completed ? "success" : "primary"} size="sm" showLabel />
                </div>
                <p className="text-xs text-[#667085] mb-3">Último: {e.lastContent}</p>
                <Button size="sm" variant={e.completed ? "outline" : "primary"} className="mt-auto"
                  onClick={() => onNavigate("student-classroom", e.courseId)}>
                  {e.completed ? "Revisar" : "Continuar"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </PageShell>
  );
}

// ─── Virtual Classroom ─────────────────────────────────────────────────────────
export function ClassroomPage({ onNavigate, selectedCourseId }: StudentProps) {
  const course = COURSES.find((c) => c.id === selectedCourseId) ?? COURSES[0];
  const enrollment = STUDENT_ENROLLMENTS.find((e) => e.courseId === course.id);
  const [selectedModule, setSelectedModule] = useState(0);
  const [selectedContent, setSelectedContent] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const module = course.modules[selectedModule];
  const content = module?.contents[selectedContent];

  if (!module || !content) {
    return (
      <PageShell title="Aula virtual">
        <EmptyState icon={<BookOpen size={32} />} title="Sin contenidos" description="Este curso no tiene contenidos disponibles aún." />
      </PageShell>
    );
  }

  return (
    <div className="flex h-full min-h-screen bg-[#F7F9FC]">
      {/* Content sidebar */}
      <aside className={`flex-shrink-0 bg-white border-r border-[#E5E7EB] overflow-y-auto transition-all duration-300 ${sidebarOpen ? "w-64" : "w-0 overflow-hidden"}`}>
        <div className="p-4 border-b border-[#E5E7EB]">
          <p className="text-xs font-semibold text-[#172033] leading-tight">{course.title}</p>
          <ProgressBar value={enrollment?.progress ?? 65} color="primary" size="sm" showLabel />
        </div>
        <div className="p-2">
          {course.modules.map((m, mi) => (
            <div key={m.id} className="mb-2">
              <button
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${mi === selectedModule ? "bg-[#EEF1FB] text-[#3157D5]" : "text-[#667085] hover:bg-[#F7F9FC]"}`}
                onClick={() => { setSelectedModule(mi); setSelectedContent(0); }}
              >
                {m.title}
              </button>
              {mi === selectedModule && (
                <div className="ml-3 mt-1 space-y-0.5">
                  {m.contents.map((c, ci) => (
                    <button
                      key={c.id}
                      className={`w-full flex items-center gap-2 text-left px-3 py-2 rounded-lg text-xs transition-colors ${ci === selectedContent ? "bg-[#3157D5] text-white" : "text-[#667085] hover:bg-[#F7F9FC]"}`}
                      onClick={() => setSelectedContent(ci)}
                    >
                      <ContentIcon type={c.type} />
                      <span className="truncate">{c.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-[#E5E7EB]">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 hover:bg-[#F7F9FC] rounded-lg text-[#667085]">
            <ChevronRight size={16} className={`transition-transform ${sidebarOpen ? "rotate-180" : ""}`} />
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-[#667085]">{module.title}</p>
            <p className="text-sm font-semibold text-[#172033] truncate">{content.title}</p>
          </div>
          <button onClick={() => onNavigate("student-my-courses")} className="text-xs text-[#667085] hover:text-[#172033]">← Volver</button>
        </div>

        <div className="flex-1 p-4 lg:p-6 space-y-5 overflow-auto">
          {/* Video player simulation */}
          <div className="bg-[#172033] rounded-xl aspect-video flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20"
              style={{ backgroundImage: `url(${course.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
            />
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm cursor-pointer hover:bg-white/30 transition-colors">
                <Play size={24} className="text-white ml-1" />
              </div>
              <p className="text-white/60 text-sm">{content.title}</p>
            </div>
          </div>

          {/* Text content */}
          <Card className="p-5">
            <h2 className="text-lg font-bold text-[#172033] mb-3">{content.title}</h2>
            <p className="text-sm text-[#667085] leading-relaxed mb-4">{content.description}</p>
            <div className="prose-sm text-[#172033] space-y-3">
              <p className="text-sm leading-relaxed">En este contenido aprenderás los conceptos fundamentales relacionados con <strong>{content.title}</strong>. Asegúrate de revisar el material adjunto y completar los ejercicios antes de pasar al siguiente tema.</p>
              <div className="bg-[#F7F9FC] rounded-lg p-4 border-l-4 border-[#3157D5]">
                <p className="text-xs font-semibold text-[#3157D5] mb-1">Nota importante</p>
                <p className="text-xs text-[#667085]">Practica cada concepto antes de avanzar al siguiente módulo para un mejor aprendizaje.</p>
              </div>
            </div>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" disabled={selectedContent === 0 && selectedModule === 0}
              onClick={() => {
                if (selectedContent > 0) setSelectedContent(selectedContent - 1);
                else if (selectedModule > 0) { setSelectedModule(selectedModule - 1); setSelectedContent(0); }
              }}>
              <ChevronLeft size={14} /> Anterior
            </Button>
            <div className="text-xs text-[#667085]">
              {selectedContent + 1} / {module.contents.length}
            </div>
            <Button size="sm"
              onClick={() => {
                if (selectedContent < module.contents.length - 1) setSelectedContent(selectedContent + 1);
                else if (selectedModule < course.modules.length - 1) { setSelectedModule(selectedModule + 1); setSelectedContent(0); }
              }}>
              Siguiente <ChevronRight size={14} />
            </Button>
          </div>

          {/* Progress */}
          <Card className="p-4">
            <p className="text-xs font-semibold text-[#172033] mb-2">Tu progreso</p>
            <ProgressBar value={enrollment?.progress ?? 65} color="primary" showLabel />
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── Activities ────────────────────────────────────────────────────────────────
export function ActivitiesPage({ onNavigate }: StudentProps) {
  const [tab, setTab] = useState("Todas");

  const filtered = STUDENT_ACTIVITIES.filter((a) => {
    if (tab === "Pendientes") return a.status === "pending";
    if (tab === "Entregadas") return a.status === "submitted";
    if (tab === "Calificadas") return a.status === "graded";
    return true;
  });

  const statusConfig = {
    pending: { label: "Pendiente", variant: "warning" as const },
    submitted: { label: "Entregada", variant: "secondary" as const },
    graded: { label: "Calificada", variant: "success" as const },
  };

  return (
    <PageShell title="Mis actividades" subtitle="Revisa y entrega tus actividades pendientes.">
      <Tabs tabs={["Todas", "Pendientes", "Entregadas", "Calificadas"]} active={tab} onChange={setTab} />
      <Card>
        {filtered.length === 0 ? (
          <EmptyState icon={<ClipboardList size={32} />} title="Sin actividades" description="No hay actividades en esta categoría." />
        ) : (
          <div className="divide-y divide-[#F3F4F6]">
            {filtered.map((activity) => {
              const cfg = statusConfig[activity.status];
              const isOverdue = activity.status === "pending" && new Date(activity.deadline) < new Date();
              return (
                <div key={activity.id} className="flex items-center gap-4 p-4 hover:bg-[#F7F9FC] transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#172033]">{activity.title}</p>
                    <p className="text-xs text-[#667085] mt-0.5">{activity.courseName} · {activity.moduleName}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {isOverdue ? (
                        <span className="flex items-center gap-1 text-xs text-[#EF4444]">
                          <AlertTriangle size={10} /> Venció: {activity.deadline}
                        </span>
                      ) : (
                        <span className="text-xs text-[#667085]">Límite: {activity.deadline}</span>
                      )}
                    </div>
                  </div>
                  <Badge variant={cfg.variant}>{cfg.label}</Badge>
                  {activity.score !== undefined && (
                    <span className="text-sm font-bold text-[#10B981]">{activity.score}/{activity.maxScore}</span>
                  )}
                  <Button size="sm" variant={activity.status === "pending" ? "primary" : "outline"}
                    onClick={() => onNavigate("student-activity-detail", undefined, activity.id)}>
                    {activity.status === "pending" ? "Entregar" : "Ver"}
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </PageShell>
  );
}

// ─── Activity Detail ───────────────────────────────────────────────────────────
export function ActivityDetailPage({ onNavigate, selectedActivityId }: StudentProps) {
  const activity = STUDENT_ACTIVITIES.find((a) => a.id === selectedActivityId) ?? STUDENT_ACTIVITIES[2];
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(activity.status !== "pending");

  function handleSubmit() {
    if (!answer.trim()) return;
    setSubmitted(true);
  }

  return (
    <PageShell title="" actions={
      <button onClick={() => onNavigate("student-activities")} className="flex items-center gap-1 text-sm text-[#667085] hover:text-[#172033]">
        <ChevronLeft size={16} /> Volver
      </button>
    }>
      <div className="max-w-2xl">
        <Card className="p-6 space-y-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="primary">{activity.courseName}</Badge>
              <Badge variant="muted">{activity.moduleName}</Badge>
            </div>
            <h1 className="text-xl font-bold text-[#172033]">{activity.title}</h1>
            <p className="text-sm text-[#667085] mt-1">{activity.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#F7F9FC] rounded-lg p-3">
              <p className="text-xs text-[#667085]">Puntaje máximo</p>
              <p className="text-sm font-bold text-[#172033]">{activity.maxScore} pts</p>
            </div>
            <div className="bg-[#F7F9FC] rounded-lg p-3">
              <p className="text-xs text-[#667085]">Fecha límite</p>
              <p className="text-sm font-bold text-[#172033]">{activity.deadline}</p>
            </div>
          </div>
          <div className="bg-[#EEF1FB] rounded-xl p-4 border-l-4 border-[#3157D5]">
            <p className="text-xs font-semibold text-[#3157D5] mb-1">Instrucciones</p>
            <p className="text-sm text-[#172033] leading-relaxed">{activity.instructions}</p>
          </div>

          {submitted ? (
            <Alert type="success" message="Actividad entregada correctamente. Tu respuesta está siendo revisada." />
          ) : (
            <div className="space-y-3">
              <Textarea
                label="Tu respuesta"
                placeholder="Escribe tu respuesta aquí..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows={8}
              />
              <Button className="w-full" onClick={handleSubmit} disabled={!answer.trim()}>
                <Send size={14} /> Entregar actividad
              </Button>
            </div>
          )}
        </Card>
      </div>
    </PageShell>
  );
}

// ─── Student Progress ──────────────────────────────────────────────────────────
export function StudentProgressPage() {
  const enrolledCourses = STUDENT_ENROLLMENTS.map((e) => ({
    ...e,
    course: COURSES.find((c) => c.id === e.courseId)!,
  })).filter((e) => e.course);

  const chartData = enrolledCourses.map((e) => ({
    name: e.course.title.length > 18 ? e.course.title.slice(0, 18) + "…" : e.course.title,
    progreso: e.progress,
  }));

  return (
    <PageShell title="Mi progreso" subtitle="Visualiza tu avance en la plataforma.">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Progreso general" value="68%" icon={<TrendingUp size={20} />} color="primary" />
        <StatCard title="Cursos completados" value="1" icon={<CheckCircle size={20} />} color="success" />
        <StatCard title="Contenidos completados" value="8" icon={<BookOpen size={20} />} color="secondary" />
        <StatCard title="Actividades realizadas" value="2/4" icon={<ClipboardList size={20} />} color="warning" />
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-[#172033] mb-4">Progreso por curso</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: "#667085" }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "#667085" }} axisLine={false} tickLine={false} width={100} />
              <Tooltip formatter={(v) => [`${v}%`, "Progreso"]} contentStyle={{ borderRadius: 8, fontSize: 12, border: "1px solid #E5E7EB" }} />
              <Bar dataKey="progreso" fill="#3157D5" radius={[0, 4, 4, 0]} barSize={16} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <h3 className="text-sm font-semibold text-[#172033] mb-4">Horas de estudio semanales</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={WEEKLY_PROGRESS}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#667085" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#667085" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12, border: "1px solid #E5E7EB" }} />
              <Line type="monotone" dataKey="horas" stroke="#18B6A4" strokeWidth={2} dot={{ fill: "#18B6A4", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card>
        <div className="p-4 border-b border-[#E5E7EB]">
          <h3 className="text-sm font-semibold text-[#172033]">Detalle por curso</h3>
        </div>
        <div className="divide-y divide-[#F3F4F6]">
          {enrolledCourses.map((e) => (
            <div key={e.courseId} className="flex items-center gap-4 p-4">
              <img src={e.course.image} alt={e.course.title} className="w-10 h-10 rounded-lg object-cover bg-[#F3F4F6] flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#172033] truncate">{e.course.title}</p>
                <ProgressBar value={e.progress} color={e.completed ? "success" : "primary"} size="sm" showLabel />
              </div>
              <Badge variant={e.completed ? "success" : e.progress > 50 ? "primary" : "warning"}>
                {e.completed ? "Completado" : e.progress > 50 ? "En progreso" : "Iniciado"}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </PageShell>
  );
}

// ─── Student Profile ───────────────────────────────────────────────────────────
export function StudentProfilePage({ user }: StudentProps) {
  const [form, setForm] = useState({ name: user.name.split(" ")[0], surname: user.name.split(" ")[1] ?? "", email: user.email });
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <PageShell title="Mi perfil" subtitle="Gestiona tu información personal.">
      <div className="max-w-lg space-y-5">
        {/* Profile header */}
        <Card className="p-6 flex items-center gap-5">
          <Avatar src={user.avatar} name={user.name} size="xl" />
          <div>
            <h2 className="text-lg font-bold text-[#172033]">{user.name}</h2>
            <p className="text-sm text-[#667085]">{user.email}</p>
            <div className="flex gap-2 mt-2">
              <Badge variant="primary">Estudiante</Badge>
              <Badge variant="muted">Desde {user.joinDate}</Badge>
            </div>
          </div>
        </Card>

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
