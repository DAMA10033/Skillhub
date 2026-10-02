import React, { useState } from "react";
import type { User } from "../types";
import { USERS } from "../data";
import { Button, Input, Alert } from "../components/ui";
import { SkillHubLogo } from "../components/ui";
import { Eye, EyeOff, GraduationCap } from "lucide-react";

const DEMO_CREDENTIALS = [
  { email: "estudiante@skillhub.com", role: "Estudiante", color: "bg-[#EEF1FB] text-[#3157D5] border-[#3157D5]/20" },
  { email: "profesor@skillhub.com", role: "Profesor", color: "bg-[#E6F8F7] text-[#18B6A4] border-[#18B6A4]/20" },
  { email: "admin@skillhub.com", role: "Administrador", color: "bg-[#F0EDFF] text-[#7C5CFC] border-[#7C5CFC]/20" },
];

interface LoginPageProps {
  onLogin: (user: User) => void;
  onNavigateRegister: () => void;
}

export function LoginPage({ onLogin, onNavigateRegister }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      const user = USERS.find((u) => u.email === email && u.password === password);
      if (user) {
        onLogin(user);
      } else {
        setError("Correo electrónico o contraseña incorrectos.");
      }
      setLoading(false);
    }, 600);
  }

  function fillDemo(demoEmail: string) {
    setEmail(demoEmail);
    setPassword("123456");
    setError("");
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel – illustration */}
      <div className="hidden lg:flex flex-col flex-1 bg-[#172033] relative overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#3157D5]/20 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#18B6A4]/15 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-[#7C5CFC]/10 rounded-full -translate-y-1/2" />
        </div>
        {/* Content */}
        <div className="relative z-10 flex flex-col h-full px-12 py-10">
          <SkillHubLogo />
          <div className="flex-1 flex flex-col justify-center">
            <div className="mb-10">
              <h2 className="text-4xl font-bold text-white leading-tight mb-4">
                Aprende.<br />Crea.<br />Evoluciona.
              </h2>
              <p className="text-white/60 text-base max-w-xs leading-relaxed">
                La plataforma educativa moderna que conecta estudiantes, profesores y el conocimiento del futuro.
              </p>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-sm">
              {[
                { value: "1,248", label: "Estudiantes" },
                { value: "86", label: "Cursos" },
                { value: "4.8★", label: "Valoración" },
              ].map((s) => (
                <div key={s.label} className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="text-xl font-bold text-white">{s.value}</p>
                  <p className="text-xs text-white/50 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Categories row */}
          <div className="flex flex-wrap gap-2">
            {["Python", "IA", "Web", "SQL", "Ciberseguridad", "Datos"].map((c) => (
              <span key={c} className="px-3 py-1 bg-white/8 rounded-full text-xs text-white/60 border border-white/10">{c}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel – form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-[#F7F9FC]">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex justify-center mb-8 lg:hidden">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-[#3157D5] flex items-center justify-center">
                <GraduationCap size={22} className="text-white" />
              </div>
              <span className="text-xl font-bold text-[#172033]">SkillHub</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-[#172033]">Iniciar sesión</h1>
              <p className="text-sm text-[#667085] mt-1">Bienvenido de nuevo a SkillHub</p>
            </div>

            {/* Demo accounts */}
            <div className="mb-5">
              <p className="text-xs font-medium text-[#667085] mb-2">Cuentas de demostración:</p>
              <div className="space-y-1.5">
                {DEMO_CREDENTIALS.map((d) => (
                  <button
                    key={d.email}
                    onClick={() => fillDemo(d.email)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border text-xs font-medium transition-all hover:shadow-sm ${d.color}`}
                  >
                    <span>{d.role}</span>
                    <span className="opacity-60 font-normal">{d.email}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="relative mb-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E5E7EB]" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-white text-xs text-[#667085]">o ingresa tus credenciales</span>
              </div>
            </div>

            {error && <div className="mb-4"><Alert type="error" message={error} onClose={() => setError("")} /></div>}

            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                label="Correo electrónico"
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                label="Contraseña"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                rightIcon={
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="hover:text-[#172033]">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                }
                required
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-[#E5E7EB] accent-[#3157D5]"
                  />
                  <span className="text-xs text-[#667085]">Recordarme</span>
                </label>
                <button type="button" className="text-xs text-[#3157D5] hover:underline">
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              <Button type="submit" className="w-full" size="lg" loading={loading}>
                Iniciar sesión
              </Button>
            </form>

            <p className="text-center text-xs text-[#667085] mt-5">
              ¿No tienes cuenta?{" "}
              <button onClick={onNavigateRegister} className="text-[#3157D5] font-medium hover:underline">
                Crear una cuenta
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Register ─────────────────────────────────────────────────────────────────
interface RegisterPageProps {
  onNavigateLogin: () => void;
}

export function RegisterPage({ onNavigateLogin }: RegisterPageProps) {
  const [form, setForm] = useState({ name: "", surname: "", email: "", password: "", confirm: "", role: "student" });
  const [showPass, setShowPass] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "El nombre es requerido.";
    if (!form.surname.trim()) e.surname = "El apellido es requerido.";
    if (!form.email.includes("@")) e.email = "Correo inválido.";
    if (form.password.length < 6) e.password = "Mínimo 6 caracteres.";
    if (form.password !== form.confirm) e.confirm = "Las contraseñas no coinciden.";
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 800);
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F9FC] p-6">
        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-10 max-w-sm w-full text-center">
          <div className="w-16 h-16 bg-[#ECFDF5] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-[#172033] mb-2">¡Cuenta creada!</h2>
          <p className="text-sm text-[#667085] mb-6">Tu cuenta ha sido creada correctamente. Ya puedes iniciar sesión.</p>
          <Button className="w-full" onClick={onNavigateLogin}>Iniciar sesión</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F9FC] p-6">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 justify-center mb-8">
          <div className="w-9 h-9 rounded-xl bg-[#3157D5] flex items-center justify-center">
            <GraduationCap size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold text-[#172033]">SkillHub</span>
        </div>

        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-[#172033]">Crear cuenta</h1>
            <p className="text-sm text-[#667085] mt-1">Únete a la comunidad SkillHub</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Nombre"
                placeholder="María"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                error={errors.name}
              />
              <Input
                label="Apellido"
                placeholder="González"
                value={form.surname}
                onChange={(e) => setForm({ ...form, surname: e.target.value })}
                error={errors.surname}
              />
            </div>
            <Input
              label="Correo electrónico"
              type="email"
              placeholder="correo@ejemplo.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              error={errors.email}
            />
            <Input
              label="Contraseña"
              type={showPass ? "text" : "password"}
              placeholder="Mínimo 6 caracteres"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              error={errors.password}
              rightIcon={
                <button type="button" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
            />
            <Input
              label="Confirmar contraseña"
              type="password"
              placeholder="Repite tu contraseña"
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              error={errors.confirm}
            />

            {/* Role selector */}
            <div>
              <p className="text-xs font-medium text-[#172033] mb-2">Rol</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: "student", label: "Estudiante", desc: "Aprende a tu ritmo" },
                  { value: "teacher", label: "Profesor", desc: "Comparte tu conocimiento" },
                ].map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setForm({ ...form, role: r.value })}
                    className={`p-3 rounded-xl border text-left transition-all ${form.role === r.value ? "border-[#3157D5] bg-[#EEF1FB]" : "border-[#E5E7EB] hover:border-[#3157D5]/50"}`}
                  >
                    <p className={`text-xs font-semibold ${form.role === r.value ? "text-[#3157D5]" : "text-[#172033]"}`}>{r.label}</p>
                    <p className="text-[10px] text-[#667085] mt-0.5">{r.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" loading={loading}>
              Crear cuenta
            </Button>
          </form>

          <p className="text-center text-xs text-[#667085] mt-5">
            ¿Ya tienes cuenta?{" "}
            <button onClick={onNavigateLogin} className="text-[#3157D5] font-medium hover:underline">
              Iniciar sesión
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
