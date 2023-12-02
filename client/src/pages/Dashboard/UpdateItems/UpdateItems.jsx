import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
const image_hosting_key = import.meta.env.VITE_IMGBB_ACCESS_TOKEN;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItems = () => {
    const {name, recipe, price, category, _id} = useLoaderData();
    const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const updateMenu = {
        name: data.name,
        recipe: data.recipe,
        image: res.data.data.display_url,
        category: data.category,
        price: parseFloat(data.price),
      };
      const updateMenuRes = await axiosSecure.patch(`/food-menu/${_id}`, updateMenu);
      if (updateMenuRes.data.modifiedCount > 0) {
        Swal.fire(`${data.name} Update Successfully`);
      }
    }
  };

  return (
    <div className="mt-10">
      <SectionTitle heading="Update Items" subHeading="What's New?" />
      <div className="bg-white p-14 shadow-lg mx-44 my-14">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Recipe Name */}
          <div className="form-control w-full">
            <label className="label">
              <span className="text-xl font-bold">Recipe name*</span>
            </label>
            <input
              {...register("name")}
              type="text"
              defaultValue={name}
              placeholder="Recipe name"
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex gap-6">
            {/* Category */}
            <div className="form-control w-full">
              <label className="label">
                <span className="text-xl font-bold">Recipe name*</span>
              </label>
              <select
                defaultValue={category}
                {...register("category")}
                className="select select-bordered w-full"
              >
                <option disabled value="default">
                  Category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soups">Soups</option>
                <option value="desserts">Desserts</option>
                <option value="drinks">Drinks</option>
              </select>
            </div>
            {/* Price */}
            <div className="form-control w-full">
              <label className="label">
                <span className="text-xl font-bold">Price*</span>
              </label>
              <input
                {...register("price")}
                type="number"
                defaultValue={price}
                placeholder="Price"
                className="input input-bordered w-full"
              />
            </div>
          </div>
          {/* Recipe Details */}
          <div className="form-control w-full">
            <label className="label">
              <span className="text-xl font-bold">Recipe Details*</span>
            </label>
            <textarea
              {...register("recipe")}
              defaultValue={recipe}
              className="textarea textarea-bordered"
              placeholder="Recipe Details"
            ></textarea>
          </div>
          {/* Image */}
          <div className="form-control w-full">
            <input
              {...register("image")}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>
          <button className="flex justify-center items-center gap-2 py-4 px-7 text-white font-bold rounded-md bg-gradient-to-r from-[#835D23] to-[#B58130]">
            Update Menu Item <FaUtensils />
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateItems;