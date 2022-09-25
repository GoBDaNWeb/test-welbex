// * components
import Table from './components/Table';
import Filters from './components/Filters';

const Main = () => {
    return (
        <main className="w-full my-4 flex gap-3 flex-col items-center justify-end">
            <Filters />
            <Table />
        </main>
    );
};

export default Main;
