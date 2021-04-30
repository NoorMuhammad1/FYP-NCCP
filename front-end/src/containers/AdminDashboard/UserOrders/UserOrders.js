import { Button }          from '@material-ui/core';
import pdfLogo             from 'assets/pdf.png';
import classNames          from 'classnames';
import SideBar             from 'components/SideBar';
import React, { useState } from 'react';

const UserOrders = (props) => {

  const [documentsAvailable] = useState([
                                          'https://res.cloudinary.com/khizerrehan92/image/upload/v1618677668/hamza_farhad_stocks_r56azy.pdf',
                                          'https://res.cloudinary.com/khizerrehan92/raw/upload/v1618677683/Summer_School_Registration_Form_ko4m7q.docx',
                                          'https://res.cloudinary.com/khizerrehan92/image/upload/v1618677668/hamza_farhad_stocks_r56azy.pdf',
                                          'https://res.cloudinary.com/khizerrehan92/raw/upload/v1618677683/Summer_School_Registration_Form_ko4m7q.docx'
                                        ]);

  return (
    <SideBar active="Orders">
      <div className="p-4">
        <h3>Order Details</h3>
      </div>

      <div className="container-fluid">
        <div className="row">

          {
            documentsAvailable && documentsAvailable.map((document) => {
              return (
                <div className="col-lg">
                  <div className="card">
                    <p>File</p>
                    {document}
                    <a href={document} target="_blank" rel="noopener noreferrer" download>
                      <img src={pdfLogo} className={classNames('icon-small')} />
                      <Button>
                        <i className="fas fa-download" />
                        Download File
                      </Button>
                    </a>
                  </div>
                </div>
              );
            })
          }
        </div>

        <br />
        <br />
        <br />
        <h1>Upload Files</h1>
      </div>
    </SideBar>
  );
};

export default UserOrders;
