import woodPattern from "../../assets/login/wood-pattern.png";
import loginImg from "../../assets/login/authentication.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
const Login = () => {
  const { userLogin } = useAuth();
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const from = location.state?.from?.pathname || "/";
  console.log(from);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else setDisabled(true);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    userLogin(email, password)
      .then((result) => {
        Swal.fire("Login Success");
        console.log(result);
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div
      className="bg-contain min-h-screen flex justify-center items-center"
      style={{ backgroundImage: `url(${woodPattern})` }}
    >
      <div className="flex border shadow-2xl p-12 justify-between items-center gap-8 container mx-auto">
        <div className="w-1/2 flex justify-center">
          <img src={loginImg} alt="login img" />
        </div>
        <div className="w-1/2 px-16 text-center">
          <h2 className="font-bold text-4xl">Login</h2>
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl font-semibold">Email</span>
              </label>
              <input
                type="email"
                placeholder="Type here"
                name="email"
                className="input input-bordered"
                required
              />
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
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <div className="bg-white border-2 mt-2 text-left p-4 rounded-lg">
                <LoadCanvasTemplate />
              </div>
              <div className="flex items-center justify-between gap-1 mt-6">
                <input
                  type="text"
                  onBlur={handleValidateCaptcha}
                  placeholder="Captcha Type Here"
                  name="captcha"
                  className="input input-bordered flex-1"
                />
              </div>
            </div>
            <div className="form-control mt-6">
              <input
                disabled={disabled}
                className="bg-[#d9b883] cursor-pointer disabled:bg-gray-400 py-4 text-white font-bold text-xl rounded-lg"
                type="submit"
                value="Sign In"
              />
            </div>
          </form>
          <h2 className="text-xl font-medium text-[#D1A054]">
            New here?{" "}
            <Link to="/signup" className="font-bold">
              Create a New Account
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Login;
