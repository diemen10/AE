import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, Phone, Mail, Globe2, ArrowRight, Clock, ShieldCheck, MapPin, GraduationCap, Building2, Users, FileText } from "lucide-react";

// ——— QUICK SETTINGS ———
const BIZ = {
  nombre: "Tu Asesoría de Extranjería",
  ciudad: "Madrid",
  whatsapp: "+34123456789", // formato internacional
  email: "hola@tuextranjeria.com",
  slogan: "Trámites migratorios claros, rápidos y sin estrés",
  acento: "from-cyan-500 to-blue-600", // Tailwind gradient
};

const WA_LINK = `https://wa.me/${BIZ.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
  "Hola, quiero ayuda con mi trámite (visado de estudios / trabajo / arraigo / nacionalidad)."
)}`;

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-800">
      {/* NAV */}
      <nav className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`h-9 w-9 rounded-2xl bg-gradient-to-br ${BIZ.acento} shadow`} />
            <span className="font-semibold">{BIZ.nombre}</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#servicios" className="hover:text-slate-900">Servicios</a>
            <a href="#proceso" className="hover:text-slate-900">Cómo trabajamos</a>
            <a href="#faq" className="hover:text-slate-900">FAQ</a>
            <a href="#contacto" className="hover:text-slate-900">Contacto</a>
          </div>
          <div className="flex items-center gap-3">
            <a href={WA_LINK} target="_blank" rel="noreferrer">
              <Button className="rounded-2xl">WhatsApp</Button>
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="relative">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <Badge className="bg-slate-900 text-white rounded-full">{BIZ.ciudad} · Online</Badge>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold leading-tight">
              {BIZ.slogan}
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Somos especialistas en visados de estudios y trabajo, arraigos y nacionalidad para latinoamericanos. Te guiamos paso a paso y nos encargamos del papeleo.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={WA_LINK} target="_blank" rel="noreferrer">
                <Button size="lg" className="rounded-2xl">Hablar por WhatsApp <ArrowRight className="ml-2 h-4 w-4"/></Button>
              </a>
              <a href="#contacto">
                <Button size="lg" variant="outline" className="rounded-2xl">Solicitar llamada</Button>
              </a>
            </div>
            <div className="mt-6 flex items-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-2"><Clock className="h-4 w-4"/> Respuesta en &lt;24h</span>
              <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4"/> Trámite seguro</span>
              <span className="flex items-center gap-2"><MapPin className="h-4 w-4"/> {BIZ.ciudad} · Online</span>
            </div>
          </div>
          <div className="relative">
            <div className={`rounded-3xl p-1 bg-gradient-to-br ${BIZ.acento} shadow-xl`}>
              <div className="rounded-3xl bg-white p-6 md:p-8">
                <h3 className="font-semibold text-xl">¿Qué necesitas tramitar?</h3>
                <p className="text-slate-500 text-sm mt-1">Elige una opción y te contactamos hoy.</p>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {[
                    {title: "Visado estudios", icon: <GraduationCap className="h-4 w-4"/>},
                    {title: "Residencia y trabajo", icon: <Building2 className="h-4 w-4"/>},
                    {title: "Arraigo", icon: <Users className="h-4 w-4"/>},
                    {title: "Nacionalidad", icon: <FileText className="h-4 w-4"/>},
                  ].map((s, i) => (
                    <Card key={i} className="rounded-2xl cursor-pointer hover:shadow-md transition">
                      <CardContent className="p-4 flex items-center gap-2">
                        {s.icon}
                        <span className="text-sm">{s.title}</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <a href={WA_LINK} target="_blank" rel="noreferrer" className="block mt-4">
                  <Button className="w-full rounded-2xl">Quiero empezar ahora</Button>
                </a>
                <p className="text-[11px] text-slate-400 mt-2">Sin compromiso. Respuesta media en 2–6 h laborales.</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* TRUST / MARCAS */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center justify-between gap-6">
          {["Extranjería", "Universidades", "Consulados", "ONGs"].map((m) => (
            <div key={m} className="text-slate-400 text-sm">Socios: {m}</div>
          ))}
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="py-14 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold">Servicios y paquetes</h2>
          <p className="mt-2 text-slate-600">Precios orientativos. Pide tu presupuesto según tu caso.</p>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {[{
              title: "Visado de estudios",
              price: "desde 249€",
              bullets: [
                "Checklist de documentos",
                "Carta de motivación y revisión",
                "Cita consulado y seguimiento",
                "Trabajo 30h/semana (si aplica)",
              ],
            }, {
              title: "Cambio a residencia y trabajo",
              price: "desde 349€",
              bullets: [
                "Oferta de empleo y EX‑03",
                "Presentación telemática",
                "TIE y alta en Seguridad Social",
                "Soporte 30 días post‑aprobación",
              ],
            }, {
              title: "Arraigos / Nacionalidad",
              price: "desde 299€",
              bullets: [
                "Evaluación de vía legal",
                "Recolección de pruebas",
                "Presentación y recursos",
                "Acompañamiento completo",
              ],
            }].map((p, idx) => (
              <Card key={idx} className="rounded-3xl">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{p.title}</span>
                    <Badge className="rounded-full">{p.price}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {p.bullets.map((b, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <Check className="h-4 w-4 mt-0.5"/>
                      <span>{b}</span>
                    </div>
                  ))}
                  <a href={WA_LINK} target="_blank" rel="noreferrer" className="block pt-2">
                    <Button className="w-full rounded-2xl">Quiero este paquete</Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESO */}
      <section id="proceso" className="py-14 md:py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold">Cómo trabajamos</h2>
          <div className="grid md:grid-cols-4 gap-6 mt-8">
            {["Diagnóstico gratuito", "Plan a medida", "Presentación del expediente", "Acompañamiento hasta resolución"].map((step, i) => (
              <Card key={i} className="rounded-3xl">
                <CardContent className="p-6">
                  <div className={`h-10 w-10 rounded-2xl bg-gradient-to-br ${BIZ.acento} mb-4`} />
                  <h4 className="font-semibold mb-2">{i + 1}. {step}</h4>
                  <p className="text-sm text-slate-600">Explicamos requisitos, plazos reales y documentos. Nos ocupamos del papeleo y te mantenemos al día por WhatsApp.</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIOS (placeholder) */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold">Lo que dicen nuestros clientes</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {["Todo fue súper claro y rápido.", "Me ayudaron a cambiar de visado sin salir de España.", "Excelente comunicación por WhatsApp y resultados."].map((t, i) => (
              <Card key={i} className="rounded-3xl">
                <CardContent className="p-6 text-sm text-slate-600">“{t}”<div className="mt-3 text-xs text-slate-400">— Cliente verificado</div></CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-14 md:py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold">Preguntas frecuentes</h2>
          <Accordion type="single" collapsible className="mt-6">
            <AccordionItem value="q1">
              <AccordionTrigger>¿Puedo solicitar estudios estando en España como turista?</AccordionTrigger>
              <AccordionContent>Sí, si entraste legalmente y presentas la solicitud dentro de los primeros 60 días de tu estancia. Te guiamos en la cita y documentos.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger>¿Cuánto tardan en dar una cita en el consulado?</AccordionTrigger>
              <AccordionContent>Depende del país y la época del año. Recomendamos iniciar el proceso 60–90 días antes del inicio del curso.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3">
              <AccordionTrigger>¿Puedo trabajar con visado de estudios?</AccordionTrigger>
              <AccordionContent>Con la normativa vigente, hasta 30 horas semanales si tus estudios lo permiten. Te explicamos los detalles según tu caso.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="py-14 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Agenda una llamada</h2>
            <p className="mt-2 text-slate-600">Cuéntanos tu caso y te damos un plan claro con pasos y presupuesto.</p>
            <div className="mt-6 space-y-3 text-slate-600 text-sm">
              <div className="flex items-center gap-2"><Phone className="h-4 w-4"/> WhatsApp: <a className="underline" href={WA_LINK} target="_blank" rel="noreferrer">{BIZ.whatsapp}</a></div>
              <div className="flex items-center gap-2"><Mail className="h-4 w-4"/> Email: <a className="underline" href={`mailto:${BIZ.email}`}>{BIZ.email}</a></div>
              <div className="flex items-center gap-2"><Globe2 className="h-4 w-4"/> Atención en {BIZ.ciudad} y online.</div>
            </div>
          </div>
          <Card className="rounded-3xl">
            <CardHeader>
              <CardTitle>Formulario de contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input placeholder="Nombre y apellidos" />
              <Input placeholder="Email" type="email" />
              <Input placeholder="Teléfono / WhatsApp" />
              <Textarea placeholder="Cuéntanos tu caso (ej. visado de estudios desde Bogotá en septiembre)" rows={5} />
              <Button className="w-full rounded-2xl">Enviar</Button>
              <p className="text-[11px] text-slate-400">Al enviar aceptas nuestra política de privacidad. Te contactaremos por email o WhatsApp.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <div className={`h-7 w-7 rounded-xl bg-gradient-to-br ${BIZ.acento}`} />
            <span>{BIZ.nombre} © {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#">Aviso legal</a>
            <a href="#">Privacidad</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
