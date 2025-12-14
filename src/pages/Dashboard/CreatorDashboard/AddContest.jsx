// src/pages/Dashboard/AddContest.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddContest = () => {
  const axiosSecure = useAxiosSecure();
  const [deadline, setDeadline] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const contestData = {
      name: data.name,
      image: data.image,
      description: data.description,
      price: Number(data.price),
      prize: data.prize,
      taskInstruction: data.taskInstruction,
      category: data.category,
      deadline: deadline ? deadline.toISOString() : null,
    };

    try {
      await axiosSecure.post("/contests", contestData);
      Swal.fire({
        icon: "success",
        title: "Contest Added!",
        text: "Your contest has been submitted for admin approval.",
        timer: 3000,
        showConfirmButton: false,
      });
      reset();
      setDeadline(null);
    } catch (error) {
      console.error("Contest creation failed:", error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Could not create contest. Please try again.",
      });
    }
  };

  return (
    <div className="card bg-base-100 shadow-2xl max-w-4xl mx-auto">
      <div className="card-body">
        <h2 className="card-title text-4xl font-bold text-center mb-8">
          Create New Contest
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Contest Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Contest Name</span>
            </label>
            <input
              type="text"
              placeholder="e.g. UI/UX Design Challenge 2025"
              className={`input input-bordered ${errors.name ? "input-error" : ""}`}
              {...register("name", { required: "Contest name is required" })}
            />
            {errors.name && (
              <p className="text-error text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Image URL */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Image URL</span>
            </label>
            <input
              type="url"
              placeholder="https://example.com/contest-image.jpg"
              className={`input input-bordered ${errors.image ? "input-error" : ""}`}
              {...register("image", { required: "Image URL is required" })}
            />
            {errors.image && (
              <p className="text-error text-sm mt-1">{errors.image.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Description</span>
            </label>
            <textarea
              placeholder="Describe your contest..."
              className={`textarea textarea-bordered h-32 ${errors.description ? "textarea-error" : ""}`}
              {...register("description", { required: "Description is required" })}
            />
            {errors.description && (
              <p className="text-error text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Price & Prize Money */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Entry Fee ($)</span>
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="e.g. 10.00"
                className={`input input-bordered ${errors.price ? "input-error" : ""}`}
                {...register("price", { required: "Entry fee is required", min: 0 })}
              />
              {errors.price && (
                <p className="text-error text-sm mt-1">{errors.price.message}</p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Prize Money</span>
              </label>
              <input
                type="text"
                placeholder="e.g. $5,000"
                className={`input input-bordered ${errors.prize ? "input-error" : ""}`}
                {...register("prize", { required: "Prize money is required" })}
              />
              {errors.prize && (
                <p className="text-error text-sm mt-1">{errors.prize.message}</p>
              )}
            </div>
          </div>

          {/* Task Instruction */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Task Instruction</span>
            </label>
            <textarea
              placeholder="Explain what participants need to submit..."
              className={`textarea textarea-bordered h-40 ${errors.taskInstruction ? "textarea-error" : ""}`}
              {...register("taskInstruction", { required: "Task instruction is required" })}
            />
            {errors.taskInstruction && (
              <p className="text-error text-sm mt-1">{errors.taskInstruction.message}</p>
            )}
          </div>

          {/* Contest Type */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Contest Type</span>
            </label>
            <select
              className={`select select-bordered ${errors.category ? "select-error" : ""}`}
              {...register("category", { required: "Contest type is required" })}
            >
              <option value="">Select a category</option>
              <option value="Design">Design</option>
              <option value="Writing">Writing</option>
              <option value="Gaming">Gaming</option>
              <option value="Business Idea">Business Idea</option>
              <option value="Photography">Photography</option>
              <option value="Video Editing">Video Editing</option>
            </select>
            {errors.category && (
              <p className="text-error text-sm mt-1">{errors.category.message}</p>
            )}
          </div>

          {/* Deadline */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Deadline</span>
            </label>
            <DatePicker
              selected={deadline}
              onChange={(date) => setDeadline(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              minDate={new Date()}
              placeholderText="Select deadline"
              className={`input input-bordered w-full ${!deadline && errors.deadline ? "input-error" : ""}`}
            />
            {!deadline && (
              <p className="text-error text-sm mt-1">Deadline is required</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="form-control mt-8">
            <button
              type="submit"
              disabled={isSubmitting || !deadline}
              className="btn btn-primary btn-lg w-full"
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Submitting...
                </>
              ) : (
                "Create Contest"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContest;