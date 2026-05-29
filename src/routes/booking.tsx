import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { BIHAR_DISTRICTS, EVENT_TYPES, PACKAGES, waLink } from "@/lib/whatsapp";
import { Diya, Om } from "@/components/Diya";
import { FloatingPetals } from "@/components/FloatingPetals";
import { ArrowLeft, CheckCircle2, MessageCircle, Sparkles, X } from "lucide-react";

const search = z.object({ pkg: z.string().optional() });

export const Route = createFileRoute("/booking")({
  validateSearch: (s) => search.parse(s),
  head: () => ({
    meta: [
      { title: "बुकिंग फॉर्म — धीरज पांडेय" },
      { name: "description", content: "अपने कार्यक्रम के लिए धीरज पांडेय जी की बुकिंग करें।" },
    ],
  }),
  component: BookingPage,
});

function BookingPage() {
  const { pkg } = Route.useSearch();
  const navigate = useNavigate();
  const initialPkg = PACKAGES.find((p) => p.id === pkg)?.title ?? "";

  const [form, setForm] = useState({
    name: "",
    district: "",
    village: "",
    phone: "",
    pkg: initialPkg,
    date: "",
    eventType: "",
    info: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = [
      "🙏 *नई बुकिंग अनुरोध* 🙏",
      "",
      `*नाम:* ${form.name}`,
      `*जिला:* ${form.district}`,
      `*गांव/शहर:* ${form.village}`,
      `*संपर्क:* ${form.phone}`,
      `*चयनित पैकेज:* ${form.pkg || "—"}`,
      `*तिथि:* ${form.date}`,
      `*कार्यक्रम का प्रकार:* ${form.eventType}`,
      `*अतिरिक्त जानकारी:* ${form.info || "—"}`,
      "",
      "— धीरज पांडेय वेबसाइट से",
    ].join("\n");
    window.open(waLink(msg), "_blank");
    setSubmitted(true);
    setShowPayment(true);
  };

  const inputCls = "w-full px-4 py-3 rounded-xl bg-cream border border-saffron/30 focus:outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20 text-maroon transition";

  return (
    <div className="relative min-h-screen py-10 md:py-16 mandala-bg">
      <FloatingPetals count={8} />
      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-maroon hover:text-saffron mb-6 text-sm">
          <ArrowLeft size={16} /> मुख्य पृष्ठ पर लौटें
        </Link>

        <div className="text-center mb-8">
          <div className="flex justify-center mb-2"><Om size={40} /></div>
          <h1 className="section-title">बुकिंग फॉर्म</h1>
          <p className="mt-4 text-muted-foreground">कृपया नीचे दिए गए विवरण भरें — हम शीघ्र संपर्क करेंगे।</p>
        </div>

        <div className="divine-border bg-cream rounded-3xl p-6 md:p-10 relative">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2"><Diya size={48} /></div>

          <form onSubmit={submit} className="space-y-5 mt-4">
            <div className="grid md:grid-cols-2 gap-5">
              <Field label="पूरा नाम *">
                <input required value={form.name} onChange={(e) => update("name", e.target.value)} className={inputCls} placeholder="आपका नाम" />
              </Field>
              <Field label="संपर्क नंबर *">
                <input required type="tel" pattern="[0-9]{10}" maxLength={10} value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputCls} placeholder="10 अंकों का मोबाइल नंबर" />
              </Field>
              <Field label="जिला (बिहार) *">
                <select required value={form.district} onChange={(e) => update("district", e.target.value)} className={inputCls}>
                  <option value="">— चुनें —</option>
                  {BIHAR_DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </Field>
              <Field label="गांव / शहर *">
                <input required value={form.village} onChange={(e) => update("village", e.target.value)} className={inputCls} placeholder="गांव/शहर का नाम" />
              </Field>
              <Field label="चयनित पैकेज">
                <select value={form.pkg} onChange={(e) => update("pkg", e.target.value)} className={inputCls}>
                  <option value="">— चुनें —</option>
                  {PACKAGES.map((p) => <option key={p.id} value={p.title}>{p.title} ({p.price})</option>)}
                </select>
              </Field>
              <Field label="कार्यक्रम की तिथि *">
                <input required type="date" value={form.date} onChange={(e) => update("date", e.target.value)} className={inputCls} />
              </Field>
            </div>
            <Field label="कार्यक्रम का प्रकार *">
              <select required value={form.eventType} onChange={(e) => update("eventType", e.target.value)} className={inputCls}>
                <option value="">— चुनें —</option>
                {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="अतिरिक्त जानकारी">
              <textarea rows={4} value={form.info} onChange={(e) => update("info", e.target.value)} className={`${inputCls} resize-none`} placeholder="कोई विशेष आवश्यकता, समय, संख्या आदि..." />
            </Field>

            <button type="submit" className="btn-divine w-full justify-center text-lg animate-pulse-glow">
              <Sparkles size={20} /> बुकिंग कन्फर्म करें
            </button>
            <p className="text-xs text-center text-muted-foreground">
              यह विवरण WhatsApp के माध्यम से धीरज जी को भेजा जाएगा।
            </p>
          </form>
        </div>
      </div>

      {submitted && !showPayment && (
        <div className="fixed bottom-6 right-6 z-50 divine-border bg-cream rounded-2xl px-5 py-4 flex items-center gap-3 shadow-divine animate-fade-up">
          <CheckCircle2 className="text-saffron-deep" />
          <span className="text-maroon font-medium">WhatsApp खुल रहा है...</span>
        </div>
      )}

      {showPayment && (
        <div className="fixed inset-0 z-[100] bg-deep-maroon/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-up">
          <div className="divine-border bg-cream rounded-3xl max-w-md w-full p-8 relative">
            <button onClick={() => { setShowPayment(false); navigate({ to: "/" }); }} className="absolute top-4 right-4 text-maroon">
              <X />
            </button>
            <div className="text-center">
              <Diya size={56} className="mx-auto" />
              <h3 className="font-display text-2xl text-maroon mt-3">अग्रिम भुगतान</h3>
              <p className="text-deep-maroon/80 mt-3 text-sm">
                बुकिंग की पुष्टि हेतु अग्रिम भुगतान के लिए QR कोड या UPI ID प्राप्त करें।
              </p>
              <a
                href={waLink("नमस्ते धीरज जी, कृपया अग्रिम भुगतान के लिए अपना QR कोड या UPI ID भेजें।")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-divine w-full justify-center mt-6"
                onClick={() => setTimeout(() => navigate({ to: "/" }), 500)}
              >
                <MessageCircle size={18} /> WhatsApp पर QR / UPI मांगें
              </a>
              <button onClick={() => { setShowPayment(false); navigate({ to: "/" }); }} className="btn-outline-gold w-full justify-center mt-3">
                बाद में करें
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-maroon mb-1.5 block">{label}</span>
      {children}
    </label>
  );
}
