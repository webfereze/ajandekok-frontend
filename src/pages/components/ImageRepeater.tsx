import React, { useState, useRef } from 'react';

interface ImageField {
    file: File | null;
    dimensions: string;
    quantity: number;
    previewURL: string | null;
    error: string;
}

const ImageRepeater: React.FC = () => {
    const [imageFields, setImageFields] = useState<ImageField[]>([]);
    const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Function to add a new image field
    const addImageField = () => {
        const newImageField: ImageField = {
            file: null,
            dimensions: 'Select Dimensions',
            quantity: 1,
            previewURL: null,
            error: '',
        };
        setImageFields([...imageFields, newImageField]);
    };

    // Function to handle file input changes
    const handleFileChange = (index: number, file: File | null) => {
        const updatedFields = [...imageFields];
        updatedFields[index].file = file;
        updatedFields[index].error = file ? '' : 'File is required';
        if (file) {
            const reader = new FileReader();
            reader.onload = (e:any) => {
                updatedFields[index].previewURL = e.target.result as string;
                setImageFields(updatedFields);
            };
            reader.readAsDataURL(file);
        }
    };

    // Function to handle dimensions selection
    const handleDimensionsChange = (index: number, dimensions: string) => {
        const updatedFields = [...imageFields];
        updatedFields[index].dimensions = dimensions;
        setImageFields(updatedFields);
    };

    // Function to handle quantity input changes
    const handleQuantityChange = (index: number, quantity: number) => {
        const updatedFields = [...imageFields];
        updatedFields[index].quantity = quantity;
        setImageFields(updatedFields);
    };

    // Function to handle the global submit
    const handleSubmit = () => {
        const isAnyFileEmpty = imageFields.some((field) => !field.file);
        if (isAnyFileEmpty) {
            // Display an error message or handle the validation as needed
            console.log('File is required for all fields.');
        } else {
            // Save the data from imageFields to your backend or perform any necessary actions
            console.log('Submitted data:', imageFields);
        }
    };

    return (
        <div className="p-4 space-y-4">
            <button onClick={addImageField} className="bg-blue-500 text-white px-2 py-1 rounded">
                Add Image
            </button>
            {imageFields.map((field, index) => (
                <div key={index} className="space-y-2">
                    <div>
                        <label className="text-sm">Image Preview:</label>
                        {field.previewURL && (
                            <img
                                src={field.previewURL}
                                alt="Preview"
                                className="w-32 h-32 object-contain border border-gray-300"
                            />
                        )}
                    </div>
                    <div className="space-x-2">
                        <input
                            type="file"
                            ref={(el) => (fileInputRefs.current[index] = el)}
                            onChange={(e) => handleFileChange(index, e.target.files ? e.target.files[0] : null)}
                            className="hidden"
                        />
                        <button
                            onClick={() => fileInputRefs.current[index]?.click()}
                            className="bg-blue-500 text-white px-2 py-1 rounded"
                        >
                            Upload Image
                        </button>
                        <select
                            value={field.dimensions}
                            onChange={(e) => handleDimensionsChange(index, e.target.value)}
                            className="border border-gray-300 p-1"
                        >
                            <option value="Select Dimensions" disabled>
                                Select Dimensions
                            </option>
                            <option value="Small">Small</option>
                            <option value="Medium">Medium</option>
                            <option value="Large">Large</option>
                        </select>
                        <input
                            type="number"
                            value={field.quantity}
                            onChange={(e) => handleQuantityChange(index, +e.target.value)}
                            className="border border-gray-300 p-1 w-16"
                        />
                    </div>
                    {field.error && <p className="text-red-600 text-sm">{field.error}</p>}
                </div>
            ))}
            <button onClick={handleSubmit} className="bg-green-500 text-white px-2 py-1 rounded">
                Submit
            </button>
        </div>
    );
};

export default ImageRepeater;
