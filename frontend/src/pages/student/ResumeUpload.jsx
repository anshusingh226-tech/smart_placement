import { useState } from "react";

function ResumeUpload() {
  const [file, setFile] = useState(null);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Resume Upload
      </h1>

      <p className="mt-1 text-slate-500">
        Upload your latest resume for recruiters to view.
      </p>

      <div className="max-w-xl p-8 mt-6 text-center bg-white border-2 border-dashed border-slate-300 rounded-2xl">
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full"
        />

        {file && (
          <p className="mt-4 text-sm text-green-600">
            Selected: {file.name}
          </p>
        )}

        <button
          className="px-6 py-2 mt-5 text-white bg-blue-600 rounded-xl"
          onClick={() => {
            if (!file) {
              alert("Please select a resume first");
              return;
            }

            alert("Resume uploaded successfully!");
          }}
        >
          Upload Resume
        </button>
      </div>
    </div>
  );
}

export default ResumeUpload;