import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createRequestOrder, clearMessages } from "../redux/slices/requestOrderSlice";
import { toast } from "react-hot-toast";

const RequestOrderModal = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.requestOrder);
  const selectedProduct = useSelector((state) => state.products.selectedProduct);

  const customer = JSON.parse(localStorage.getItem("user"));
  const customerId = customer ? customer.id : null;

  const [formData, setFormData] = useState({
    customer_id: customerId,
    farmer_id: "",
    product_id: "",
    phoneNumber: "",
    quantity_requested: "",
    unit: "kg",
    notes: "",
  });

  // Update formData when selectedProduct changes
  useEffect(() => {
    if (selectedProduct) {
      setFormData((prevData) => ({
        ...prevData,
        farmer_id: selectedProduct?.farmer_id?._id || "",
        product_id: selectedProduct?._id || "",
      }));
    }
  }, [selectedProduct]);
  
  // Check selectedProduct before rendering
  if (!selectedProduct) {
    return null; // Ab toast yahan nahi hai, UX better hoga
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();


    if (!formData.customer_id || !formData.farmer_id || !formData.product_id) {
      toast.error("Invalid request. Missing essential data.");
      return;
    }

    const result = await dispatch(createRequestOrder(formData));

    if (createRequestOrder.fulfilled.match(result)) {
      toast.success("Request sent successfully!", { duration: 3000 });
      setFormData((prevData) => ({
        ...prevData,
        phoneNumber: "",
        quantity_requested: "",
        notes: "",
      }));
      handleClose();
    } else {
      toast.error(result.payload || "Failed to submit request");
    }

    setTimeout(() => dispatch(clearMessages()), 3000);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Request Product</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter Phone Number"
              required
              maxLength={10}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Quantity Needed</Form.Label>
            <Form.Control
              type="text"
              name="quantity_requested"
              value={formData.quantity_requested}
              onChange={handleChange}
              placeholder="Enter quantity"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Unit</Form.Label>
            <Form.Select name="unit" value={formData.unit} onChange={handleChange}>
              <option>Select (Kg, Litres, Tons, Pieces)</option>
              <option value="kg">Kilograms (kg)</option>
              <option value="litre">Litres (L)</option>
              <option value="tons">Tons</option>
              <option value="pieces">Pieces</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Notes/Message</Form.Label>
            <Form.Control
              as="textarea"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Enter additional details..."
              rows={3}
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="success" disabled={loading}>
              {loading ? "Submitting..." : "Submit Request"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RequestOrderModal;
