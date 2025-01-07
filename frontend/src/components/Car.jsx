import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import CreateCar from "./CreateCar";
import "../assets/car.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

ReactModal.setAppElement("#root");

const Car = () => {
    const [cars, setCars] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/car")
            .then((res) => res.json())
            .then((data) => setCars(data));
    }, []);

    const handleCarCreated = (updatedCar) => {
        if (updatedCar._id) {
            setCars(cars.map((car) => (car._id === updatedCar._id ? updatedCar : car)));
        } else {
            setCars([...cars, updatedCar]);
        }
        setIsModalOpen(false);
        setIsEditModalOpen(false);
    };

    const MySwal = withReactContent(Swal);

    const deleteCar = (id) => {
        MySwal.fire({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this car",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "No, keep it",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/car/${id}`, { method: "DELETE" })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.message) {
                            setCars(cars.filter((c) => c._id !== id));
                            MySwal.fire("Deleted!", "Your car has been deleted.", "success");
                        } else {
                            MySwal.fire("Error!", data.message, "error");
                        }
                    })
                    .catch((err) => console.error(err));
            }
        });
    };

    return (
        <div className="car-container" id="cars">
            <div className="row">
                <div className="col-md-8 d-flex justify-content-start">
                    <h2 className="car-header">Available Cars</h2>
                </div>
                <div className="col-md-4">
                    <button className="btn btn-primary float-end" onClick={() => setIsModalOpen(true)}>
                        Create Car
                    </button>
                </div>
            </div>

            <ReactModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                <CreateCar onCarCreated={handleCarCreated} onClose={() => setIsModalOpen(false)} />
            </ReactModal>

            <ReactModal
                isOpen={isEditModalOpen}
                onRequestClose={() => setIsEditModalOpen(false)}
                shouldCloseOnOverlayClick={true}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        zIndex: 1000,
                    },
                }}
            >
                {selectedCar && (
                    <CreateCar
                        car={selectedCar}
                        onCarCreated={handleCarCreated}
                        onClose={() => setIsEditModalOpen(false)}
                    />
                )}
            </ReactModal>

            <div className="car-list">
                {cars.map((car) => (
                    <div key={car._id} className="car-card">
                        <img src={car.imageUrl} alt={`${car.brand} ${car.model}`} className="car-image" />
                        <div className="car-info">
                            <h3 className="car-title">
                                {car.brand} {car.model}
                            </h3>
                            <p className="car-details">
                                <span>Year: {car.year}</span>
                                <span>Fuel: {car.fuelType}</span>
                            </p>
                            <p className="car-price">Price per day: ${car.price}</p>
                            <p className={`car-availability ${car.isAvailable ? "available" : "not-available"}`}>
                                {car.isAvailable ? "Available" : "Not Available"}
                            </p>
                            <div className="car-actions">
                                <button
                                    className="btn btn-warning me-2"
                                    onClick={() => {
                                        setSelectedCar(car);
                                        setIsEditModalOpen(true);
                                    }}
                                >
                                    Edit
                                </button>
                                <button className="btn btn-danger" onClick={() => deleteCar(car._id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Car;
