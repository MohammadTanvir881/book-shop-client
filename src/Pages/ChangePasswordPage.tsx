import Navbar from "@/Navbar/Navbar";
import { useChangePasswordMutation } from "@/Redux/feature/User/UserApi";

import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ChangePasswordPage = () => {
  const navigate = useNavigate();

  const [changePassword] = useChangePasswordMutation();

  const handlePasswordChange: SubmitHandler<FieldValues> = async (e) => {
    e.preventDefault();
    const form = e.target;
    const oldPassword = form.oldPassword.value;
    const newPassword = form.newPassword.value;
    const data = {
      oldPassword,
      newPassword,
    };

    console.log(data);

    try {
      const response = await changePassword(data)
        .unwrap()
        .then((response) => {
          console.log(response);
          toast.success("Password Changed Successfully");
          navigate(-1)
        })
        .catch((error) => {
          console.error(error);
          toast.error(error?.data?.message || "Something went wrong");
        });
      console.log(response);
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  return (
    <div className="container mx-auto">
      <Navbar></Navbar>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Change Password</h1>
            <p className="py-6">
              Change Your Password for Better Security to your account
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handlePasswordChange} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Old Password</span>
                </label>
                <input
                  type="password"
                  name="oldPassword"
                  placeholder="Your Old Password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">New Password</span>
                </label>
                <input
                  type="password"
                  name="newPassword"
                  placeholder="Your New Password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
