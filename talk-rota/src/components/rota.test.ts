import { test, expect, describe, vi, it } from "vitest";
import { mount } from "@vue/test-utils";
import rota from "./rota.vue"; 
import {render, fireEvent, screen} from '@testing-library/vue'

describe("rota", () => {
    test("mount component", async () => {
        expect(rota).toBeTruthy();
        // expect(wrapper.html()).toMatchSnapshot();
    });

    test("fridays array is assigned", () => {
        const wrapper = mount(rota);
        expect(wrapper.vm.fridays.length).toBe(0);
    })

    test("tableData is created", () => {
        const wrapper = mount(rota);
        expect(wrapper.tableData).toBe(undefined);
    })

    it("confirm is called", async () => {
    //     const wrapper = mount(rota);
    //     const beforeConfirmedSpy = vi.spyOn(wrapper.vm, "confirm");
    //     // await wrapper.vm.confirm();
    //     const button = screen.getByText("Confirm")
    //     await fireEvent.click(button)
    //     expect(beforeConfirmedSpy).toHaveBeenCalled();
        const mockConfirm = vi.fn();
        render(rota)
        const button = screen.getByText("Confirm");
        await fireEvent.click(button);

        expect(mockConfirm).toHaveBeenCalled();
    })

})
