import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { SearchBar } from "./SearchBar";

describe('Searchbar', () => {
    test('should render search bar correctly', () => {
        const {container} = render(<SearchBar onQuery={() => {}} />);

        expect(container).toMatchSnapshot(); // create a __snapshots__/<fileName>
        expect(screen.getByRole('textbox')).toBeDefined();
        expect(screen.getByRole('button')).toBeDefined();
    });
    
    test('should call onQuery with the correct value after 700ms', async () => {
        const onQuery = vi.fn();
        render(<SearchBar onQuery={onQuery} />);
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'anyaforger' } });

        // screen.debug();
        // await new Promise((resolve) => setTimeout(resolve, 701));
        await waitFor(() => {
            expect(onQuery).toHaveBeenCalled();
            expect(onQuery).toHaveBeenCalledWith('anyaforger');
        });

    });
});