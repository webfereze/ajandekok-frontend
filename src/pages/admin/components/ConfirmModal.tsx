// ConfirmModal.tsx
import React from 'react';
import {FolderArrowDownIcon, XMarkIcon} from "@heroicons/react/24/solid";

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm }) => {
    return (
        isOpen && (
            <div className="fixed z-10 inset-0 overflow-y-auto bg-gray-400 bg-opacity-70">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-s backdrop-blur-sm"></div>
                    </div>

                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 w-full  text-left">
                                    <div className="flex items-center justify-between border-b pb-3">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Are you sure to delete order?</h3>
                                        <div
                                            className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center">
                                            <XMarkIcon onClick={onClose} className="w-5 h-5 text-secondary" />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-center">
                                        <button onClick={onConfirm} className="bg-green-700 text-white px-5 py-2 rounded-md m-2">
                                            Yes
                                        </button>
                                        <button onClick={onConfirm} className="bg-error text-white px-5 py-2 rounded-md m-2">
                                            No
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default ConfirmModal;
