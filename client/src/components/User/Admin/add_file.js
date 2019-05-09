import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { Link } from "react-router-dom";
import UserLayout from "../../../hoc/user";

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle';
import CircularProgress from '@material-ui/core/CircularProgress';

class AddFile extends Component {

  state = {
    formSuccess:false,
    formError:false,
    uploading: false,
    files: []
  };

  componentDidMount() {
    axios.get('/api/users/admin_files').then(response => {
      this.setState({files: response.data})
    })
  }


  onDrop = files => {
    this.setState({uploading: true});
    let formData = new FormData();
    const config = {
      header: {'content-type': 'multipart/form-data'}
    };
    formData.append('file',files[0]);
    axios.post('/api/users/uploadimage_on_server', formData, config)
        .then(response => {
          if(response.data.success){
            this.setState({
              formSuccess:true,
              formError:false,
              uploading: false,
            }, () => {
              setTimeout(() => this.setState({formSuccess:false}),2000)
            })
          }
        })
  };

  showFileList = () => (
      this.state.files &&
      this.state.files.map((item,i) => (
          <li key={i}>
            <img src={`/images/uploads/${item}`} alt={item} style={{width:'30%'}}/>
            <Link to={`/api/users/download/${item}`} target="_blank">
              {item}
            </Link>
          </li>
      ))
  );

  render() {

    const { uploading, formSuccess, formError } = this.state;

    return (
        <UserLayout>
          <h1>Upload file</h1>
          <div>
            <Dropzone
                onDrop={this.onDrop}
                multiple={false}
                className="dropzone_box"
            >
              <div className="wrap">
                <FontAwesomeIcon icon={faPlusCircle}/>
              </div>
            </Dropzone>

            {uploading &&
            <div
                className="dropzone_box"
                style={{
                  textAlign: 'center',
                  paddingTop: '60px'
                }}>
              <CircularProgress
                  style={{color: '#00bcd4'}}
                  thickness={7}
              />
            </div>}

            <div style={{clear: 'both'}}>
              {formSuccess && <div className="form_success">Success</div>}
              {formError && <div className="error_label">Please check data</div>}
            </div>

            <hr/>
            <div>
              <ul>
                {this.showFileList()}
              </ul>
            </div>
          </div>
        </UserLayout>
    );
  }
}

export default AddFile;