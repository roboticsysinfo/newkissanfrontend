import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from ".././redux/slices/productSlice";
import { Link, useSearchParams } from "react-router-dom";

const ProductPagination = () => {
    const dispatch = useDispatch();
    const { totalPages, currentPage } = useSelector((state) => state.products);
    const [searchParams, setSearchParams] = useSearchParams();

    const changePage = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setSearchParams({ page: newPage });
            dispatch(fetchProducts({ page: newPage, limit: 10 }));
        }
    };

    return (
        <ul className="ProductPagination flex-center flex-wrap gap-16">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <Link
                    className="page-link h-64 w-64 flex-center text-xxl rounded-8 fw-medium text-neutral-600 border border-gray-100"
                    to="#"
                    onClick={() => changePage(currentPage - 1)}
                >
                    <i className="ph-bold ph-arrow-left" />
                </Link>
            </li>

            {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                    <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
                        <Link
                            className="page-link h-64 w-64 flex-center text-md rounded-8 fw-medium text-neutral-600 border border-gray-100"
                            to="#"
                            onClick={() => changePage(page)}
                        >
                            {page < 10 ? `0${page}` : page}
                        </Link>
                    </li>
                );
            })}

            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <Link
                    className="page-link h-64 w-64 flex-center text-xxl rounded-8 fw-medium text-neutral-600 border border-gray-100"
                    to="#"
                    onClick={() => changePage(currentPage + 1)}
                >
                    <i className="ph-bold ph-arrow-right" />
                </Link>
            </li>
        </ul>
    );
};

export default ProductPagination;
