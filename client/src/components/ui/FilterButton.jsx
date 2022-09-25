const FilterButton = ({ children, onClick, disable }) => {
    return (
        <button
            disabled={disable}
            onClick={onClick}
            className="border-[1px] border-solid border-black px-4 rounded-md disabled:opacity-30"
        >
            {children}
        </button>
    );
};

export default FilterButton;
