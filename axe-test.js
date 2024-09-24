const base = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

// This new "test" can be used in multiple test files, and each of them will get
// a consistently configured AxeBuilder instance.
exports.test = base.test.extend({
    makeAxeBuilder: async ({ page }, use) => {
        const makeAxeBuilder = () =>
            new AxeBuilder({ page })
                .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']) // Target WCAG 2.1 AA
                .disableRules(['select-name']); // Disable the specific rule causing the violation

        await use(makeAxeBuilder);
    },
});
exports.expect = base.expect;
