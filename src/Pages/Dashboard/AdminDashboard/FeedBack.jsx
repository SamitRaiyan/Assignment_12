import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const FeedBack = () => {
  const [error, setError] = useState();
  const { id } = useParams();
  console.log("feedback", id);
  const handleFeedback = (e) => {
    e.preventDefault();
    //console.log("asi");
    setError("");
    const form = e.target;
    const feedback = form.feedback.value;

    if (feedback.length == 0) {
      return setError("Please field is require");
    }

    const feedbackInfo = {
      feedback,
    };
    console.log(feedbackInfo);

    fetch(`https://photgraphy-school-server.vercel.app/feedback/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(feedbackInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          form.reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Feedback send successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  return (
    <div className="w-full h-full px-5">
      <Helmet>
        <title>Photography School | admin feedback</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <div>
        <Link to="/dashboard/manage-class">
          <button className="btn btn-sm btn-success"> Back</button>
        </Link>
      </div>
      <form onSubmit={handleFeedback} className="my-10 space-y-3">
        <div className="form-control">
          <label className="label">
            <span className="label-text">FeedBack</span>
          </label>
          <textarea
            name="feedback"
            className="textarea textarea-bordered h-24"
            placeholder="Feedback"
          ></textarea>
        </div>
        {error && (
          <>
            <div>
              <p className="text-red-500">{error}</p>
            </div>
          </>
        )}
        <div>
          <input className="btn btn-success" type="submit" value="feedback" />
        </div>
      </form>
    </div>
  );
};

export default FeedBack;
