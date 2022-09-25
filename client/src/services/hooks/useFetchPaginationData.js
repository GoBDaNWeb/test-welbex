// * react
import { useEffect, useState } from 'react';

// * services
import dataService from '../api';

export function useFetchPaginationData(condition, sort_by, value, page, limit) {
    const [data, setData] = useState([]);
    const [isLoading, handleIsLoading] = useState(true);
    const [error, setError] = useState('');

    // * функция запроса данных с сервера
    const fetching = async () => {
        handleIsLoading(true);
        try {
            const response = await dataService.paginationData(
                condition,
                sort_by,
                value,
                page,
                limit,
            );
            setData(response.data);
        } catch (err) {
            console.error(err.message);
            setError(err.message);
        } finally {
            handleIsLoading(false);
        }
    };

    useEffect(() => {
        fetching();
    }, []);

    return {
        data,
        isLoading,
        error,
        refetch: fetching,
    };
}
