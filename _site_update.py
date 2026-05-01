from pathlib import Path
from textwrap import dedent


ROOT = Path(__file__).resolve().parent


def write(rel_path: str, content: str) -> None:
    path = ROOT / rel_path
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(dedent(content).strip() + "\n", encoding="utf-8")


def render_page(title: str, description: str, eyebrow: str, heading: str, intro_html: str,
                tags_html: str, actions_html: str, side_html: str, body_html: str) -> str:
    return f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} | hzyhhzy</title>
    <meta name="description" content="{description}">
    <link rel="stylesheet" href="../styles.css">
</head>
<body>
    <header class="site-header">
        <nav class="nav">
            <a class="brand" href="../index.html">
                <span class="brand-badge">H</span>
                <span>hzyhhzy</span>
            </a>
            <div class="nav-links">
                <a href="../index.html#topics">专题索引</a>
                <a href="../index.html#contact">联系方式</a>
                <a href="../index.html#blog">个人博客</a>
            </div>
        </nav>
    </header>

    <main>
        <section class="page-hero">
            <div class="page-hero-card">
                <div>
                    <div class="eyebrow">{eyebrow}</div>
                    <h1>{heading}</h1>
                    {intro_html}
                    <div class="tag-list">
                        {tags_html}
                    </div>
                    <div class="card-actions">
                        {actions_html}
                    </div>
                </div>
                {side_html}
            </div>
        </section>
        {body_html}
    </main>

    <footer class="site-footer">
        <div class="footer-card">
            <div class="link-row">
                <a href="../index.html">返回首页</a>
                <a href="https://github.com/hzyhhzy" target="_blank" rel="noreferrer">GitHub 主页</a>
                <a href="mailto:2658628026@qq.com">2658628026@qq.com</a>
            </div>
            <p>QQ：2658628026　Discord：hzy_sigmoid</p>
        </div>
    </footer>
</body>
</html>
"""


styles_css = """
:root {
  --bg: #07111f;
  --bg-soft: #0e1b2d;
  --panel: rgba(13, 24, 40, 0.88);
  --panel-strong: rgba(18, 33, 54, 0.96);
  --text: #edf3ff;
  --muted: #aebcd4;
  --line: rgba(157, 182, 221, 0.22);
  --accent: #7ad8ff;
  --accent-2: #8ef0a8;
  --accent-3: #ffd36f;
  --shadow: 0 22px 44px rgba(0, 0, 0, 0.28);
  --radius: 24px;
  --radius-sm: 16px;
  --max: 1180px;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
  color: var(--text);
  background:
    radial-gradient(circle at top left, rgba(74, 184, 255, 0.24), transparent 34%),
    radial-gradient(circle at top right, rgba(140, 255, 184, 0.16), transparent 25%),
    linear-gradient(180deg, #07111f 0%, #0a1422 48%, #08111d 100%);
  line-height: 1.7;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  display: block;
  max-width: 100%;
}

code {
  padding: 0.12em 0.42em;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.06);
  color: #dff2ff;
  font-family: Consolas, "Courier New", monospace;
  font-size: 0.94em;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  backdrop-filter: blur(16px);
  background: rgba(7, 17, 31, 0.68);
  border-bottom: 1px solid rgba(157, 182, 221, 0.12);
}

.nav {
  max-width: var(--max);
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.brand-badge {
  width: 40px;
  height: 40px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, rgba(122, 216, 255, 0.24), rgba(142, 240, 168, 0.2));
  border: 1px solid rgba(122, 216, 255, 0.28);
  color: var(--accent);
  font-weight: 800;
}

.nav-links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.nav-links a,
.button,
.ghost-button {
  border-radius: 999px;
  padding: 10px 16px;
  transition: 0.2s ease;
}

.nav-links a {
  color: var(--muted);
}

.nav-links a:hover,
.ghost-button:hover {
  background: rgba(157, 182, 221, 0.1);
  color: var(--text);
}

.button {
  background: linear-gradient(135deg, var(--accent), #9cc7ff);
  color: #07111f;
  font-weight: 700;
  box-shadow: 0 10px 24px rgba(122, 216, 255, 0.28);
}

.button:hover {
  transform: translateY(-1px);
}

.ghost-button {
  border: 1px solid rgba(157, 182, 221, 0.2);
  color: var(--text);
}

.hero,
.section,
.page-hero,
.page-section,
.site-footer {
  max-width: var(--max);
  margin: 0 auto;
  padding-left: 24px;
  padding-right: 24px;
}

.hero {
  padding-top: 68px;
  padding-bottom: 30px;
  display: grid;
  grid-template-columns: 1.22fr 0.78fr;
  gap: 28px;
  align-items: stretch;
}

.hero-panel,
.hero-side,
.card,
.info-card,
.detail-card,
.cta-card,
.timeline-item,
.placeholder-card,
.contact-banner,
.topic-card,
.claim-banner,
.table-card,
.page-side-note {
  border: 1px solid var(--line);
  background: var(--panel);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

.hero-panel {
  padding: 40px;
}

.hero-side {
  padding: 24px;
  display: grid;
  gap: 18px;
}

.eyebrow {
  color: var(--accent);
  font-size: 0.92rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin-bottom: 14px;
  font-weight: 700;
}

h1,
h2,
h3 {
  margin: 0;
  line-height: 1.2;
}

h1 {
  font-size: clamp(2.2rem, 5vw, 4.4rem);
  margin-bottom: 18px;
}

h2 {
  font-size: clamp(1.7rem, 3vw, 2.6rem);
  margin-bottom: 16px;
}

h3 {
  font-size: 1.16rem;
  margin-bottom: 10px;
}

p {
  margin: 0 0 14px;
  color: var(--muted);
}

.hero-actions,
.card-actions,
.tag-list,
.link-row,
.meta-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-top: 28px;
}

.stat {
  padding: 16px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.035);
  border: 1px solid rgba(157, 182, 221, 0.14);
}

.stat strong {
  display: block;
  font-size: 1.5rem;
  color: var(--accent-2);
}

.mini-list {
  display: grid;
  gap: 14px;
}

.mini-item {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 14px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.035);
  border: 1px solid rgba(157, 182, 221, 0.12);
}

.mini-item strong,
.kicker {
  color: var(--text);
}

.mini-icon {
  flex: 0 0 42px;
  width: 42px;
  height: 42px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: rgba(122, 216, 255, 0.12);
  color: var(--accent);
  font-weight: 700;
}

.section,
.page-section {
  padding-top: 38px;
  padding-bottom: 12px;
}

.claim-banner {
  max-width: var(--max);
  margin: 0 auto;
  padding: 20px 24px;
  background:
    linear-gradient(135deg, rgba(122, 216, 255, 0.12), rgba(142, 240, 168, 0.08)),
    var(--panel-strong);
}

.claim-banner p {
  margin: 0;
  font-size: 1.03rem;
}

.contact-strip {
  max-width: var(--max);
  margin: 0 auto;
  padding: 18px 24px 10px;
}

.contact-banner {
  padding: 26px;
  background:
    linear-gradient(135deg, rgba(122, 216, 255, 0.12), rgba(142, 240, 168, 0.08)),
    var(--panel-strong);
}

.contact-banner h2 {
  margin-bottom: 10px;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
  margin-top: 18px;
}

.contact-item {
  padding: 16px 18px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(157, 182, 221, 0.16);
}

.contact-item strong {
  display: block;
  margin-bottom: 6px;
  color: var(--text);
}

.contact-item a,
.contact-item span {
  color: var(--accent);
  word-break: break-all;
}

.section-head,
.page-head {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 18px;
  margin-bottom: 22px;
}

.section-note {
  max-width: 760px;
}

.cards,
.three-grid,
.two-grid,
.detail-grid,
.placeholder-grid,
.summary-grid,
.topic-grid {
  display: grid;
  gap: 20px;
}

.cards {
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.three-grid {
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.two-grid {
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
}

.detail-grid {
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.summary-grid {
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.topic-grid {
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
}

.tag {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 7px 12px;
  font-size: 0.9rem;
  color: #dff2ff;
  background: rgba(122, 216, 255, 0.12);
  border: 1px solid rgba(122, 216, 255, 0.18);
}

.tag.alt {
  background: rgba(142, 240, 168, 0.11);
  border-color: rgba(142, 240, 168, 0.18);
}

.tag.warn {
  background: rgba(255, 211, 111, 0.11);
  border-color: rgba(255, 211, 111, 0.2);
}

.topic-card,
.info-card,
.detail-card,
.cta-card,
.timeline-item,
.placeholder-card,
.table-card {
  padding: 24px;
}

.topic-card h3 {
  margin-bottom: 12px;
}

.topic-card p:last-child,
.detail-card p:last-child {
  margin-bottom: 0;
}

.subtopic-list {
  display: grid;
  gap: 14px;
  margin: 18px 0 0;
}

.subtopic-item {
  padding-top: 14px;
  border-top: 1px solid rgba(157, 182, 221, 0.12);
}

.subtopic-item:first-child {
  padding-top: 0;
  border-top: 0;
}

.subtopic-item h4 {
  margin: 0 0 8px;
  font-size: 1rem;
  color: var(--text);
}

.subtopic-item p {
  margin-bottom: 10px;
}

.compact-table {
  display: grid;
  gap: 10px;
  margin-top: 18px;
}

.compact-row {
  display: grid;
  grid-template-columns: minmax(120px, 1fr) minmax(100px, 0.8fr) minmax(100px, 0.8fr);
  gap: 12px;
  align-items: center;
  padding: 12px 14px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.035);
  border: 1px solid rgba(157, 182, 221, 0.12);
}

.compact-row.header {
  color: var(--accent);
  font-weight: 700;
  background: rgba(122, 216, 255, 0.08);
}

.compact-row a {
  color: var(--accent);
}

.compact-row span {
  color: var(--muted);
}

.highlight-link {
  color: var(--accent-3);
  font-weight: 700;
}

.list {
  margin: 0;
  padding-left: 18px;
  color: var(--muted);
}

.list li + li {
  margin-top: 8px;
}

.meta-grid {
  margin-top: 18px;
}

.meta-item {
  flex: 1 1 160px;
  min-width: 160px;
  padding: 14px 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(157, 182, 221, 0.1);
}

.meta-label {
  display: block;
  font-size: 0.9rem;
  color: var(--muted);
  margin-bottom: 4px;
}

.link-row a {
  color: var(--accent);
}

.link-row a:hover {
  color: #d4f5ff;
}

.page-hero {
  padding-top: 54px;
  padding-bottom: 24px;
}

.page-hero-card {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 24px;
  padding: 30px;
  border-radius: 30px;
  background: var(--panel-strong);
  border: 1px solid var(--line);
  box-shadow: var(--shadow);
}

.page-hero-art img {
  width: 100%;
  border-radius: 22px;
  border: 1px solid rgba(157, 182, 221, 0.14);
  background: rgba(255, 255, 255, 0.02);
}

.page-side-note {
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background:
    linear-gradient(135deg, rgba(122, 216, 255, 0.08), rgba(142, 240, 168, 0.06)),
    rgba(255, 255, 255, 0.02);
}

.page-side-note strong {
  color: var(--text);
  font-size: 1.05rem;
}

.timeline {
  display: grid;
  gap: 16px;
}

.timeline-item strong {
  color: var(--text);
}

.site-footer {
  padding-top: 42px;
  padding-bottom: 48px;
  color: var(--muted);
}

.footer-card {
  padding: 24px;
  border-radius: var(--radius);
  border: 1px solid var(--line);
  background: rgba(8, 16, 28, 0.88);
}

.muted {
  color: var(--muted);
}

.accent {
  color: var(--accent);
}

@media (max-width: 980px) {
  .hero,
  .page-hero-card {
    grid-template-columns: 1fr;
  }

  .stats {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .nav {
    padding: 14px 18px;
  }

  .claim-banner,
  .contact-strip,
  .hero,
  .section,
  .page-hero,
  .page-section,
  .site-footer {
    padding-left: 18px;
    padding-right: 18px;
  }

  .hero-panel,
  .hero-side,
  .topic-card,
  .info-card,
  .detail-card,
  .cta-card,
  .timeline-item,
  .placeholder-card,
  .table-card,
  .contact-banner,
  .page-side-note,
  .page-hero-card {
    padding: 20px;
  }

  .compact-row {
    grid-template-columns: 1fr;
  }

  .nav-links {
    display: none;
  }
}
"""


index_html = """
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>hzyhhzy | 个人主页</title>
    <meta name="description" content="hzyhhzy 的个人主页，整理 KataGomo 相关的 10 个专题，包括围棋、五子棋、Hex、六子棋、Ataxx、数学问题与博客预留。">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header class="site-header">
        <nav class="nav">
            <a class="brand" href="index.html">
                <span class="brand-badge">H</span>
                <span>hzyhhzy</span>
            </a>
            <div class="nav-links">
                <a href="#topics">专题索引</a>
                <a href="#contact">联系方式</a>
                <a href="#blog">个人博客</a>
            </div>
        </nav>
    </header>

    <main>
        <section class="hero">
            <div class="hero-panel">
                <div class="eyebrow">KataGomo Index</div>
                <h1>棋类 AI、数学问题与持续更新中的个人博客</h1>
                <p>这里主要整理 <span class="accent">KataGomo</span> 体系下的多棋种项目、结论、分支、release 与训练入口，并把数学问题和未来博客统一收纳到同一站点里。</p>
                <p>当前首页已经按你的要求重构成 10 个专题。每个专题下的子专题都配有独立详情页，后续继续补材料时只需要往相应页面追加即可。</p>
                <div class="hero-actions">
                    <a class="button" href="#topics">查看 10 个专题</a>
                    <a class="ghost-button" href="https://github.com/hzyhhzy/KataGomo" target="_blank" rel="noreferrer">KataGomo 仓库</a>
                    <a class="ghost-button" href="https://github.com/hzyhhzy" target="_blank" rel="noreferrer">GitHub 主页</a>
                </div>
                <div class="stats">
                    <div class="stat">
                        <strong>10</strong>
                        <span>首页专题</span>
                    </div>
                    <div class="stat">
                        <strong>15</strong>
                        <span>详情页入口</span>
                    </div>
                    <div class="stat">
                        <strong>30+</strong>
                        <span>分支 / release / 结论链接</span>
                    </div>
                </div>
            </div>
            <aside class="hero-side">
                <div class="mini-list">
                    <article class="mini-item">
                        <div class="mini-icon">!</div>
                        <div>
                            <strong>总说明</strong>
                            <p>据我所知，KataGomo 在下面提到的所有棋类游戏中均为最强，没有之一。如果你发现了与之相当或者更强的，欢迎告知我，非常感谢。</p>
                        </div>
                    </article>
                    <article class="mini-item">
                        <div class="mini-icon">AI</div>
                        <div>
                            <strong>主线内容</strong>
                            <p>当前主线覆盖围棋训练与变种、五子棋与变种、Hex、六子棋、Ataxx、重力四子棋、斗兽棋、中国跳棋、其他小众棋种与数学问题。</p>
                        </div>
                    </article>
                    <article class="mini-item">
                        <div class="mini-icon">B</div>
                        <div>
                            <strong>博客预留</strong>
                            <p>博客区继续保留，后续可以直接补项目记录、证明草稿、实验日志和文章归档。</p>
                        </div>
                    </article>
                </div>
            </aside>
        </section>

        <section class="claim-banner">
            <p>据我所知，KataGomo 在以下提到的所有棋类游戏中均为最强，没有之一。如果你发现了与之相当或者更强的，欢迎告诉我，我会非常感谢。</p>
        </section>

        <section class="contact-strip" id="contact">
            <div class="contact-banner">
                <div class="eyebrow">Contact</div>
                <h2>联系方式</h2>
                <p>如果你想交流棋类 AI、训练数据、规则变种、数学问题或者项目合作，可以直接通过下面这些方式联系我。</p>
                <div class="contact-grid">
                    <div class="contact-item">
                        <strong>GitHub</strong>
                        <a href="https://github.com/hzyhhzy" target="_blank" rel="noreferrer">https://github.com/hzyhhzy</a>
                    </div>
                    <div class="contact-item">
                        <strong>QQ</strong>
                        <span>2658628026</span>
                    </div>
                    <div class="contact-item">
                        <strong>Discord</strong>
                        <span>hzy_sigmoid</span>
                    </div>
                    <div class="contact-item">
                        <strong>邮箱</strong>
                        <a href="mailto:2658628026@qq.com">2658628026@qq.com</a>
                    </div>
                </div>
            </div>
        </section>

        <section class="section" id="topics">
            <div class="section-head">
                <div>
                    <div class="eyebrow">Topics</div>
                    <h2>10 个专题</h2>
                </div>
                <p class="section-note">下面的结构按照你给的 10 个专题展开。带子专题的条目会直接列出子专题与详情页入口，没有子专题的则直接在首页给出 release、branch、数据集或结论。</p>
            </div>

            <div class="topic-grid">
                <article class="topic-card">
                    <div class="tag-list">
                        <span class="tag">专题 1</span>
                        <span class="tag alt">围棋</span>
                    </div>
                    <h3>围棋训练与围棋变种</h3>
                    <p>把围棋训练路线与 README 里的各种围棋变种拆开整理，既保留主线模型，也保留规则实验。</p>
                    <div class="subtopic-list">
                        <div class="subtopic-item">
                            <h4>1.1 训练相关改进</h4>
                            <p>目前重点放最强围棋 CNN 模型 <code>fdx6d</code> 与 Transformer 模型。</p>
                            <div class="link-row">
                                <a href="games/go.html">详情页</a>
                                <a href="https://github.com/hzyhhzy/KataGo_Transformer" target="_blank" rel="noreferrer">KataGo_Transformer</a>
                            </div>
                        </div>
                        <div class="subtopic-item">
                            <h4>1.2 围棋变种</h4>
                            <p>包括 Capture Go、NoGo、Kill-all Go、Hex Go、加权面积围棋、首吃子围棋等。</p>
                            <div class="link-row">
                                <a href="games/go-variants.html">详情页</a>
                            </div>
                        </div>
                    </div>
                </article>

                <article class="topic-card">
                    <div class="tag-list">
                        <span class="tag">专题 2</span>
                        <span class="tag alt">五子棋</span>
                    </div>
                    <h3>五子棋与变种</h3>
                    <p>五子棋主线与各种规则改造分开整理，主线突出 KataGomo 本体，变种部分突出 README 中的分支族谱。</p>
                    <div class="subtopic-list">
                        <div class="subtopic-item">
                            <h4>2.1 KataGomo：最强五子棋 AI</h4>
                            <p>覆盖无禁手、无禁手六不胜、有禁手和 Caro 规则。</p>
                            <div class="link-row">
                                <a href="games/gomoku.html">详情页</a>
                                <a href="https://github.com/hzyhhzy/KataGomo/releases/tag/Gomoku_20250206" target="_blank" rel="noreferrer">release</a>
                            </div>
                        </div>
                        <div class="subtopic-item">
                            <h4>2.2 五子棋变种</h4>
                            <p>根据 README 稍微归纳 Caro、禁点五子棋、吃子五子棋、莫棋、等差连六等。</p>
                            <div class="link-row">
                                <a href="games/gomoku-variants.html">详情页</a>
                            </div>
                        </div>
                    </div>
                </article>

                <article class="topic-card">
                    <div class="tag-list">
                        <span class="tag">专题 3</span>
                        <span class="tag alt">Hex</span>
                    </div>
                    <h3>Hex 棋</h3>
                    <p>一条线介绍 KataHex 本身，另一条线单独介绍 <code>HexTemplate</code> 分支里的特定局面分析。</p>
                    <div class="subtopic-list">
                        <div class="subtopic-item">
                            <h4>3.1 KataHex：最强 Hex 棋 AI</h4>
                            <div class="link-row">
                                <a href="games/hex.html">详情页</a>
                                <a href="https://github.com/hzyhhzy/KataGomo/releases/tag/Hex_20250131" target="_blank" rel="noreferrer">release</a>
                            </div>
                        </div>
                        <div class="subtopic-item">
                            <h4>3.2 特定局面分析</h4>
                            <p>集中介绍 <code>HexTemplate</code> 分支与模板化特殊局面的研究。</p>
                            <div class="link-row">
                                <a href="games/hex-template.html">详情页</a>
                            </div>
                        </div>
                    </div>
                </article>

                <article class="topic-card">
                    <div class="tag-list">
                        <span class="tag">专题 4</span>
                        <span class="tag warn">六子棋</span>
                    </div>
                    <h3>六子棋</h3>
                    <p><a class="highlight-link" href="games/connect6-conclusion.html"><strong>六子棋疑似黑棋必胜！</strong></a></p>
                    <div class="subtopic-list">
                        <div class="subtopic-item">
                            <h4>4.1 KataConnect6：最强六子棋 AI</h4>
                            <div class="link-row">
                                <a href="games/connect6.html">详情页</a>
                                <a href="https://github.com/hzyhhzy/KataGomo/releases/tag/ConnectSix_20250505" target="_blank" rel="noreferrer">release</a>
                            </div>
                        </div>
                        <div class="subtopic-item">
                            <h4>4.2 六子棋 NNUE</h4>
                            <div class="link-row">
                                <a href="games/connect6-nnue.html">详情页</a>
                                <a href="https://github.com/hzyhhzy/gomoku_nnue/tree/connectsix_kata" target="_blank" rel="noreferrer">connectsix_kata</a>
                            </div>
                        </div>
                        <div class="subtopic-item">
                            <h4>4.3 六子棋结论</h4>
                            <p>19x19 棋盘疑似 55 步必胜，25x25 棋盘疑似 45 步必胜。</p>
                            <div class="link-row">
                                <a href="games/connect6-conclusion.html">详情页</a>
                            </div>
                        </div>
                    </div>
                </article>

                <article class="topic-card">
                    <div class="tag-list">
                        <span class="tag">专题 5</span>
                        <span class="tag alt">Ataxx</span>
                    </div>
                    <h3>Ataxx</h3>
                    <p><strong>KataAtaxx：最强 Ataxx 棋 AI</strong></p>
                    <div class="link-row">
                        <a href="https://github.com/hzyhhzy/KataGomo/releases/tag/Ataxx_20260501" target="_blank" rel="noreferrer">release</a>
                        <a href="https://github.com/hzyhhzy/KataGomo/tree/Ataxx-onnx" target="_blank" rel="noreferrer">branch</a>
                        <a href="https://www.modelscope.cn/datasets/sigmoid/KataGo_Ataxx_202604" target="_blank" rel="noreferrer">数据集</a>
                        <a href="games/ataxx.html">详情页</a>
                    </div>
                    <p>7x7 棋盘先手胜率 57%。</p>
                </article>

                <article class="topic-card">
                    <div class="tag-list">
                        <span class="tag">专题 6</span>
                        <span class="tag alt">重力四子棋</span>
                    </div>
                    <h3>重力四子棋</h3>
                    <div class="link-row">
                        <a href="https://github.com/hzyhhzy/KataGomo_fork/releases/tag/ConnectFour_20241019" target="_blank" rel="noreferrer">release</a>
                        <a href="https://github.com/hzyhhzy/KataGomo/tree/ConnectFour2024" target="_blank" rel="noreferrer">branch</a>
                        <a href="games/connectfour.html">详情页</a>
                    </div>
                    <p>对各种棋盘尺寸的结论见详情页。</p>
                </article>

                <article class="topic-card">
                    <div class="tag-list">
                        <span class="tag">专题 7</span>
                        <span class="tag alt">斗兽棋</span>
                    </div>
                    <h3>斗兽棋</h3>
                    <p><strong>最强斗兽棋 AI</strong></p>
                    <div class="link-row">
                        <a href="https://github.com/lxsgx23/Dandelion-Chess/releases/tag/v2.4" target="_blank" rel="noreferrer">release</a>
                        <a href="https://github.com/hzyhhzy/KataGomo/tree/AnimalChess2025" target="_blank" rel="noreferrer">branch</a>
                        <a href="games/animal-chess.html">详情页</a>
                    </div>
                    <p>斗兽棋几乎必和棋。</p>
                </article>

                <article class="topic-card">
                    <div class="tag-list">
                        <span class="tag">专题 8</span>
                        <span class="tag alt">中国跳棋</span>
                    </div>
                    <h3>中国跳棋</h3>
                    <p><strong>最强跳棋 AI</strong></p>
                    <div class="link-row">
                        <a href="https://github.com/hzyhhzy/KataGomo_fork/releases/tag/20240406" target="_blank" rel="noreferrer">release</a>
                        <a href="https://github.com/hzyhhzy/KataGomo/tree/tiaoqi" target="_blank" rel="noreferrer">branch</a>
                        <a href="games/chinese-checkers.html">详情页</a>
                    </div>
                    <p>跳棋几乎必和棋。</p>
                </article>

                <article class="topic-card">
                    <div class="tag-list">
                        <span class="tag">专题 9</span>
                        <span class="tag alt">其他小众棋种</span>
                    </div>
                    <h3>其他小众棋种</h3>
                    <p>KataGomo 在以下的这些棋种中，目前也没有找到对手。</p>
                    <div class="compact-table">
                        <div class="compact-row header">
                            <div>棋种名称</div>
                            <div>branch</div>
                            <div>release</div>
                        </div>
                        <div class="compact-row">
                            <div>Amazons</div>
                            <div><a href="https://github.com/hzyhhzy/KataGomo/tree/Amazons" target="_blank" rel="noreferrer">Amazons</a></div>
                            <div><a href="https://github.com/hzyhhzy/KataGomo_fork/releases/tag/20240406" target="_blank" rel="noreferrer">20240406</a></div>
                        </div>
                        <div class="compact-row">
                            <div>Breakthrough</div>
                            <div><a href="https://github.com/hzyhhzy/KataGomo/tree/breakthrough" target="_blank" rel="noreferrer">breakthrough</a></div>
                            <div><a href="https://github.com/hzyhhzy/KataGomo_fork/releases/tag/20240406" target="_blank" rel="noreferrer">20240406</a></div>
                        </div>
                        <div class="compact-row">
                            <div>Reversi</div>
                            <div><a href="https://github.com/hzyhhzy/KataGomo/tree/Reversi2023" target="_blank" rel="noreferrer">Reversi2023</a></div>
                            <div><span>暂无</span></div>
                        </div>
                        <div class="compact-row">
                            <div>Ultimate Tic-tac-toe</div>
                            <div><a href="https://github.com/hzyhhzy/KataGomo/tree/UltimateTictactoe2024" target="_blank" rel="noreferrer">UltimateTictactoe2024</a></div>
                            <div><a href="https://github.com/hzyhhzy/KataGomo/releases/tag/UltimateTictactoe_20241101" target="_blank" rel="noreferrer">UltimateTictactoe_20241101</a></div>
                        </div>
                        <div class="compact-row">
                            <div>ScoreFour / ConnectFour3D</div>
                            <div><a href="https://github.com/hzyhhzy/KataGomo/tree/ConnectFour3d" target="_blank" rel="noreferrer">ConnectFour3d</a></div>
                            <div><a href="https://github.com/hzyhhzy/KataGomo/releases/tag/ScoreFour_20250510" target="_blank" rel="noreferrer">ScoreFour_20250510</a></div>
                        </div>
                        <div class="compact-row">
                            <div>Dots and Boxes</div>
                            <div><a href="https://github.com/hzyhhzy/KataGomo/tree/DotsAndBoxes" target="_blank" rel="noreferrer">DotsAndBoxes</a></div>
                            <div><span>暂无</span></div>
                        </div>
                        <div class="compact-row">
                            <div>Quoridor</div>
                            <div><a href="https://github.com/hzyhhzy/KataGomo/tree/Quoridor2024" target="_blank" rel="noreferrer">Quoridor2024</a></div>
                            <div><span>暂无</span></div>
                        </div>
                        <div class="compact-row">
                            <div>Surakarta</div>
                            <div><a href="https://github.com/hzyhhzy/KataGomo/tree/Surakarta" target="_blank" rel="noreferrer">Surakarta</a></div>
                            <div><span>暂无</span></div>
                        </div>
                        <div class="compact-row">
                            <div>Clobber</div>
                            <div><a href="https://github.com/hzyhhzy/KataGomo/tree/Clobber2023" target="_blank" rel="noreferrer">Clobber2023</a></div>
                            <div><span>暂无</span></div>
                        </div>
                    </div>
                    <div class="link-row" style="margin-top:18px;">
                        <a href="games/other-games.html">共用详情页</a>
                    </div>
                </article>

                <article class="topic-card">
                    <div class="tag-list">
                        <span class="tag">专题 10</span>
                        <span class="tag alt">数学问题</span>
                    </div>
                    <h3>数学问题</h3>
                    <p>根据 README 先整理 Angel Problem、七连珠证明尝试、Dawson Chess 和 Escape Go 等问题，不提 Hex 相关那条。</p>
                    <div class="link-row">
                        <a href="games/math-problems.html">详情页</a>
                        <a href="googology/index.html">Googology</a>
                    </div>
                </article>
            </div>
        </section>

        <section class="section" id="blog">
            <div class="section-head">
                <div>
                    <div class="eyebrow">Blog</div>
                    <h2>个人博客</h2>
                </div>
                <p class="section-note">这里继续预留给你后续的文章、实验记录和总结。当前先保留一个清晰的展示位，不抢专题索引的版面。</p>
            </div>
            <div class="three-grid">
                <article class="placeholder-card">
                    <h3>待发布文章</h3>
                    <p>后续可以直接放项目总结、数学笔记、训练日志、证明草稿或一些短文。</p>
                </article>
                <article class="placeholder-card">
                    <h3>建议栏目</h3>
                    <ul class="list">
                        <li>棋类 AI 训练记录</li>
                        <li>规则变体与结论更新</li>
                        <li>数学问题笔记</li>
                        <li>工程实现杂记</li>
                    </ul>
                </article>
                <article class="placeholder-card">
                    <h3>下一步</h3>
                    <p>如果你之后要正式写博客，我可以继续给你加一个 <code>/blog/</code> 目录和文章列表页。</p>
                </article>
            </div>
        </section>
    </main>

    <footer class="site-footer">
        <div class="footer-card">
            <h3>站点说明</h3>
            <p>这个版本已经把首页重构成你指定的 10 个专题，并补了对应的详情页入口。后续如果你想继续拆更多分支、补更多结论或做中英双语，都可以在这个骨架上继续扩。</p>
        </div>
    </footer>
</body>
</html>
"""


pages = {
    "games/go.html": render_page(
        "围棋训练相关改进",
        "围棋训练相关改进专题页，聚焦 fdx6d、Transformer 模型、KataGo_Transformer 与相关训练脚本入口。",
        "Go Training",
        "围棋训练相关改进",
        """
        <p>这一页只聚焦围棋训练主线，不再把规则变种和训练技术混在一起。当前重点是最强围棋 CNN 模型 <code>fdx6d</code>，以及正在推进的 Transformer 路线。</p>
        <p><code>KataGo_Transformer</code> 提供了独立的围棋 Transformer 训练仓库，适合作为下一代围棋模型的炼丹主入口。</p>
        """,
        """
        <span class="tag">fdx6d</span>
        <span class="tag alt">Transformer</span>
        <span class="tag warn">ONNX</span>
        """,
        """
        <a class="button" href="https://github.com/hzyhhzy/KataGo_Transformer" target="_blank" rel="noreferrer">KataGo_Transformer</a>
        <a class="ghost-button" href="https://github.com/hzyhhzy/KataGomo/tree/go_onnx_test" target="_blank" rel="noreferrer">go_onnx_test</a>
        """,
        """
        <div class="page-hero-art">
            <img src="../images/go-board.svg" alt="围棋专题示意图">
        </div>
        """,
        """
        <section class="page-section">
            <div class="summary-grid">
                <article class="detail-card">
                    <h3>当前最强 CNN 主线</h3>
                    <p>首页把 <code>fdx6d</code> 作为当前最强围棋 CNN 模型来展示，这条线适合作为传统卷积架构的代表。</p>
                </article>
                <article class="detail-card">
                    <h3>Transformer 主线</h3>
                    <p>Transformer 路线放在单独仓库里推进，目标是围棋训练与推理的下一代模型架构。</p>
                </article>
                <article class="detail-card">
                    <h3>定位</h3>
                    <p>这一页只管训练改进，不讨论 Capture Go、NoGo 等规则变种；那些内容已经拆到另一页。</p>
                </article>
            </div>
        </section>

        <section class="page-section">
            <div class="page-head">
                <div>
                    <div class="eyebrow">Architecture</div>
                    <h2>训练改进主线</h2>
                </div>
            </div>
            <div class="three-grid">
                <article class="detail-card">
                    <h3>CNN</h3>
                    <ul class="list">
                        <li><code>fdx6d</code> 作为当前首页主推的最强围棋 CNN 模型</li>
                        <li>适合作为卷积架构的成熟强基线</li>
                        <li>和 Transformer 路线形成清晰对照</li>
                    </ul>
                </article>
                <article class="detail-card">
                    <h3>Transformer</h3>
                    <ul class="list">
                        <li>独立仓库：<code>KataGo_Transformer</code></li>
                        <li>README 明确提到 RoPE、SwiGLU、RMSNorm 等现代组件</li>
                        <li>适合作为围棋炼丹技术的总入口</li>
                    </ul>
                </article>
                <article class="detail-card">
                    <h3>推理落地</h3>
                    <ul class="list">
                        <li>可先导出 ONNX，再接入支持 ONNX 的改版引擎</li>
                        <li>当前最直接的引擎入口是 <code>go_onnx_test</code> 分支</li>
                    </ul>
                </article>
            </div>
        </section>

        <section class="page-section">
            <div class="page-head">
                <div>
                    <div class="eyebrow">Scripts</div>
                    <h2>训练脚本与数据</h2>
                </div>
            </div>
            <div class="two-grid">
                <article class="detail-card">
                    <h3>训练脚本位置</h3>
                    <ul class="list">
                        <li><code>KataGo_Transformer/train/train_muon_ki.sh</code></li>
                        <li><code>KataGo_Transformer/train/export_onnx.py</code></li>
                        <li><code>KataGo_Transformer/train/modelconfigs.py</code></li>
                    </ul>
                </article>
                <article class="detail-card">
                    <h3>数据现状</h3>
                    <p>围棋训练主线目前不像 Ataxx 那样有一个集中公开的数据集下载页。现阶段更适合把脚本、模型路线与引擎对接方式作为主信息来展示。</p>
                </article>
            </div>
        </section>
        """,
    ),
    "games/go-variants.html": render_page(
        "围棋变种",
        "围棋变种专题页，整理 KataGomo README 中出现的 Capture Go、NoGo、Kill-all Go、Hex Go 等分支。",
        "Go Variants",
        "围棋变种",
        """
        <p>这部分根据 <code>KataGomo</code> README 里列出的围棋变种做一个清晰摘要。这里不追求面面俱到，而是把最值得放在首页的变种主线先列出来。</p>
        """,
        """
        <span class="tag">Capture Go</span>
        <span class="tag alt">NoGo</span>
        <span class="tag warn">Kill-all Go</span>
        """,
        """
        <a class="button" href="https://github.com/hzyhhzy/KataGomo" target="_blank" rel="noreferrer">KataGomo</a>
        <a class="ghost-button" href="https://github.com/hzyhhzy/KataGomo/blob/master/README.md" target="_blank" rel="noreferrer">README</a>
        """,
        """
        <div class="page-side-note">
            <strong>这页的重点</strong>
            <p>把围棋规则实验从训练主线里拆出来，便于后续继续补 branch、release 和阶段性结论。</p>
        </div>
        """,
        """
        <section class="page-section">
            <div class="table-card">
                <h2>主要分支</h2>
                <div class="compact-table">
                    <div class="compact-row header">
                        <div>变种</div>
                        <div>branch</div>
                        <div>release</div>
                    </div>
                    <div class="compact-row">
                        <div>Capture Go</div>
                        <div><a href="https://github.com/hzyhhzy/KataGomo/tree/CaptureGo2024" target="_blank" rel="noreferrer">CaptureGo2024</a></div>
                        <div><a href="https://github.com/hzyhhzy/KataGomo/releases/tag/CaptureGo_20250509" target="_blank" rel="noreferrer">CaptureGo_20250509</a></div>
                    </div>
                    <div class="compact-row">
                        <div>NoGo</div>
                        <div><a href="https://github.com/hzyhhzy/KataGomo/tree/Nogo2025" target="_blank" rel="noreferrer">Nogo2025</a></div>
                        <div><a href="https://github.com/hzyhhzy/KataGomo/releases/tag/Nogo20250219" target="_blank" rel="noreferrer">Nogo20250219</a></div>
                    </div>
                    <div class="compact-row">
                        <div>Kill-all Go</div>
                        <div><a href="https://github.com/hzyhhzy/KataGomo/tree/LifeGo2024" target="_blank" rel="noreferrer">LifeGo2024</a></div>
                        <div><a href="https://github.com/hzyhhzy/KataGomo_fork/releases/tag/LifeGo_20241025" target="_blank" rel="noreferrer">LifeGo_20241025</a></div>
                    </div>
                    <div class="compact-row">
                        <div>Hex Go</div>
                        <div><a href="https://github.com/hzyhhzy/KataGomo/tree/HexGo2024" target="_blank" rel="noreferrer">HexGo2024</a></div>
                        <div><span>暂无</span></div>
                    </div>
                    <div class="compact-row">
                        <div>不许下在上一手附近</div>
                        <div><a href="https://github.com/hzyhhzy/KataGomo/tree/GoModify2a" target="_blank" rel="noreferrer">GoModify2a</a></div>
                        <div><span>暂无</span></div>
                    </div>
                    <div class="compact-row">
                        <div>Hex Capture Go</div>
                        <div><a href="https://github.com/hzyhhzy/KataGomo/tree/HexCaptureGo" target="_blank" rel="noreferrer">HexCaptureGo</a></div>
                        <div><span>暂无</span></div>
                    </div>
                    <div class="compact-row">
                        <div>加权面积围棋</div>
                        <div><a href="https://github.com/hzyhhzy/KataGomo/tree/weightGo" target="_blank" rel="noreferrer">weightGo</a></div>
                        <div><span>暂无</span></div>
                    </div>
                    <div class="compact-row">
                        <div>首吃子围棋</div>
                        <div><a href="https://github.com/hzyhhzy/KataGomo/tree/FirstCaptureMe" target="_blank" rel="noreferrer">FirstCaptureMe</a></div>
                        <div><span>暂无</span></div>
                    </div>
                </div>
            </div>
        </section>

        <section class="page-section">
            <div class="three-grid">
                <article class="detail-card">
                    <h3>训练脚本</h3>
                    <p>最近几年训练过的分支通常会把脚本与配置放在对应 branch 的 <code>scripts/</code> 目录下，例如 <code>CaptureGo2024/scripts</code> 与 <code>Nogo2025/scripts</code>。</p>
                </article>
                <article class="detail-card">
                    <h3>数据集</h3>
                    <p>这些变种目前没有统一公开的数据集页面，因此首页只强调 branch、release 和可复现入口。</p>
                </article>
                <article class="detail-card">
                    <h3>结论</h3>
                    <p>围棋变种是 <code>KataGomo</code> 泛化能力最直接的展示区域之一，既包含主流变种，也包含非常规规则实验。</p>
                </article>
            </div>
        </section>
        """,
    ),
    "games/gomoku.html": render_page(
        "KataGomo 五子棋主线",
        "五子棋主线专题页，整理 KataGomo 作为最强五子棋 AI 的主分支、release、规则覆盖与脚本入口。",
        "Gomoku",
        "KataGomo：最强五子棋 AI",
        """
        <p>这是五子棋主线页面，单独整理最核心的一条线：<code>KataGomo</code> 本体。</p>
        <p>当前这条线覆盖无禁手 <em>Freestyle</em>、无禁手六不胜 <em>Standard</em>、有禁手 <em>Renju</em>、Caro 规则。</p>
        """,
        """
        <span class="tag">Freestyle</span>
        <span class="tag alt">Standard</span>
        <span class="tag warn">Renju / Caro</span>
        """,
        """
        <a class="button" href="https://github.com/hzyhhzy/KataGomo/releases/tag/Gomoku_20250206" target="_blank" rel="noreferrer">最新 release</a>
        <a class="ghost-button" href="https://github.com/hzyhhzy/KataGomo/tree/Gom2024" target="_blank" rel="noreferrer">Gom2024 分支</a>
        """,
        """
        <div class="page-hero-art">
            <img src="../images/gomoku-board.svg" alt="五子棋专题示意图">
        </div>
        """,
        """
        <section class="page-section">
            <div class="summary-grid">
                <article class="detail-card">
                    <h3>最新 release</h3>
                    <p><code>Gomoku_20250206</code></p>
                </article>
                <article class="detail-card">
                    <h3>主 branch</h3>
                    <p><code>Gom2024</code></p>
                </article>
                <article class="detail-card">
                    <h3>定位</h3>
                    <p>作为主线页面，这里只强调“最强五子棋 AI”与最常用的几类规则。</p>
                </article>
            </div>
        </section>

        <section class="page-section">
            <div class="two-grid">
                <article class="detail-card">
                    <h3>支持的主要规则</h3>
                    <ul class="list">
                        <li>Freestyle：无禁手</li>
                        <li>Standard：无禁手六不胜</li>
                        <li>Renju：有禁手</li>
                        <li>Caro：Caro 规则</li>
                    </ul>
                </article>
                <article class="detail-card">
                    <h3>训练与脚本</h3>
                    <p>主仓 README 给出的通用规则是：最近几年训练过的棋种通常会把训练脚本放进对应 branch 的 <code>scripts/</code> 目录。五子棋主线可优先查看 <code>Gom2024/scripts</code>。</p>
                </article>
            </div>
        </section>

        <section class="page-section">
            <div class="timeline">
                <article class="timeline-item">
                    <strong>release</strong>
                    <p>主页主推最新公开版本 <code>Gomoku_20250206</code>，作为五子棋总入口。</p>
                </article>
                <article class="timeline-item">
                    <strong>结论</strong>
                    <p>就目前站点的整体叙述而言，这条线就是最强五子棋 AI 的主线，不再把各种改规则掺进来。</p>
                </article>
            </div>
        </section>
        """,
    ),
    "games/gomoku-variants.html": render_page(
        "五子棋变种",
        "五子棋变种专题页，整理 README 中列出的 Caro、禁点五子棋、吃子五子棋、莫棋、等差连六等分支。",
        "Gomoku Variants",
        "五子棋变种",
        """
        <p>这一页从 README 里挑出较有代表性的五子棋变种，重点是把名字、branch 与是否有公开 release 说明白。</p>
        """,
        """
        <span class="tag">Caro</span>
        <span class="tag alt">吃子五子棋</span>
        <span class="tag warn">等差连六</span>
        """,
        """
        <a class="button" href="https://github.com/hzyhhzy/KataGomo/blob/master/README.md" target="_blank" rel="noreferrer">README</a>
        <a class="ghost-button" href="https://github.com/hzyhhzy/KataGomo/tree/Caro2024" target="_blank" rel="noreferrer">Caro2024</a>
        """,
        """
        <div class="page-side-note">
            <strong>这页的用法</strong>
            <p>适合作为“README 里到底做过哪些五子棋改规则”的总索引页。</p>
        </div>
        """,
        """
        <section class="page-section">
            <div class="table-card">
                <h2>分支索引</h2>
                <div class="compact-table">
                    <div class="compact-row header">
                        <div>变种</div>
                        <div>branch</div>
                        <div>release</div>
                    </div>
                    <div class="compact-row">
                        <div>Caro</div>
                        <div><a href="https://github.com/hzyhhzy/KataGomo/tree/Caro2024" target="_blank" rel="noreferrer">Caro2024</a></div>
                        <div><a href="https://github.com/hzyhhzy/KataGomo/releases/tag/Gomoku_20250206" target="_blank" rel="noreferrer">Gomoku_20250206</a></div>
                    </div>
                    <div class="compact-row">
                        <div>禁点五子棋</div>
                        <div><a href="https://github.com/hzyhhzy/KataGomo/tree/GomBanLoc" target="_blank" rel="noreferrer">GomBanLoc</a></div>
                        <div><span>暂无</span></div>
                    </div>
                    <div class="compact-row">
                        <div>终局规则改造</div>
                        <div><a href="https://github.com/hzyhhzy/KataGomo/tree/GomNewRule1" target="_blank" rel="noreferrer">GomNewRule1</a></div>
                        <div><span>暂无</span></div>
                    </div>
                    <div class="compact-row">
                        <div>不同线五子棋</div>
                        <div><a href="https://github.com/hzyhhzy/KataGomo/tree/newgame_DifLineGomoku" target="_blank" rel="noreferrer">newgame_DifLineGomoku</a></div>
                        <div><span>暂无</span></div>
                    </div>
                    <div class="compact-row">
                        <div>莫棋</div>
                        <div><a href="https://github.com/hzyhhzy/KataGomo/tree/newgame_MoQiGomoku" target="_blank" rel="noreferrer">newgame_MoQiGomoku</a></div>
                        <div><span>暂无</span></div>
                    </div>
                    <div class="compact-row">
                        <div>连五计数</div>
                        <div><a href="https://github.com/hzyhhzy/KataGomo/tree/fiveCount" target="_blank" rel="noreferrer">fiveCount</a></div>
                        <div><span>暂无</span></div>
                    </div>
                    <div class="compact-row">
                        <div>等差连六</div>
                        <div><a href="https://github.com/hzyhhzy/KataGomo/tree/EquDifGomoku" target="_blank" rel="noreferrer">EquDifGomoku</a></div>
                        <div><span>暂无</span></div>
                    </div>
                    <div class="compact-row">
                        <div>吃子五子棋</div>
                        <div><a href="https://github.com/hzyhhzy/KataGomo/tree/capture_gomoku" target="_blank" rel="noreferrer">capture_gomoku</a></div>
                        <div><span>暂无</span></div>
                    </div>
                </div>
            </div>
        </section>

        <section class="page-section">
            <div class="three-grid">
                <article class="detail-card">
                    <h3>README 中的说明风格</h3>
                    <p>并不是每个变种都发了 release，但 branch 索引已经足够说明这些规则实验确实做过并留有代码。</p>
                </article>
                <article class="detail-card">
                    <h3>训练脚本</h3>
                    <p>和主线一样，较新的分支一般看各自的 <code>scripts/</code> 目录；较老分支有些只有规则实现，没有完整的公开训练包。</p>
                </article>
                <article class="detail-card">
                    <h3>结论</h3>
                    <p>五子棋变种是 <code>KataGomo</code> 最丰富的一块之一，能够同时体现规则泛化与强度泛化。</p>
                </article>
            </div>
        </section>
        """,
    ),
    "games/hex.html": render_page(
        "KataHex",
        "Hex 专题页，整理 KataHex 的主分支、release、训练脚本目录与项目定位。",
        "Hex",
        "KataHex：最强 Hex 棋 AI",
        """
        <p>Hex 主线页面只做一件事：把当前最强 Hex 棋 AI 的主要入口和说明集中起来。</p>
        """,
        """
        <span class="tag">Hex_20250131</span>
        <span class="tag alt">Hex2024</span>
        <span class="tag warn">15x15 - 27x27</span>
        """,
        """
        <a class="button" href="https://github.com/hzyhhzy/KataGomo/releases/tag/Hex_20250131" target="_blank" rel="noreferrer">最新 release</a>
        <a class="ghost-button" href="https://github.com/hzyhhzy/KataGomo/tree/Hex2024" target="_blank" rel="noreferrer">Hex2024 分支</a>
        """,
        """
        <div class="page-hero-art">
            <img src="../images/hex-board.svg" alt="Hex 专题示意图">
        </div>
        """,
        """
        <section class="page-section">
            <div class="summary-grid">
                <article class="detail-card">
                    <h3>release</h3>
                    <p><code>Hex_20250131</code></p>
                </article>
                <article class="detail-card">
                    <h3>branch</h3>
                    <p><code>Hex2024</code></p>
                </article>
                <article class="detail-card">
                    <h3>定位</h3>
                    <p>首页把这条线定义为最强 Hex 棋 AI，因此这里优先强调主线而不是数学问题。</p>
                </article>
            </div>
        </section>

        <section class="page-section">
            <div class="three-grid">
                <article class="detail-card">
                    <h3>脚本目录</h3>
                    <ul class="list">
                        <li><code>Hex2024/scripts/hex15x3</code></li>
                        <li><code>Hex2024/scripts/hex19x3</code></li>
                        <li><code>Hex2024/scripts/hex27x3</code></li>
                    </ul>
                </article>
                <article class="detail-card">
                    <h3>数据集</h3>
                    <p>Hex 主线和五子棋类似，目前首页先强调 release、branch 和脚本目录，不额外虚构集中数据集链接。</p>
                </article>
                <article class="detail-card">
                    <h3>结论</h3>
                    <p>在这个站点的叙述里，KataHex 就是 Hex 主线的最强 AI 入口。</p>
                </article>
            </div>
        </section>
        """,
    ),
    "games/hex-template.html": render_page(
        "HexTemplate 特定局面分析",
        "HexTemplate 专题页，整理 Hex 特定局面分析与模板研究相关的分支说明。",
        "HexTemplate",
        "Hex 棋的特定局面分析",
        """
        <p><code>HexTemplate</code> 不是 Hex 主线模型页，而是一个偏研究性质的分支，适合单独收纳关于模板、特殊局面与局部结构的问题。</p>
        """,
        """
        <span class="tag">HexTemplate</span>
        <span class="tag alt">模板分析</span>
        <span class="tag warn">研究分支</span>
        """,
        """
        <a class="button" href="https://github.com/hzyhhzy/KataGomo/tree/HexTemplate" target="_blank" rel="noreferrer">HexTemplate 分支</a>
        """,
        """
        <div class="page-side-note">
            <strong>为什么单独拆出来</strong>
            <p>因为这块更偏“分析某类局面”，和训练最强 Hex AI 的主线不是同一件事。</p>
        </div>
        """,
        """
        <section class="page-section">
            <div class="two-grid">
                <article class="detail-card">
                    <h3>内容定位</h3>
                    <p>围绕 Hex 的特定局面、模板和特殊结构做分析，而不是单纯刷总体 Elo。</p>
                </article>
                <article class="detail-card">
                    <h3>当前状态</h3>
                    <p>这类问题通常比常规训练更偏研究，有的结论仍然是开放的，因此首页只做“特定局面分析”的摘要，不在这里夸大成定理。</p>
                </article>
            </div>
        </section>

        <section class="page-section">
            <div class="timeline">
                <article class="timeline-item">
                    <strong>branch</strong>
                    <p><code>HexTemplate</code></p>
                </article>
                <article class="timeline-item">
                    <strong>适合补充的内容</strong>
                    <p>后续可以继续往这里加模板图、特殊局面描述、当前已知结果和仍未解决的问题。</p>
                </article>
            </div>
        </section>
        """,
    ),
    "games/connect6.html": render_page(
        "KataConnect6",
        "六子棋主线专题页，整理 KataConnect6 的 release、branch、训练入口与开局库说明。",
        "Connect6",
        "KataConnect6：最强六子棋 AI",
        """
        <p>六子棋主线页面只处理最强 AI 本体，不和 NNUE 或结论页混写。</p>
        """,
        """
        <span class="tag">ConnectSix_20250505</span>
        <span class="tag alt">ConnectSix2024</span>
        <span class="tag warn">Opening Library</span>
        """,
        """
        <a class="button" href="https://github.com/hzyhhzy/KataGomo/releases/tag/ConnectSix_20250505" target="_blank" rel="noreferrer">最新 release</a>
        <a class="ghost-button" href="https://github.com/hzyhhzy/KataGomo/tree/ConnectSix2024" target="_blank" rel="noreferrer">ConnectSix2024</a>
        """,
        """
        <div class="page-hero-art">
            <img src="../images/connect6-board.svg" alt="六子棋专题示意图">
        </div>
        """,
        """
        <section class="page-section">
            <div class="summary-grid">
                <article class="detail-card">
                    <h3>release</h3>
                    <p><code>ConnectSix_20250505</code></p>
                </article>
                <article class="detail-card">
                    <h3>branch</h3>
                    <p><code>ConnectSix2024</code></p>
                </article>
                <article class="detail-card">
                    <h3>项目定位</h3>
                    <p>首页把这一页定义为最强六子棋 AI 的主入口。</p>
                </article>
            </div>
        </section>

        <section class="page-section">
            <div class="two-grid">
                <article class="detail-card">
                    <h3>release 中值得强调的内容</h3>
                    <ul class="list">
                        <li>整包发布，便于直接运行</li>
                        <li>公开 opening library</li>
                        <li>与不同棋盘尺寸的模型线一起构成主展示入口</li>
                    </ul>
                </article>
                <article class="detail-card">
                    <h3>训练脚本</h3>
                    <p>最近年份训练过的主线一般会在分支的 <code>scripts/</code> 目录放配置和训练脚本，六子棋主线建议优先查看 <code>ConnectSix2024/scripts</code>。</p>
                </article>
            </div>
        </section>

        <section class="page-section">
            <div class="timeline">
                <article class="timeline-item">
                    <strong>主线和结论分离</strong>
                    <p>模型强度和“疑似黑胜”的结论不是一回事，所以结论单独拆到另一页。</p>
                </article>
            </div>
        </section>
        """,
    ),
    "games/connect6-nnue.html": render_page(
        "六子棋 NNUE",
        "六子棋 NNUE 专题页，整理 gomoku_nnue 仓库中 connectsix_kata 分支的入口与目录。",
        "Connect6 NNUE",
        "六子棋 NNUE",
        """
        <p>这一页单独介绍六子棋的 NNUE 路线，和 KataConnect6 主线分开。</p>
        <p>你给的链接末尾有一个全角右括号，我这里已经修正成可访问的版本。</p>
        """,
        """
        <span class="tag">gomoku_nnue</span>
        <span class="tag alt">connectsix_kata</span>
        <span class="tag warn">NNUE</span>
        """,
        """
        <a class="button" href="https://github.com/hzyhhzy/gomoku_nnue/tree/connectsix_kata" target="_blank" rel="noreferrer">connectsix_kata</a>
        """,
        """
        <div class="page-side-note">
            <strong>用途</strong>
            <p>这条线更偏快速评估与另一套实现路线，适合作为 KataConnect6 主线之外的补充。</p>
        </div>
        """,
        """
        <section class="page-section">
            <div class="three-grid">
                <article class="detail-card">
                    <h3>仓库</h3>
                    <p><code>hzyhhzy/gomoku_nnue</code></p>
                </article>
                <article class="detail-card">
                    <h3>branch</h3>
                    <p><code>connectsix_kata</code></p>
                </article>
                <article class="detail-card">
                    <h3>当前可见目录</h3>
                    <p><code>nnue1</code>、<code>nnue1_kata</code>、<code>selfplay_tools</code>、<code>train_pytorch_v2</code></p>
                </article>
            </div>
        </section>

        <section class="page-section">
            <div class="two-grid">
                <article class="detail-card">
                    <h3>训练与工程目录</h3>
                    <ul class="list">
                        <li><code>train_pytorch_v2</code>：训练相关目录</li>
                        <li><code>selfplay_tools</code>：自博弈辅助工具</li>
                        <li><code>nnue1_kata</code>：和 Kata 路线更贴近的实现目录</li>
                    </ul>
                </article>
                <article class="detail-card">
                    <h3>结论</h3>
                    <p>六子棋页把这条路线单独列出来，是为了让“主线大模型”和“NNUE 工程线”并列存在，后续继续补强也更清晰。</p>
                </article>
            </div>
        </section>
        """,
    ),
    "games/connect6-conclusion.html": render_page(
        "六子棋结论",
        "六子棋结论专题页，整理当前页面展示的黑棋优势判断与不同棋盘尺寸的阶段性结论。",
        "Connect6 Conclusions",
        "六子棋结论",
        """
        <p><strong>六子棋疑似黑棋必胜！</strong></p>
        <p>这是一页专门收纳“结论”的页面，不和主线模型、NNUE 路线混在一起。</p>
        """,
        """
        <span class="tag warn">疑似黑胜</span>
        <span class="tag">19x19</span>
        <span class="tag alt">25x25</span>
        """,
        """
        <a class="button" href="https://github.com/hzyhhzy/KataGomo/releases/tag/ConnectSix_20250505" target="_blank" rel="noreferrer">ConnectSix release</a>
        """,
        """
        <div class="page-side-note">
            <strong>当前首页写法</strong>
            <p>这一页使用“疑似”措辞，强调这是当前项目结论和强烈判断，而不是已经在站内给出完整形式证明。</p>
        </div>
        """,
        """
        <section class="page-section">
            <div class="summary-grid">
                <article class="detail-card">
                    <h3>总判断</h3>
                    <p>六子棋疑似黑棋必胜。</p>
                </article>
                <article class="detail-card">
                    <h3>19x19</h3>
                    <p>疑似 55 步必胜。</p>
                </article>
                <article class="detail-card">
                    <h3>25x25</h3>
                    <p>疑似 45 步必胜。</p>
                </article>
            </div>
        </section>

        <section class="page-section">
            <div class="timeline">
                <article class="timeline-item">
                    <strong>为什么单独成页</strong>
                    <p>因为模型强度、工程实现和棋理结论是三件不同的事。把“结论”拆出来，后续补证明思路、局面图或搜索证据会更自然。</p>
                </article>
                <article class="timeline-item">
                    <strong>当前表述</strong>
                    <p>首页使用“疑似”是保守而明确的表达方式，既能突出力度，也不把尚未完全形式化的内容写成已经定理化的结论。</p>
                </article>
            </div>
        </section>
        """,
    ),
    "games/ataxx.html": render_page(
        "Ataxx",
        "Ataxx 专题页，整理 KataAtaxx 的 release、branch、数据集和 7x7 棋盘结论。",
        "Ataxx",
        "KataAtaxx：最强 Ataxx 棋 AI",
        """
        <p>Ataxx 页面按你要求只保留最核心的信息：release、branch、数据集和一个最醒目的结论。</p>
        """,
        """
        <span class="tag">Ataxx_20260501</span>
        <span class="tag alt">Ataxx-onnx</span>
        <span class="tag warn">7x7 = 57%</span>
        """,
        """
        <a class="button" href="https://github.com/hzyhhzy/KataGomo/releases/tag/Ataxx_20260501" target="_blank" rel="noreferrer">最新 release</a>
        <a class="ghost-button" href="https://github.com/hzyhhzy/KataGomo/tree/Ataxx-onnx" target="_blank" rel="noreferrer">Ataxx-onnx</a>
        """,
        """
        <div class="page-hero-art">
            <img src="../images/ataxx-board.svg" alt="Ataxx 专题示意图">
        </div>
        """,
        """
        <section class="page-section">
            <div class="summary-grid">
                <article class="detail-card">
                    <h3>release</h3>
                    <p><code>Ataxx_20260501</code></p>
                </article>
                <article class="detail-card">
                    <h3>branch</h3>
                    <p><code>Ataxx-onnx</code></p>
                </article>
                <article class="detail-card">
                    <h3>结论</h3>
                    <p>7x7 棋盘先手胜率 57%。</p>
                </article>
            </div>
        </section>

        <section class="page-section">
            <div class="two-grid">
                <article class="detail-card">
                    <h3>数据集</h3>
                    <p>公开数据集入口：<code>KataGo_Ataxx_202604</code>。</p>
                    <div class="link-row">
                        <a href="https://www.modelscope.cn/datasets/sigmoid/KataGo_Ataxx_202604" target="_blank" rel="noreferrer">ModelScope</a>
                    </div>
                </article>
                <article class="detail-card">
                    <h3>训练脚本</h3>
                    <p>release 指向 <code>Ataxx-onnx/scripts/ataxx7xtf1</code>，这是当前公开信息最完整的一条链路之一。</p>
                    <div class="link-row">
                        <a href="https://github.com/hzyhhzy/KataGomo/tree/Ataxx-onnx/scripts/ataxx7xtf1" target="_blank" rel="noreferrer">ataxx7xtf1</a>
                    </div>
                </article>
            </div>
        </section>
        """,
    ),
    "games/connectfour.html": render_page(
        "重力四子棋",
        "重力四子棋专题页，整理分支、release 和不同棋盘尺寸结论的展示框架。",
        "Connect Four",
        "重力四子棋",
        """
        <p>这一页先把你要求的两项硬信息挂稳：release 与 branch。</p>
        <p>关于不同棋盘尺寸的结论，这里先给出标准盘面的核心结论，并预留继续细化尺寸表的位置。</p>
        """,
        """
        <span class="tag">ConnectFour_20241019</span>
        <span class="tag alt">ConnectFour2024</span>
        <span class="tag warn">尺寸结论</span>
        """,
        """
        <a class="button" href="https://github.com/hzyhhzy/KataGomo_fork/releases/tag/ConnectFour_20241019" target="_blank" rel="noreferrer">release</a>
        <a class="ghost-button" href="https://github.com/hzyhhzy/KataGomo/tree/ConnectFour2024" target="_blank" rel="noreferrer">branch</a>
        """,
        """
        <div class="page-side-note">
            <strong>当前阶段</strong>
            <p>先把入口和标准结论写清楚，后面如果你愿意，我可以继续把“不同棋盘尺寸”补成一个更完整的尺寸表。</p>
        </div>
        """,
        """
        <section class="page-section">
            <div class="summary-grid">
                <article class="detail-card">
                    <h3>release</h3>
                    <p><code>ConnectFour_20241019</code></p>
                </article>
                <article class="detail-card">
                    <h3>branch</h3>
                    <p><code>ConnectFour2024</code></p>
                </article>
                <article class="detail-card">
                    <h3>标准结论</h3>
                    <p>标准 7x6 重力四子棋已知先手胜。</p>
                </article>
            </div>
        </section>

        <section class="page-section">
            <div class="two-grid">
                <article class="detail-card">
                    <h3>页面用途</h3>
                    <p>用来集中展示不同棋盘尺寸的结果。当前版本先放标准盘面的核心结论，避免把不完整的尺寸表写得过满。</p>
                </article>
                <article class="detail-card">
                    <h3>后续可补方向</h3>
                    <ul class="list">
                        <li>更多尺寸的先后手结论表</li>
                        <li>是否允许额外规则变化</li>
                        <li>各尺寸对应的分支、脚本与实验记录</li>
                    </ul>
                </article>
            </div>
        </section>
        """,
    ),
    "games/animal-chess.html": render_page(
        "斗兽棋",
        "斗兽棋专题页，整理分支、release 入口与“几乎必和棋”的结论。",
        "Animal Chess",
        "斗兽棋",
        """
        <p><strong>最强斗兽棋 AI</strong></p>
        <p>这一页保留两项核心入口：<code>AnimalChess2025</code> 分支和当前 README 里提到的 release 链接。</p>
        """,
        """
        <span class="tag">AnimalChess2025</span>
        <span class="tag alt">Dandelion v2.4</span>
        <span class="tag warn">几乎必和棋</span>
        """,
        """
        <a class="button" href="https://github.com/hzyhhzy/KataGomo/tree/AnimalChess2025" target="_blank" rel="noreferrer">branch</a>
        <a class="ghost-button" href="https://github.com/lxsgx23/Dandelion-Chess/releases/tag/v2.4" target="_blank" rel="noreferrer">release</a>
        """,
        """
        <div class="page-side-note">
            <strong>页面表述</strong>
            <p>首页用“几乎必和棋”来概括这条线的结论，因此详情页也保持同样口径。</p>
        </div>
        """,
        """
        <section class="page-section">
            <div class="summary-grid">
                <article class="detail-card">
                    <h3>branch</h3>
                    <p><code>AnimalChess2025</code></p>
                </article>
                <article class="detail-card">
                    <h3>release</h3>
                    <p><code>Dandelion v2.4</code></p>
                </article>
                <article class="detail-card">
                    <h3>结论</h3>
                    <p>斗兽棋几乎必和棋。</p>
                </article>
            </div>
        </section>

        <section class="page-section">
            <div class="timeline">
                <article class="timeline-item">
                    <strong>为什么值得单列</strong>
                    <p>斗兽棋在 README 里属于热门但没那么主流的棋种，单列后首页会更完整。</p>
                </article>
            </div>
        </section>
        """,
    ),
    "games/chinese-checkers.html": render_page(
        "中国跳棋",
        "中国跳棋专题页，整理 tiaoqi 分支、release 与“几乎必和棋”的结论。",
        "Chinese Checkers",
        "中国跳棋",
        """
        <p><strong>最强跳棋 AI</strong></p>
        <p>这一页按首页口径，突出 branch、release 与总体结论。</p>
        """,
        """
        <span class="tag">tiaoqi</span>
        <span class="tag alt">20240406</span>
        <span class="tag warn">几乎必和棋</span>
        """,
        """
        <a class="button" href="https://github.com/hzyhhzy/KataGomo/tree/tiaoqi" target="_blank" rel="noreferrer">branch</a>
        <a class="ghost-button" href="https://github.com/hzyhhzy/KataGomo_fork/releases/tag/20240406" target="_blank" rel="noreferrer">release</a>
        """,
        """
        <div class="page-side-note">
            <strong>当前摘要</strong>
            <p>首页使用“几乎必和棋”来概括中国跳棋这条线，详情页先沿用同样的表述。</p>
        </div>
        """,
        """
        <section class="page-section">
            <div class="summary-grid">
                <article class="detail-card">
                    <h3>branch</h3>
                    <p><code>tiaoqi</code></p>
                </article>
                <article class="detail-card">
                    <h3>release</h3>
                    <p><code>20240406</code></p>
                </article>
                <article class="detail-card">
                    <h3>结论</h3>
                    <p>跳棋几乎必和棋。</p>
                </article>
            </div>
        </section>
        """,
    ),
    "games/other-games.html": render_page(
        "其他小众棋种",
        "其他小众棋种共用详情页，整理 KataGomo 在 README 中列出的更多分支与 release 入口。",
        "Other Games",
        "其他小众棋种",
        """
        <p>KataGomo 在以下这些棋种中，目前也没有找到对手。</p>
        <p>这一页作为共用详情页，集中收纳那些不单独做首页大专题、但又很值得放进站点的棋种。</p>
        """,
        """
        <span class="tag">Amazons</span>
        <span class="tag alt">Reversi</span>
        <span class="tag warn">ScoreFour</span>
        """,
        """
        <a class="button" href="https://github.com/hzyhhzy/KataGomo/blob/master/README.md" target="_blank" rel="noreferrer">README</a>
        """,
        """
        <div class="page-side-note">
            <strong>排版原则</strong>
            <p>这页和首页一致，尽量用清晰的 branch / release 行表格，不额外铺开太多叙述。</p>
        </div>
        """,
        """
        <section class="page-section">
            <div class="table-card">
                <h2>分支与 release</h2>
                <div class="compact-table">
                    <div class="compact-row header">
                        <div>棋种</div>
                        <div>branch</div>
                        <div>release</div>
                    </div>
                    <div class="compact-row">
                        <div>Amazons</div>
                        <div><a href="https://github.com/hzyhhzy/KataGomo/tree/Amazons" target="_blank" rel="noreferrer">Amazons</a></div>
                        <div><a href="https://github.com/hzyhhzy/KataGomo_fork/releases/tag/20240406" target="_blank" rel="noreferrer">20240406</a></div>
                    </div>
                    <div class="compact-row">
                        <div>Breakthrough</div>
                        <div><a href="https://github.com/hzyhhzy/KataGomo/tree/breakthrough" target="_blank" rel="noreferrer">breakthrough</a></div>
                        <div><a href="https://github.com/hzyhhzy/KataGomo_fork/releases/tag/20240406" target="_blank" rel="noreferrer">20240406</a></div>
                    </div>
                    <div class="compact-row">
                        <div>Reversi</div>
                        <div><a href="https://github.com/hzyhhzy/KataGomo/tree/Reversi2023" target="_blank" rel="noreferrer">Reversi2023</a></div>
                        <div><span>暂无</span></div>
                    </div>
                    <div class="compact-row">
                        <div>Ultimate Tic-tac-toe</div>
                        <div><a href="https://github.com/hzyhhzy/KataGomo/tree/UltimateTictactoe2024" target="_blank" rel="noreferrer">UltimateTictactoe2024</a></div>
                        <div><a href="https://github.com/hzyhhzy/KataGomo/releases/tag/UltimateTictactoe_20241101" target="_blank" rel="noreferrer">UltimateTictactoe_20241101</a></div>
                    </div>
                    <div class="compact-row">
                        <div>ScoreFour / ConnectFour3D</div>
                        <div><a href="https://github.com/hzyhhzy/KataGomo/tree/ConnectFour3d" target="_blank" rel="noreferrer">ConnectFour3d</a></div>
                        <div><a href="https://github.com/hzyhhzy/KataGomo/releases/tag/ScoreFour_20250510" target="_blank" rel="noreferrer">ScoreFour_20250510</a></div>
                    </div>
                    <div class="compact-row">
                        <div>Dots and Boxes</div>
                        <div><a href="https://github.com/hzyhhzy/KataGomo/tree/DotsAndBoxes" target="_blank" rel="noreferrer">DotsAndBoxes</a></div>
                        <div><span>暂无</span></div>
                    </div>
                    <div class="compact-row">
                        <div>Quoridor</div>
                        <div><a href="https://github.com/hzyhhzy/KataGomo/tree/Quoridor2024" target="_blank" rel="noreferrer">Quoridor2024</a></div>
                        <div><span>暂无</span></div>
                    </div>
                    <div class="compact-row">
                        <div>Surakarta</div>
                        <div><a href="https://github.com/hzyhhzy/KataGomo/tree/Surakarta" target="_blank" rel="noreferrer">Surakarta</a></div>
                        <div><span>暂无</span></div>
                    </div>
                    <div class="compact-row">
                        <div>Clobber</div>
                        <div><a href="https://github.com/hzyhhzy/KataGomo/tree/Clobber2023" target="_blank" rel="noreferrer">Clobber2023</a></div>
                        <div><span>暂无</span></div>
                    </div>
                </div>
            </div>
        </section>
        """,
    ),
    "games/math-problems.html": render_page(
        "数学问题",
        "数学问题专题页，根据 README 总结 Angel Problem、七连珠证明尝试、Dawson Chess 与 Escape Go 等。",
        "Math",
        "数学问题",
        """
        <p>这里根据 README 稍微总结一下数学相关问题，并且按你的要求不提 Hex 相关那一条。</p>
        <p>这部分和棋类专题不同，更偏“把数学问题表示成棋盘博弈后进行分析”。</p>
        """,
        """
        <span class="tag">Angel Problem</span>
        <span class="tag alt">Seven-in-a-row</span>
        <span class="tag warn">Escape Go</span>
        """,
        """
        <a class="button" href="googology/index.html">Googology</a>
        <a class="ghost-button" href="https://github.com/hzyhhzy/KataGomo/tree/AngelProblem" target="_blank" rel="noreferrer">AngelProblem</a>
        """,
        """
        <div class="page-side-note">
            <strong>说明</strong>
            <p>这页只提 README 里比较明确的几项数学问题，不把 Hex 相关那条放进来。</p>
        </div>
        """,
        """
        <section class="page-section">
            <div class="three-grid">
                <article class="detail-card">
                    <h3>Angel Problem</h3>
                    <p>README 给出的结果是：魔鬼获胜的最小棋盘为 32x33，最少步数大于 100；即使在 101x101 棋盘上，最快的方式也是把天使逼到墙边。</p>
                    <div class="link-row">
                        <a href="https://github.com/hzyhhzy/KataGomo/tree/AngelProblem" target="_blank" rel="noreferrer">AngelProblem</a>
                    </div>
                </article>
                <article class="detail-card">
                    <h3>七连珠证明尝试</h3>
                    <p>README 提到相关文章的方法最终不能完成证明，因此这部分更适合作为“证明尝试与反思”的入口。</p>
                    <div class="link-row">
                        <a href="https://github.com/hzyhhzy/KataGomo/tree/ProveSevenInARow" target="_blank" rel="noreferrer">ProveSevenInARow</a>
                    </div>
                </article>
                <article class="detail-card">
                    <h3>Dawson Chess</h3>
                    <p>README 对这条线的概括很短：<em>Chaotic</em>。说明它更偏结构复杂、难以简单归类的组合游戏问题。</p>
                    <div class="link-row">
                        <a href="https://github.com/hzyhhzy/KataGomo/tree/DawsonChess" target="_blank" rel="noreferrer">DawsonChess</a>
                    </div>
                </article>
            </div>
        </section>

        <section class="page-section">
            <div class="two-grid">
                <article class="detail-card">
                    <h3>Escape Go</h3>
                    <p>README 给出的结果是大约 25 步，问题表述为：如果白棋能像围棋一样提掉黑棋的子，那么黑棋最多能在一子被吃之前走多少步。</p>
                    <div class="link-row">
                        <a href="https://github.com/hzyhhzy/KataGomo/tree/EscapeGo" target="_blank" rel="noreferrer">EscapeGo</a>
                    </div>
                </article>
                <article class="detail-card">
                    <h3>站内数学入口</h3>
                    <p>除了 README 总结出来的这些问题，你之前要求保留的 <code>googology</code> 页面也继续放在站内，作为数学内容的另一个入口。</p>
                </article>
            </div>
        </section>
        """,
    ),
}


write("styles.css", styles_css)
write("index.html", index_html)

for rel_path, content in pages.items():
    write(rel_path, content)
