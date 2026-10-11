'use strict';

// Run against a local static server. Install Playwright externally or expose it
// with NODE_PATH; no browser runtime is shipped with the website.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const http = require('node:http');
const { chromium } = require('playwright');

(async () => {
    const sourceRoot = path.resolve(__dirname, '..');
    const server = http.createServer((request, response) => {
        const relative = decodeURIComponent(new URL(request.url, 'http://localhost').pathname).replace(/^\/googology\//, '');
        const filename = path.resolve(sourceRoot, relative || 'index.html');
        if (!filename.startsWith(sourceRoot + path.sep)) {
            response.writeHead(403).end();
            return;
        }
        fs.readFile(filename, (error, body) => {
            if (error) { response.writeHead(404).end(); return; }
            const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2' };
            response.writeHead(200, { 'Content-Type': types[path.extname(filename)] || 'application/octet-stream' });
            response.end(body);
        });
    });
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const base = process.env.GOOGOLOGY_URL || 'http://127.0.0.1:' + server.address().port + '/googology/';
    const output = process.env.GOOGOLOGY_QA_DIR || path.join(os.tmpdir(), 'googology-refresh-qa');
    fs.mkdirSync(output, { recursive: true });
    let browser;
    const errors = [];
    try {
        browser = await chromium.launch({
            channel: process.env.GOOGOLOGY_BROWSER || 'msedge',
            headless: true
        });
        const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
        page.on('pageerror', error => errors.push(error.message));
        await page.goto(base);
        await page.locator('[data-item-id="item-109"].scale-label').waitFor();
        await page.screenshot({ path: path.join(output, 'desktop.png') });

        // Secondary landmarks appear after zooming, but remain searchable.
        assert.equal(await page.locator('[data-item-id="item-124"].scale-label').isVisible(), false);
        assert.equal(await page.locator('[data-item-id="item-125"].scale-label').isVisible(), false);
        assert.equal(await page.locator('[data-item-id="item-104"]').count(), 0);
        const bmsLimitLabel = await page.locator('[data-item-id="item-130"].scale-label').boundingBox();
        const y13Label = await page.locator('[data-item-id="item-105"].scale-label').boundingBox();
        assert.ok(y13Label.y + y13Label.height < bmsLimitLabel.y, 'stacked PTO / Y labels do not overlap');
        assert.match(await page.locator('[data-item-id="item-103"].scale-label').textContent(), /SHO/);
        assert.ok(await page.locator('[data-item-id="item-103"] .mathbf').count(), 'lim(BMS) uses a bold math font');
        const labelFrame = selector => page.locator(selector).evaluate(element => {
            const style = getComputedStyle(element);
            return [style.fontSize, style.backgroundColor, style.borderTopWidth, style.borderRightWidth, style.boxShadow];
        });
        assert.deepEqual(await labelFrame('[data-item-id="item-103"].scale-label'),
            await labelFrame('[data-item-id="item-109"].scale-label'), 'BMS uses the same frame as other major labels');
        assert.match(await page.locator('.axis-segment').allTextContents().then(parts => parts.join(' ')), /山脉记号家族/);

        // Search discovers entries without navigating the diagram manually.
        await page.locator('#entry-search').fill('SRPD');
        await page.locator('#search-results [data-item-id="item-124"]').click();
        await page.locator('#detail-modal:not([hidden])').waitFor();
        assert.match(await page.locator('#modal-body h2').textContent(), /SRPD/);
        assert.equal(new URL(page.url()).hash, '#item-124');
        assert.equal(await page.locator('.detail-representation').count(), 2);
        assert.match(await page.locator('.detail-representation').last().textContent(), /可能是/);
        await page.locator('.code-dialog-open').first().click();
        const golf = await page.locator('dialog[open] code').textContent();
        assert.equal(golf.length, 226);
        assert.match(golf, /console\.log\(n\)$/);
        await page.keyboard.press('Escape');
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('#detail-modal').isHidden(), true);
        await page.locator('#entry-search').fill('1,3,4,2,5,8,10,4,9,14,17,10');
        await page.locator('#search-results [data-item-id="item-124"]').waitFor();
        assert.equal(await page.locator('#search-results .directory-entry').count(), 1);

        // A normal pointer click must reach the label, not its capture parent.
        await page.locator('#jump-select').selectOption('bms');
        await page.locator('[data-item-id="item-124"].scale-label').click();
        await page.locator('#detail-modal:not([hidden])').waitFor();
        await page.screenshot({ path: path.join(output, 'detail.png') });
        await page.keyboard.press('Escape');

        // Locale changes update labels, directory and detail documents together.
        await page.locator('#language-select').selectOption('en');
        await page.locator('#entry-search').fill('Laver Table');
        await page.locator('#search-results [data-item-id="item-113"]').click();
        await page.locator('.code-dialog-open').click();
        await page.locator('dialog[open]').waitFor();
        assert.match(await page.locator('dialog[open] code').textContent(), /def q\(n\)/);
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('dialog[open]').count(), 0);
        assert.equal(await page.locator('#detail-modal').isVisible(), true);
        await page.keyboard.press('Escape');

        // A direct entry URL opens the same content in a fresh load.
        await page.goto(base + '#item-129');
        await page.locator('#detail-modal:not([hidden])').waitFor();
        assert.match(await page.locator('#modal-body h2').textContent(), /DQDN/);
        await page.keyboard.press('Escape');
        await page.locator('#jump-select').selectOption('pto');
        assert.equal(await page.locator('[data-item-id="item-129"].scale-label').isVisible(), false);
        await page.screenshot({ path: path.join(output, 'proof-theory.png') });
        await page.goto(base + '#item-131');
        await page.locator('#detail-modal:not([hidden])').waitFor();
        assert.match(await page.locator('#modal-body h2').textContent(), /golf/);
        assert.match(await page.locator('#modal-body').textContent(), /gpt6-astra/);

        // New ordinal references remain navigable within the detail modal.
        await page.goto(base + '#item-086');
        await page.locator('#modal-body a[href="#item-085"]').click();
        await page.waitForURL('**/#item-085');
        await page.locator('#modal-body h2').filter({ hasText: 'SVO' }).waitFor();
        assert.match(await page.locator('#modal-body h2').textContent(), /SVO/);
        assert.match(await page.locator('#modal-body').textContent(), /BMS/);
        await page.goto(base + '#item-106');
        await page.locator('#modal-body strong').filter({ hasText: 'Rigorous bounds' }).waitFor();
        assert.match(await page.locator('#modal-body').textContent(), /Rigorous bounds/);
        assert.match(await page.locator('#modal-body').textContent(), /Conjectured bounds/);
        assert.equal(await page.locator('.katex-error').count(), 0);

        for (const [id, title, fields] of [['057', 'ε', 3], ['060', 'Goodstein', 3], ['092', 'Buchholz', 2], ['103', 'SHO', 3], ['124', 'SRPD', 2]]) {
            await page.goto(base + '#item-' + id);
            await page.locator('#modal-body h2').filter({ hasText: title }).waitFor();
            await page.locator('.detail-representation').first().waitFor();
            assert.equal(await page.locator('.detail-representation').count(), fields);
            assert.equal(await page.locator('.katex-error').count(), 0);
            await page.screenshot({ path: path.join(output, 'representations-' + id + '.png') });
        }

        // Narrow viewports retain reachable search, stages and code controls.
        const mobile = await browser.newPage({
            viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true
        });
        mobile.on('pageerror', error => errors.push(error.message));
        await mobile.goto(base);
        await mobile.locator('[data-item-id="item-109"].scale-label').waitFor();
        assert.equal(await mobile.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
        await mobile.screenshot({ path: path.join(output, 'mobile.png') });
        await mobile.locator('#entry-search').fill('DQDN');
        await mobile.locator('#search-results [data-item-id="item-129"]').tap();
        await mobile.locator('#detail-modal:not([hidden])').waitFor();
        assert.match(await mobile.locator('#modal-body h2').textContent(), /DQDN/);
        await mobile.screenshot({ path: path.join(output, 'mobile-detail.png') });
        await mobile.keyboard.press('Escape');
        await mobile.locator('[data-action="reset"]').tap();
        const endTick = await mobile.locator('.scale-item[data-item-id="item-122"]').boundingBox();
        assert.ok(endTick && endTick.x + endTick.width / 2 < 390, 'mobile overview includes Rayo');
        for (const id of ['061', '106']) {
            await mobile.goto(base + '#item-' + id);
            await mobile.locator('#detail-modal:not([hidden])').waitFor();
            await mobile.locator('#modal-body h2').filter({ hasText: id === '061' ? '伪燃烧数' : 'SCG' }).waitFor();
            assert.equal(await mobile.locator('.katex-error').count(), 0);
            assert.equal(await mobile.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
            await mobile.locator('#modal-body .katex-display').last().scrollIntoViewIfNeeded();
            await mobile.screenshot({ path: path.join(output, 'mobile-item-' + id + '.png') });
        }
        for (const [id, title, fields] of [['057', 'ε', 3], ['092', 'Buchholz', 2], ['124', 'SRPD', 2]]) {
            await mobile.goto(base + '#item-' + id);
            await mobile.locator('#modal-body h2').filter({ hasText: title }).waitFor();
            assert.equal(await mobile.locator('.detail-representation').count(), fields);
            const bounds = await mobile.locator('.detail-representation').evaluateAll(cards => cards.map(card => {
                const rect = card.getBoundingClientRect();
                return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
            }));
            assert.ok(bounds.every(rect => rect.x >= 0 && rect.x + rect.width <= 390));
            assert.ok(bounds.slice(1).every((rect, i) => rect.y >= bounds[i].y + bounds[i].height));
            assert.equal(await mobile.locator('.katex-error').count(), 0);
            assert.equal(await mobile.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
            await mobile.locator('#modal-body h2').scrollIntoViewIfNeeded();
            await mobile.screenshot({ path: path.join(output, 'mobile-representations-' + id + '.png') });
        }
        assert.deepEqual(errors, []);
        console.log('Browser checks passed. Screenshots: ' + output);
    } finally {
        if (browser) await browser.close();
        await new Promise(resolve => server.close(resolve));
    }
})().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
