import Layout from './../../components/layout';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { USER_LOGOUT } from '../../store/actions/user.actions';
import { AppState } from '../../store/reducers';

const AccountPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.user);
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

  function handleLogout(event) {
    dispatch({type: USER_LOGOUT });
  }

  const getQuote = (file) => {
    console.log(file);
    axios.post('http://localhost:5001/get-quote', {url: file.metadata.mediaLink});
  }


  return (
    <section>
      <h1>{ user.email }</h1>
      <a onClick={handleLogout}>Logout</a>
      <p>TODO: LIST ALL THE PRODUCT OPTIONS FROM SCALABLE. REFERENCE COTTON BUREAU. USE IMAGEMAGICK</p>
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