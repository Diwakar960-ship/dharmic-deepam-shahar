import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import heroImg from "@/assets/hero-divine.jpg";
import { Diya, Lotus, Om } from "@/components/Diya";
import { FloatingPetals } from "@/components/FloatingPetals";
import { PACKAGES, waLink } from "@/lib/whatsapp";
import { Star, MapPin, Phone, Facebook, Youtube, MessageCircle, X, Calendar, Users, Sparkles, Camera, Plus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "धीरज पांडेय — शाहपुर घराना | भक्ति की आवाज़" },
      { name: "description", content: "धीरज पांडेय — शाहपुर घराना के प्रसिद्ध भजन गायक। भजन संध्या, सुंदरकांड, जागरात, अखंड रामायण, तिलक महोत्सव। पटना, बिहार के सभी जिलों में बुकिंग उपलब्ध।" },
      { property: "og:title", content: "धीरज पांडेय — शाहपुर घराना" },
      { property: "og:description", content: "भक्ति की आवाज़ — 10+ वर्षों का अनुभव, 1000+ कार्यक्रम।" },
    ],
  }),
  component: Home,
});

const SERVICES = [
  { icon: "🪔", title: "भजन संध्या", desc: "मधुर भजनों की दिव्य संध्या" },
  { icon: "📖", title: "सुंदरकांड पाठ", desc: "श्री रामचरितमानस का पावन पाठ" },
  { icon: "🌙", title: "जागरात / रात्रि जागरण", desc: "माता रानी की भव्य जागरण" },
  { icon: "📿", title: "अखंड रामायण", desc: "24 घंटे का अखंड पाठ" },
  { icon: "💍", title: "तिलक महोत्सव / विवाह संस्कार", desc: "मांगलिक अवसरों का संगीत" },
  { icon: "🙏", title: "नवरात्रि जागरण", desc: "9 रातों का दिव्य आयोजन" },
  { icon: "🎶", title: "कीर्तन एवं चालीसा पाठ", desc: "हनुमान, दुर्गा, शिव चालीसा" },
  { icon: "🎊", title: "जन्माष्टमी, हनुमान जयंती", desc: "विशेष पर्व कार्यक्रम" },
  { icon: "🕯️", title: "निर्गुण संगीत", desc: "बिहार की पवित्र परंपरा — निर्गुण संगीत" },
];

interface Review {
  name: string;
  rating: number;
  text: string;
  date: string;
}

function Home() {
  return (
    <div className="relative overflow-x-hidden">
      <FloatingPetals />
      <Header />
      <Hero />
      <About />
      <Services />
      <Packages />
      <Portfolio />
      <Reviews />
      <Contact />
      <Footer />
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#home", label: "मुख्य" },
    { href: "#about", label: "हमारे बारे में" },
    { href: "#services", label: "सेवाएं" },
    { href: "#packages", label: "पैकेज" },
    { href: "#portfolio", label: "पोर्टफोलियो" },
    { href: "#contact", label: "संपर्क" },
  ];
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-cream/80 border-b border-saffron/20">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <a href="#home" className="flex items-center gap-2">
          <Om size={32} />
          <div className="leading-tight">
            <div className="font-display text-lg text-maroon">धीरज पांडेय</div>
            <div className="text-[10px] tracking-widest text-saffron-deep">शाहपुर घराना</div>
          </div>
        </a>
        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-maroon hover:text-saffron transition">
              {l.label}
            </a>
          ))}
        </nav>
        <Link to="/booking" className="hidden md:inline-flex btn-divine text-sm">
          <Sparkles size={16} /> अभी बुक करें
        </Link>
        <button className="lg:hidden p-2 text-maroon" onClick={() => setOpen(!open)}>
          {open ? <X /> : <span className="text-2xl">☰</span>}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-saffron/20 bg-cream px-4 py-4 space-y-3">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block text-maroon font-medium">
              {l.label}
            </a>
          ))}
          <Link to="/booking" className="btn-divine w-full justify-center">अभी बुक करें</Link>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      <img
        src={heroImg}
        alt="दिव्य दीप और कमल"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-cream/30 via-cream/40 to-cream/85" />
      <div className="absolute inset-0 mandala-bg opacity-50" />

      {/* Decorative diyas */}
      <div className="absolute bottom-10 left-6 md:left-16"><Diya size={56} /></div>
      <div className="absolute bottom-10 right-6 md:right-16"><Diya size={56} /></div>
      <div className="absolute top-1/2 left-4 hidden md:block opacity-50"><Lotus size={50} className="animate-spin-slow" /></div>
      <div className="absolute top-1/3 right-4 hidden md:block opacity-50"><Lotus size={40} className="animate-spin-slow" /></div>

      <div className="relative z-10 text-center px-4 max-w-4xl animate-fade-up">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="h-px w-12 bg-saffron" />
          <Om size={28} />
          <span className="text-saffron-deep tracking-[0.4em] text-xs">शाहपुर घराना</span>
          <Om size={28} />
          <span className="h-px w-12 bg-saffron" />
        </div>
        <h1
          className="text-gradient-divine font-display"
          style={{ fontSize: "clamp(2.8rem, 8vw, 6rem)", lineHeight: 1.1 }}
        >
          धीरज पांडेय
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-maroon font-display">
          भक्ति की आवाज़ — शाहपुर घराना
        </p>
        <p className="mt-3 text-base md:text-lg text-deep-maroon/80 max-w-2xl mx-auto">
          पटना, बिहार से दिव्य भजन, सुंदरकांड एवं समस्त धार्मिक आयोजन की सेवा
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link to="/booking" className="btn-divine animate-pulse-glow text-base">
            <Sparkles size={18} /> अभी बुक करें
          </Link>
          <a href="#packages" className="btn-outline-gold">पैकेज देखें</a>
        </div>
        <div className="mt-10 grid grid-cols-3 gap-4 max-w-xl mx-auto text-center">
          <Stat label="वर्षों का अनुभव" value="10+" />
          <Stat label="कार्यक्रम" value="1000+" />
          <Stat label="बिहार के जिले" value="38" />
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="divine-border rounded-2xl px-3 py-4 bg-cream/70">
      <div className="text-2xl md:text-3xl font-display text-saffron-deep">{value}</div>
      <div className="text-xs md:text-sm text-maroon mt-1">{label}</div>
    </div>
  );
}

function SectionHeader({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="text-center mb-12">
      <h2 className="section-title">{children}</h2>
      {sub && <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">{sub}</p>}
    </div>
  );
}

function About() {
  return (
    <section id="about" className="relative py-20 md:py-28">
      <div className="container mx-auto px-4">
        <SectionHeader sub="भक्ति, परंपरा एवं संगीत की त्रिवेणी">हमारे बारे में</SectionHeader>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-saffron/20 to-gold/30 rounded-3xl blur-2xl" />
            <PhotoUpload />
            <div className="absolute -bottom-6 -right-6 bg-cream divine-border rounded-2xl px-5 py-3 shadow-lg">
              <div className="text-xs text-maroon">शाहपुर घराना</div>
              <div className="font-display text-saffron-deep">परंपरा से जुड़ाव</div>
            </div>
          </div>
          <div className="space-y-5">
            <h3 className="font-display text-3xl text-maroon">श्री धीरज पांडेय जी</h3>
            <p className="text-deep-maroon/85 leading-relaxed">
              शाहपुर घराने की समृद्ध संगीत परंपरा से निकले श्री धीरज पांडेय जी पिछले
              <span className="font-semibold text-saffron-deep"> 10 वर्षों </span>
              से अधिक समय से भक्ति संगीत की सेवा में समर्पित हैं। पटना, बिहार में रहकर उन्होंने
              <span className="font-semibold text-saffron-deep"> 1000 से अधिक कार्यक्रमों </span>
              में अपनी मधुर वाणी से लाखों श्रद्धालुओं के हृदय में भक्ति की ज्योति प्रज्वलित की है।
            </p>
            <p className="text-deep-maroon/85 leading-relaxed">
              भजन संध्या से लेकर अखंड रामायण, सुंदरकांड पाठ, जागरात, तिलक महोत्सव एवं समस्त
              हिंदू धार्मिक अनुष्ठानों में उनकी संगीतमय प्रस्तुति श्रद्धा और शक्ति का संचार करती है।
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                { i: "🪔", t: "शाहपुर घराना" },
                { i: "📍", t: "पटना, बिहार" },
                { i: "🎶", t: "1000+ कार्यक्रम" },
                { i: "🙏", t: "10+ वर्ष अनुभव" },
              ].map((x) => (
                <div key={x.t} className="divine-border bg-cream rounded-xl px-4 py-3 flex items-center gap-2">
                  <span className="text-2xl">{x.i}</span>
                  <span className="text-maroon font-medium">{x.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="relative py-20 md:py-28 bg-gradient-to-b from-cream to-cream-deep mandala-bg">
      <div className="container mx-auto px-4">
        <SectionHeader sub="समस्त हिंदू धार्मिक आयोजनों की पूर्ण सेवा">कार्यक्रम सेवाएं</SectionHeader>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <div
              key={s.title}
              className={
                s.solemn
                  ? "rounded-2xl p-6 group hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-cream to-cream-deep border border-deep-maroon/15 shadow-sm sm:col-span-2 lg:col-span-3"
                  : "divine-border bg-cream rounded-2xl p-6 group hover:-translate-y-1 transition-all duration-300"
              }
              style={{ animation: `fade-up 0.6s ease-out ${i * 0.05}s both` }}
            >
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">{s.icon}</div>
              <h3 className="font-display text-xl text-maroon mb-1">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
              {s.body && (
                <p className="mt-4 text-sm text-deep-maroon/85 leading-relaxed border-t border-deep-maroon/10 pt-4">
                  {s.body}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Packages() {
  return (
    <section id="packages" className="relative py-20 md:py-28">
      <div className="container mx-auto px-4">
        <SectionHeader sub="अपने आयोजन के अनुरूप उपयुक्त पैकेज चुनें">पैकेज चुनें</SectionHeader>
        <div className="grid md:grid-cols-3 gap-7">
          {PACKAGES.map((p) => (
            <div key={p.id} className={`package-card divine-border ${p.popular ? "ring-2 ring-saffron/60" : ""}`}>
              {p.popular && (
                <div className="absolute top-4 right-4 bg-saffron-deep text-cream text-[10px] font-semibold tracking-wider px-3 py-1 rounded-full">
                  लोकप्रिय
                </div>
              )}
              <div className="text-5xl mb-2">{p.tier}</div>
              <h3 className="font-display text-2xl text-maroon">{p.title}</h3>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-4xl font-display text-saffron-deep">{p.price}</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="bg-gold/30 text-deep-maroon px-3 py-1 rounded-full flex items-center gap-1"><Calendar size={12} /> {p.duration}</span>
                <span className="bg-saffron/15 text-deep-maroon px-3 py-1 rounded-full flex items-center gap-1"><Users size={12} /> {p.team}</span>
              </div>
              <ul className="mt-5 space-y-2 text-sm text-deep-maroon">
                {p.members.map((m) => (
                  <li key={m} className="flex items-start gap-2">
                    <span className="text-saffron-deep mt-1">✦</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 pt-4 border-t border-saffron/20">
                <div className="text-xs text-muted-foreground mb-1">उपलब्ध कार्यक्रम:</div>
                <div className="text-sm text-maroon">{p.events}</div>
                {p.note && <div className="mt-2 text-xs text-saffron-deep italic">{p.note}</div>}
              </div>
              <Link
                to="/booking"
                search={{ pkg: p.id }}
                className="btn-divine w-full justify-center mt-6 animate-pulse-glow"
              >
                इस पैकेज को बुक करें
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const PORTFOLIO_STORAGE_KEY = "dp_portfolio_photos";

function Portfolio() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
      if (stored) setPhotos(JSON.parse(stored));
    } catch {}
  }, []);

  const persist = (next: string[]) => {
    setPhotos(next);
    try {
      localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(next));
    } catch {}
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files) return;
    const readers = Array.from(files).map(
      (f) =>
        new Promise<string>((res, rej) => {
          const r = new FileReader();
          r.onload = () => res(String(r.result));
          r.onerror = rej;
          r.readAsDataURL(f);
        }),
    );
    const urls = await Promise.all(readers);
    persist([...urls, ...photos]);
  };

  const remove = (idx: number) => persist(photos.filter((_, i) => i !== idx));

  return (
    <section id="portfolio" className="relative py-20 md:py-28 bg-gradient-to-b from-cream-deep to-cream">
      <div className="container mx-auto px-4">
        <SectionHeader sub="पवित्र क्षणों की दिव्य झलकियाँ">पोर्टफोलियो</SectionHeader>

        <div className="flex justify-center mb-10">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              handleFiles(e.target.files);
              if (inputRef.current) inputRef.current.value = "";
            }}
          />
          <button
            onClick={() => inputRef.current?.click()}
            className="btn-divine animate-pulse-glow text-base"
          >
            <Plus size={20} /> फ़ोटो जोड़ें
          </button>
        </div>

        {photos.length === 0 ? (
          <div className="divine-border bg-cream rounded-3xl py-20 text-center text-muted-foreground">
            <Camera size={48} className="mx-auto mb-4 text-saffron-deep/60" />
            <p>अभी कोई फ़ोटो नहीं। ऊपर "फ़ोटो जोड़ें" बटन से अपनी पहली तस्वीर जोड़ें।</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
            {photos.map((img, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl divine-border aspect-square"
              >
                <button
                  type="button"
                  onClick={() => setLightbox(img)}
                  className="absolute inset-0 w-full h-full"
                  aria-label={`फ़ोटो ${i + 1} देखें`}
                >
                  <img
                    src={img}
                    alt={`कार्यक्रम ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </button>
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="absolute top-2 right-2 w-9 h-9 rounded-full bg-deep-maroon/85 text-cream flex items-center justify-center hover:bg-deep-maroon shadow-lg z-10"
                  aria-label="फ़ोटो हटाएं"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-deep-maroon/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-6 right-6 text-cream p-2"><X size={28} /></button>
          <img src={lightbox} alt="विस्तार" className="max-w-full max-h-[90vh] rounded-2xl divine-border" />
        </div>
      )}
    </section>
  );
}

const ARTIST_PHOTO_KEY = "dp_artist_photo";

function PhotoUpload() {
  const [photo, setPhoto] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const v = localStorage.getItem(ARTIST_PHOTO_KEY);
      if (v) setPhoto(v);
    } catch {}
  }, []);

  const onFile = (file?: File) => {
    if (!file) return;
    const r = new FileReader();
    r.onload = () => {
      const url = String(r.result);
      setPhoto(url);
      try {
        localStorage.setItem(ARTIST_PHOTO_KEY, url);
      } catch {}
    };
    r.readAsDataURL(file);
  };

  return (
    <div className="relative divine-border rounded-3xl overflow-hidden bg-cream-deep">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          onFile(e.target.files?.[0]);
          if (inputRef.current) inputRef.current.value = "";
        }}
      />
      {photo ? (
        <>
          <img src={photo} alt="धीरज पांडेय" className="w-full h-[500px] object-cover" />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 btn-divine text-sm"
          >
            <Camera size={16} /> फ़ोटो बदलें
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full h-[500px] flex flex-col items-center justify-center gap-4 text-maroon hover:bg-cream transition"
        >
          <Camera size={56} className="text-saffron-deep" />
          <span className="btn-divine text-base">📷 फ़ोटो अपलोड करें</span>
          <span className="text-xs text-muted-foreground">अपने गैलरी से तस्वीर चुनें</span>
        </button>
      )}
    </div>
  );
}

function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("dp_reviews");
      if (stored) setReviews(JSON.parse(stored));
      else
        setReviews([
          { name: "रमेश कुमार, गया", rating: 5, text: "धीरज जी का भजन संध्या कार्यक्रम अद्भुत था। पूरा वातावरण भक्तिमय हो गया।", date: "2024-11-12" },
          { name: "सुनीता देवी, मुजफ्फरपुर", rating: 5, text: "सुंदरकांड पाठ बहुत ही श्रद्धा से हुआ। ईश्वर इन्हें सदा शक्ति दें।", date: "2024-10-05" },
          { name: "अजय सिंह, पटना", rating: 5, text: "तिलक महोत्सव में सर्वश्रेष्ठ प्रस्तुति। हम बहुत खुश हैं।", date: "2024-09-18" },
        ]);
    } catch {}
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    const r: Review = { name, rating, text, date: new Date().toISOString().slice(0, 10) };
    const next = [r, ...reviews];
    setReviews(next);
    localStorage.setItem("dp_reviews", JSON.stringify(next));
    setName(""); setText(""); setRating(5);
  };

  return (
    <section id="reviews" className="relative py-20 md:py-28">
      <div className="container mx-auto px-4">
        <SectionHeader sub="हमारे श्रद्धालु क्या कहते हैं">समीक्षाएं एवं प्रतिक्रिया</SectionHeader>
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {reviews.slice(0, 6).map((r, i) => (
            <div key={i} className="divine-border bg-cream rounded-2xl p-6">
              <div className="flex gap-1 mb-2">
                {Array.from({ length: r.rating }).map((_, k) => (
                  <Star key={k} size={16} className="fill-saffron text-saffron" />
                ))}
              </div>
              <p className="text-deep-maroon/85 text-sm leading-relaxed">"{r.text}"</p>
              <div className="mt-4 pt-4 border-t border-saffron/20 flex items-center justify-between">
                <div className="font-medium text-maroon text-sm">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.date}</div>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={submit} className="max-w-2xl mx-auto divine-border bg-cream rounded-3xl p-6 md:p-8">
          <h3 className="font-display text-2xl text-maroon mb-4">अपनी समीक्षा लिखें</h3>
          <div className="space-y-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="आपका नाम एवं स्थान"
              className="w-full px-4 py-3 rounded-xl bg-cream-deep border border-saffron/30 focus:outline-none focus:border-saffron text-maroon"
            />
            <div className="flex items-center gap-2">
              <span className="text-sm text-maroon">रेटिंग:</span>
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} type="button" onClick={() => setRating(n)}>
                  <Star size={22} className={n <= rating ? "fill-saffron text-saffron" : "text-saffron/30"} />
                </button>
              ))}
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              rows={4}
              placeholder="अपना अनुभव साझा करें..."
              className="w-full px-4 py-3 rounded-xl bg-cream-deep border border-saffron/30 focus:outline-none focus:border-saffron text-maroon resize-none"
            />
            <button type="submit" className="btn-divine w-full justify-center">समीक्षा प्रस्तुत करें</button>
          </div>
        </form>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative py-20 md:py-28 bg-gradient-to-b from-cream to-cream-deep">
      <div className="container mx-auto px-4">
        <SectionHeader sub="किसी भी जानकारी के लिए संपर्क करें">संपर्क करें</SectionHeader>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <ContactCard icon={<MapPin />} title="स्थान" detail="पटना, बिहार — बिहार के सभी जिलों में बुकिंग उपलब्ध" />
            <ContactCard
              icon={<MessageCircle />}
              title="WhatsApp"
              detail="8539976521"
              action={<a href={waLink("नमस्ते धीरज जी, मुझे आपसे एक कार्यक्रम के विषय में बात करनी है।")} target="_blank" rel="noopener noreferrer" className="btn-divine text-sm">WhatsApp पर संदेश भेजें</a>}
            />
            <ContactCard icon={<Phone />} title="कॉल करें" detail="+91 85399 76521" />
            <Link to="/booking" className="btn-divine w-full justify-center mt-2">
              <Sparkles size={18} /> अभी बुकिंग फॉर्म भरें
            </Link>
          </div>
          <div className="divine-border rounded-3xl overflow-hidden bg-cream">
            <iframe
              title="पटना, बिहार"
              src="https://www.google.com/maps?q=Patna,Bihar&output=embed"
              className="w-full h-full min-h-[400px]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCard({ icon, title, detail, action }: { icon: React.ReactNode; title: string; detail: string; action?: React.ReactNode }) {
  return (
    <div className="divine-border bg-cream rounded-2xl p-5 flex items-start gap-4">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-saffron to-gold text-cream flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <div className="font-display text-lg text-maroon">{title}</div>
        <div className="text-deep-maroon/80 text-sm">{detail}</div>
        {action && <div className="mt-3">{action}</div>}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-deep-maroon to-[oklch(0.22_0.10_22)] text-cream pt-16 pb-8 mt-12">
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-saffron via-gold to-saffron" />
      <div className="container mx-auto px-4">
        <div className="text-center">
          <Om size={48} className="!text-gold" />
          <h3 className="font-display text-3xl mt-2 text-gradient-divine">धीरज पांडेय</h3>
          <p className="text-gold/80 tracking-[0.3em] text-xs mt-1">शाहपुर घराना</p>
          <p className="mt-4 text-cream/70 text-sm max-w-md mx-auto">
            "संगीतेन विना नैव गीतं, गीतेन विना नैव भक्तिः"
          </p>

          <div className="mt-8 flex justify-center gap-5">
            <SocialIcon href={waLink("नमस्ते धीरज जी")} label="WhatsApp" color="oklch(0.65 0.18 145)">
              <MessageCircle size={26} />
            </SocialIcon>
            <SocialIcon href="https://www.facebook.com/share/1DKJzQgeug/" label="Facebook" color="oklch(0.55 0.20 260)">
              <Facebook size={26} />
            </SocialIcon>
            <SocialIcon href="https://youtube.com/@pinkupremi1354?si=PNbCkxk8Np9OOT8j" label="YouTube" color="oklch(0.55 0.25 25)">
              <Youtube size={26} />
            </SocialIcon>
          </div>

          <div className="mt-10 pt-6 border-t border-gold/20 text-xs text-cream/60">
            <p>© {new Date().getFullYear()} धीरज पांडेय — शाहपुर घराना | पटना, बिहार</p>
            <p className="mt-1">सर्वाधिकार सुरक्षित | बिहार के सभी जिलों में सेवा उपलब्ध</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ href, label, color, children }: { href: string; label: string; color: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-14 h-14 rounded-full flex items-center justify-center text-cream transition-all hover:scale-110"
      style={{
        background: `linear-gradient(135deg, ${color}, oklch(0.45 0.18 30))`,
        boxShadow: `0 0 24px ${color}, 0 8px 20px -6px oklch(0 0 0 / 0.4)`,
      }}
    >
      {children}
    </a>
  );
}
