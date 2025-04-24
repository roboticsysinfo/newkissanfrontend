import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductByFarmerId, deleteProduct } from "../../../redux/slices/productSlice";
import DataTable from "react-data-table-component";

import { Button } from "react-bootstrap";

const ProductsList = () => {
  const dispatch = useDispatch();
  const { productByFarmer, fetchProductByFarmerStatus } = useSelector((state) => state.products);

  const farmerid = localStorage.getItem("farmerId");

  console.log("farmer id", farmerid)

  useEffect(() => {
    dispatch(getProductByFarmerId(farmerid));
  }, [farmerid, dispatch]);

  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(productId));
    }
  };

  const columns = [
    {
      name: "Product Image",
      selector: (row) => <img src={`${process.env.REACT_APP_BASE_URL_PRIMARY}${row.product_image}`} alt={row.name} width="50" height="50" />,
      sortable: false,
    },
    {
      name: "Product Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => (row.category_id && row.category_id.name ? row.category_id.name : "Unknown Category"),
      sortable: true,
    },
    {
      name: "Price per Unit",
      selector: (row) => `₹${row.price_per_unit}`,
      sortable: true,
    },
    {
      name: "Quantity",
      selector: (row) => row.quantity,
      sortable: true,
    },
    {
      name: "Unit",
      selector: (row) => row.unit || "N/A", // Assuming `unit` field exists
      sortable: true,
    },
    {
      name: "Harvest Date",
      selector: (row) => new Date(row.harvest_date).toLocaleDateString(), // Format date properly
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <Button variant="warning" className="me-2">
            Update
          </Button>
          <Button variant="danger" onClick={() => handleDelete(row._id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];
  

  return (
    <div className="container mt-4">
      <h2>Product List</h2>
      {fetchProductByFarmerStatus === "loading" ? (
        <p>Loading products...</p>
      ) : (
        <DataTable
          columns={columns}
          data={productByFarmer ? [productByFarmer] : []}
          pagination
          highlightOnHover
        />
      )}
    </div>
  );
};

export default ProductsList;
