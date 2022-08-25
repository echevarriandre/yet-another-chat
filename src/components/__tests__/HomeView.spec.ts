import { describe, expect, it } from "vitest";

import HomeView from "@/views/HomeView.vue";
import { mount } from "@vue/test-utils";

describe("HomeView", () => {
  it("renders properly", () => {
    const wrapper = mount(HomeView);
    expect(wrapper.text()).toContain("Vue 3 + Tailwind template");
  });
});
