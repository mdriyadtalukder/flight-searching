import React, { useEffect, useRef, useState } from "react";
import { Calendar, MapPin, Users, Plane, ArrowLeftRight } from "lucide-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { locations } from "../assets/data";
import SimpleDateInput from "./SimpleDateInput";
import { useDispatch } from "react-redux";
import {
  getdepartureDate,
  getdestination,
  getOrigin,
  getpassengers,
  getreturnDate,
} from "../rtk-query/features/flights/flightsSlice";
import { useNavigate } from "react-router-dom";
const InputForm = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownRef2 = useRef(null);
  const [tripType, setTripType] = useState("round-trip");
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);
  const dispatch = useDispatch();
  const nagivate = useNavigate();

  const formik = useFormik({
    initialValues: {
      origin: "",
      destination: "",
      departureDate: "",
      returnDate: "",
      passengers: 1,
    },
    validationSchema: Yup.object({
      origin: Yup.string().required("Origin is required"),
      destination: Yup.string().required("Destination is required"),
      departureDate: Yup.date()
        .required("Departure date is required")
        .min(new Date(), "Departure date cannot be in the past"),
      returnDate: Yup.date()
        .nullable()
        .test(
          "return-date-validation",
          "Return date must be after departure date and not in the past",
          function (value) {
            const { departureDate } = this.parent;
            if (!value) return true;
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const returnDate = new Date(value);
            const depDate = new Date(departureDate);
            if (returnDate < today) return false;
            if (returnDate > depDate && returnDate < today) return false;
            if (returnDate <= depDate) return false;
            return true;
          }
        ),
      passengers: Yup.number()
        .min(1, "At least 1 passenger required")
        .required("Passengers is required"),
    }),
    onSubmit: (values) => {
      console.log("Form submitted:", { ...values, tripType });
      dispatch(getOrigin(values?.origin.toUpperCase()));
      dispatch(getdestination(values?.destination.toUpperCase()));
      dispatch(getdepartureDate(values?.departureDate));
      dispatch(getreturnDate(values?.returnDate));
      dispatch(getpassengers(values?.passengers));
      nagivate("/flights");
    },
  });

  const originLocation = locations.filter((f) => {
    if (
      f?.name
        .toLocaleLowerCase()
        .includes(
          formik.values.origin.toLocaleLowerCase() ||
            f?.country
              .toLocaleLowerCase()
              .includes(formik.values.origin.toLocaleLowerCase())
        )
    ) {
      return f.name
        .toLocaleLowerCase()
        .includes(
          formik.values.origin.toLocaleLowerCase() ||
            f?.country
              .toLocaleLowerCase()
              .includes(formik.values.origin.toLocaleLowerCase())
        );
    } else {
      return false;
    }
  });

  const desLocation = locations.filter((f) => {
    if (
      f?.name
        .toLocaleLowerCase()
        .includes(
          formik.values.destination.toLocaleLowerCase() ||
            f?.country
              .toLocaleLowerCase()
              .includes(formik.values.destination.toLocaleLowerCase())
        )
    ) {
      return f.name
        .toLocaleLowerCase()
        .includes(
          formik.values.destination.toLocaleLowerCase() ||
            f?.country
              .toLocaleLowerCase()
              .includes(formik.values.destination.toLocaleLowerCase())
        );
    } else {
      return false;
    }
  });

  const handleSwap = () => {
    const tempOrigin = formik.values.origin;
    formik.setFieldValue("origin", formik.values.destination);
    formik.setFieldValue("destination", tempOrigin);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (
        dropdownRef2.current &&
        !dropdownRef2.current.contains(event.target)
      ) {
        setIsDropdownOpen2(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 via-purple-400 to-purple-500">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-3">
            <div className="bg-white rounded-full p-3">
              <Plane className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="text-4xl font-bold text-white">SkySearch</h1>
          </div>
        </div>

        {/* Main Search Form */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
              Find Your Perfect Flight
            </h2>

            {/* Trip Type Selector */}
            <div className="flex space-x-4 mb-8">
              <button
                type="button"
                onClick={() => setTripType("round-trip")}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  tripType === "round-trip"
                    ? "bg-purple-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Round Trip
              </button>
              <button
                type="button"
                onClick={() => setTripType("one-way")}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  tripType === "one-way"
                    ? "bg-purple-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                One Way
              </button>
            </div>

            {/* Form */}
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              {/* Origin and Destination */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="relative " ref={dropdownRef}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    origin Location Code
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500 w-5 h-5" />
                    <input
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.origin}
                      onFocus={() => {
                        setIsDropdownOpen(true);
                        setIsDropdownOpen2(false);
                      }}
                      id="origin"
                      name="origin"
                      type="text"
                      placeholder="Type your origin..."
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-lg"
                    />
                  </div>
                  {isDropdownOpen && originLocation?.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border-2 border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                      {originLocation.map((location) => (
                        <button
                          onClick={
                            () => {
                              formik.setFieldValue(
                                "origin",
                                location?.name?.substring(0, 3).toUpperCase()
                              );
                              setIsDropdownOpen(false);
                            } // close after selecting
                          }
                          type="button"
                          className="w-full px-4 py-3 text-left hover:bg-purple-50 focus:bg-purple-50 focus:outline-none border-b border-gray-100 last:border-b-0 flex items-center gap-2 transition-colors cursor-pointer"
                        >
                          <MapPin className="h-4 w-4 text-purple-400 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-gray-900">
                              {location?.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {location?.country}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {formik.touched.origin && formik.errors.origin && (
                    <div className="text-red-600 text-sm font-bold mt-1">
                      {formik.errors.origin}
                    </div>
                  )}
                </div>

                <div className="relative" ref={dropdownRef2}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Destination Location Code
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500 w-5 h-5" />
                    <input
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.destination}
                      onFocus={() => {
                        setIsDropdownOpen2(true);
                        setIsDropdownOpen(false);
                      }}
                      id="destination"
                      name="destination"
                      type="text"
                      placeholder="Type your destination..."
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-lg"
                    />
                  </div>
                  {isDropdownOpen2 && desLocation?.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border-2 border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                      {desLocation.map((location) => (
                        <button
                          onClick={
                            () => {
                              formik.setFieldValue(
                                "destination",
                                location?.name?.substring(0, 3).toUpperCase()
                              );
                              setIsDropdownOpen2(false);
                            } // close after selecting
                          }
                          type="button"
                          className="w-full px-4 py-3 text-left hover:bg-purple-50 focus:bg-purple-50 focus:outline-none border-b border-gray-100 last:border-b-0 flex items-center gap-2 transition-colors cursor-pointer"
                        >
                          <MapPin className="h-4 w-4 text-purple-400 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-gray-900">
                              {location?.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {location?.country}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {formik.touched.destination && formik.errors.destination && (
                    <div className="text-red-600 text-sm font-bold mt-1">
                      {formik.errors.destination}
                    </div>
                  )}
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center -my-2">
                <button
                  type="button"
                  onClick={handleSwap}
                  className="bg-purple-100 hover:bg-purple-200 p-3 rounded-full transition-colors"
                >
                  <ArrowLeftRight className="w-5 h-5 text-purple-600" />
                </button>
              </div>

              {/* Dates and Passengers */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Departure Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500 w-5 h-5" />
                    <SimpleDateInput
                      value={formik.values.departureDate}
                      onChange={(date) => {
                        // Convert to yyyy-mm-dd
                        const d = new Date(date);
                        const yyyy = d.getFullYear();
                        const mm = String(d.getMonth() + 1).padStart(2, "0");
                        const dd = String(d.getDate()).padStart(2, "0");
                        const formatted = `${yyyy}-${mm}-${dd}`;
                        formik.setFieldValue("departureDate", formatted);
                      }}
                      onFocus={() => setIsDropdownOpen(true)}
                      placeholder="Select departure date"
                    />
                  </div>

                  {formik.touched.departureDate &&
                    formik.errors.departureDate && (
                      <div className="text-red-600 text-sm font-bold mt-1">
                        {formik.errors.departureDate}
                      </div>
                    )}
                </div>

                {tripType === "round-trip" && (
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Return Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500 w-5 h-5" />
                      <SimpleDateInput
                        value={formik.values.returnDate}
                        onChange={(date) => {
                          // Convert to yyyy-mm-dd
                          const d = new Date(date);
                          const yyyy = d.getFullYear();
                          const mm = String(d.getMonth() + 1).padStart(2, "0");
                          const dd = String(d.getDate()).padStart(2, "0");
                          const formatted = `${yyyy}-${mm}-${dd}`;
                          formik.setFieldValue("returnDate", formatted);
                        }}
                        placeholder="Select return date"
                      />
                    </div>

                    {formik.touched.returnDate && formik.errors.returnDate && (
                      <div className="text-red-600 text-sm font-bold mt-1">
                        {formik.errors.returnDate}
                      </div>
                    )}
                  </div>
                )}

                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Passengers
                  </label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500 w-5 h-5" />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPassengerDropdown(!showPassengerDropdown)
                      }
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-lg text-left bg-white"
                    >
                      {formik.values.passengers}{" "}
                      {formik.values.passengers === 1
                        ? "Passenger"
                        : "Passengers"}
                    </button>

                    {showPassengerDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-lg z-10">
                        <div className="p-4">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">Passengers</span>
                            <div className="flex items-center space-x-3">
                              <button
                                type="button"
                                onClick={() =>
                                  formik.setFieldValue(
                                    "passengers",
                                    Math.max(1, formik.values.passengers - 1)
                                  )
                                }
                                className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors"
                              >
                                -
                              </button>
                              <span className="w-8 text-center font-semibold">
                                {formik.values.passengers}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  formik.setFieldValue(
                                    "passengers",
                                    Math.min(9, formik.values.passengers + 1)
                                  )
                                }
                                className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {formik.touched.passengers && formik.errors.passengers && (
                    <div className="text-red-600 text-sm font-bold mt-1">
                      {formik.errors.passengers}
                    </div>
                  )}
                </div>
              </div>

              {/* Search Button */}
              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-12 rounded-xl text-xl transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Search Flights
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputForm;
