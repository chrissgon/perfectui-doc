import { describe, expect, it } from "vitest";
import { scopeExample } from "../../shared/example-scope";

// Several live examples on one page must not share ids or group names (content-model REQ-3).
describe("scopeExample", () => {
  it("suffixes ids and every attribute that points at one", () => {
    const html = '<button popovertarget="menu">x</button><div id="menu" popover></div>'
      + '<button commandfor="dlg" command="show-modal"></button><dialog id="dlg"></dialog>'
      + '<button interestfor="help" aria-describedby="help"></button><div id="help" popover="hint"></div>'
      + '<label for="email">E</label><input id="email">';
    const out = scopeExample(html, "e1");
    expect(out).toContain('popovertarget="menu-e1"');
    expect(out).toContain('id="menu-e1"');
    expect(out).toContain('commandfor="dlg-e1"');
    expect(out).toContain('interestfor="help-e1"');
    expect(out).toContain('aria-describedby="help-e1"');
    expect(out).toContain('for="email-e1"');
    expect(out).toContain('id="email-e1"');
  });

  it("suffixes group names so details and radios group per example", () => {
    const out = scopeExample('<details name="faq"></details><input type="radio" name="plan">', "e2");
    expect(out).toContain('name="faq-e2"');
    expect(out).toContain('name="plan-e2"');
  });

  it("leaves references to ids the example does not define, and other attributes, alone", () => {
    const html = '<a href="#top" class="pui-btn" aria-labelledby="page-title">x</a><div data-id="menu"></div>';
    expect(scopeExample(html, "e3")).toBe(html);
  });

  it("scopes each id listed in a multi-id reference", () => {
    const out = scopeExample('<div aria-describedby="a b"></div><p id="a"></p><p id="b"></p>', "e4");
    expect(out).toContain('aria-describedby="a-e4 b-e4"');
  });
});
