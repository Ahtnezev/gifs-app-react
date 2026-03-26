import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { MyCounterApp } from "./MyCounterApp";
// import { useCounter } from "../hooks/useCounter";

const handleAddMock = vi.fn();
const handleSubstractMock = vi.fn();
const handleResetMock = vi.fn();

vi.mock("../hooks/useCounter", () => ({
    useCounter: () => ({
        counter: 40,
        handleAdd: handleAddMock,
        handleSubstract: handleSubstractMock,
        handleReset: handleResetMock,
    })
}));


describe("MyCounterApp #2", ()=>{

    test("should render the component", ()=> {
        render(<MyCounterApp />)

    // screen.debug();
    expect(screen.getByRole('heading', {level: 1}).innerHTML).toContain(
      `counter: 40`
    );

   //  expect(2).toBe(1); check package file in npm run build ><

    expect(screen.getByRole('button', {name: '+1'}).innerHTML).toBeDefined();
    expect(screen.getByRole('button', {name: '-1'}).innerHTML).toBeDefined();
    expect(screen.getByRole('button', {name: 'Reset'}).innerHTML).toBeDefined();
    });

    test("should call handledAdd if button is clicked", () => {
        render(<MyCounterApp/>)

        const button = screen.getByRole('button', {name:'+1'});

        fireEvent.click(button);

        expect(handleAddMock).toHaveBeenCalled();
        expect(handleAddMock).toHaveBeenCalledTimes(1);
        expect(handleSubstractMock).not.toHaveBeenCalled();
        expect(handleResetMock).not.toHaveBeenCalled();
    });

});