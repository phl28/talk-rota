import { mount } from "@vue/test-utils";
import tableRow from "./tableRow.vue";
import { test, expect } from "vitest";

test("mount component", async () => {
    expect(tableRow).toBeTruthy();

    const wrapper = mount(tableRow, {
        props: {
            rowData: {
                name: "test",
                date: "2021-01-01",
            }
        }
    })
    expect(wrapper.html()).toMatchSnapshot();

});