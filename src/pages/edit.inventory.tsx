import { Seo } from "@/components/global";
import { useState, ChangeEvent } from "react";

const EditInventory: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);

  const [category, setCategory] = useState<string | null>(null);
  const categories = ["Port-Harcourt", "Asaba", "Lagos", "Abuja"];

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <Seo title="Edit - Inventory" />
      <div className="grid grid-cols-2 gap-5 px-5 pb-20">
        <div className="flex flex-col">
          <div className="flex flex-col gap-3">
            <label htmlFor="supplyID" className="font-semibold">
              Supply ID{" "}
            </label>
            <input
              name="supplyID"
              type="text"
              placeholder="PD - 1234"
              className="border rounded p-4"
              required
            />
          </div>
          <div className="flex flex-col gap-3 mt-5">
            <label htmlFor="productName" className="font-semibold">
              Product Name{" "}
            </label>
            <input
              name="productName"
              type="text"
              placeholder="Enter Product Name"
              className="border rounded p-4"
              required
            />
          </div>
          <div className="flex flex-col gap-3 mt-5">
            <label htmlFor="" className="font-semibold">
              Product varieties{" "}
            </label>
            <p className="text-gray-700">
              include different versions (e.g, color, material)
            </p>
            <div className="border rounded p-4 resize-none h-[10rem]"></div>
          </div>
          <div className="border rounded mt-5 flex">
            <input
              type="text"
              className="w-full border p-4 focus:outline-none"
              placeholder="Add Custom Product Type"
            />
          </div>
          <div className="mt-5">
            <p className="font-semibold">Product Image </p>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {image && (
              <div className="mt-4">
                <img
                  src={image}
                  alt="Selected"
                  className="mt-2 w-32 h-32 object-cover rounded"
                />
              </div>
            )}
          </div>
          <div className="mt-5">
            <select
              id="customSelect"
              value={category ?? ""}
              onChange={handleSelectChange}
              className="w-full mt-1 p-4 border text-md font-normal rounded-md shadow-sm cursor-pointer sm:text-md"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((cat, index) => (
                <option key={index} value={cat} className="text-md font-normal">
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="">
          <div>
            <p>Short Description</p>
            <textarea
              name=""
              id=""
              placeholder="Write..."
              className="resize-none border p-4 h-[15rem] w-full rounded"
            ></textarea>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="col-span-1 mt-5">
              <p>Selling Price</p>
              <input type="text" className="border p-3 rounded w-full mt-2" />
            </div>
            <div className="col-span-1 mt-5">
              <p>Quantity</p>
              <input type="text" className="border p-3 rounded w-full mt-2" />
            </div>
            <div className="col-span-1 mt-5">
              <p>Purchase Date</p>
              <input type="date" className="border p-3 rounded w-full mt-2" />
            </div>
            <div className="col-span-1 mt-5">
              <p>Supplier</p>
              <input type="text" className="border p-3 rounded w-full mt-2" />
            </div>
          </div>
          <div className="my-5 py-3">
            <button className="rounded-full bg-[#870E73] text-white p-3">Save Product Details</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditInventory;
