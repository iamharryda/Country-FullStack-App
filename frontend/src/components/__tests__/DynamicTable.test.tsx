import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DynamicTable } from "../DynamicTable";

describe("DynamicTable Tests", () => {
    it("should render the table with no data", ()=>{
        const data = [
            {
                id: 1,
                name: "John Doe",
                
            },
            {
                id: 2,
                name: "jane Smith",
            }

        ];
        render(<DynamicTable data={data} />);
        expect(screen.queryByRole("table")).toBeInTheDocument();
        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("jane Smith")).toBeInTheDocument();
    })
})