import { beforeAll, describe, expect, it } from "vitest";

import LoginView from "@/views/LoginView.vue";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { createI18n } from "vue-i18n";

beforeAll(() => {
  setActivePinia(createPinia());
});

describe("Open Login Page", () => {
  it("renders properly", () => {
    const i18n = createI18n({ messages: { "en-US": { login: { title: "Yet Another Chat" } } } });
    const wrapper = mount(LoginView, { plugins: [i18n], global: { plugins: [i18n] } });
    expect(wrapper.text()).toContain("Yet Another Chat");
  });
});
