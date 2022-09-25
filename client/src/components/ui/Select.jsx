// * react
import { memo } from 'react';

const Select = memo(({ options, onChange, name, title }) => {
    return (
        <div className="flex flex-col">
            <h4>{title}</h4>
            <select
                name={name}
                onChange={onChange}
                className="cursor-pointer bg-white border-[1px] border-solid border-black rounded-md p-1 px-4 h-[34px]"
            >
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
});

export default Select;
