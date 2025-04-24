import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { useDispatch, useSelector } from "react-redux";
import { fetchSiteDetails, updateSiteAbout } from "../../redux/slices/siteDeatilsSlice"; // Import actions
import toast from "react-hot-toast";

const AboutForm = () => {
    const dispatch = useDispatch();
    const { data: siteDetails, siteDetailsLoading } = useSelector((state) => state.siteDetails);

    const [formsiteDetails, setFormsiteDetails] = useState({
        aboutTitle: siteDetails?.about.title || "",
        aboutContent: siteDetails?.about.content || "",
        footerContent: siteDetails?.about.footer_text || "",
    });

    useEffect(() => {
        dispatch(fetchSiteDetails());
    }, [dispatch]);


    useEffect(() => {
        if (siteDetails?.about.title || siteDetails?.about.content || siteDetails?.about.footer_text) {
            setFormsiteDetails({
                aboutTitle: siteDetails.about.title || "",
                aboutContent: siteDetails.about.content || "",
                footerContent: siteDetails?.about.footer_text || "",
            });
        }
    }, [siteDetails]);


    // Handle input changes
    const handleChange = (e) => {
        setFormsiteDetails({
            ...formsiteDetails,
            [e.target.name]: e.target.value,
        });
    };


    // Handle Quill editor change
    const handleContentChange = (value) => {
        setFormsiteDetails({ ...formsiteDetails, aboutContent: value });
    };


    // ✅ Handle About Submit
    const handleAboutSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(updateSiteAbout({
                aboutTitle: formsiteDetails.aboutTitle,
                aboutContent: formsiteDetails.aboutContent,
                footerContent: formsiteDetails.footerContent
            })).unwrap();

            toast.success("Site About updated successfully!");
        } catch (error) {
            console.error("Error updating site details:", error);
            toast.error("Failed to update site details.");
        }
    };

    return (
        <div className="p-40 border rounded">

            <h2 className="text-xl">About</h2>

            <hr />

            <Form onSubmit={handleAboutSubmit}>

                {/* Title Field */}
                <Form.Group controlId="aboutTitle" className="mb-30">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="aboutTitle"
                        value={formsiteDetails.aboutTitle}
                        onChange={handleChange}
                    />

                </Form.Group>

                {/* Content Field (React Quill Editor) */}
                <Form.Group controlId="aboutContent" className="mb-30">
                    <Form.Label>Content</Form.Label>
                    <ReactQuill
                        value={formsiteDetails.aboutContent}
                        onChange={handleContentChange}
                        theme="snow"
                        style={{ height: "400px" }}
                    />
                </Form.Group>

                <hr />

                {/* Footer Text Field */}
                <Form.Group controlId="footerContent" className="mb-30">
                    <Form.Label>Footer Text</Form.Label>
                    <Form.Control
                        type="text"
                        name="footerContent"
                        value={formsiteDetails.footerContent}
                        onChange={handleChange}
                    />

                </Form.Group>

                <hr />

                <Form.Group>
                    {/* Submit Button */}
                    <Button variant="success" className="mt-20" type="submit" disabled={siteDetailsLoading}>
                        {siteDetailsLoading ? "Updating..." : "Submit"}
                    </Button>
                </Form.Group>

            </Form>
        </div>
    );
};

export default AboutForm;
