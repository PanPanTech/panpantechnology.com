# panpantechnology.com — 站点说明（给 Claude / 任何 AI 助手）

## 站点定位
- PanPanTech 集团品牌官网（英文，面向海外 B2B 采购），主营**商用清洁机器人**，重点是**外墙/幕墙清洁机器人（AFR 系列）**；同时展示 AMR 搬运机器人、服务机器人、零售 AIoT（ESL）与制造能力。
- 目标：Google 自然搜索 + AI 搜索（ChatGPT / Perplexity / Google AI 模式）引用 → 询盘（/request-a-quote/）。
- 市场：全球英文；不做百度（中文站是 aiesl.cn）。

## 品牌事实（所有页面、JSON-LD、llms.txt 必须一致）
- 品牌：PanPanTech；成立 2015；总部 Guangzhou, China
- 邮箱：info@panpantechnology.com；电话/WhatsApp：+86-13925118851
- 外墙机器人价格区间：USD 60,000–90,000；AFR-1500 已标注 CE 认证
- 不确定的事实（认证、价格、案例）不要编造，留 TODO 让人工确认

## 关键词策略（依据 GSC 2026-08-22 ~ 11-21）
- **主攻（商业意图）**：facade cleaning robot / commercial window cleaning robot / window cleaning robot for high rise buildings / hotel cleaning robot / commercial cleaning robot price / pudu & gausium alternatives / avidbots alternative
- **AI 引用型问句**（AI 模式排名 1–6，0 点击）：certifications、leasing / RaaS、cost、safest around people、high-rise capability → 页面开头必须有「直接结论 + 报价入口」
- **不追**：Tennant T300 参数类（t300 weight / specs / manual）——曝光大但只查参数、不转化。保留页面，不再投入；只做导流到替代产品。
- **不追**：clean room robots market、市场规模类报告词（排名 40–60，与产品无关）

## 内容规范
- 每篇博客：开头 40–60 字直接回答 + 「Quick verdict」+ 报价 CTA；正文有对比表；结尾 FAQ（FAQPage JSON-LD）
- 新文章要同步：`blog/index.html` 列表、`sitemap.xml`、`llms.txt`
- 标题 ≤ 60 字符，description ≤ 155 字符；含年份 2026
- 内链：博客 → 对应产品页 → /request-a-quote/

## 技术
- 纯静态站，GitHub Pages，`main` 分支根目录直接上线（CNAME = www.panpantechnology.com）
- GA4：G-XP86WHBQRX（媒体资源 561842694，账号 PanPanTech 414295528），代码在 `assets/js/site.js`
- 转化事件：`generate_lead`（询盘表单成功提交 / 邮件兜底）、`contact_click`（mailto / tel / WhatsApp 点击）
- 询盘表单 `.cleanbot-quote-form` → `https://inquiry.panpantechnology.com/api/inquiries`
- ⚠️ **不要在本地运行 `npm run build`**：它会从 `../品牌官网 20260709 2.0版本/site-package` 重新导入旧版页面，覆盖手工修改。只运行 `npm test`（校验 title/description/canonical/H1/JSON-LD/内链/sitemap/llms.txt）。
- 旧 URL 跳转页由 `scripts/generate-redirects.py` 生成，跳转页不能进 sitemap / llms.txt
- 提交前必须 `npm test` 通过；CI 在 push main 时跑 `npm run check`

## 工作流
- 新改动开分支 `seo/<主题>-<MMDD>` 或 `post/<slug>-<MMDD>`，测试通过后合并 main
- 每周看 GSC：曝光高 + 点击率 < 1% 的页面优先改标题和开头
- 跨站规范见 `E:\桌面\SEO`（总控）
