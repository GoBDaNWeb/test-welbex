// * react
import { useEffect } from 'react';
import moment from 'moment';

// * store
import { observer } from 'mobx-react-lite';
import filter from '../../../store/filter';

// * services
import { useFetchAllData } from '../../../services/hooks/useFecthAllData';
import { useFetchPaginationData } from '../../../services/hooks/useFetchPaginationData';

// * components
import Select from '../../ui/Select';

const limitPerPage = [
    { label: 5, value: 5 },
    { label: 10, value: 10 },
    { label: 15, value: 15 },
];

const Table = observer(() => {
    const {
        data: paginationData,
        isLoading,
        refetch: refetchPaginationData,
    } = useFetchPaginationData(
        filter.condition,
        filter.sort,
        filter.inputValue,
        filter.page,
        filter.limit,
    );

    const { data: allData, refetch: refetchAllData } = useFetchAllData(
        filter.condition,
        filter.sort,
        filter.inputValue,
    );

    // * функция изменения лимита строк в таблице
    const onChangeLimit = (e) => {
        const { value } = e.target;
        filter.setLimit(value);
    };

    // * Высчитывает кол-во всех страниц
    useEffect(() => {
        const totalPages = Math.ceil(allData.length / filter.limit);
        if (totalPages < filter.page) {
            filter.setPage(totalPages > 0 ? totalPages : 1);
        }
        filter.setTotalPages(totalPages);
    }, [filter.limit, allData]);

    // * заново запрашиваем данные при изменении фильтров
    useEffect(() => {
        refetchPaginationData();
        refetchAllData();
    }, [
        filter.inputValue,
        filter.condition,
        filter.sort,
        filter.page,
        filter.limit,
    ]);

    return (
        <>
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="border-[1px] border-solid border-gray-300 p-4">
                            Название
                        </th>
                        <th className="border-[1px] border-solid border-gray-300 p-4">
                            Дата
                        </th>
                        <th className="border-[1px] border-solid border-gray-300 p-4">
                            Количество
                        </th>
                        <th className="border-[1px] border-solid border-gray-300 p-4">
                            Расстояние
                        </th>
                    </tr>
                </thead>
                {!isLoading && (
                    <tbody>
                        {paginationData.map((item) => (
                            <tr key={item.id}>
                                <td className="border-[1px] border-solid border-gray-300 p-4 font-bold">
                                    {item.name}
                                </td>
                                <td className="border-[1px] border-solid border-gray-300 p-4 text-center">
                                    {moment(item.date).format(
                                        'DD.MM.YYYY, hh:mm',
                                    )}
                                </td>
                                <td className="border-[1px] border-solid border-gray-300 p-4 text-center">
                                    {item.count}шт.
                                </td>
                                <td className="border-[1px] border-solid border-gray-300 p-4 text-center">
                                    {item.distance}м.
                                </td>
                            </tr>
                        ))}
                    </tbody>
                )}
            </table>
            {isLoading && (
                <div className="flex justify-center w-full right-0 left-0">
                    Loading...
                </div>
            )}
            <div className="flex gap-3 items-center">
                <button
                    onClick={() => filter.setPage(filter.page - 1)}
                    disabled={filter.page === 1}
                    className="border-[1px] border-solid border-black p-1 px-4 rounded-md disabled:opacity-50"
                >
                    prev
                </button>
                {filter.page}
                <button
                    onClick={() => filter.setPage(filter.page + 1)}
                    disabled={filter.page === filter.totalPages}
                    className="border-[1px] border-solid border-black p-1 px-4 rounded-md disabled:opacity-50"
                >
                    next
                </button>
            </div>
            <div className="flex items-center gap-3">
                <h4>Строк в таблице: </h4>
                <Select
                    onChange={onChangeLimit}
                    options={limitPerPage}
                    name="limit"
                />
            </div>
        </>
    );
});

export default Table;
