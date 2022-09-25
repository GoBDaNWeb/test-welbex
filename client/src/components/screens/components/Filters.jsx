// * react
import { useState, useEffect } from 'react';

// * store
import { observer } from 'mobx-react-lite';
import filter from '../../../store/filter';

// * components
import Select from '../../ui/Select';
import Input from '../../ui/Input';
import FilterButton from '../../ui/FilterButton';

const sortOptions = [
    { label: 'Количество', value: 'count' },
    { label: 'Название', value: 'name' },
    { label: 'Расстояние', value: 'distance' },
];
const conditionOptions = [
    { label: 'Меньше', value: 'less' },
    { label: 'Равно', value: 'equally' },
    { label: 'Содержит', value: 'contains' },
    { label: 'Больше', value: 'more' },
];

const Filters = observer(() => {
    const [sort, setSort] = useState('count');
    const [condition, setCondition] = useState('less');
    const [inputValue, setInputValue] = useState('');

    // * при изменении селекта записываем значение
    const onChangeSelect = (e) => {
        const { value, name } = e.target;
        if (name === 'sort') setSort(value);
        if (name === 'condition') setCondition(value);
    };

    // * при изменении поля ввода записываем значение
    const onChangeInput = (e) => {
        const { value } = e.target;

        if (sort === 'name') {
            setInputValue(value);
        } else {
            setInputValue(value.replace(/[^0-9\-()]/g, ''));
        }
    };

    // * функция фильтрации
    const onFilterForm = (e) => {
        e.preventDefault();
        filter.setSort(sort);
        filter.setCondition(condition);
        filter.setInputValue(inputValue);
    };

    // * условие по которому кнопка disabled
    const disableBtnCondition =
        (sort === 'name' &&
            (condition === 'less' ||
                condition === 'more' ||
                condition === 'equally')) ||
        (condition === 'contains' && (sort === 'count' || sort === 'distance'));

    // * не дает вписать буквы в числовые колонки
    useEffect(() => {
        if (sort !== 'name')
            setInputValue(inputValue.replace(/[^0-9\-()]/g, ''));
    }, [sort, condition]);

    return (
        <form className="w-[50%] flex gap-3 flex-col items-center justify-center">
            <div className="flex gap-3 items-end justify-center">
                {sort}
                <Select
                    title="Выбор колонки"
                    name="sort"
                    onChange={onChangeSelect}
                    options={sortOptions}
                />
                <Select
                    title="Выбор условия"
                    name="condition"
                    onChange={onChangeSelect}
                    options={conditionOptions}
                />
                <Input
                    name="input"
                    onChange={onChangeInput}
                    value={inputValue}
                    placeholder="значение для фильтрации"
                />
            </div>
            <div className="flex flex-col items-center">
                <FilterButton
                    disable={disableBtnCondition}
                    onClick={onFilterForm}
                >
                    Отфильтровать
                </FilterButton>
                {disableBtnCondition && (
                    <span className="text-red-600 text-sm">
                        *Колонку &quot;Название&quot; можно отфильтровать только
                        по условию &quot;Содержит&quot;
                    </span>
                )}
            </div>
        </form>
    );
});

export default Filters;
