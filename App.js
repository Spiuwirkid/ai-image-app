import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState([]);

  const handleUpload = async () => {
    const api = process.env.REACT_APP_API;

    // 1. Get Presigned URL
    const presignRes = await axios.post(`${api}/presign`, {
      image: file.name
    });
    const uploadUrl = presignRes.data.url;

    // 2. Upload to S3
    await fetch(uploadUrl, {
      method: "PUT",
      body: file
    });

    // 3. Call classify API
    const classifyRes = await axios.post(`${api}/classify`, {
      image: file.name
    });

    setResult(classifyRes.data.labels);
  };

  return (
    <div>
      <h1>Upload Gambar</h1>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Klasifikasikan</button>
      <ul>
        {result.map((label, i) => <li key={i}>{label}</li>)}
      </ul>
    </div>
  );
}

export default App;