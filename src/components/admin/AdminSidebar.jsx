import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="bg-light vh-100 p-3" style={{ width: "250px" }}>
      <h5 className="mb-20">Navigation</h5>
      <Nav defaultActiveKey="/admin/dashboard" className="flex-column">
        <Link className="admin-accordion-button  nav-link" to="dashboard">Dashboard</Link>

        <Link className="admin-accordion-button  nav-link" to="categories-list">Categories</Link>

        <Link className="admin-accordion-button  nav-link" to="customers">Customers</Link>

        <Link className="admin-accordion-button  nav-link" to="farmers">Farmers List</Link>

        <Link className="admin-accordion-button  nav-link" to="kyc-requests">KYC Requests</Link>

        <Link className="admin-accordion-button  nav-link" to="users">Users</Link>

        <Link className="admin-accordion-button  nav-link" to="help-support-tickets">Farmer Help & Supports</Link>

        <Link className="admin-accordion-button  nav-link" to="customer-help-support">Customer Help & Supports</Link>

        <Link className="admin-accordion-button  nav-link" to="order-requests">Order Requests</Link>

        <div className="accordion" id="blogAccordion">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                Blogs
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#blogAccordion">
              <div className="accordion-body">
                <Link className="btn-link text-info nav-link" to="blog-categories">Blog Categories</Link>
                <Link className="btn-link text-dark nav-link" to="add-blog">Add Blog</Link>
                <Link className="btn-link text-dark nav-link" to="blogs-list">Blogs List</Link>
              </div>
            </div>
          </div>

        </div>

        <div className="accordion" id="RPAccordion">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                Redeem Products
              </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#RPAccordion">
              <div className="accordion-body">
                <Link className="btn-link text-dark nav-link" to="farmers-redeem-history">Farmers Redeem History</Link>
                <Link className="btn-link text-dark nav-link" to="add-redeem-products">Add Farmer Products</Link>
                <Link className="btn-link text-dark nav-link" to="redeem-products-list">Farmer Products List</Link>

                  <hr />
                  <Link className="btn-link text-dark nav-link" to="customers-redeem-history">Customers Redeem History</Link>
                  <Link className="btn-link text-dark nav-link" to="add-customer-products">Add Customer Products</Link>
                  <Link className="btn-link text-dark nav-link" to="customer-products-list">Customer Products List</Link>

              </div>
            </div>
          </div>

        </div>


        <div className="accordion" id="headingThree">

          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                Referral Points Table
              </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse " data-bs-parent="#headingThree">
              <div className="accordion-body">
                <Link className="btn-link text-dark nav-link" to="farmer-points-table">Farmer's Points</Link>
                <Link className="btn-link text-dark nav-link" to="customer-points-table">Customer's Points</Link>
              </div>
            </div>
          </div>

        </div>


        <Link className="admin-accordion-button  nav-link" to="settings">Site Settings</Link>

        <Link className="admin-accordion-button  nav-link" to="messages-list">Admin Messages</Link>

        <Link className="admin-accordion-button  nav-link" to="farming-tips">Farming Tips</Link>

      </Nav>
    </div>
  );
};

export default AdminSidebar;
