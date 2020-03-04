import Layout from './../../components/layout';
import axios from 'axios';
import { useState, useEffect } from 'react';

const AccountPage = () => {
  const [files, setFiles] = useState(null);
  const [file, setFile] = useState(null);

    useEffect(() => {
      async function fetchFiles() {
        try {
          const files = (await axios.get('http://localhost:5001/uploads')).data.response[0];
          setFiles(files.reverse());
        } catch(err) {console.error(err)}
      }
      fetchFiles()
    }, []);

    const getQuote = (file) => {
      console.log(file);
      axios.post('http://localhost:5001/get-quote', {url: file.metadata.mediaLink});
    }


  return (
    <section>
      <h1>Account</h1>
      {
        files ? files.map((file, i) => {
          return (
            <div key={i} onClick={() => getQuote(file)}>
              <img style={{ height: '200px' }} src={file.metadata.mediaLink}></img>
              <p key={i}>{file.name.split(/__(.*)/)[1]}</p>
            </div>
          )
        }) : null
      }
    </section>
  )
}

export default Layout(AccountPage);