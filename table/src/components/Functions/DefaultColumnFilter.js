import React from "react";

const DefaultColumnFilter = ({ column: { filterValue, setFilter } }) => {
    return (
        <input
            className="txt"
            value={filterValue || ""}
            onChange={(e) => {
                setFilter(e.target.value || undefined);
            }}
            placeholder="Search"
        />
    );
};

export default DefaultColumnFilter;
