import { useState } from 'react';
import axios from 'axios';
import Layout from '../components/layout';
import { useSelector } from "react-redux";
import { AppState } from '../store/reducers';

const Page = () => {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});


  const handleUploadChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  }

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('file', file);
    try {
      const res = await axios.post('http://localhost:5001/upload', form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <section>
      <div>
        <label htmlFor="uploadFile">
          {fileName}
          <input onChange={handleUploadChange} name="upload" id="uploadFile" type="file" />
          <button onClick={handleFileUpload}>Upload</button>
        </label>
      </div>
    </section>
  )
};



export default Layout(Page);