import woodPattern from "../../assets/login/wood-pattern.png";
import loginImg from "../../assets/login/authentication.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
const SignUp = () => {
  const { userSignUp, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    userSignUp(data.email, data.password).then(() => {
      updateUserProfile(data.name, data.photoUrl)
        .then(() => {
          const userInformation = {
            userName: data.name,
            userEmail: data.email,
          };
          axiosPublic.post("/users", userInformation).then((res) => {
            if (res.data.insertedId) {
              Swal.fire("Signup Success");
              navigate(from, { replace: true });
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
    console.log(data);
  };

  return (
    <div
      className="bg-contain min-h-screen flex justify-center items-center"
      style={{ backgroundImage: `url(${woodPattern})` }}
    >
      <div className="flex border shadow-2xl p-12 justify-between items-center gap-8 container mx-auto">
        <div className="w-1/2 px-16 text-center">
          <h2 className="font-bold text-4xl">Sign Up</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl font-semibold">Name</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                name="name"
                {...register("name", { required: true })}
                className="input input-bordered"
              />
              {errors.name && (
                <span className="text-red-600 text-left mt-2">
                  Name Is Required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl font-semibold">
                  Photo Url
                </span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                {...register("photoUrl", { required: true })}
                className="input input-bordered"
              />
              {errors.name && (
                <span className="text-red-600 text-left mt-2">
                  PhotoUrl Is Required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl font-semibold">Email</span>
              </label>
              <input
                type="email"
                placeholder="Type here"
                name="email"
                {...register("email", { required: true })}
                className="input input-bordered"
              />
              {errors.email && (
                <span className="text-red-600 text-left mt-2">
                  Email Is Required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl font-semibold">
                  Password
                </span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                name="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
                className="input input-bordered"
              />
              {errors.password?.type === "required" && (
                <span className="text-red-600 text-left mt-2">
                  Password Is Required
                </span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="text-red-600 text-left mt-2">
                  Password Minimum 6 Characters
                </span>
              )}
              {errors.password?.type === "maxLength" && (
                <span className="text-red-600 text-left mt-2">
                  Password Can Not Be More Then 20 Characters
                </span>
              )}
              {errors.password?.type === "pattern" && (
                <span className="text-red-600 text-left mt-2">
                  Password Must Be One Uppercase One Lowercase & One Number
                </span>
              )}
            </div>
            <div className="form-control mt-6">
              <input
                className="bg-[#d9b883] disabled:bg-gray-400 py-4 text-white font-bold text-xl rounded-lg"
                type="submit"
                value="Sign Up"
              />
            </div>
          </form>
          <h2 className="text-xl font-medium text-[#D1A054]">
            Already registered?{" "}
            <Link to="/login" className="font-bold">
              Go to log in
            </Link>
          </h2>
          <div className="px-8">
            <SocialLogin />
          </div>
        </div>
        <div className="w-1/2 flex justify-center">
          <img src={loginImg} alt="login img" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
