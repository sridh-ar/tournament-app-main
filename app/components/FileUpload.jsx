import { useState } from "react";

export default function FileUpload({ logo, title, color, onClick }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);
      // You can perform additional validation or actions here if needed
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Handle the file submission here, you can use the selectedFile state
    if (selectedFile) {

      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        // Handle the response
        if (response.ok) {
          console.log('File uploaded successfully');
          setSelectedFile(null);
        } else {
          console.error('File upload failed');
        }
      } catch (error) {
        console.error('Error during file upload:', error);
      }

    } else {
      // Handle the case where no file is selected
      console.error('No file selected');
    }
  };

  return (
    <div class="flex justify-center w-full mx-auto sm:max-w-lg">

      <div class="flex flex-col items-center justify-center w-full h-auto my-20 bg-white sm:w-3/4 sm:rounded-lg sm:shadow-xl">
        <div class="mt-10 mb-10 text-center">
          <h2 class="text-2xl font-semibold mb-2">Upload the Logo file</h2>
          <p class="text-xs text-gray-500">File should be name of leo.png</p>
        </div>
        <form onSubmit={handleSubmit} class="flex flex-col  relative w-4/5 h-32 max-w-xs mb-10 bg-gray-100 rounded-lg shadow-inner">
          <input type="file" id="file-upload" class="hidden" onChange={handleFileChange} />
          <label for="file-upload" class="z-20 flex flex-col-reverse items-center justify-center w-full h-full cursor-pointer">
            <p class="z-10 text-xs font-light text-center text-gray-500">{selectedFile ? selectedFile.name : 'Drag & Drop your files here'}</p>
            <svg class={`z-10 w-8 h-8 ${selectedFile ? 'text-green-400' : 'text-indigo-400'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
            </svg>
          </label>
          <button type="submit" disabled={selectedFile ? false : true} className={`mt-4 ${selectedFile ? 'bg-green-500' : 'bg-indigo-500'} text-white px-4 py-1 text-sm rounded`}>
            Submit
          </button>
        </form>
      </div>
    </div>

  );
}
