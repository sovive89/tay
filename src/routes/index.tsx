import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarDays, Check, ChevronRight, House, Minus, Plus, Search, ShoppingBag, UserRound } from "lucide-react";
import logoAsset from "@/assets/salamandra-logo.png.asset.json";
import candleImage from "@/assets/vela-intencao.jpg";
import ritualCandlesImage from "@/assets/velas-rituais.jpg";
import cleansingKitImage from "@/assets/kit-defumacao.jpg";

type View = "inicio" | "loja" | "agenda" | "clientes" | "perfil";

const products = [
  { name: "Trio de Velas Rituais", category: "Velas artesanais", price: "R$ 84", value: 84, image: ritualCandlesImage },
  { name: "Vela Botânica", category: "Ervas & ceras", price: "R$ 68", value: 68, image: candleImage },
  { name: "Vela de Defumação", category: "Amuletos", price: "R$ 72", value: 72, image: cleansingKitImage },
];

const appointments = [
  { day: "Hoje", time: "16:30", name: "Beatriz Silva", service: "Ritual de Argila", status: "Confirmado" },
  { day: "Amanhã", time: "10:00", name: "Mariana Lins", service: "Massoterapia", status: "Agendado" },
  { day: "18 Out", time: "14:00", name: "Lucas Rocha", service: "Terapia Integrativa", status: "Agendado" },
];

const clients = [
  { initials: "ML", name: "Mariana Lins", note: "Interesse em cerâmica fria", last: "Há 2 dias" },
  { initials: "BS", name: "Beatriz Silva", note: "Próxima sessão hoje", last: "Hoje" },
  { initials: "LR", name: "Lucas Rocha", note: "Acompanhar evolução", last: "12 out" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Salamandra da Mata — Ateliê, terapias e cuidado" },
      { name: "description", content: "Uma experiência integrada para descobrir peças artesanais, agendar terapias e acompanhar clientes." },
      { property: "og:title", content: "Salamandra da Mata" },
      { property: "og:description", content: "Ateliê autoral, terapias integrativas e cuidado em um só lugar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function BrandHeader({ label }: { label?: string }) {
  return (
    <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center border-b border-border px-5 pb-4 pt-5 sm:flex sm:justify-between sm:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <img src={logoAsset.url} alt="Salamandra da Mata" className="size-10 shrink-0 rounded-full object-cover" width={512} height={512} />
        <div className="min-w-0">
          <p className="truncate font-display text-lg italic leading-none">salamandra da mata</p>
          <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.2em] text-muted-foreground">Ateliê autoral</p>
        </div>
      </div>
      {label ? <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">{label}</span> : <div className="h-px w-8 bg-foreground/30" />}
    </header>
  );
}

function SectionTitle({ title, meta }: { title: string; meta: string }) {
  return <div className="mb-6 flex items-baseline justify-between gap-4"><h2 className="font-display text-3xl italic">{title}</h2><span className="shrink-0 font-mono text-[9px] uppercase text-muted-foreground">{meta}</span></div>;
}

function HomeView({ navigate }: { navigate: (view: View) => void }) {
  const [confirmed, setConfirmed] = useState(false);
  return <>
    <BrandHeader />
    <main>
      <section className="animate-reveal px-6 py-9 sm:px-8">
        <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">Presença · matéria · cuidado</p>
        <h1 className="max-w-[9ch] text-balance font-display text-[2.8rem] italic leading-[1.04]">O tempo das <span className="text-primary">mãos</span> no agora.</h1>
        <p className="mt-6 max-w-[30ch] text-[15px] leading-relaxed text-muted-foreground">Um espaço aberto para a arte, onde o mistério do coração se expressa em argila, ervas e intenção.</p>
      </section>

      <section className="animate-reveal px-6 [animation-delay:120ms] sm:px-8">
        <div className="rounded-sm bg-foreground p-5 text-background ring-1 ring-foreground">
          <div className="mb-5 flex items-start justify-between"><span className="font-mono text-[9px] uppercase tracking-[0.14em] opacity-60">Agenda / Hoje</span><span className="size-2 rounded-full bg-primary" /></div>
          <p className="font-display text-2xl italic">Ritual de Argila</p><p className="mt-1 text-sm opacity-70">Com Beatriz Silva — 16:30</p>
          <button onClick={() => setConfirmed(true)} className="mt-6 flex w-full items-center justify-center gap-2 border border-background/20 py-3 text-[10px] font-medium uppercase tracking-[0.15em] transition-colors hover:bg-background hover:text-foreground" aria-label="Confirmar presença">
            {confirmed && <Check className="size-3.5" />} {confirmed ? "Presença confirmada" : "Confirmar presença"}
          </button>
        </div>
      </section>

      <section className="animate-reveal mt-12 [animation-delay:240ms]">
        <div className="px-6 sm:px-8"><SectionTitle title="Coleção Raízes" meta="Loja (03)" /></div>
        <div className="no-scrollbar flex snap-x gap-4 overflow-x-auto px-6 pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-8">
          {products.map((product) => <button key={product.name} onClick={() => navigate("loja")} className="w-[68vw] max-w-[220px] flex-none snap-start text-left sm:w-auto sm:max-w-none">
            <img src={product.image} alt={product.name} className="aspect-[4/5] w-full rounded-sm object-cover" loading="lazy" width={800} height={1000} />
            <p className="mt-3 text-[13px] font-medium">{product.name}</p><p className="mt-1 font-mono text-[10px] text-primary">{product.price}</p>
          </button>)}
        </div>
      </section>

      <section className="animate-reveal mb-8 mt-14 px-6 [animation-delay:360ms] sm:px-8">
        <div className="border-t border-border pt-6"><div className="mb-5 flex items-center justify-between"><h2 className="font-display text-2xl italic text-muted-foreground">Notas do Ateliê</h2><button onClick={() => navigate("clientes")} className="text-[11px] text-primary underline underline-offset-4">Ver todas</button></div>
          <button onClick={() => navigate("clientes")} className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-sm border border-border p-3 text-left"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary font-mono text-[10px]">ML</span><span className="min-w-0"><span className="block truncate text-[13px] font-medium">Mariana Lins</span><span className="block truncate text-[11px] text-muted-foreground">Interesse em cerâmica fria</span></span><ChevronRight className="size-4 text-muted-foreground" /></button>
        </div>
      </section>
    </main>
  </>;
}

function ShopView() {
  const [quantities, setQuantities] = useState([0, 0, 0]);
  const total = quantities.reduce((sum, qty, i) => sum + qty * products[i].value, 0);
  const adjust = (index: number, amount: number) => setQuantities((items) => items.map((qty, i) => i === index ? Math.max(0, qty + amount) : qty));
  return <><BrandHeader label="Loja" /><main className="px-6 pb-8 pt-9 sm:px-8"><SectionTitle title="Objetos com presença" meta="Coleção 01" /><p className="mb-8 max-w-[31ch] text-sm leading-relaxed text-muted-foreground">Peças criadas em pequenos ciclos, entre argilas, ceras, ervas e intenção.</p><div className="space-y-8">{products.map((product, i) => <article key={product.name} className="grid grid-cols-[112px_minmax(0,1fr)] gap-4 border-b border-border pb-8"><img src={product.image} alt={product.name} className="aspect-[4/5] w-full rounded-sm object-cover" loading="lazy" width={800} height={1000} /><div className="flex min-w-0 flex-col"><p className="font-mono text-[8px] uppercase text-muted-foreground">{product.category}</p><h3 className="mt-2 font-display text-xl italic leading-tight">{product.name}</h3><p className="mt-2 font-mono text-[10px] text-primary">{product.price}</p><div className="mt-auto flex items-center gap-3"><button onClick={() => adjust(i, -1)} aria-label={`Remover ${product.name}`} className="grid size-8 place-items-center border border-border"><Minus className="size-3" /></button><span className="w-3 text-center font-mono text-xs">{quantities[i]}</span><button onClick={() => adjust(i, 1)} aria-label={`Adicionar ${product.name}`} className="grid size-8 place-items-center bg-foreground text-background"><Plus className="size-3" /></button></div></div></article>)}</div>{total > 0 && <div className="sticky bottom-24 mt-6 flex items-center justify-between rounded-sm bg-primary p-4 text-primary-foreground"><span className="text-xs">Sacola · {quantities.reduce((a,b)=>a+b,0)} itens</span><strong className="font-mono text-xs">R$ {total}</strong></div>}</main></>;
}

function AgendaView() {
  const [selectedDay, setSelectedDay] = useState(14);
  return <><BrandHeader label="Agenda" /><main className="px-6 pb-8 pt-9 sm:px-8"><SectionTitle title="Outubro" meta="3 atendimentos" /><div className="no-scrollbar mb-10 flex gap-2 overflow-x-auto">{[12,13,14,15,16,17,18].map((day) => <button key={day} onClick={() => setSelectedDay(day)} className={`grid h-16 min-w-11 place-items-center rounded-sm border text-center ${selectedDay === day ? "border-foreground bg-foreground text-background" : "border-border"}`}><span className="font-mono text-[9px]">{day}</span><span className="text-[9px] opacity-60">{["seg","ter","qua","qui","sex","sáb","dom"][day-12]}</span></button>)}</div><div className="space-y-8">{appointments.map((item) => <article key={item.name} className="grid grid-cols-[52px_minmax(0,1fr)] gap-4 border-t border-border pt-5"><p className="font-mono text-[10px] text-primary">{item.time}</p><div><div className="flex items-start justify-between gap-3"><div><p className="font-display text-xl italic">{item.service}</p><p className="mt-1 text-xs text-muted-foreground">{item.name} · {item.day}</p></div><span className="rounded-full border border-border px-2 py-1 font-mono text-[7px] uppercase">{item.status}</span></div><button className="mt-4 text-[10px] font-medium uppercase tracking-[0.12em] text-primary">Ver atendimento →</button></div></article>)}</div></main></>;
}

function ClientsView() {
  const [query, setQuery] = useState("");
  const filtered = clients.filter((client) => client.name.toLowerCase().includes(query.toLowerCase()));
  return <><BrandHeader label="Clientes" /><main className="px-6 pb-8 pt-9 sm:px-8"><SectionTitle title="Caderno de cuidado" meta={`${filtered.length} pessoas`} /><label className="mb-8 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 border-b border-foreground pb-3"><Search className="size-4" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar cliente" className="min-w-0 bg-transparent text-sm outline-none placeholder:text-muted-foreground" /></label><div className="space-y-3">{filtered.map((client) => <button key={client.name} className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border border-border p-4 text-left"><span className="grid size-11 place-items-center rounded-full bg-secondary font-mono text-[10px]">{client.initials}</span><span className="min-w-0"><strong className="block truncate text-sm font-medium">{client.name}</strong><span className="mt-1 block truncate text-[11px] text-muted-foreground">{client.note}</span></span><span className="font-mono text-[8px] text-muted-foreground">{client.last}</span></button>)}</div></main></>;
}

function ProfileView() {
  const [role, setRole] = useState("Profissional");
  return <><BrandHeader label="Perfil" /><main className="px-6 pb-8 pt-9 sm:px-8"><div className="mb-10 flex items-center gap-4"><img src={logoAsset.url} alt="Logo Salamandra da Mata" className="size-20 rounded-full object-cover" width={512} height={512} /><div><p className="font-display text-2xl italic">Salamandra da Mata</p><p className="mt-1 text-xs text-muted-foreground">Ateliê & terapias integrativas</p></div></div><SectionTitle title="Visão do perfil" meta="Demonstração" /><div className="mb-8 grid grid-cols-3 border border-border p-1">{["Cliente","Profissional","Admin"].map((item) => <button key={item} onClick={() => setRole(item)} className={`min-w-0 px-1 py-2 text-[9px] uppercase ${role === item ? "bg-foreground text-background" : "text-muted-foreground"}`}>{item}</button>)}</div><div className="border-t border-border py-6"><p className="font-mono text-[9px] uppercase text-primary">Acesso atual</p><h2 className="mt-2 font-display text-3xl italic">{role}</h2><p className="mt-4 text-sm leading-relaxed text-muted-foreground">{role === "Cliente" ? "Explore a loja, acompanhe pedidos e agende seus momentos de cuidado." : role === "Profissional" ? "Acompanhe agenda, clientes, histórico e evolução dos atendimentos." : "Tenha visão da operação, vendas, equipe e configurações do ateliê."}</p></div><div className="mt-5 space-y-3">{["Dados pessoais", "Preferências", "Privacidade e consentimento"].map((item) => <button key={item} className="flex w-full items-center justify-between border-b border-border py-4 text-left text-sm"><span>{item}</span><ChevronRight className="size-4 text-muted-foreground" /></button>)}</div></main></>;
}

function BottomNav({ view, setView }: { view: View; setView: (view: View) => void }) {
  const items: { id: View; label: string; icon: typeof ShoppingBag }[] = [{id:"inicio",label:"Início",icon:House},{id:"loja",label:"Loja",icon:ShoppingBag},{id:"agenda",label:"Agenda",icon:CalendarDays},{id:"clientes",label:"Clientes",icon:UserRound},{id:"perfil",label:"Perfil",icon:UserRound}];
  return <nav className="fixed inset-x-0 bottom-0 z-50 mx-auto grid max-w-2xl grid-cols-5 border-t border-border bg-background/95 px-3 pb-[max(0.8rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md">{items.map((item) => { const Icon=item.icon; const active=view===item.id; return <button key={item.id} onClick={() => setView(item.id)} className={`flex min-w-0 flex-col items-center gap-1 ${active ? "text-foreground" : "text-muted-foreground/60"}`} aria-label={item.label}><Icon className="size-4" strokeWidth={active ? 2 : 1.5}/><span className="max-w-full truncate text-[8px] font-medium uppercase">{item.label}</span></button>})}</nav>;
}

function Index() {
  const [view, setView] = useState<View>("inicio");
  return <div className="min-h-screen bg-canvas px-0 text-foreground sm:py-8"><div className="mx-auto min-h-screen max-w-2xl bg-background pb-24 sm:min-h-[calc(100vh-4rem)] sm:border sm:border-border">{view === "inicio" && <HomeView navigate={setView} />}{view === "loja" && <ShopView />}{view === "agenda" && <AgendaView />}{view === "clientes" && <ClientsView />}{view === "perfil" && <ProfileView />}<BottomNav view={view} setView={setView} /></div></div>;
}
