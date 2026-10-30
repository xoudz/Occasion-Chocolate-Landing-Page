import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { ArrowDownLeft, ArrowLeft, ArrowUpLeft, Menu, X } from 'lucide-react';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('الكل');
  const [selected, setSelected] = useState<string | null>(null);
  const categories = ['الكل', 'قطع الشوكولاتة', 'علب الإهداء'];
  const products = [
    { id: 'bonbons', name: 'تشكيلة من القطع', description: 'تشكيلة من القطع المصنوعة بعناية، لكل واحدة منها ملمسها ونكهتها.', type: 'قطع الشوكولاتة', image: '/bonbons.jpg', alt: 'قطع شوكولاتة فاخرة بتفاصيل رخامية' },
    { id: 'gift', name: 'تقديم يليق باللحظة', description: 'تفاصيل تليق بلحظة تستحق أن تبقى في الذاكرة.', type: 'علب الإهداء', image: '/gifting.jpg', alt: 'علبة شوكولاتة أنيقة مفتوحة' },
    { id: 'collection', name: 'مزيج من القطع', description: 'مزيج متوازن يجمع بين قوام غني ولمسات ناعمة.', type: 'قطع الشوكولاتة', image: '/hero-cacao.jpg', alt: 'تشكيلة شوكولاتة يدوية على خلفية مخملية' },
  ];
  const visibleProducts = activeFilter === 'الكل' ? products : products.filter((product) => product.type === activeFilter);
  const links = [
    { href: '#collections', label: 'التشكيلات' },
    { href: '#story', label: 'حكايتنا' },
    { href: '#craft', label: 'صُنعت بعناية' },
    { href: '#gifting', label: 'الإهداء' },
  ];
  return (
    <main dir="rtl" lang="ar" className="grain min-h-[100dvh] overflow-hidden">
      <a className="skip-link" href="#main-content">تجاوز إلى المحتوى</a>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Occasion، إلى بداية الصفحة">
          <span className="brand-mark" aria-hidden="true">O</span>
          <span className="brand-name">Occasion</span>
        </a>
        <nav className="desktop-nav" aria-label="التنقل الرئيسي">
          {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
        </nav>
        <a className="header-cta" href="#collections">اكتشف التشكيلات <ArrowLeft size={15} /></a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} data-testid="button-menu">
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        {menuOpen && <nav className="mobile-nav" aria-label="التنقل للجوال">{links.map((link) => <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}<ArrowUpLeft size={16} /></a>)}</nav>}
      </header>

      <div id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <img className="hero-image" src="/hero-cacao.jpg" alt="شوكولاتة يدوية بتفاصيلها الغنية" />
          <div className="hero-shade" />
          <div className="hero-content">
            <p className="eyebrow light reveal"><span /> حلوى تُصنع لتُهدى</p>
            <h1 id="hero-title" className="hero-title reveal-delay">للّحظات<br /><em>التي تستحق</em><br />أن تُتذوّق.</h1>
            <p className="hero-copy reveal-delay">شوكولاتة تصنع مساحة صغيرة للفرح، وتمنح التفاصيل معنى يبقى.</p>
            <a href="#collections" className="hero-link reveal-delay">اكتشف عالم Occasion <ArrowLeft size={17} /></a>
          </div>
          <div className="hero-caption"><span>صُنعت لتكون جزءاً من الحكاية</span><span className="caption-line" /><span>01 — 03</span></div>
          <a href="#story" className="scroll-note" aria-label="تابع إلى الحكاية"><span>تابع الحكاية</span><ArrowDownLeft size={16} /></a>
        </section>

        <section className="intro-section" id="story">
          <div className="intro-aside"><span className="section-index">01 / الحكاية</span><span className="vertical-rule" /></div>
          <div className="intro-main">
            <p className="eyebrow"><span /> أكثر من مذاق</p>
            <h2>بعض اللحظات لا تحتاج<br />إلى مناسبة. <em>فقط لمسة حلوة.</em></h2>
            <div className="intro-bottom">
              <p>نؤمن أن أجمل الهدايا تبدأ من إحساس صادق. لذلك نمنح الشوكولاتة وقتها، ونعتني بتفاصيلها، لتصل كما ينبغي: قريبة، جميلة، وخاصة.</p>
              <a href="#craft" className="text-link">تعرّف على طريقتنا <ArrowLeft size={16} /></a>
            </div>
          </div>
          <div className="intro-stamp" aria-hidden="true"><span>لحظة</span><i>◇</i><span>تُحفظ</span></div>
        </section>

        <section className="collection-section" id="collections">
          <div className="section-heading">
            <div><p className="eyebrow"><span /> اختيرت بعناية</p><h2>مساحة <em>للاكتشاف</em></h2></div>
            <p className="section-description">تشكيلات متنوعة، يجمعها اهتمام واحد<br />بالمذاق واللحظة.</p>
          </div>
          <div className="collection-controls" role="group" aria-label="تصفية التشكيلات">
            {categories.map((category) => <button key={category} className={activeFilter === category ? 'filter active' : 'filter'} type="button" onClick={() => setActiveFilter(category)} aria-pressed={activeFilter === category} data-testid={`filter-${category}`}>{category}</button>)}
            <span className="result-count">{visibleProducts.length.toLocaleString('ar-SA')} تشكيلات</span>
          </div>
          <div className="product-grid">
            {visibleProducts.map((product, index) => (
              <article className={`product-card product-${index + 1}`} key={product.id} data-testid={`card-product-${product.id}`}>
                <button type="button" className="product-image-button" onClick={() => setSelected(product.id)} aria-label={`اكتشف ${product.name}`}>
                  <img src={product.image} alt={product.alt} loading="lazy" />
                  <span className="image-number">0{index + 1}</span><span className="product-arrow"><ArrowUpLeft size={18} /></span>
                </button>
                <div className="product-meta"><div><span className="product-type">{product.type}</span><h3>{product.name}</h3></div><button className="discover-button" type="button" onClick={() => setSelected(product.id)}>اكتشف <ArrowLeft size={15} /></button></div>
              </article>
            ))}
          </div>
        </section>

        <section className="craft-section" id="craft">
          <div className="craft-copy">
            <p className="eyebrow light"><span /> عناية في كل تفصيلة</p>
            <h2>الجمال ليس<br />في <em>الكثرة.</em></h2>
            <p className="craft-body">بل في اختيار ما يستحق البقاء. من ملمس القطعة إلى طريقة تقديمها، نبحث عن توازن هادئ يجعل لكل تفصيلة حضورها.</p>
            <a href="#gifting" className="hero-link">تفاصيل تليق باللحظة <ArrowLeft size={17} /></a>
          </div>
          <div className="craft-art" aria-label="تفاصيل الشوكولاتة عن قرب">
            <img src="/bonbons.jpg" alt="تفاصيل دقيقة لقطع شوكولاتة يدوية" loading="lazy" />
            <div className="craft-orbit"><span>ذوق</span><i>·</i><span>ملمس</span><i>·</i><span>حكاية</span></div>
          </div>
          <span className="craft-side-label">صُنعت برويّة، لتُقدّم بمحبة</span>
        </section>

        <section className="gift-section" id="gifting">
          <div className="gift-image-wrap"><img src="/gifting.jpg" alt="تقديم أنيق لصندوق شوكولاتة" loading="lazy" /><span className="image-note">تفاصيل تترك أثراً</span></div>
          <div className="gift-copy">
            <p className="eyebrow"><span /> حين تكون الهدية شعوراً</p>
            <h2>تقول ما<br /><em>يصعب قوله.</em></h2>
            <p>للشكر، للمحبة، أو لمجرد أن تقول: تذكّرتك. اختر ما يشبه لحظتك، ودع التفاصيل تكمل المعنى.</p>
            <a href="#collections" className="outline-link">اختر لحظتك <ArrowLeft size={16} /></a>
          </div>
        </section>

        <section className="promise-section">
          <p className="eyebrow centered"><span /> فلسفة Occasion</p>
          <blockquote>«حين تُصنع الأشياء<br />بمحبة، <em>يُذاق ذلك.</em>»</blockquote>
          <div className="promise-bottom"><span>اهتمام يسبق المذاق</span><span className="promise-flower" aria-hidden="true">◇</span><span>وجمال يبقى في الذاكرة</span></div>
        </section>

        <section className="closing-section">
          <span className="closing-index">كل لحظة تستحق طريقتها</span>
          <div><p className="eyebrow light"><span /> لحظتك تبدأ هنا</p><h2>دعها تكون<br /><em>Occasion.</em></h2></div>
          <a href="#collections" className="closing-button">استكشف التشكيلات <ArrowLeft size={17} /></a>
          <span className="closing-ornament" aria-hidden="true">O</span>
        </section>
      </div>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#top"><span className="brand-mark" aria-hidden="true">O</span><span className="brand-name">Occasion</span></a>
        <p>لحظات تُصنع بمحبة، وتُهدى كما هي.</p>
        <a href="#top" className="back-top">إلى الأعلى <ArrowUpLeft size={15} /></a>
        <span className="copyright">© Occasion Chocolate</span>
      </footer>

      {selected && (() => { const product = products.find((item) => item.id === selected); return product ? (
        <div className="dialog-backdrop" role="presentation" onClick={() => setSelected(null)}>
          <section className="product-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="dialog-close" aria-label="إغلاق" onClick={() => setSelected(null)}><X size={20} /></button>
            <img src={product.image} alt={product.alt} />
            <div><p className="eyebrow"><span /> {product.type}</p><h2 id="dialog-title">{product.name}</h2><p>{product.description}</p><button className="text-link" type="button" onClick={() => { setSelected(null); document.getElementById('gifting')?.scrollIntoView({ behavior: 'smooth' }); }}>تعرّف على خيارات الإهداء <ArrowLeft size={16} /></button></div>
          </section>
        </div>
      ) : null; })()}
    </main>
  );
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
