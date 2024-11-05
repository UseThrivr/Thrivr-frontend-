import { useState } from "react";
import { X } from "lucide-react";

interface PaymentPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

const PaymentPopup: React.FC<PaymentPopupProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative w-[500px] bg-white rounded-lg p-8 shadow-lg scale-95 animate-scaleIn">
                <button
                    onClick={onClose}
                    className="absolute -top-4 -right-4 bg-white rounded-full p-1 shadow-md"
                >
                    <X className="w-5 h-5 text-gray-700" />
                </button>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Add bank details</h2>
                <p className="text-sm text-gray-500 mb-6">Ensure that your bank details is linked to a BVN we can verify</p>

                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Bank name *</label>
                        <select className="w-full border border-gray-300 rounded-md p-2 mt-1">
                            <option>Select bank</option>
                            {/* Add bank options here */}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Account name *</label>
                        <input type="text" className="w-full border border-gray-300 rounded-md p-2 mt-1" placeholder="Enter account name" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Account number *</label>
                        <input type="text" className="w-full border border-gray-300 rounded-md p-2 mt-1" placeholder="Enter account number" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Account type *</label>
                        <div className="flex items-center space-x-4 mt-1">
                            <label className="flex items-center">
                                <input type="radio" name="accountType" value="Current" className="mr-2" /> Current
                            </label>
                            <label className="flex items-center">
                                <input type="radio" name="accountType" value="Savings" className="mr-2" /> Savings
                            </label>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="w-full bg-purple-600 text-white py-2 rounded-md mt-4 hover:bg-purple-700"
                    >
                        Confirm
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PaymentPopup;
