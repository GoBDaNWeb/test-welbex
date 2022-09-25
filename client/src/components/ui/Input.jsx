const Input = ({ placeholder, value, onChange, name }) => {
    return (
        <input
            onChange={onChange}
            value={value}
            name={name}
            className="outline-none border-[1px] border-solid border-black p-1 px-4 w-full rounded-md h-[34px]"
            type="text"
            placeholder={placeholder}
        />
    );
};

export default Input;
