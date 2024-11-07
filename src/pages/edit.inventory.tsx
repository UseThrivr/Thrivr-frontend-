import { Seo } from "@/components/global";
import { useState, ChangeEvent } from "react";

interface ProductTypeProps {
  text: string;
}

const ProductType: React.FC<ProductTypeProps> = ({ text }) => {
  return (
    <div className="bg-[#FDC5F4] p-2 text-black">
      <p>{text}</p>
    </div>
  );
};

const EditInventory: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [NumOfImagesAdded, setNumOfImagesAdded] = useState<number>(0);
  const [customProductType, setCustomProductType ] = useState<string | null>(null)

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
      <div className="grid grid-cols-2 gap-5 px-5">
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
              value={customProductType || ''}
              onChange={(e) => setCustomProductType(e.target.value)}
              className="w-full p-4 focus:outline-none"
              placeholder="Add Custom Product Type"
            />
            <button onClick={() => setCustomProductType('')} className="p-4 font-bold">X</button>
          </div>
          <div className="mt-5">
            <p className="font-semibold">Product Image </p>
            <div className="border w-full text-sm flex p-4">
              <div className="w-[50px] h-[50px] rounded-full bg-[#FDC5F4]"></div>
              <div className="ms-4 flex flex-col gap-3">
                <h4 className="text-md font-semibold">
                  Click to upload product image
                </h4>
                <div className="flex divide-x-2 divide-slate-600">
                  <p className="px-2 font-bold">PNG, JPG</p>
                  <p className="px-2 font-bold">10 MB max</p>
                  <p className="px-2 font-bold">
                    {NumOfImagesAdded} photo(s) added
                  </p>
                </div>
              </div>
            </div>
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
          <div className="my-10">
            <button className="rounded-full bg-[#870E73] text-white py-3 px-5">
              Save Product Details
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditInventory;
